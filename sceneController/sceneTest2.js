$n.sceneController( {
	setup: function( m, args ){
		this.resImg = m.neekeyImg;
		
	},
	main: function(){
		
		var v = $n.view.getView('scene2');
		this.dom = $n.util.html( v( ) );
		this.active();
		
		var _this =this;
		$n.util.getDom('#scene1').addEventListener( 'click', function(){
			_this.pushScene('sceneTest');
			_this.inactive();
		});
	},
	require: {
		image: ['img.png neekeyImg'],
		view: ['scene2']
	},
	name: 'sceneTest2',
	onActive: function(){
		$n.util.domHandle( this.dom, 'append', document.body );
	},
	onInactive: function(){
		$n.util.domHandle( this.dom, 'remove' );
	}
});