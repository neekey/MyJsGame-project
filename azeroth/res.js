/*===============================================
	音效
================================================*/
Crafty.audio.add('mainMenuBg', '../audio/mainMenu.ogg');

/*===============================================
	游戏主菜单
================================================*/
/**
 * 主背景
 */
Crafty.sprite("../image/mainMenu/bg.png", {
	mainMenuBg: [0, 0 ,900, 600]
});
Crafty.sprite("../image/mainMenu/play.png", {
	mainMenuPlay: [0, 0 ,270, 76]
});
Crafty.sprite("../image/mainMenu/aboutUs.png", {
	mainMenuAboutUs: [0, 0 ,270, 76]
});

/*===============================================
	战斗场景
================================================*/

/**
 * 设置人物角色图片
 */
Crafty.characterSprite( 'M1', "../image/char/m1.png" );
Crafty.characterSprite( 'F1', "../image/char/f1.png" );
Crafty.characterSprite( 'B1', "../image/char/b1.png" );
Crafty.characterSprite( 'B2', "../image/char/b2.png" );

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
Crafty.sprite("../image/fightScene/house1.png", {
	house1: [0,0, 317, 353]
});
Crafty.sprite("../image/fightScene/house2.png", {
	house2: [0,0, 357, 374]
});
Crafty.sprite("../image/fightScene/house3.png", {
	house3: [0,0, 245, 372]
});
Crafty.sprite("../image/fightScene/tree1.png", {
	tree1: [0,0, 118, 146]
});
Crafty.sprite("../image/fightScene/tree2.png", {
	tree2: [0,0, 104, 164]
});

/**
 * 设置一次性动画（攻击效果等）
 */
Crafty.flashSprite( 'ballOne', '../image/flash/ball.png', [ [0,0,50,50], [50,0,50,50], [0,50,50,50],[50,50,50,50] ] );
Crafty.flashSprite( 'ballTwo', '../image/flash/ball2.png', [ [0,0,50,50], [50,0,50,50], [0,50,50,50],[50,50,50,50] ] );

/*===============================================
	剧情
================================================*/

/**
 * 设置剧情人物
 */
 
// 男一号
Crafty.sprite("../image/drama/maleLead/depressed.png", {
	m1depressed: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/maleLead/normal.png", {
	m1normal: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/maleLead/serious.png", {
	m1serious: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/maleLead/shy.png", {
	m1shy: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/maleLead/smile.png", {
	m1smile: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/maleLead/surprised.png", {
	m1surprised: [0, 0, 323, 482 ]
});

// 男二号
Crafty.sprite("../image/drama/femaleLead/surprised.png", {
	f1surprised: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/femaleLead/normal.png", {
	f1normal: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/femaleLead/sad.png", {
	f1sad: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/femaleLead/shy.png", {
	f1shy: [0, 0, 323, 482 ]
});
Crafty.sprite("../image/drama/femaleLead/smile.png", {
	f1smile: [0, 0, 323, 482 ]
});

// 坏人(骑士)
Crafty.sprite("../image/drama/qishi/smile.png", {
	b1smile: [0, 0, 303, 493 ]
});
Crafty.sprite("../image/drama/qishi/angry.png", {
	b1angry: [0, 0, 303, 493 ]
});
Crafty.sprite("../image/drama/qishi/depressed.png", {
	b1depressed: [0, 0, 303, 493 ]
});

// 坏人（军官）
Crafty.sprite("../image/drama/junguan/normal.png", {
	b2normal: [0, 0, 323, 482 ]
});


// story bg
Crafty.sprite("../image/drama/bg/1.jpg", {
	storyBg1: [0, 0, 900, 600 ]
});
Crafty.sprite("../image/drama/bg/2.jpg", {
	storyBg2: [0, 0, 900, 600 ]
});
Crafty.sprite("../image/drama/bg/3.jpg", {
	storyBg3: [0, 0, 900, 600 ]
});


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