

Crafty.scene("openStroyScene", function(){
	var story = Crafty.e('story')
	.storySetup( Crafty.story('background') )
	.onStoryFinished( function(){
		Crafty.scene('fight');
	})
	.playStory(); 
});