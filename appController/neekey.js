// appController test

$n.appController( {
	setup: function( m ){
		this.resImg = m.neekeyImg;
	},
	main: function(){
		var _this = this;
		alert('app[ neekey ] runs! img width = ' + this.resImg.data.width );
		this.launchScene('sceneTest');
		
		this.activeDom = $n.util.html( $n.view.getView('sceneActiveTest')() );
		$n.util.domHandle( this.activeDom, 'append', document.body );
		$n.util.getDom( '#active' ).addEventListener('click', function(){
			_this.activeScene('sceneTest');
		});
		$n.util.getDom( '#inactive' ).addEventListener('click', function(){
			_this.inactiveScene('sceneTest');
		});
	},
	require: {
		image: ['img.png neekeyImg'],
		view: ['neekey', 'sceneActiveTest' ]
	},
	name: 'neekey'
});