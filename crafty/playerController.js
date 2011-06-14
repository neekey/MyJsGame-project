
Crafty.c( 'playerController', {
	
	_curPlayer: null,
	_curPlayerAction: null,
	_playerQueue: null,
	init: function(){
		
	},
	
	/**
	 * 设置当前角色将要执行的动作
	 */
	setPlayerAction: function( action ){
		if( Crafty.$getType( action ) == 'String' ){
			this._curPlayerAction = action;
		}
		else  {	
			Crafty.$e.log('setPlayerAction: 参数有误！');
		}
	},
	
	/**
	 * 执行当前玩家的动作
	 * @param {All} 本方法的参数将全部传递给对应的玩家动作方法
	 */
	doPlayerAction: function(){
		if( this._curPlayer && this._curPlayerAction ){
			if( this._curPlayer[ this._curPlayerAction ] ){
				this._curPlayer[ this._curPlayerAction ].apply( this._curPlayer, arguments );
			}
			else {
				Crafty.$e.log('doPlayerAction: 动作：' + this._curPlayerAction + ' 不存在！');
			}
		}
		else {
			Crafty.$e.log('doPlayerAction: 当前控制玩家不存在或者未指定执行的动作！');
		}
	},
	
	/**
	 * 设置当前控制器制定的游戏玩家
	 * @param {Object} p
	 */
	setPlayer: function( p ){
		if( Crafty.$getType( p ) == 'Object' ){
			this._curPlayer= p;
		}
		else {
			Crafty.$e.log('setPlayer: 参数有误！');
		}
	}
});