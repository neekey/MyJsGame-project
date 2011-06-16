/**
 * loading changjing 
 */
Crafty.scene("loading", function() {
	var loadText = Crafty.e('2D, DOM, Text, Color')
	.attr({ x: 350, y: 200, z: 99 })
	.text('游戏加载中...');
})