
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
		return this;
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
		return this;
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
		return this;
	},
	
	/**
	 * 设置行动角色顺序队列
	 * @param {Array}
	 */
	setPlayerQueue: function( queue ){
		if( Crafty.$getType( queue ) == 'Array' ){
			this._playerQueue = queue;
		}
		else {
			Crafty.$e.log('setPlayerQueue: 参数有误！');
		}
		return this;
	},
	
	/**
	 * 控制器启动，该方法仅适用于需要角色行动顺序队列的状态
	 */
	controllerLaunch: function(){
		if( this._playerQueue && this._playerQueue.length > 0 ){
			this.bind('playerTurnChange', this.playerLoop );
			this.trigger('playerTurnChange');
		}
		return this;
	},
	
	/**
	 * 玩家控制队列主循环
	 * @private
	 */
	_playerLoop: function(){
		if( this._playerQueue && this._playerQueue.length > 0 ){
			// 更换角色控制
			// 取出队列中的第一个角色作为控制角色
			var curP = this._playerQueue[ 0 ];
			// 将该角色添加到队尾
			this._playerQueue.push( curP );
			this.setPlayer( curP );
			// 触发角色激活事件
			this.trigger('playerActived');
		}
		else {
			this.unbind('playerTurnChange', this.playerLoop );
		}
	}
});