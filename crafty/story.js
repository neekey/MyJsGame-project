Crafty.extend({
	story: ( function(){
		var _story = {};
		
		return function( name, story ){
			if( arguments.length == 1 ){
				if( name in _story ){
					return _story[ name ];
				}
			}
			else if ( arguments.length == 2 ){
				_story[ name ] = story;
			}
		}
	})()
});


/**
 * 用于过场的背景介绍
 */

 /*
 
 story:[
	{
		text: 'hahah'
		bg: 'a'
	},
	{
		text: 'hahah'
		bg: 'a'
	}
 ]
 
 */
Crafty.c('story', {

	_storyScript: null,
	_storyBgSprite: null,
	_storyText: null,
	_curStoryIndex: 0,
	_isStoryPlaying: false,
	_storyBeginEvent: null,
	_storyFinishEvent: null,
	
	init: function(){
		var rect = Crafty.viewport.rect();
		// 设置背景组件
		this._storyBg = Crafty.e('2D, Canvas, Color')
		.attr({ x: 130, y: 15, w: rect._w, h: rect._h, z: 999 })
		.color('rgb(0, 0, 0)');
		// 设置文字显示区域
		this._storyText = Crafty.e('2D, DOM, Text, Color, attrSprite')
		.attr({ w: 560, h: 300, x: 150, y: 100 })
		//.color('white')
		.css({ 
			padding: '20', 
			color: 'white', 
			'font-size': '24', 
			'text-align': 'center',
			'font-weight': 'bold',
			overflow: 'hidden',
			'text-shadow': '2px 2px 3px #333'
		});
		this._clickTip = Crafty.e('2D, DOM, Text, Color, attrSprite')
		.attr({ w: 150, h: 30, x: 700, y: 400 })
		//.color('white')
		.css({ 
			color: 'white', 
			'font-size': '20', 
			'text-align': 'center',
			'font-weight': 'bold',
			overflow: 'hidden',
			'text-shadow': '2px 2px 3px #333'
		})
		.text('点击继续...')
		.attr('visible', false);
		
		this._storyBeginEvent = [];
		this._storyFinishEvent = [];
		
	},
	
	storySetup: function( script ){
		this._storyScript = script;
		return this;
	},
	
	/**
	 * 开始执行剧情
	 */
	playStory: function(){
		
		if( this._storyScript && !this._isStoryPlaying ){
			this.showStory();
			this._isStoryPlaying = true;
			// 执行剧情开始前事件
			var i;
			for( i = 0; this._storyBeginEvent[ i ]; i++ ){
				this._storyBeginEvent[ i ]();
			}
			// 绑定剧情播放事件
			Crafty.addEvent(this, Crafty.stage.elem, "mousedown", this.palyNextStory );
			this.palyNextStory( { button: 0 });
		}
		else {
			this.hideStory();
			this._isStoryPlaying = false;
			Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", this.palyNextStory );
		}
	},
	
	hideStory: function(){
		
		// 隐藏名称
		this._storyText.attr('visible', false);
		// 隐藏背景
		this._storyBg.attr('visible', false );
		this._clickTip.attr('visible', false );
	},
	
	showStory: function(){
		this._clickTip.attr('visible', true );
		// 显示名称
		this._storyText.attr('visible', true);
		// 显示背景
		this._storyBg.attr('visible', true );
	},
	
	palyNextStory: function( e ){
		if( e.button == 0 ){
			this._clickTip.attr('visible', false);
			if( this._storyScript && this._isStoryPlaying ){
				// 剧情尚未结束
				if( this._curStoryIndex < this._storyScript.length ){
					// 获取下一幕内容
					var s = this._storyScript[ this._curStoryIndex ],
					text = s.text,
					bg = s.bg,
					textH = this._storyText.attr('h'),
					_this = this;
					if( text && bg ){
							
							this._storyText.attr( 'h', 0 );
							this._storyText.text( text );
							this.setStoryBg( bg );
							Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", this.palyNextStory );
							this._storyText.attrSprite({ h: 200}, 5000, function(){
								_this._clickTip.attr('visible', true);
								Crafty.addEvent(_this, Crafty.stage.elem, "mousedown", _this.palyNextStory );
							});
							
						
						this._curStoryIndex++;
					}
					else {
						Crafty.$e.exit('palyNextStory: 指定角色[ ' + name + ' ]不存在！');
					}
				}
				else {
					this.hideStory();
					this._isStoryPlaying = false;
					this._curStoryIndex = 0;
					Crafty.removeEvent(this, Crafty.stage.elem, "mousedown", this.palyNextStory );
					// 执行剧情结束事件事件
					var i;
					for( i = 0; this._storyFinishEvent[ i ]; i++ ){
						this._storyFinishEvent[ i ]();
					}
					this.trigger('storyFinished');
				}
			}
		}
	},
	
	/**
	 * 设置背景
	 */
	setStoryBg: function( name, alpha ){
		if( name ){
			if( this._storyBgSprite ){
				this._storyBg.removeComponent( this._storyBgSprite );
			}
			this._storyBg.addComponent( name );
			this._storyBgSprite = name;
		}
		if( alpha ){
			this._storyBg.attr({alpha: alpha});
		}
		return this;
	},
	
	onStoryBegin: function( fn ){
		if( Crafty.$getType( fn ) == 'Function' ){
			this._storyBeginEvent.push( fn );
		}
		else {
			$Crafty.$e.log('onStoryBegin: 参数有误！');
		}
		return this;
	},
	
	onStoryFinished: function( fn ){
		if( Crafty.$getType( fn ) == 'Function' ){
			this._storyFinishEvent.push( fn );
		}
		else {
			$Crafty.$e.log('onStoryFinished: 参数有误！');
		}
		return this;
	}
});