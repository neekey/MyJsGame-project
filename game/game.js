/**
 * 作为扩展的游戏简单引擎
 */
 
( function( ny ){
/**
 * 定义接口 controller
 */
ny.interface( 'g.component', {
	fn: [
		/* 用于初始话组件 */
		'init'
	]
} );

/**
 * @private
 * 组件
 */
var component = {};

/**
 * 实体列表
 */
var entity = {},
/* 用于标识实体id */
GUID = 1;

/**
 * event handle
 */
var eventHandle = {};



ny.extend('g', {
	addComponent: function( e ){
		var c = arguments[ 1 ],
		cType = ny.util.getType( c );
		if( ny.util.getType( e ) == 'Object' && cType == 'String' || cType == 'Array' ){
			if( cType == 'String' ){
				c = [ c ];
			}
			var i, j, com;
			for( i = 0; c[ i ]; i++ ){
				if( com = component[ c[ i ] ] ){
					com.init.call( e );
					for( j in com ){
						if( j != 'init' ){
							e[ j ] = com[ j ];
						}
					}
				}
			}
		}
	},
	
	getGuid: function(){
		return ++GUID;
	},
	
	getEntityById: function( id ){
		return entity[ id ];
	},
	
	/**
	 * 用于查找所有具有指定组件的实体对象
	 */
	getEntity: function( selecter ){
		var name, i, j, eList = [];
		for( i = 0; arguments[ i ]; i++ ){
			name = arguments[ i ];
			if( component[ name ] ){
				for( j in entity ){
					if( entity[ j ].hasComponent( name ) ){
						eList.push( entity[ j ] );
					}
				}
			}
		}
		return eList;
	},
	
	/**
	 * 触发事件
	 * @param {String} 事件名称
	 * @param {Array|object} 实体
	 */
	trigger: function( name, eList ){
		if( name in eventHandle ){
			var handle = eventHandle[ name ];
			if( eList ){
				if( ny.util.getType( eList ) == 'Object' ){
					eList = [ eList ];
				}
				else if( ny.util.getType( eList ) != 'Array' ){
					return;
				}
				
				var i, eId, j;
				for( i = 0; eList[ i ]; i++ ){
					eId = eList[ i ]._id;
					if( eId in handle ){
						for( j = 0; handle[ eId ][ j ]; j++ ){
							handle[ eId ][ j ].call( eList[ i ] );
						}
					}
				}
			}
			else {
				var eId, j;
				for( eId in handle ){
					for( j = 0; handle[ eId ][ j ]; j++ ){
						handle[ eId ][ j ].call( entity[ eId ] );
					}
				}
			}
			
		}
	}
} );
	
/**
 * 用于游戏帧的绘制
 */
ny.g.drawManager = ( function(){

var setIntervalId = null,
fps = 50;

return {
	/**
	 * 绘制所有具有绘制特性的实体
	 * DOM（并且发生改变的对象） 或者 canvas 并且可见的对象
	 */
	draw: function(){
		// 先更新所有的dom对象
		var eList = ny.g.getEntity( 'DOM' ), i, context;
		for( i = 0; eList[ i ]; i++ ){
			if( eList[ i ].update ){
				eList[ i ].draw();
				eList[ i ].update = false;
			}
		}
		
		// 更新所有的canvas对象
		eList = ny.g.getEntity( 'canvas' ), context;
		for( i = 0; eList[ i ]; i++ ){
			eList[ i ].draw();
		}
	},
	
	isPlaying: false,
	
	play: function(){
		if( !this.isPlaying ){
			setIntervalId = setInterval( this.loop, parseInt( 1000 / fps ) );
		}
	},
	
	/**
	 * 画面更新主循环
	 */
	loop: function(){
		if( $n.g.drawManager.isPlaying ){
			$n.g.trigger('enterFrame');
		}
		else {
			clearInterval( setIntervalId );
		}
	}
};

} )();

/**
 * 实体构造函数
 */
ny.g.e = (function( ){

var _entity = function(){
	this.id = ny.g.getGuid();
}
	var id = ny.g.getGuid(),
	newEntity = {
		_id: id
	};
	entity[ id ] = newEntity;
	ny.g.addComponent( newEntity, comArr ); 
	return newEntity;
})()

})( $n );