/**
 * 战斗场景
 */

Crafty.scene("fight", function(){
		
	isoMap = Crafty.e( 'isometricMap' )
	.isometricMapSetup( {
		grass: {
			normal: 'grass', hover: 'grassHover', unavaliable: 'grassUnavaliable'
		},
		stone: {
			normal: 'stone', hover: 'stoneHover', unavaliable: 'stoneUnavaliable'
		}
	})
	.bindGrids( 'click', function( e ){
		//Crafty.scene("res");
		if( e.button == 2 ){
			this.unavaliableGrid();
		}
		if( e.button == 0 ){
			console.log('map alpha ' + this.attr('alpha') );
			if( playerC._curPlayer && this.isGridAvaliable() ){
				if( playerC._curPlayer.curMapGrid ){
					playerC._curPlayer.curMapGrid.releaseGrid();
				}
				var des = this.getGridCenterCoor();
				//playerC .player.move( des.x, des.y );
				playerC.doPlayerAction( this._isoMapCoor.x, this._isoMapCoor.y );
				this.occupyGrid( playerC._curPlayer );
				playerC._curPlayer.curMapGrid = this;
			}
			console.log('map coor x = ' + this._isoMapCoor.x + ' y = ' + this._isoMapCoor.y );
			var mapCoor = isoMap.getGridCoor( this._isoMapCoor.x, this._isoMapCoor.y );
			console.log('map z = ' + this.attr('z'));
			console.log('map coor x = ' + this._gridCenterCoor.x + ' y = ' + this._gridCenterCoor.y );
		}
	});
	
	
	// 创建障碍物
	Crafty.e('obstacle')
	.obstacleSetup('house1', [ 118, 353 ], 2, 3, [ [0, 101], [201, 0], [316, 59 ], [314, 256], [118, 353 ], [1, 294 ] ] )
	.setToMap( isoMap, 7, 3 );
	Crafty.e('obstacle')
	.obstacleSetup('house1', [ 118, 353 ], 2, 3, [ [0, 101], [201, 0], [316, 59 ], [314, 256], [118, 353 ], [1, 294 ] ] )
	.setToMap( isoMap, 1, 9);
	Crafty.e('obstacle')
	.obstacleSetup('house2', [ 252, 385 ], 4, 2, [ [0, 58], [115, 0], [355, 121 ], [354, 317], [239, 373 ], [0, 257 ] ] )
	.setToMap( isoMap, 14, 4).attr('z', 16);
	Crafty.e('obstacle')
	.obstacleSetup('house3', [ 122, 370 ], 2, 2, [ [0, 310], [35,43], [123,0 ], [209,47], [244,310 ], [122,370 ] ] )
	.setToMap( isoMap, 4, 14);
	Crafty.e('obstacle')
	.obstacleSetup('house2', [ 252, 385 ], 4, 2, [ [0, 58], [115, 0], [355, 121 ], [354, 317], [239, 373 ], [0, 257 ] ] )
	.setToMap( isoMap, 4, 20);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 6, 14);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 15, 5);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 5, 15);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 6, 16);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 7, 19);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 9, 19);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 16, 16);
	Crafty.e('obstacle')
	.obstacleSetup('tree1', [ 60, 169 ], 1, 1, [ [0, 56], [52, 0], [117, 47 ], [68, 102], [81, 132 ], [61, 145 ], [40, 130 ], [56, 100 ] ] )
	.setToMap( isoMap, 17, 19);
	Crafty.e('obstacle')
	.obstacleSetup('tree2', [ 54, 189 ], 1, 1, [ [0, 67], [43, 0], [103, 69 ], [61, 117], [74, 150 ], [55, 162 ], [33, 145 ], [49, 119 ] ] )
	.setToMap( isoMap, 5, 17);
	Crafty.e('obstacle')
	.obstacleSetup('tree2', [ 54, 189 ], 1, 1, [ [0, 67], [43, 0], [103, 69 ], [61, 117], [74, 150 ], [55, 162 ], [33, 145 ], [49, 119 ] ] )
	.setToMap( isoMap, 10, 18);
	Crafty.e('obstacle')
	.obstacleSetup('tree2', [ 54, 189 ], 1, 1, [ [0, 67], [43, 0], [103, 69 ], [61, 117], [74, 150 ], [55, 162 ], [33, 145 ], [49, 119 ] ] )
	.setToMap( isoMap, 16, 4);
	Crafty.e('obstacle')
	.obstacleSetup('tree2', [ 54, 189 ], 1, 1, [ [0, 67], [43, 0], [103, 69 ], [61, 117], [74, 150 ], [55, 162 ], [33, 145 ], [49, 119 ] ] )
	.setToMap( isoMap, 6, 18);
	Crafty.e('obstacle')
	.obstacleSetup('tree2', [ 54, 189 ], 1, 1, [ [0, 67], [43, 0], [103, 69 ], [61, 117], [74, 150 ], [55, 162 ], [33, 145 ], [49, 119 ] ] )
	.setToMap( isoMap, 8, 20);
	Crafty.e('obstacle')
	.obstacleSetup('tree2', [ 54, 189 ], 1, 1, [ [0, 67], [43, 0], [103, 69 ], [61, 117], [74, 150 ], [55, 162 ], [33, 145 ], [49, 119 ] ] )
	.setToMap( isoMap, 17, 15);
	
	
	
	// 创建角色控制器
	var playerC = Crafty.e('playerController');
	
	var m1 = Crafty.e('2D, Canvas, controls, fighter, playerHealthBar, Mouse, attrSprite');
	m1.playerGridWalkSetup( 7, 5, isoMap )
	.setFootCoor( 382, 177 )
	.playerWalkSetup( 'M1' )._mobility = 2;
	var f1 = Crafty.e('2D, Canvas, controls, fighter, playerHealthBar, Mouse');
	f1.playerGridWalkSetup( 13, 7, isoMap )
	.setFootCoor( 766, 241 )
	.playerWalkSetup( 'F1' )._mobility = 3;
	var b1 = Crafty.e('2D, Canvas, controls, fighter, playerHealthBar, Mouse');
	b1.playerGridWalkSetup( 12, 14, isoMap )
	.setFootCoor( 702, 465 )
	.playerWalkSetup( 'B1' )._mobility = 3;
	var b2 = Crafty.e('2D, Canvas, controls, fighter, playerHealthBar, Mouse');
	b2.playerGridWalkSetup( 14, 14, isoMap )
	.setFootCoor( 830, 465 )
	.playerWalkSetup( 'B2' )._mobility = 3;
	
	playerC.setPlayerQueue([ m1, f1, b1, b2 ])
	.bind('playerActived', function(){
		// 使前一个player停止走动
		if( this._previousPlayer ){
			this._previousPlayer.stopWalk();
		}
		this._curPlayer.walk();
	})
	.bind('playerInactived', function(){
		
	})
	.controllerLaunch();
	
	
	Crafty('playerWalk').each(function(){
		this.attr( { w: 70, h: 124, z: 99 } )
		.bind('keydown', function(e) {
			// If keys are down, set the direction
			if (e.keyCode === Crafty.keys.RIGHT_ARROW) this.setDir( 2 );
			if (e.keyCode === Crafty.keys.LEFT_ARROW) this.setDir( 1 );
			if (e.keyCode === Crafty.keys.UP_ARROW) this.setDir( 3 );
			if (e.keyCode === Crafty.keys.DOWN_ARROW) this.setDir( 0 );

			//this.preventTypeaheadFind(e);
		}).bind( 'click', function(e){
			isoMap.forEachGrid(function(){
					// this.avaliableGrid();
			});
			if( e.button == 2 ){
				/*
				isoMap.forEachGrid(function(){
					this.avaliableGrid();
				});
				*/
				var map = this.getAvaliavleMap(), grid;
				for( var i = 0; map[ i ]; i++ ){
					grid = isoMap.getGrid( map[ i ].x, map[ i ].y );
					grid.setGridSprite('hover');
				}
			}
		}).bind('click', function( e ){
			/*
			player2.flashSprite('ballOne', function(){ console.log('ball one finished!') } )
			.flashSprite('ballTwo', function(){ console.log('ball two finished!') })
			.flashSprite('ballOne', function(){ console.log('ball three finished!') } ); */
			var player = playerC._curPlayer; 
			if( e.button == 2 ){
				if( player == this ){
					menu.attr({
						x: e.clientX,
						y: e.clientY
					});
					menu.showMenu();
				}
			}
			console.log('player z = ' + this.attr('z') );
			if( e.button == 0 ){
				
				if( player ){
					
					if( playerC.doPlayerAction( this ) ){
						playerC.nextPlayerTurn();
					}
				}
			}
			
		});
	});
	
	Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
		
		if(e.button == 0) {
			/*
			menu.attr({
				x: e.clientX,
				y: e.clientY
			});
			*/
			menu.hideMenu();
		}
		
	});
	
	var menu = Crafty.e('menu').hideMenu()
	.menuSetup({
		攻击: function(){ 
			playerC.setPlayerAction('attack');
			menu.hideMenu();
		},
		移动: function(){ 
			playerC.setPlayerAction('gridMove');
			menu.hideMenu();
		}
	}, 'myMenu' ); 
	
	// 设置drama 角色
	var charM1 = Crafty.e('dramaChar')
	.dramaCharSetup({
		depressed: 'm1depressed',
		normal: 'm1normal',
		serious: 'm1serious',
		shy: 'm1shy',
		smile: 'm1smile',
		surprised: 'm1surprised'
	});
	
	var charF1 = Crafty.e('dramaChar')
	.dramaCharSetup({
		normal: 'f1normal',
		sad: 'f1sad',
		shy: 'f1shy',
		smile: 'f1smile',
		surprised: 'f1surprised'
	});
	
	var charB1 = Crafty.e('dramaChar')
	.dramaCharSetup({
		depressed: 'b1depressed',
		angry: 'b1angry',
		smile: 'b1smile'
	});
	
	var charB2 = Crafty.e('dramaChar')
	.dramaCharSetup({
		normal: 'b2normal'
	});
	
	var drama = Crafty.e('drama' )
	.dramaSetup({
		安东: charM1,
		夏尔蒂: charF1,
		维纶骑士: charB1,
		维纶军官: charB2
	}, Crafty.drama('beforeFight' ) )
	.onDramaBegin( function(){ console.log('drama begin!'); } )
	.onDramaFinished( function(){ console.log('drama end!'); } )
	.playDrama(); 
	
	/*
	var story = Crafty.e('story')
	.storySetup(story1)
	.playStory();   */

});