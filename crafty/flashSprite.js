
/**
 * 定义一次性精灵动画
 */
Crafty.extend({
/**
 * 定义flashSprite
 * @param {String} name
 * @param {String} url
 * @param {Array[Array]]
 */
flashSprite: function( name, url, list ){
	
	// 建立精灵动画
	var i, counter = 0, spriteMap = {}, spriteArr = [];
	for( i = 0; list[ i ]; i++ ){
		spriteMap[ name + i ] = list[ i ];
		spriteArr.push( name + i );
	}
	Crafty.sprite( url, spriteMap );
	
	Crafty.c( name, {
		_flashSpriteOffset: 20,
		_flashSpriteOffsetFrame: 0,
		_flashSpriteFrame: 0,
		_curFlashSpriteIndex: 0,
		_curFlashSpriteName: null,
		_isFlashSpriting: false,
		
		init: function(){
			// 初始化动画列表
			if( !this.hasOwnProperty( '_flashSprite' ) ){
				this._flashSprite = {};
			}
			this._flashSprite[ name ] = spriteArr;
			
			// 初始化动画队列
			if( !this.hasOwnProperty( '_flashSpriteQueue' ) ){
				this._flashSpriteQueue = [];
			}
		},
		
		flashSprite: function( name ){
			if( name in this._flashSprite ){
				if( !this._isFlashSpriting ){
					this.bind('enterframe', this._flashSpriteLoop );
					this._isFlashSpriting = true;
				}
				this._flashSpriteQueue.push( name );
			}
			else {
				Crafty.$e.log('flashSprite: 指定的flashSprite[ ' + name + ' ]不存在!' );
			}
			return this;
		},
		
		_flashSpriteLoop: function(){
			if( this._isFlashSpriting ){
				if( this._flashSpriteOffsetFrame == this._flashSpriteOffset ){
					var name, index;
					if( name = this._curFlashSpriteName ){
						// 检查当前动画是否已经执行完毕
						if( this._curFlashSpriteIndex == ( this._flashSprite[ name ].length - 1 ) ){
							this._curFlashSpriteIndex = 0;
							this._curFlashSpriteName = null;
						}
						else {
							//this._curFlashSpriteIndex++;
						}
					}
					if( this._curFlashSpriteName == null ){
						// 检查队列中是否还有动画可以执行
						if( this._flashSpriteQueue.length > 0 ){
							this._curFlashSpriteName = this._flashSpriteQueue[ 0 ];
							this._curFlashSpriteIndex = 0;
							this._flashSpriteQueue.shift();
						}
					}
					
					if( this._curFlashSpriteName != null ){
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