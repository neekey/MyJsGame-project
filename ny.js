/**
 * game framework - ny.js
 * @author Neekey<ni184775761@gmail.com>
 */
 
(function(){

/**
 * Base namespace for the framework.
 */
this.$n = { 
	_$n: this.$n,
	
	/**
	 * 扩展方法
	 * @param {Object}
	 */
	extend: function(){
		if( typeof arguments[ 0 ] == 'string' && arguments[ 1 ] ){
			if( !this[ arguments[ 0 ] ] ){
				this[ arguments[ 0 ] ] = arguments[ 1 ];
			}
		}
		else if( arguments[ 0 ] && arguments[ 0 ].constructor == Object ){
			var i;
			for( i in arguments[ 0 ] ){
				if( !this[ i ] ){
					this[ i ] = arguments[ 0 ][ i ];
				}
			}
		}
	},
	
	/**
	 * 框架的配置信息
	 */
	config: {},
	
	/**
	 * 工具集
	 */
	util: {},
	
	/**
	 * 资源加载器
	 */
	resource: {},
	
	/**
	 * 控制器
	 */
	controller: {},
	
	/**
	 * 应用程序控制器
	 */
	appController: {},
	
	/**
	 * 舞台控制器 可以去掉，因为毕竟游戏一般只有一个stage
	 */
	stageController: {},

	/**
	 * 场景控制器
	 */
	sceneController: {},
	
	/**
	 * 视图
	 */
	view: {},

	/**
	 * 事件处理
	 */
	event: {},
	
	/**
	 * 错误处理
	 */
	error: {}
}



	










})()