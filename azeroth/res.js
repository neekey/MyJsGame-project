
/*===============================================
	游戏主菜单
================================================*/
/**
 * 主背景
 */
Crafty.sprite("../image/mainMenu/bg.jpg", {
	mainMenuBg: [62,84,900, 600]
});

/*===============================================
	战斗场景
================================================*/

/**
 * 设置人物角色图片
 */
Crafty.characterSprite( 'neekeyWalk', "../image/char/1.png" );
Crafty.characterSprite( 'neekeyWalk2', "../image/char/3.png" );
Crafty.characterSprite( 'neekeyWalk3', "../image/char/4.png" );

/**
 * 设置地图格子图片
 */
Crafty.sprite(128, "../image/map/map2.png", {
	grass: [0,0], grassHover: [0,2],grassUnavaliable: [0,3],
	stone: [1,0], stoneHover: [1, 2], stoneUnavaliable: [1, 3]
});

/**
 * 设置建筑障碍物
 */
Crafty.sprite("../image/map/house.png", {
	house: [0,0, 358, 375]
});

/**
 * 设置一次性动画（攻击效果等）
 */
Crafty.flashSprite( 'ballOne', '../image/flash/ball.png', [ [0,0,50,50], [50,0,50,50], [0,50,50,50],[50,50,50,50] ] );
Crafty.flashSprite( 'ballTwo', '../image/flash/ball2.png', [ [0,0,50,50], [50,0,50,50], [0,50,50,50],[50,50,50,50] ] );

// 加载所有的资源
Crafty.scene("res", function() {
	// 预先加载资源
	Crafty.load([
		"../image/char/1.png", 
		"../image/map/map2.png", 
		"../image/char/3.png", 
		"../image/char/4.png", 
		"../image/flash/ball.png", 
		'../image/flash/ball2.png',
		'../image/map/house.png'
	], function() {
		Crafty.scene("mainMenu"); 
	});
	
	var loadText = Crafty.e('2D, DOM, Text, Color')
	.attr({ x: 350, y: 200, z: 99 })
	.text('游戏加载中...'); 
});