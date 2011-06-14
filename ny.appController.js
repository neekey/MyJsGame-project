/**
 @TODO
	对sceneController 添加onActive和onBlur事件
 */
( function( util, res, intfs, e, c, v ){

/**
 * 定义接口 controller
 */
intfs( 'controller', {
	fn: [
		/**
		 * 用来初始化控制器的函数
		 * @param {All} argsFromLauncher
		 */
		'setup',
		
		/* 控制器主函数 */
		'main'
	],
	attr: [
		/* 控制器名称 */
		'name'
	]
} );

/**
 * @constructor controller 基类，构造函数
 * @param {Object} obj
 * - require [optional] {Object} 这个参数和 $n.resource.load 所需参数一致
 * - setup {Function}
 * - main {Function}
 * @param {String} name
 */
var controller = function( obj, name ){
	
	// 检查是否实现了 controller要求的接口
	intfs.ensure( obj, 'controller' );
	var i;
	for( i in obj ){
		this[ i ] = obj[ i ];
	}
};

/**
 * 序控制器 基类 原型
 */
util.addMember( controller.prototype, {
	
	/**
	 * 用于启动控制器
	 * @param {All} argsFromLauncher 传递给控制器的参数
	 */
	launch: function( argsFromLauncher ){
		e.log( '控制器[ ' + this.name + ' ] 开始启动!', 'info' );
		// 若需要加载资源
		if( this.require ){
			e.log('控制器[ ' + this.name + ' ] 开始分析依赖资源并准备进行资源加载!', 'info' );
			// 分析require,转化为绝对url数组
			var _require = handleRequire( this.require ),
			_this = this;
			// 加载资源
			res.load( {
				url: _require,
				callback: function( m, argsFromLauncher ){
					// 对资源进行预处理
					e.log( '( 资源加载完毕 )开始进行资源预处理!', 'info' );
					var type, i, name;
					for( type in _this.require ){
						for( i = 0; name = _this.require[ type ][ i ]; i++ ){
							// 若name中含有空格，则是图片之类的'a.png aImg',具有别名
							if( /\s+/.test( name ) ){
								name = name.split( /\s+/ )[ 1 ];
							}
							res.resourceHandle( type, m[ name ].data, name );
						}
					}
					// 开始配置控制器
					e.log( '( 资源预处理完毕 )开始进行控制器配置!', 'info' );
					_this.setup.apply( _this, arguments );
					e.log( '控制器开始运行!', 'info' );
					_this.main();
				}
			} );
		}
		else {
			this.setup();
			this.main();
		}
	}
} );

/**
 * @constructor appController 的构造函数
 * @extend controller
 * @param {Object} obj
 * @param {String} name
 */
var appController = util.extend( controller, function( obj, name ){
	// 调用父类构造函数
	controller.apply( this, arguments );
} );

/**
 * 应用程序控制器原型
 */
util.addMember( appController.prototype, {
	
	/**
	 * 运行scene
	 * 若控制器已经运行，则该函数不做任何事
	 * @param {String} name 场景控制器名称
	 * @param {All} args 用于传递给控制器的参数
	 */
	launchScene: function( name, args ){
		if( !this.getScene( name ) ){
			var _this = this;
			c.launchController( 'scene', name, this, args, function( s ){
				_this.addScene( s );
			});
		}
		else{
			e.log( '场景控制器 [ ' + name + ' ] 已经被启动，当前启动操作中断！', 'warnning' ); 
		}
	},
	
	/**
	 * 添加场景
	 * 
	 */
	addScene: function( s ){
		if( !this.sceneList ){
			this.sceneList = {};
		}
		if( s instanceof sceneController ){
			this.sceneList[ s.name ] = s;
		}
	},
	
	/**
	 * 获取指定名称的场景
	 * @param {String} name 
	 */
	getScene: function( name ){
		if( this.sceneList && this.sceneList[ name ] ){
			return this.sceneList[ name ];
		}
	},
	
	/**
	 * 指定场景运行
	 */
	activeScene: function( name, args ){
		var s;
		if( s = this.getScene( name ) ){
			s.active( args );
		}
		else{
			e.log( '场景控制器 [ ' + name + ' ] 还未运行，无法执行激活操作！', 'warnning' ); 
		}
	},
	
	/**
	 * 使指定场景处于非激活状态
	 */
	inactiveScene: function( name, args ){
		var s ;
		if( s = this.getScene( name ) ){
			s.inactive( args );
		}
		else{
			e.info( '场景控制器 [ ' + name + ' ] 还未运行，无法执行停止操作！', 'warnning' ); 
		}
	}
});

/**
 * 定义接口 sceneController
 */
intfs( 'sceneController', {
	fn: [
		/**
		 * 当场景被激活时执行的方法 
		 * @param {All} args 由appController传递的参数
		 */
		'onActive',
		
		/** 当场景被取消激活状态时执行的方法 
		 * @param {All} args 由appController传递的参数
		 */
		'onInactive'
	]
} );

/**
 * @constructor sceneController 的构造函数
 * @extend controller
 * @param {Object} obj
 * @param {String} name
 */
var sceneController = util.extend( controller, function( obj, name ){
	// 检查是否实现了 sceneController要求的接口
	intfs.ensure( obj, 'sceneController' );
	// 调用父类构造函数
	controller.apply( this, arguments );
	
} );

/**
 * 应用程序控制器原型
 */
util.addMember( sceneController.prototype, {

	/**
	 * @type {Boolean} 用于标识当前场景是否处于激活状态
	 * @private
	 */
	_actived: false,
	
	/**
	 * 激活场景
	 */
	active: function(){
		if( !this._actived ){
			this._actived = true;
			this.onActive.apply( this, arguments );
		}
	},
	
	/**
	 * 停止场景
	 */
	inactive: function(){
		if( this._actived ){
			this._actived = false;
			this.onInactive.apply( this, arguments );
		}
	},
	
	/**
	 * 返回场景是否激活
	 */
	isActived: function(){
		return this._actived;
	},
	
	/**
	 * 用于启动或者激活其他场景
	 * @param {String} name
	 * @param {All} 用于传递给场景的参数
	 */
	pushScene: function( name, args ){
		// 判断场景是否存在
		var appC = this.launcher;
		
		if( appC.getScene( name ) ){
			appC.activeScene( name, args );
		}
		else {
			appC.launchScene( name, args );
		}
	}

});

/**
 * 用于构造一个新的 sceneController实例
 */
$n.appController = function( obj, name ){
	
	var newController = new appController( obj, name );
	c.addController( 'app', newController );
};

/**
 * 用于构造一个新的 sceneController实例
 */
$n.sceneController = function( obj, name ){
	
	var newController = new sceneController( obj, name );
	c.addController( 'scene', newController );
};


/**
 * 将 appController 的require 转化为资源绝对url数组
 * @param {Object} r
 * @returns {Array}
 */
var handleRequire = function( r ){

	if( util.getType( r ) == 'Object' ){
	
		var type, i, url, reqArr = [];
		
		for( type in r ){
		
			for( i = 0; r[ type ][ i ]; i++ ){
				if( url = res.getUrl( type, r[ type ][ i ] ) ){
					reqArr.push( url );
				}
			}
		}
		return reqArr;
	}
	else {
		e.exit('应用程序初始化失败！资源需求设置不正确！');
	}
};

} )( $n.util, $n.resource, $n.interface, $n.error , $n.controller, $n.view )