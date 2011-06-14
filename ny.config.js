
( function( c, util ){

util.addMember( c, {
	
	/**
	 * 获取指定资源的绝对路径
	 * 例如：
	 * 先转化为绝对路径：  appController: [ 'neekey' ] => http://neekey.net/appController/neekey
	 * 根据需要添加后最 ： http://neekey.net/appController/neekey.js
	 *		注意，图片资源都是自带后缀的，所以不用添加后缀
	 * 然后添加别名：http://neekey.net/appController/neekey.js neekey
	 * 		注意，一般图片资源的别名是重新指定的，如这样的写法制定资源： image: [ 'a.png img' ]，
	 *		所以需要额外操作获取别名
	 * 
	 * @param {String} type 资源的类型 如 appController
	 * @param {String} name 资源的名称
	 */
	getUrl: function( type, name ){
		if( ! ( type in config.path ) ){
			return false;
		}
		else {
			// 若name中含有空格，则是图片之类的'a.png aImg',具有别名
			// 若不含空格，则本身就是别名
			var alias = name;
			if( /\s+/.test( name ) ){
				alias = name.split( /\s+/ )[ 1 ];
				
			}
			var url = config.path.APP_BATH + config.path[ type ] + name, suffix;
			if( suffix = this.getSuffix( type ) ){
				url += ( '.' + suffix );
			}
			// 添加别名
			url += ( ' ' + alias );
			return url;
		}
	},
	
	/**
	 * 根据资源类型获取文件后缀
	 * @param {String} type
	 * @return {String}
	 */
	getSuffix: function( type ){
		var s, i;
		for( s in config.resourceSuffix ){
			for( i = 0; config.resourceSuffix[ s ][ i ]; i++ ){
				if( type == config.resourceSuffix[ s ][ i ] ){
					return s;
				}
			}
		}
	}
});

/**
 * 配置数据
 * @private
 */
var config = {
	
	/**
	 * base path
	 */
	path: {
		APP_BATH: 'http://localhost/MyPHP/jsgame_01/',
		appController: 'appController/',
		stageController: 'stageController/',
		sceneController: 'sceneController/',
		image: 'image/',
		view: 'view/'
	},
	
	/**
	 * 资源与后缀的对应表，若资源类型不再该表中，则不需要添加后缀，比如image（因为一般会指定图像后缀）
	 */
	resourceSuffix: {
		js: [ 'appController', 'stageController', 'sceneController' ],
		html: [ 'view' ]
	}
}

})( $n.config, $n.util );