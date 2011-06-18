/**
 * 剧情组件
 */
 
Crafty.extend({
	drama: ( function(){
		var _drama = {};
		return function( name, drama ){
			if( arguments.length == 1 ){
				if( name in _drama ){
					return _drama[ name ];
				}
			}
			else if ( arguments.length == 2 ){
				_drama[ name ] = drama;
			}
		};
	})()
});
/**
 * 剧情人物
 */
Crafty.c('dramaChar', {
	
	/**
	 * 角色的所有表情
	 */
	_face: null,
	_curFace: null,
	_charName: null,
	
	
	init: function(){
		this.requires('2D, Canvas, attrSprite');
		this.bind('faceChange', this._onFaceChange );
		this.attr({w: 323, h: 482, z: 9999, x: 700, y: 100} );
	},
	
	/**
	 * 初始化 设置角色表情
	 * @param {Object} face
	 */
	dramaCharSetup: function( face, name ){
		if( Crafty.$getType( face ) == 'Object' ){
			this._face = face;
			this._charName = name;
		}
		else {
			Crafty.$e.log('dramaCharSetup: 参数有误！');
		}
		return this;
	},
	
	/**
	 * 设置角色表情 
	 */
	setFace: function( name ){
		
		if( name in this._face ){
			
			this.removeComponent( this._curFace );
			this.addComponent( this._face[ name ] );
			// 取消当前的表情
			this.trigger('faceChange');
			
		}
		else {
			// 指定的表情不存在
			Crafty.$e.log('setFace: 指定的表情不存在');
		}
		return this;
	},
	
	/**
	 * 表情改变时出发事件
	 * 添加渐隐效果
	 */
	_onFaceChange: function(){
		this.attrSprite({ alpha: 0.8 }, 200 )
		.attrSprite({ alpha: 1 }, 200 );
	},
	
	/**
	 * 角色消失
	 */
	charFadeOut: function( callback ){
		this.attrSprite({ alpha: 0 }, 200, callback);
		return this;
	},
	
	/**
	 * 角色出现
	 */
	charFadeIn: function( callback ){
		this.attrSprite({ alpha: 1 }, 200, callback );
		return this;
	}
	
});

Crafty.c('dramaDialog', {
	
	_curSpeaker: null,
	_speakerNameEntity: null,
	
	init: function(){
		this.requires('2D, DOM, Text, Color');
		this._speakerNameEntity = Crafty.e( '2D, DOM, Text, Color' ).
		attr({ w: 60, h: 20, x: 10, y: 340, z: 10000 })
		.color('#ffffff')
		.css('padding', 10);
	},
	
	/**
	 * 初始化，可以为dialog的dom设置id值
	 */
	dramaDialogSetup: function( domId, speakerId ){
		if( domId ){
			this._element.id = domId;
		}
		if( speakerId ){
			this._speakerNameEntity._element.id = speakerId;
		}
	},
	
	setDialog: function( speaker, content, pos ){
		if( speaker.has && speaker.has( 'dramaChar' ) ){
			this._curSpeaker = speaker;
			this.text( content );
			this.updateSpeakerName( pos );
		}
		else {
			Crafty.$e.log('setDialog: 参数有误！');
		}
	},
	
	updateSpeakerName: function( pos ){
		var s = this._curSpeaker,
		name = s._charName;
		this._speakerNameEntity.text( name );
		if( pos == 'right' ){
			this._speakerNameEntity.attr({x:810});
		}
		else {
			this._speakerNameEntity.attr({x:10});
		}
		
	},
	
	hideDialog: function(){
		this.attr('visible', false);
		if( this._speakerNameEntity ){
			this._speakerNameEntity.attr('visible', false);
		}
	},
	showDialog: function(){
		this.attr('visible', true);
		if( this._speakerNameEntity ){
			this._speakerNameEntity.attr('visible', true);
		}
	}
});

/**
 * 剧情组件
 */
/*
{	
name: 'neekey',
face: 'smile',
text: 'hello',
action: show/hide,
pos: left
}
*/
Crafty.c('drama', {
	_dramaCharList: null,
	_speaker: null,
	_dramaScript: null,
	_dramaBgSprite: null,
	_dramaText: null,
	_curDramaIndex: 0,
	_curLeftChar: null,
	_curRightChar: null,
	_isDramaPlaying: false,
	_dramaBeginEvent: null,
	_dramaFinishEvent: null,
	
	init: function(){
		this._dramaCharList = {};
		var rect = Crafty.viewport.rect();
		// 设置背景组件
		this._dramaBg = Crafty.e('2D, Canvas, Color, Mouse')
		.attr({ x: 130, y: 15, w: rect._w, h: rect._h, z: 999, alpha: 0.5 })
		.color('rgb(0, 0, 0)');
		// 设置文字显示区域
		this._dramaText = Crafty.e('dramaDialog')
		.attr({ w: 840, h: 150, x: 10, y: 400 })
		.color('#ffffff')
		.css('padding', '20');
		this._dramaBeginEvent = [];
		this._dramaFinishEvent = [];
	},
	
	dramaSetup: function( charObj, script ){
		this.setDramaChar( charObj );
		this._dramaScript = script;
		return this;
	},
	
	setDramaChar: function( charObj ){
		if( Crafty.$getType( charObj ) == 'Object' ){
			var name;
			for( name in charObj ){
				this._dramaCharList[ name ] = charObj[ name ];
				charObj[ name ]._charName = name;
			}
		}
		else {
			Crafty.$e.log('setDramaChar: 参数有误！');
		}
	},
	
	/**
	 * 开始执行剧情
	 */
	playDrama: function(){
		
		if( this._dramaScript && !this._isDramaPlaying ){
			this.showDrama();
			this._isDramaPlaying = true;
			// 执行剧情开始前事件
			var i;
			for( i = 0; this._dramaBeginEvent[ i ]; i++ ){
				this._dramaBeginEvent[ i ]();
			}
			// 绑定剧情播放事件
			Crafty.addEvent(this, Crafty.stage.elem, "mousedown", this.palyNextDrama );
			this.palyNextDrama( { button: 0 });
		}
		else {
			this.hideDrama();
			this._isDramaPlaying = false;
			Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", this.palyNextDrama );
		}
	},
	
	hideDrama: function(){
		// 隐藏所有的角色
		var name;
		for( name in this._dramaCharList ){
			this._dramaCharList[ name ].attr('visible', false); 
		}
		// 隐藏名称
		this._dramaText.hideDialog();
		// 隐藏背景
		this._dramaBg.attr('visible', false );
	},
	
	showDrama: function(){
		// 显示所有的角色
		var name;
		for( name in this._dramaCharList ){
			this._dramaCharList[ name ].attr('visible', true); 
		}
		// 显示名称
		this._dramaText.showDialog;
		// 显示背景
		this._dramaBg.attr('visible', true );
	},
	
	palyNextDrama: function( e ){
		if( e.button == 0 ){
			if( this._dramaScript && this._isDramaPlaying ){
				// 剧情尚未结束
				if( this._curDramaIndex < this._dramaScript.length ){
					// 获取下一幕内容
					var d = this._dramaScript[ this._curDramaIndex ],
					name = d.name,
					face = d.face,
					text = d.text,
					action = d.action,
					pos = d.pos,
					char = this._dramaCharList[ name ],
					_this = this, oldChar, idleChar;
					if( char && face && text && pos ){
						// 设置其位置
						if( pos == 'left' ){
							char.attr({ x: 150, y:100 });
							oldChar = this._curLeftChar;
							idleChar = this._curRightChar
							this._curLeftChar = char;
						}
						else {
							char.attr({ x: 700, y:100 });
							oldChar = this._curRightChar;
							idleChar = this._curLeftChar
							this._curRightChar = char;
						}
						// 对相对方向的角色设置为透明度0.5
						if( idleChar ){
							idleChar.attr('alpha', 0.5);
						}
						Crafty.removeEvent( this, Crafty.stage.elem, "mousedown", this.palyNextDrama );
						// 若当前位置已经有角色存在，则先隐藏该角色
						if( oldChar && oldChar != char  ){
						
							oldChar.charFadeOut( function(){
								
								char.charFadeIn( function(){
									char.setFace( face );
									_this._dramaText.setDialog( char, text, pos );
									Crafty.addEvent( _this, Crafty.stage.elem, "mousedown", _this.palyNextDrama );
								});
							});
						}
						else {
							char.charFadeIn( function(){
								char.setFace( face );	
								_this._dramaText.setDialog( char, text, pos );
								Crafty.addEvent( _this, Crafty.stage.elem, "mousedown", _this.palyNextDrama );
							});
						}
						
						this._curDramaIndex++;
					}
					else {
						Crafty.$e.exit('palyNextDrama: 指定角色[ ' + name + ' ]不存在！');
					}
				}
				else {
					this.hideDrama();
					this._isDramaPlaying = false;
					this._curDramaIndex = 0;
					Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", this.palyNextDrama );
					// 执行剧情结束事件事件
					var i;
					for( i = 0; this._dramaFinishEvent[ i ]; i++ ){
						this._dramaFinishEvent[ i ]();
					}
					this.trigger('dramaFinished');
				}
			}
		}
	},
	
	/**
	 * 设置背景
	 */
	setDramaBg: function( name, alpha ){
		if( name ){
			if( this._dramaBgSprite ){
				this._dramaBg.removeComponent( this._dramaBgSprite );
			}
			this._dramaBg.addComponent( name );
			this._dramaBgSprite = name;
		}
		if( alpha ){
			this._dramaBg.attr({alpha: alpha});
		}
		return this;
	},
	
	onDramaBegin: function( fn ){
		if( Crafty.$getType( fn ) == 'Function' ){
			this._dramaBeginEvent.push( fn );
		}
		else {
			$Crafty.$e.log('onDramaBegin: 参数有误！');
		}
		return this;
	},
	
	onDramaFinished: function( fn ){
		if( Crafty.$getType( fn ) == 'Function' ){
			this._dramaFinishEvent.push( fn );
		}
		else {
			$Crafty.$e.log('onDramaFinished: 参数有误！');
		}
		return this;
	}
	
});

