/**
 * 战斗场景
 */

Crafty.scene("mainMenu", function(){
	// 设置背景
	var bg = Crafty.e('2D, Canvas, mainMenuBg').
	attr({ x: 0, y: 0, z: 2});
	var menu = Crafty.e('menu').hideMenu()
	.menuSetup({
		开始游戏: function(){ 
			Crafty.scene('fight');
		},
		载入游戏: function(){ 
			console.log('载入游戏 clicked!');
		},
		关于我们: function(){
			console.log('关于我们 clicked!');
		}
	}, 'myMenu' )
	.attr({ x: 300, y: 300, z: 3 })
	.showMenu();
});