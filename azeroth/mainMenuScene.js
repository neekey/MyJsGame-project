/**
 * 战斗场景
 */

Crafty.scene("mainMenu", function(){
	Crafty.audio.play('mainMenuBg');
	// 设置背景
	var bg = Crafty.e('2D, Canvas, mainMenuBg').
	attr({ x: 0, y: 0, z: 2});
	// 设置菜单 开始游戏
	var menuPlay = Crafty.e('2D, DOM, mainMenuPlay, Mouse')
	.attr({ x: 320, y: 300, z: 3, w: 270, h: 76 })
	.bind('click', function( e ){
		if( e.button == 0 ){
			Crafty.scene('fight');
			//Crafty.scene('openStroyScene');
		}
	})
	._element.id = 'beginPlay';
	// 设置餐单，开始游戏
	var menuAboutUs = Crafty.e('2D, DOM, mainMenuAboutUs, Mouse')
	.attr({ x: 320, y: 400, z: 3, w: 270, h: 76 })
	.bind('click', function( e ){
		if( e.button == 0 ){
			
			// Crafty.scene('fight');
			Crafty.scene('openStroyScene');
		}
	})
	._element.id = 'aboutUs';
	//.showMenu();
});