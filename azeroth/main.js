window.onload = function() {

// 初始化
Crafty.init(50,  900, 600);
Crafty.canvas();



// 执行loading场景
Crafty.scene("res");
  
	Crafty.scene("main", function(){
		
		var isoMap = Crafty.e( 'isometricMap' )
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
		var house = Crafty.e('obstacle')
		.obstacleSetup('house', [ 120, 375 ], 2, 4, [ [0, 183], [293, 35], [358, 122 ], [358, 255], [120, 375 ], [0, 316 ] ] )
		.setToMap( isoMap, 6, 14 );
		console.log(house.attr('w') + '，' + house.attr('h') + '，' + house.attr('z') ); 
		
		
		// 创建角色控制器
		var playerC = Crafty.e('playerController');
		
		var player = Crafty.e('2D, Canvas, controls, fighter, playerHealthBar, Mouse');
		player.playerGridWalkSetup( 8, 4, isoMap )
		.setFootCoor( 576, 160 )
		.playerWalkSetup( 'neekeyWalk' )._mobility = 2;
		var player3 = Crafty.e('2D, Canvas, controls, fighter, playerHealthBar, Mouse');
		player3.playerGridWalkSetup( 4, 4, isoMap )
		.setFootCoor( 320, 160 )
		.playerWalkSetup( 'neekeyWalk' )._mobility = 3;
		var player2 = Crafty.e('2D, Canvas, controls, ballOne, ballTwo, Mouse');
		player2.attr({w: 50, h: 50, x: 500, h: 50, z: 1000 });
		
		playerC.setPlayerQueue([ player, player3 ])
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
				player2.flashSprite('ballOne', function(){ console.log('ball one finished!') } )
				.flashSprite('ballTwo', function(){ console.log('ball two finished!') })
				.flashSprite('ballOne', function(){ console.log('ball three finished!') } );
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
	});
	 
};