app.js

$n.appController( 'jsGameController', {
	/**
	 * Ӧ�ó������������������Ϊ controller
	 */
	 
	// ����Ӧ��
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