/**
 * 属性动画
 */
Crafty.c('attrSprite', {
	
	
	init: function(){
		// 初始化组件属性
		// 由于组件可多重添加（可以为一个entity添加多个组件，也就是添加了多个flashSprite)
		// 因此添加时必须判断是否已经添加过，避免相关状态参数被重写
		if( !this.hasOwnProperty('_curAttrSprite') ){
			this._attrSpriteOffset = 5;
			this._attrSpriteOffsetFrame = 0;
			this._curAttrSprite = null;
			this._isAttrSpriting = false;
			this._curAttrSpriteCallback = null;
			this._attrSpriteQueue = [];
			/* 动画开始执行时的时间 */
			this._attrSpriteBeginTime = null;
			/* 动画开始执行时的属性值 */
			this._curAttrSpriteValueOffset = null;
			this._curAttrSpriteSpend = null;
		}
	},
		
	/**
	 * 执行Attribute sprite
	 * @param {String} 动画的最终属性值
	 * @param {Number} 动画持续的秒数
	 * @param {Function} fn 动画执行完毕时的回调函数
	 */
	attrSprite: function( obj, spend, fn ){
		if( Crafty.$getType( obj ) == 'Object' ){
			if( !this._isAttrSpriting ){
				this.bind('enterframe', this._attrSpriteLoop );
				this._isAttrSpriting = true;
			}
			this._attrSpriteQueue.push( { animate: obj, spend: spend, callback: fn} );
		}
		else {
			Crafty.$e.log('flashSprite: 参数有误!' );
		}
		return this;
	},
	
	/**
	 * 动画执行主循环
	 * @private
	 */
	_attrSpriteLoop: function(){
		if( this._isAttrSpriting ){
			if( this._attrSpriteOffsetFrame == this._attrSpriteOffset ){
				var am, index, amName, finished = true;
				if( am = this._curAttrSprite ){
					// 检查当前动画是否已经执行完毕
					for( amName in am ){
						if( this.attr( amName) != am[ amName ] ){
							finished = false;
						}
					}
					if( finished ){
						// 若存在，则执行回调函数
						if( this._curAttrSpriteCallback ){
							this._curAttrSpriteCallback();
						}
						this._curAttrSprite = null;
						this._curAttrSpriteCallback = null;
					}
				}
				if( this._curAttrSprite == null ){
					// 检查队列中是否还有动画可以执行
					// 则开始执行新动画
					if( this._attrSpriteQueue.length > 0 ){
						am = this._curAttrSprite = this._attrSpriteQueue[ 0 ].animate;
						this._curAttrSpriteCallback = this._attrSpriteQueue[ 0 ].callback;
						this._curAttrSpriteSpend = this._attrSpriteQueue[ 0 ].spend;
						this._attrSpriteQueue.shift();
						
						// 设置动画开始执行的时间
						// 精确到毫秒
						this._attrSpriteBeginTime = ( new Date() ).valueOf();
						
						// 备份当前属性值
						this._curAttrSpriteValueOffset = {};
						for( amName in am ){
							this._curAttrSpriteValueOffset[ amName ] = am[ amName ] - this.attr( amName );
						}
					}
				}
				
				// 执行动画
				if( this._curAttrSprite != null ){
					
					// 获取动画已经持续的时间
					var spendTime  = ( new Date() ).valueOf() - this._attrSpriteBeginTime,
					
					am= this._curAttrSprite, amName;
					var spend =  this._curAttrSpriteSpend;
					// 若时间已经完毕,
					if( spendTime >= spend ){
						
						// 将属性设置成目标属性值
						for( amName in am ){
							this.attr( amName, am[ amName ] );
						}
					}
					else {
						var per = ( spend - spendTime ) / spend;
						// 根据已经消耗时间和spend的比值,设置属性值
						for( amName in am ){
							this.attr( amName, am[ amName ] - ( this._curAttrSpriteValueOffset[ amName ] * per ) );
						}
					}
				}
				// 动画执行完毕
				else{
					this._isAttrSpriting = false;
					this.unbind( 'enterframe', this._attrSpriteLoop );
				}
			
				this._attrSpriteOffsetFrame = 0;
				
			}
			
			this._attrSpriteOffsetFrame++;
		}
		else {
			this.unbind( 'enterframe', this._attrSpriteLoop );
		}
	}
});