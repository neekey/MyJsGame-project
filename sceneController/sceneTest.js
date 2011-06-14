$n.sceneController( {
	setup: function( m, args ){
		this.resImg = m.neekeyImg;
		
	},
	main: function(){
		alert('launcher name is : ' + this.launcher.name );
		
		var v = $n.view.getView('neekey');
		this.dom = $n.util.html( v( {
			id: 'neekeyTemplate',
			profile_image_url: 'http://neekey.net',
			from_user: 'neekey',
			text: 'someThing'
		}) );
		
		this.active();
		var _this =this;
		$n.util.getDom('#scene2').addEventListener( 'click', function(){
			_this.pushScene('sceneTest2');
			_this.inactive();
		});
	},
	require: {
		image: ['img.png neekeyImg'],
		view: ['neekey']
	},
	name: 'sceneTest',
	onActive: function(){
		$n.util.domHandle( this.dom, 'append', document.body );
	},
	onInactive: function(){
		$n.util.domHandle( this.dom, 'remove' );
	}
});