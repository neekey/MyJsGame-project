
/**
 * 45度等距地图的格子单元
 */
Crafty.c( 'isoMapGrid', {
	/** @remove
	_gridSpriteName: '',
	_gridSpriteHoverName: '',
	_gridSpriteUnavaliableName: '',
	_gridSpriteOther: '',
	*/
	/* 地图坐标 */
	_isoMapCoor: null,
	/* 格子是否可用 */
	_isGridAvaliable: true,
	/* 格子的使用者 */
	_occupiedBy: null,
	/* 格子的中心点坐标 */
	_gridCenterCoor: null,
	
	init: function(){
		this.requires( '2D, Canvas, Mouse' );
		this._gridSprite = [];
	},
	
	/**
	 * 配置函数
	 * @param {Object} obj
	 * { 精灵动画标识符: 精灵动画名 }
	 */
	isoMapGridSetup: function( obj ){
		this.addGridSprite( obj );
		this.bind("mouseover", function(){
			if( this._isGridAvaliable ){
				this.setGridSprite( 'hover' );
			}
			
		}).bind("mouseout", function(){
			this._updateGridSprite();
		});
		
		this._gridCenterCoor = {
			x: parseInt( this.x + this.w / 2 ),
			y: parseInt( this.y + this.h / 4 )
		};
		
		this.setGridSprite('normal');
	},
	
	/**
	 * 添加精灵动画( 也可以用于修改 )
	 * @param {Object} obj
	 * { 精灵动画标识符: 精灵动画名 }
	 */
	addGridSprite: function( obj ){
		if( Crafty.$getType( obj ) == 'Object' ){
			var n;
			for( n in obj ){
				this._gridSprite[ n ] = obj[ n ];
			}
		}
		else {
			Crafty.$e.log('addGridSprite: 参数有误！');
		}
	},
	
	/**
	 * 获取格子中心点坐标
	 */
	getGridCenterCoor: function(){
		return this._gridCenterCoor;
	},
	
	/**
	 * 设置精灵动画 
	 * @param {String} sType 精灵动画的名称
	 */
	setGridSprite: function( type ){
		if( this._gridSprite[ type ] ){
			// 清除所有的精灵动画
			var i;
			for( i in this._gridSprite ){
				this.removeComponent( this._gridSprite[ i ] );
			}
			this.addComponent( this._gridSprite[ type ] );
		}
		else {
			Crafty.$e.log('setGridSprite: 指定的地图精灵动画[ ' + type + ' ]不存在');
		}
	},
	
	/**
	 * 占用当前格子
	 * @param {Crafty.Entity} e
	 */
	occupyGrid: function( e ){
		if( this._isGridAvaliable ){
			this._isGridAvaliable = false;
			this._occupiedBy = e;
		}
		return this;
	},
	
	/**
	 * 释放格子
	 */
	releaseGrid: function(){
		this._isGridAvaliable = true;
		this._occupiedBy = null;
		this.setGridSprite( 'normal' );
		return this;
	},
	
	/**
	 * 使格子处于可用状态
	 */
	avaliableGrid: function(){
		this._isGridAvaliable = true;
		this.setGridSprite( 'normal' );
		return this;
	},
	
	/**
	 * 使格子处于不可用状态
	 */
	unavaliableGrid: function(){
		this._isGridAvaliable = false;
		this.setGridSprite( 'unavaliable' );
		return this;
	},
	
	/**
	 * 返回格子是否可用
	 */
	isGridAvaliable: function(){
		return this._isGridAvaliable;
	},
	
	/**
	 * 根据格子当前状态更新精灵动画
	 * @privete
	 */
	_updateGridSprite: function(){
		var spriteName;
		if( this._isGridAvaliable ){
			spriteName = 'normal';
		}
		else {
			spriteName = 'unavaliable';
		}
		this.setGridSprite( spriteName );
	},
	
	/**
	 * 设置格子在所在地图中的坐标
	 * @private
	 */
	_setMapCoor: function( x, y ){
		if( !this._isoMapCoor ){
			this._isoMapCoor = {};
		}
		this._isoMapCoor.x = x;
		this._isoMapCoor.y = y;
		return this;
	}
	
});

Crafty.c( 'isometricMap', {
	_gridMap: [],
	init: function(){
		    
		// 添加地图拖动效果
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
	},
	
	/**
	 * 初始化地图
	 * @param {Array[String]} nameArray 地图精灵动画名称对象（多个动画，用于随机产生地图 ）
	 *	{ grass: { hover: 'grassHover', normal: 'grass', unavaliable: 'grassUnavaliable' } }
	 * @param {Number} mapW 地图x轴的格子数量
	 * @param {Number} mapH 地图y轴的格子数量
	 */
	isometricMapSetup: function( nameArray, mapW, mapH ){
		if( Crafty.$getType( nameArray ) == 'Object' ){
			// 默认值
			mapW = mapW || 20;
			mapH = mapH || 20;
			
			var iso = Crafty.isometric.init(128),
			which, name,
			len, spriteArr = [];
			
			// 为精灵动画名称创建数组，用于随即决定精灵动画
			for( name in nameArray ){
				spriteArr.push( name );
			}
			len = spriteArr.length;
			
			for( var i = 0; i <= mapW; i++ ) {
			
				this._gridMap.push( [] );
				for( var y = 0; y <= mapH; y++ ) {
				
					which = Crafty.randRange( 0,len -1 );
					name = spriteArr[ which ];
					
					// 构造grid
					var tile = Crafty.e("isoMapGrid, " + name)
					// 设置z坐标
					.attr('z', i + 1 * y + y )
					.areaMap([64,0],[128,32],[128,96],[64,128],[0,96],[0,32])
					// 设置 tile 地图坐标
					._setMapCoor( i, y );
					// 将格子放入到数组中
					this._gridMap[ i ].push( tile );
					// 将格子加入到地图中
					iso.place( i, y, 0, tile );
					// 初始化格子的精灵动画
					tile.isoMapGridSetup( nameArray[ name ] );
					
				}
			}
		}
		else {
			Crafty.$e.log('isometricMapSetup: 参数有误');
		}
		return this;
	},
	
	/**
	 * 为所有格子绑定事件
	 */
	bindGrids: function( type, fn ){
		if( Crafty.$getType( type ) == 'String' && Crafty.$getType( fn ) == 'Function' ){ 
			this.forEachGrid( function(){
				this.bind( type, fn );
			});
		}
		else {
			Crafty.$e.log('bindGrids: 参数有误');
		}
		return this;
	},
	
	/**
	 * 为所有格子取消绑定事件
	 */
	unbindGrids: function( type, fn ){
		if( Crafty.$getType( type ) == 'String' && Crafty.$getType( type ) == 'Function' ){ 
			// 便利所有grid 绑定事件
			this.forEachGrid( function(){
				this.unbind( type, fn );
			});
		}
		else {
			Crafty.$e.log('unbindGrids: 参数有误');
		}
		return this;
	},
	
	/**
	 * 对每个格子执行函数
	 * @param {Function} fn
	 * 	函数的上下文为格子的this
	 */
	forEachGrid: function( fn ){
		// 便利所有grid 绑定事件
		var i, j;
		for( i = 0; this._gridMap[ i ]; i++ ){
			for( j = 0; this._gridMap[ i ][ j ]; j++ ){
				fn.call( this._gridMap[ i ][ j ] );
			}
		}
		return this;
	},
	
	/**
	 * 指定地图坐标获得格子的中心坐标
	 */
	getGridCoor: function( x, y ){
		return this._gridMap[ x ][ y ].getGridCenterCoor();
	},
	
	/**
	 * 根据地图坐标返回格子对象
	 */
	getGrid: function( x, y ){
		return this._gridMap[ x ][ y ];
	},
	
	/**
	 * 获得地图格子的行数
	 */
	getMapRow: function(){
		return this._gridMap.length;
	},
	
	/**
	 * 获得地图格子的列数
	 */
	getMapCol: function(){
		return this._gridMap[ 0 ].length;
	}
});