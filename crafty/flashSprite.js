
/**
 * 定义一次性精灵动画
 */
Crafty.extend({
/**
 * 定义flashSprite
 * @param {String} name
 * @param {String} url
 * @param {Array[Array]]
 *	Crafty.flashSprite( 'ballOne', 'image/flash/ball.png', [ [0,0,50,50], [50,0,50,50], [0,50,50,50],[50,50,50,50] ] );
 *	则这个调用实际将产生四个sprite组件：ballOne0 ballOne1 ballOne2 ballOne3
 */
flashSprite: function( name, url, list ){
	// 检查参数
	if( ! ( Crafty.$getType( name ) == 'String' && Crafty.$getType( url ) == 'String' && Crafty.$getType( list ) == 'Array' ) ){
		Crafty.$e.exit( 'flashSprite: 参数有误！');
	}
	// 建立精灵动画
	var i, counter = 0, spriteMap = {}, spriteArr = [];
	// 遍历给定的精灵动画序列
	for( i = 0; list[ i ]; i++ ){
		spriteMap[ name + i ] = list[ i ];
		// 存储各帧名称
		spriteArr.push( name + i );
	}
	// 建立sprite组件
	Crafty.sprite( url, spriteMap );
	
	// 建立flash动画组件，它包含了上面建立的sprite组件信息
	Crafty.c( name, {
		
		init: function(){
			// 初始化组件属性
			// 由于组件可多重添加（可以为一个entity添加多个组件，也就是添加了多个flashSprite)
			// 因此添加时必须判断是否已经添加过，避免相关状态参数被重写
			if( !this.hasOwnProperty( '_flashSprite' ) ){
				this._flashSprite = {};
				this._flashSpriteOffset = 5;
				this._flashSpriteOffsetFrame = 0;
				this._curFlashSpriteIndex = 0;
				this._curFlashSpriteName = null;
				this._isFlashSpriting = false;
				this._curFlashSpriteCallback = null;
			}
			this._flashSprite[ name ] = spriteArr;
			
			// 初始化动画队列
			if( !this.hasOwnProperty( '_flashSpriteQueue' ) ){
				this._flashSpriteQueue = [];
			}
		},
		
		/**
		 * 执行flash sprite
		 * @param {String} name 动画名称
		 * @param {Function} fn 动画执行完毕时的回调函数
		 */
		flashSprite: function( name, fn ){
			if( name in this._flashSprite ){
				if( !this._isFlashSpriting ){
					this.bind('enterframe', this._flashSpriteLoop );
					this._isFlashSpriting = true;
				}
				this._flashSpriteQueue.push( { name: name, callback: fn} );
			}
			else {
				Crafty.$e.log('flashSprite: 指定的flashSprite[ ' + name + ' ]不存在!' );
			}
			return this;
		},
		
		/**
		 * 动画执行主循环
		 * @private
		 */
		_flashSpriteLoop: function(){
			if( this._isFlashSpriting ){
				if( this._flashSpriteOffsetFrame == this._flashSpriteOffset ){
					var name, index;
					if( name = this._curFlashSpriteName ){
						// 检查当前动画是否已经执行完毕
						if( this._curFlashSpriteIndex == this._flashSprite[ name ].length ){
							// 若存在，则执行回调函数
							if( this._curFlashSpriteCallback ){
								this._curFlashSpriteCallback();
							}
							
							this._curFlashSpriteIndex = 0;
							this._curFlashSpriteName = null;
							this._curFlashSpriteCallback = null;
						}
					}
					if( this._curFlashSpriteName == null ){
						// 检查队列中是否还有动画可以执行
						if( this._flashSpriteQueue.length > 0 ){
							this._curFlashSpriteName = this._flashSpriteQueue[ 0 ].name;
							this._curFlashSpriteCallback = this._flashSpriteQueue[ 0 ].callback;
							this._curFlashSpriteIndex = 0;
							this._flashSpriteQueue.shift();
						}
					}
					
					if( this._curFlashSpriteName != null ){
						Crafty.$e.log('当前执行动画 ' + this._curFlashSpriteName + ' 第 ' + this._curFlashSpriteIndex + ' 帧 ' );
						Crafty.$e.log('当前动画长度 ' + this._flashSprite[ this._curFlashSpriteName ].length );
						this.addComponent( 
							this._flashSprite[ this._curFlashSpriteName ][ this._curFlashSpriteIndex ] );
						this._curFlashSpriteIndex++;
					}
					// 动画执行完毕
					else{
						this._isFlashSpriting = false;
						this.unbind( 'enterframe', this._flashSpriteLoop );
					}
				
					this._flashSpriteOffsetFrame = 0;
					
				}
				
				this._flashSpriteOffsetFrame++;
			}
			else {
				this.unbind( 'enterframe', this._flashSpriteLoop );
			}
		}
	});
}
});