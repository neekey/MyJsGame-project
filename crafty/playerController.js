/**
 * 角色控制器
 */
Crafty.c( 'playerController', {
	
	_curPlayer: null,
	_curPlayerAction: null,
	_playerQueue: null,
	_previousPlayer: null,
	_nextPlayer: null,
	init: function(){
		
	},
	
	/**
	 * 设置当前角色将要执行的动作
	 * @param {String} action 方法名称
	 */
	setPlayerAction: function( action ){
		if( this._curPlayerAction != action ){
			this._curPlayerAction = action;
			this.trigger('playerActionChange');
		}
		return this;
	},
	
	/**
	 * 执行当前玩家的动作
	 * @param {All} 本方法的参数将全部传递给对应的玩家动作方法
	 * @returns 返回值与指定的player的action返回值一致
	 */
	doPlayerAction: function(){
		if( this._curPlayer && this._curPlayerAction ){
			if( this._curPlayer[ this._curPlayerAction ] ){
				// 返回，根据player的操作结果可以判断一些操作是否成功或者合法
				return this._curPlayer[ this._curPlayerAction ].apply( this._curPlayer, arguments );
			}
			else {
				Crafty.$e.log('doPlayerAction: 动作：' + this._curPlayerAction + ' 不存在！');
				return false;
			}
		}
		else {
			Crafty.$e.log('doPlayerAction: 当前控制玩家不存在或者未指定执行的动作！');
			return this;
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
			
			this.bind('playerTurnChange', this._playerLoop );
			this.trigger('playerTurnChange');
		}
		return this;
	},
	
	/**
	 * 转到下一个玩家回合
	 */
	nextPlayerTurn: function(){
		this.trigger('playerTurnChange');
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
			this._playerQueue.shift();
			// 将该角色添加到队尾
			this._playerQueue.push( curP );
			// 设置下一个角色
			this._nextPlayer = this._playerQueue[ 0 ];
			// 设置前一个角色
			if( this._curPlayer ){
				this._previousPlayer = this._curPlayer;
			}
			// 若存在前一个角色则触发 取消激活事件
			if( this._previousPlayer ){
				// 触发角色取消激活事件
				this.trigger('playerInactived');
			}
			this.setPlayer( curP );
			// 触发角色激活事件
			this.trigger('playerActived');
		}
		else {
			this.unbind('playerTurnChange', this._playerLoop );
		}
	}
});