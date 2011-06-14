// Turn the sprite map into usable components
  
Crafty.extend({
	/**
	 * 用于自定义添加 游戏角色精灵动画
	 * @param {String} 动画前缀，用于区分
	 * @param {String} 精灵动画图片地址
	 */
	characterSprite: function( prefix, url ){
		var map = {};
		/* 前 */
		map[ prefix + '_move00' ] = [0,0,70,124];
		map[ prefix + '_move01' ] = [70,0,70,124];
		map[ prefix + '_move02' ] = [140,0,70,124];
		map[ prefix + '_move03' ] = [210,0,70,124];
		/* 左 */
		map[ prefix + '_move10' ] = [0,124,70,124];
		map[ prefix + '_move11' ] = [70,124,70,124];
		map[ prefix + '_move12' ] = [140,124,70,124];
		map[ prefix + '_move13' ] = [210,124,70,124];	
		/* 右 */
		map[ prefix + '_move20' ] = [0,248,70,124];
		map[ prefix + '_move21' ] = [70,248,70,124];
		map[ prefix + '_move22' ] = [140,248,70,124];
		map[ prefix + '_move23' ] = [210,248,70,124];
		/* 后 */
		map[ prefix + '_move30' ] = [0,372,70,124];
		map[ prefix + '_move31' ] = [70,372,70,124];
		map[ prefix + '_move32' ] = [140,372,70,124];
		map[ prefix + '_move33' ] = [210,372,70,124];
		/* 左下 */
		map[ prefix + '_move40' ] = [0,496,70,124];
		map[ prefix + '_move41' ] = [70,496,70,124];
		map[ prefix + '_move42' ] = [140,496,70,124];
		map[ prefix + '_move43' ] = [210,496,70,124];
		/* 右下 */
		map[ prefix + '_move50' ] = [0,620,70,124];
		map[ prefix + '_move51' ] = [70,620,70,124];
		map[ prefix + '_move52' ] = [140,620,70,124];
		map[ prefix + '_move53' ] = [210,620,70,124];
		/* 左上 */
		map[ prefix + '_move60' ] = [0,744,70,124];
		map[ prefix + '_move61' ] = [70,744,70,124];
		map[ prefix + '_move62' ] = [140,744,70,124];
		map[ prefix + '_move63' ] = [210,744,70,124];
		/* 右上 */
		map[ prefix + '_move70' ] = [0,868,70,124];
		map[ prefix + '_move71' ] = [70,868,70,124];
		map[ prefix + '_move72' ] = [140,868,70,124];
		map[ prefix + '_move73' ] = [210,868,70,124];
		
		this.sprite( url, map );
	}
});

Crafty.c('playerWalk',{
	_walkSpritePrefix: '',
	/** @type {Number} 角色当前方向 */
	_curDir: 0,
	/** @type {Enum} */
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
	_isWalking: false,
	/* 当前走路帧 */
	_curWalkFrame: 0,
	/* 隔多少换一帧 */
	_walkOffset: 9,
	_walkOffsetFrame: 0,
	_isMoving: false,
	_curMoveFrame: 0,
	/* 隔多少帧移动一次 */
	_moveOffset: 5,
	/* 速度 每秒钟移动的像素数 */
	_moveSpeed: 110,
	/* 当前移动目的地 */
	_moveDes: null,
	/* 用于标识角色脚底坐标 */
	_curFootX: 0,
	_curFootY: 0,
	
	init: function() {
		this._moveDes = { x: 0, y: 0 };
		// 若尚未设置尺寸，则默认设置为70 124
		this.w = this.w == 0 ? 70 : this.w;
		this.h = this.h == 0 ? 124 : this.h;
		// 初始话脚底坐标
		this._curFootX = parseInt( this.x + this.w / 2 );
		this._curFootY = parseInt( this.y + this.h - 10 );
	},
	
	playerWalkSetup: function( prefix ){
		this._setWalkPrefix( prefix );
		this.stopWalk();
		// 设置人物地图
		this.areaMap([17,17],[53,17],[53,107],[17,107]);
		return this;
	},
	
	/**
	 * 使移动角色的脚底坐标至 x,y
	 */
	move: function( x, y ){
		this._moveDes.x = x;
		this._moveDes.y = y;
		if( !this._isMoving ){
			this._isMoving = true;
			this.bind('enterframe', this._moveLoop );
		}
		return this;
	},
	
	/**
	 * 设置角色的脚底坐标（将同时修改this.x 与 this.y )
	 * 请不要直接修改 this._curFootX 和 this._curFootY
	 */
	setFootCoor: function( x, y ){
		this.x += ( x - this._curFootX );
		this.y += ( y - this._curFootY );
		this._curFootX = x;
		this._curFootY = y;
		return this;
	},
	
	/**
	 * 设置角色方向
	 * @param {Number}
	 */
	setDir: function( dir ){
		if( dir >= 0 && dir <= 7 ){
			this._curDir = parseInt( dir );
		}
		return this;
	},
	
	/**
	 * 行走
	 */
	walk: function() {
		if( !this._isWalking ){
			this._isWalking = true;
			this.bind( 'enterframe', this._walkLoop );
		}
		return this;
	},
	
	/**
	 * 停止行走
	 */
	stopWalk: function(){
		if( this._isWalking ){
			this._isWalking = false;
		}
		// 设置其精灵动画为当前方向的第一帧
		this.addComponent( this._walkSpritePrefix + "_move"+this._curDir+0 );
		this.unbind( 'enterframe', this._walkLoop );
		return this;
	},
	
	/**
	 * 设置精灵动画前缀，该方法用于决定角色的精灵动画样式
	 * @private 
	 * @param {String} prefix
	 */
	_setWalkPrefix: function( prefix ){
		this._walkSpritePrefix = prefix;
		return this;
	},
	
	/**
	 * 角色移动的主循环
	 * @private
	 */
	_moveLoop: function(){
		// 若尚未设置 精灵动画前缀，则不会进行移动
		if( this._walkSpritePrefix == '' ){
			Crafty.$e.log('_moveLoop: 尚未设置精灵动画前缀，无法执行移动操作！');
			return this;
		}
		// 若已经停止行走或者已经到达终点
		if( this._isMoving && ( this._curFootX !== this._moveDes.x || this._curFootY !== this._moveDes.y ) ){
			if( this._curMoveFrame == this._moveOffset ){
				// 获得当前帧变化偏移量
				var stride = this._getMoveStride( this._moveDes.x, this._moveDes.y ),
				newFootX, newFootY;
				// 设置方向
				this.setDir( this._deceideDirection( this._moveDes.x, this._moveDes.y ) );
				
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
				// 设置脚底坐标
				this.setFootCoor( newFootX, newFootY );
				// 设置z坐标
				this.attr( 'z', 100 + this.y );
				this._curMoveFrame = 0;
				
			}
			else {
				this._curMoveFrame++;
			}
			
		}
		else {
			this._isMoving = false;
			this.unbind('enterframe', this._moveLoop);
			// 出发移动完成事件
			this.trigger('moveFinish');
		}
		return this;
	},
	
	/**
	 * 根据目标坐标，返回x和y坐标在当前帧需要的偏移量
	 * @private
	 */
	_getMoveStride: function( x, y ){
		var distance = Math.sqrt( ( x - this._curFootX  ) * ( x - this._curFootX  ) + ( y - this._curFootY ) * ( y - this._curFootY ) ),
		stride = this._moveSpeed / ( Crafty.getFPS() / this._moveOffset ),
		StrideX = ( stride * ( x - this._curFootX  ) / distance ),
		StrideY = ( stride * ( y - this._curFootY ) / distance );
		return { x: StrideX, y: StrideY };
	},
	
	/** 
	 * 根据目标坐标和当前脚底坐标的位置关系，返回方向
	 * @private
	 * @returns {Number}
	 */
	_deceideDirection: function( x, y ){
		var footX = this._curFootX,
		footY = this._curFootY,
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

	/**
	 * 行走主循环
	 * @private
	 */
	_walkLoop: function(){
		// 若尚未设置 精灵动画前缀，则动画不会执行
		if( this._walkSpritePrefix == '' ){
			return this;
		}
		if( this._isWalking ){
			if( this._walkOffsetFrame == this._walkOffset ){
				if( this.has( this._walkSpritePrefix + "_move"+this._currDir+this._curWalkFrame ) ){
					this.removeComponent( this._walkSpritePrefix + "_move"+this._curDir+this._curWalkFrame );
				}
				this._curWalkFrame++;
				if( this._curWalkFrame == 4 ){
					this._curWalkFrame = 0;
				}
				this.addComponent( this._walkSpritePrefix + "_move"+this._curDir+this._curWalkFrame );
				this._walkOffsetFrame = 0;
			}
			else {
				this._walkOffsetFrame++;
			}
		}
		else {
			// 若处于静止状态，则设置其精灵动画为当前方向的第一帧
			this.addComponent( this._walkSpritePrefix + "_move"+this._curDir+0 );
			this.unbind( 'enterframe', this._walkLoop );
		}
		return this;
	}
});

/**
 * 是角色在地图格子中行走
 */
Crafty.c( 'playerGridWalk', {
	
	_gridMoveDes: null,
	_curGridCoor: null,
	_nextGridCoor: null,
	_isoMap: null,
	_isGridMoving: false,
	
	init: function(){
		this.requires('playerWalk');
	},
	
	/**
	 * 初始化函数
	 * @param {Number} x player的初始地图坐标
	 * @param {Number} y 
	 * @param {isometricMap} isoMap player所在的地图
	 */
	playerGridWalkSetup: function( x, y, isoMap ){
		if( x, y, isoMap && isoMap.has( 'isometricMap' ) ){
			if( !this._curGridCoor ){
				this._curGridCoor = {};
			}
			this._curGridCoor.x = x;
			this._curGridCoor.y = y;
			this._isoMap = isoMap;
			return this;
		}
		else{
			Crafty.$e.log('playerGridWalkSetup: 参数有误！');
		}
	},
	
	/**
	 * 设置角色当前的格子坐标
	 */
	setGridCoor: function(  x, y ){
		if( Crafty.$getType( x ) == 'Number' && Crafty.$getType( y ) == 'Number' ){
			this._curGridCoor.x = x;
			this._curGridCoor.y = y;
		}
		else {
			Crafty.$e.log('setGridCoor: 参数有误！');
		}
		return this;
	},
	
	/**
	 * 沿着格子行走
	 * @param {Number} x 地图grid坐标
	 * @param {Number} y 地图grid坐标
	 */
	gridMove: function( x, y ){
		if( Crafty.$getType( x ) == 'Number' && Crafty.$getType( y ) == 'Number' ){
			if( !this._isGridMoving ){
				this._isGridMoving = true;
				if( !this._gridMoveDes ){
					this._gridMoveDes = [];
				}
				this._gridMoveDes.x = x;
				this._gridMoveDes.y = y;
				
				this.bind('moveFinish', this._gridMoveDispatch );
				this._gridMoveDispatch();
			}
		}
		else {
			Crafty.$e.log('gridMove: 参数有误！');
		}
		return this;
	},
	
	/**
	 * @private
	 */
	_gridMoveDispatch: function(){
		if( this._nextGridCoor ){
			this.setGridCoor( this._nextGridCoor.x, this._nextGridCoor.y );
		}
		// 判断是否到达
		if( this._curGridCoor.x != this._gridMoveDes.x || this._curGridCoor.y != this._gridMoveDes.y ){
			
			var grids = this._getGridAround(),
			newDes = {};
			// 先确定x
			if( Math.abs( grids[ 0 ].x - this._gridMoveDes.x ) > Math.abs( grids[ 2 ].x - this._gridMoveDes.x ) ){
				newDes.x = grids[ 2 ].x;
			}
			else {
				newDes.x = grids[ 0 ].x;
			}
			// 确定y
			if( Math.abs( grids[ 1 ].y - this._gridMoveDes.y ) > Math.abs( grids[ 3 ].y - this._gridMoveDes.y ) ){
				newDes.y = grids[ 3 ].y;
			}
			else {
				newDes.y = grids[ 1 ].y;
			}
			// 处理坐标越界的问题
			newDes.x = newDes.x < 0 ? 0 : 
				( newDes.x > this._isoMap.getMapRow() - 1 ) ? this._isoMap.getMapRow() - 1 : newDes.x;
			newDes.y = newDes.y < 0 ? 0 : 
				( newDes.y > this._isoMap.getMapCol() - 1 ) ? this._isoMap.getMapCol() - 1 : newDes.y;
			
			this._nextGridCoor = newDes;
			newDes = this._isoMap.getGridCoor( newDes.x, newDes.y );
			this.move( newDes.x, newDes.y );
			
		}
		else {
			this._isGridMoving = false;
			this.unbind('moveFinish', this._gridMoveDispatch );
		}
	},
	
	/**
	 * 获取当前格子周围四个点的坐标
	 * @private
	 */
	_getGridAround: function(){
		var grids = [], i,
		cur = this._curGridCoor;
		for( i = 0; i < 4; i++ ){
			grids.push( { x: 0, y: 0 } );
		}
		// 设置y轴
		grids[ 0 ].y = ( cur.y - 1 ) < 0 ? 0 : cur.y - 1;
		grids[ 1 ].y = grids[ 0 ].y;
		grids[ 2 ].y = cur.y + 1;
		grids[ 3 ].y = grids[ 2 ].y;
		// 获取 格子0的x轴坐标
		grids[ 0 ].x = ( cur.y % 2 == 0 ) ? cur.x - 1 : cur.x;
		grids[ 0 ].x = grids[ 0 ].x < 0 ? 0 : grids[ 0 ].x;
		grids[ 1 ].x = grids[ 0 ].x + 1;
		grids[ 2 ].x = grids[ 1 ].x;
		grids[ 3 ].x = grids[ 0 ].x;
		
		return grids;
	}
	
});