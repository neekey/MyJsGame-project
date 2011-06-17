/**
 * this is for menu test
 */
window.onload = function() {
	
	// ��ʼ��Crafty
	Crafty.init();
	Crafty.canvas();
	
	// loading����
	Crafty.scene("loading", function() {
		// Ԥ�ȼ�����Դ
		Crafty.load([
			"../image/char/1.png", 
			"../image/map/map2.png", 
			"../image/char/3.png", 
			"../image/char/4.png", 
			"../image/flash/ball.png", 
			'../image/flash/ball2.png' 
		], function() {
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});
	});

	// ִ��loading����
	Crafty.scene("loading");
	
	Crafty.scene("main", function(){
		
		var menu = Crafty.e('menu')
		.menuSetup({
			menu1: function(){ console.log('1'); },
			menu2: {
				menu21: function(){ console.log('21'); },
				menu22: {
					menu221: function(){  console.log('221'); }
				},
				menu23: function(){ console.log('23'); }
			}
		}, 'myMenu' ); 
		
		
	});
};