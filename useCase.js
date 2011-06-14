app.js

$n.appController( 'jsGameController', {
	/**
	 * 应用程序控制器，其上下文为 controller
	 */
	 
	// 配置应用
	setup: function(){
		
	},
	
	require: [],
	
	onResourceLoaded: function(){
	},
	
	run: function(){
		stage = this.createStage({ name: 'stage' }, function(){
			stage.pushScene('myScene', args, function(){} );
		});
	},
	
	_stageList: {}
});