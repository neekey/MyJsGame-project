window.onload = function() {
	var gameController = {
		player: null
	};
var FPS = 30;
  // Start crafty
  Crafty.init(FPS, 900, 600);
  Crafty.canvas();

  // Turn the sprite map into usable components
  Crafty.sprite("image/char/1.png", {
	/* 前 */
	move00: [0,0,70,124], move01: [70,0,70,124], move02: [140,0,70,124], move03: [210,0,70,124],
	/* 左 */
	move10: [0,124,70,124], move11: [70,124,70,124], move12: [140,124,70,124], move13: [210,124,70,124],	
	/* 右 */
	move20: [0,248,70,124], move21: [70,248,70,124], move22: [140,248,70,124], move23: [210,248,70,124],
	/* 后 */
	move30: [0,372,70,124], move31: [70,372,70,124], move32: [140,372,70,124], move33: [210,372,70,124],
	/* 左下 */
	move40: [0,496,70,124], move41: [70,496,70,124], move42: [140,496,70,124], move43: [210,496,70,124],
	/* 右下 */
	move50: [0,620,70,124], move51: [70,620,70,124], move52: [140,620,70,124], move53: [210,620,70,124],
	/* 左上 */
	move60: [0,744,70,124], move61: [70,744,70,124], move62: [140,744,70,124], move63: [210,744,70,124],
	/* 右上 */
	move70: [0,868,70,124], move71: [70,868,70,124], move72: [140,868,70,124], move73: [210,868,70,124],
  }, 54);
  
  Crafty.sprite(128, "image/map/map.png", {
        grass: [0,0,1,1],
        stone: [1,0,1,1]
    });

  // The loading screen that will display while our assets load
  Crafty.scene("loading", function() {
    // Load takes an array of assets and a callback when complete
    Crafty.load(["image/char/1.png", "image/map/map.png" ], function() {
      Crafty.scene("main"); //when everything is loaded, run the main scene
    });
  });

  // Automatically play the loading scene
  Crafty.scene("loading");
  
	 Crafty.scene("main", function(){
		iso = Crafty.isometric.init(128);
		    var z = 0;
		    for(var i = 20; i >= 0; i--) {
			for(var y = 0; y < 20; y++) {
			    var which = Crafty.randRange(0,1);
			    var tile = Crafty.e("2D, Canvas, "+ (!which ? "grass" : "stone") +", Mouse")
			    .attr('z',i+1 * y+1).areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32]).bind("click", function(e) {
				//destroy on right click
				if(e.button === 2) this.destroy();
			    }).bind("mouseover", function() {
				if(this.has("grass")) {
				    this.sprite(0,1,1,1);
				} else {
				    this.sprite(1,1,1,1);
				}
			    }).bind("mouseout", function() {
				if(this.has("grass")) {
				    this.sprite(0,0,1,1);
				} else {
				    this.sprite(1,0,1,1);
				}
			    }).bind('click', function( e ){
				if(e.button === 0) {
					if( gameController.player ){
						gameController.player.move( this.x, this.y );
					}
				}
			    });
			    
			   iso.place(i,y,0, tile);
			}
		    }
		    
		    Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
			if(e.button > 1) return;
			var base = {x: e.clientX, y: e.clientY};

			function scroll(e) {
			    var dx = base.x - e.clientX,
				dy = base.y - e.clientY;
				base = {x: e.clientX, y: e.clientY};
			    Crafty.viewport.x -= dx;
			    Crafty.viewport.y -= dy;
			};

			Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
			Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
			    Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
			});
		    });
		    
		var player = Crafty.e('2D, Canvas, move00, controls, player, Mouse')
			.attr({w: 70, h: 124, z: 100000});
		player.walk();
		player.bind('keydown', function(e) {
			// If keys are down, set the direction
			if (e.keyCode === Crafty.keys.RIGHT_ARROW) this.setDir( 0 );
			if (e.keyCode === Crafty.keys.LEFT_ARROW) this.setDir( 1 );
			if (e.keyCode === Crafty.keys.UP_ARROW) this.setDir( 2 );
			if (e.keyCode === Crafty.keys.DOWN_ARROW) this.setDir( 3 );

			//this.preventTypeaheadFind(e);
		}).bind( 'mousedown', function(e){
			gameController.player = this;
		});
		
		
	 });
	 
	Crafty.c('player',{
		_curDir: 0,
		_curWalkFrame: 0,
		_isWalking: false,
		_walkOffset: 18,
		_walkOffsetFrame: 0,
		_isMoving: false,
		_moveOffset: 5,
		_curMoveFrame: 0,
		_curFootX: 0,
		_curFootY: 0,
		_DIR: {
			FRONT: 0,
			LEFT: 1,
			RIGHT: 2,
			BACK: 3,
			LEFT_FRONT: 4,
			RIGHT_FRONT: 5,
			LEFT_BACK: 6,
			RIGHT_BACK: 7
		},
		/* 速度 每秒钟移动的像素数 */
		_moveSpeed: 40,
		_moveDes: {
			x: 0,
			y: 0
		},
		
		move: function( x, y ){
			this._moveDes.x = x;
			this._moveDes.y = y;
			if( !this._isMoving ){
				this._isMoving = true;
				this.bind('enterframe', this.moveLoop);
			}
		},
		
		moveLoop: function(){
			if( this._isMoving && this._curFootX !== this._moveDes.x && this._curFootY !== this._moveDes.y ){
				if( this._curMoveFrame == this._moveOffset ){
					var stride = this.getMoveStride( this._moveDes.x, this._moveDes.y ),
					newFootX, newFootY;
					this.setDir( this.deceideDirection( this._moveDes.x, this._moveDes.y ) );
					
					if( Math.abs(this._moveDes.x - this._curFootX ) <= 5 ){
						newFootX = this._moveDes.x;
					}
					else {
						newFootX = parseInt( this._curFootX + stride.x );
					}
					if( Math.abs( this._moveDes.y - this._curFootY ) <= 5 ){
						newFootY = this._moveDes.y;
					}
					else {
						newFootY = parseInt( this._curFootY + stride.y );
					}
					this.setFootCoor( newFootX, newFootY );
					this._curMoveFrame = 0;
				}
				else {
					this._curMoveFrame++;
				}
				
			}
			else {
				this._isMoving = false;
				this.unbind('enterframe', this.moveLoop);
			}
		},
		
		/**
		 * 根据目标坐标，返回x和y坐标在当前帧的偏移量
		 */
		getMoveStride: function( x, y ){
			var distance = Math.sqrt( ( x - this._curFootX  ) * ( x - this._curFootX  ) + ( y - this._curFootY ) * ( y - this._curFootY ) ),
			stride = this._moveSpeed / ( FPS / this._moveOffset ),
			StrideX = ( stride * ( x - this._curFootX  ) / distance ),
			StrideY = ( stride * ( y - this._curFootY ) / distance );
			return { x: StrideX, y: StrideY };
		},
		
		setFootCoor: function( x, y ){
			this.x += ( x - this._curFootX );
			this.y += ( y - this._curFootY );
			this._curFootX = x;
			this._curFootY = y;
		},
		
		deceideDirection: function( x, y ){
			var footX = parseInt( this.x + ( this.w / 2 ) ),
			footY = parseInt( this.y + 104 ),
			disX = x - footX, disY = - ( y - footY ),
			tan, atan, angle, angleType, dir;
			// 计算角度
			tan = disY / disX;
			atan = Math.atan( tan );
			angle = 360 * atan / ( 2 * Math.PI );
			if( disY > 0 && angle < 0 ){
				angle = ( - angle + 90 );
			}
			else if( disY < 0 && angle < 0 ){
				angle = 360 + angle;
			}
			else if( disY < 0 && angle > 0 ){
				angle = 180 + angle;
			}
			angleType = parseInt( ( angle  + 22.5 ) / 45 );
			/* 判断方向
			0: right 1: rightBack 2: Back 3: leftBack 4: left
			5: leftFront 6: front 7: rightFront */
			switch( angleType ){
				case 0:	dir = this._DIR.RIGHT; break;
				case 1:	dir = this._DIR.RIGHT_BACK; break;
				case 2:	dir = this._DIR.BACK; break;
				case 3:	dir = this._DIR.LEFT_BACK; break;
				case 4:	dir = this._DIR.LEFT; break;
				case 5:	dir = this._DIR.LEFT_FRONT; break;
				case 6:	dir = this._DIR.FRONT; break;
				case 7:	dir = this._DIR.RIGHT_FRONT; break;
				case 8: 	dir = this._DIR.RIGHT; break;
				default:	break;
			}
			return dir;
		},
	
		init: function() {
			this._curFootX = parseInt( this.x + this.w / 2 );
			this._curFootY = parseInt( this.y + this.h - 10 );
			this.bind('enterframe', this.walkLoop);
		},
		
		setDir: function( dir ){
			if( dir >= 0 && dir <= 7 ){
				this._curDir = parseInt( dir );
			}
		},
		
		walk: function() {
			if( !this._isWalking ){
				this._isWalking = true;
				this.bind( 'enterframe', this.walkLoop );
			}
		},
		
		stopWalk: function(){
			if( this._isWalking ){
				this._isWalking = false;
			}
		},
		
		walkLoop: function(){
			if( this._isWalking ){
				if( this._walkOffsetFrame == this._walkOffset ){
					if( this.has( "move"+this._currDir+this._curWalkFrame ) ){
						this.removeComponent( "move"+this._curDir+this._curWalkFrame );
					}
					this._curWalkFrame++;
					if( this._curWalkFrame == 4 ){
						this._curWalkFrame = 0;
					}
					this.addComponent("move"+this._curDir+this._curWalkFrame );
					this._walkOffsetFrame = 0;
				}
				else {
					this._walkOffsetFrame++;
				}
			}
			else {
				this.unbind( 'enterframe', this.walkLoop );
			}
		}
		
	  });
	  
    

    
};