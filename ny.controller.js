/**
 * 定义控制器基类方法
 * 以及与控制器操作的相关方法
 */
( function( util, res, intfs, e, c ) {

/**
 * 添加静态方法
 */
util.addMember( c, {
	
	/**
	 * 根据名称获得控制器
	 * @param {String} type 控制器类别
	 * @param {String} name 控制器名称
	 */
	getController: function( type, name ){
		if( controllerList[ type ] ){
			return controllerList[ type ][ name ];
		}
	},
	
	/**
	 * 向controllerList 中添加新的控制器实例
	 * @param {String} type 控制器类型
	 * @param {String} c 控制器实例
	 */
	addController: function( type, c ){
		// 检查参数 已经 查看c是否已经实现 'controller'接口
		if( type in controllerList && intfs.ensure( c, 'controller' ) ){
			controllerList[ type ][ c.name ] = c;
		}
	},
	
	/**
	 * 根据名称运行控制器
	 * @param {String} type 控制器类别
	 * @param {String} name app控制器名称
	 * @param {String} launcher 启动该控制器的 控制器
	 * @param {all} argsFromLauncher 传递给控制器的参数
	 * @param {Function} callback 回调函数，将获得launch的控制器作为参数
	 */
	launchController: function( type, name, launcher, argsFromLauncher, callback ){
		e.log( '开始尝试加载控制器 [ ' + type + ' ' + name + ' ] ', 'info' );
		var _this = this;
		res.load({
			url: [ /* 获得控制uri */res.getUrl( type + 'Controller', name ) ],
			callback: function(){
				var c = _this.getController( type, name );
				// 调用回调
				if( callback ){
					callback( c );
				}
				if( c ){
					e.log( '控制器 [ ' + type + ' ' + name + ' ] 加载完毕', 'info' );
					// 为控制器添加 启动他的控制器
					c[ 'launcher' ] = launcher;
					c.launch( argsFromLauncher );
				}
				// 若指定名称的控制器不存在
				else {
					e.exit( '应用程序控制器 [ ' + type + ' ' + name + ' ] 加载失败!' );
				}
			}
		});
	}
});

/**
 * 用于存放所有实例化的控制器
 * @private
 */
var controllerList = {
	app: {},
	stage: {},
	scene: {}
};

} )( $n.util, $n.resource, $n.interface, $n.error , $n.controller );