/**
 * 障碍物组件
 */
 
Crafty.c('obstacle', {
	
	_obstacleBottom: null,
	_obstacleLeft: null,
	_obstacleRight: null,
	/* 障碍物在地图中的坐标 */
	_obstacleMapBottom: null,
	_isoMap: null,
	_coveredGrids: null,
	
	init: function(){
		this.requires('2D, Canvas');
	},
	
	/**
	 * 设置障碍物
	 * @param {String} s 障碍物的sprite组件
	 * @param {Array} bp 障碍物最下端坐标（sprite组件左上角 ）
	 * @param {Number} left 
	 * @param {Number} right
	 * @param {Array} map 
	 */
	obstacleSetup: function( s, bp, left, right, map ){
		this.addComponent( s );
		this._obstacleBottom = { x: bp[ 0 ], y: bp[ 1 ] };
		this._obstacleLeft = left;
		this._obstacleRight = right;
		// 设置mapArea
		/*
		var poly = new Crafty.polygon(map);
		this.areaMap( poly ); */
		return this; 
	},
	
	/**
	 * 将障碍物设置到地图中
	 */
	setToMap: function( map, x, y ){
		this._isoMap = map;
		if( ! this._obstacleMapBottom ){
			this._obstacleMapBottom = {}
		}
		this._obstacleMapBottom.x = x;
		this._obstacleMapBottom.y = y;
		
		// 先获取地图grid对象
		var grid  = map.getGrid( x, y );
		// 获得格子底部坐标
		var gCenter = grid.getGridCenterCoor(),
		gBottom = {
			x: gCenter.x,
			y: 2 * gCenter.y - grid.attr('y')
		};
		// 设置障碍物坐标
		this.attr({
			x: gBottom.x - this._obstacleBottom.x,
			y: gBottom.y - this._obstacleBottom.y
		});
		this._updateObstacleAttr();
		// 禁用格子
		this._disableCoveredGrids();
		return this;
	},
	
	/**
	 * 禁用掉那些被覆盖的格子
	 */
	_disableCoveredGrids: function(){
		var grids = this._coveredGrids = this._getCoveredGrids(), i, g, grid;
		for( i = 0; g = grids[ i ]; i++ ){
			if( grid = this._isoMap.getGrid( g.x, g.y ) ){
				grid.unavaliableGrid();
			}
		}
		return this;
	},
	
	/**
	 * 获得障碍物覆盖的点
	 */
	_getCoveredGrids: function(){
		// 获取不可用的格子坐标
		var omb = this._obstacleMapBottom,
		left = this._obstacleLeft,
		right = this._obstacleRight,
		i, j, grids = [], newX, newY;
		for( i = 0; i < left; i++ ){
			for( j = 0; j < right; j++ ){
				newX = omb.x - i + j;
				newY = omb.y - i - j;
				// 处理在地图外的点
				newX = newX < 0 ? 0 :
					( newX > this._isoMap.getMapRow() - 1 ) ? this._isoMap.getMapRow() - 1 : newX;
				newY = newY < 0 ? 0 :
					( newY > this._isoMap.getMapCol() - 1 ) ? this._isoMap.getMapCol() - 1 : newY;	
				grids.push( { x: newX, y: newY } );
			}
		}
		
		return grids;
	},
	
	_updateObstacleAttr: function(){
		var omb = this._obstacleMapBottom,
		g = this._isoMap.getGrid( omb.x, omb.y );
		this.attr('z', g.attr('z') + 10);
		return this;
	},
	
	transObstacle: function(){
		
	}

});
