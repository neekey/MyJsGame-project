
Crafty.c('menuUnit', {
	
	/**
	 * 子菜单
	 */
	_childMenu: null,
	
	init: function(){
		this.requires('2D, DOM, Color, Text, Mouse');
		this._menuEventList = [];
		
		// 添加鼠标划过事件
		this.bind('mouseover', this._menuUnitMouseover)
		.bind('mouseout', this._menuUnitMouseout)
		.bind('click', function( e ){
			// 若左键单机
			if( e.button == 0 ){
				if( this._menuEventList ){
					var fn, i;
					for( i = 0; this._menuEventList[ i ]; i++ ){
						this._menuEventList[ i ]();
					}
				}
			}
		})
		.attr({w: 200, h: 50, z: 1000 });
	},
	
	/**
	 * 添加菜单点击事件
	 * @param {Function} fn
	 */
	addMenuEvent: function( fn ){
		if( fn && Crafty.$getType( fn ) == 'Function' ){
			if( !this._menuEventList ){
				this._menuEventList = [];
			}
			this._menuEventList.push( fn );
		}
		else {
			Crafty.$e.log('addMenuEvent: 参数有误！');
		}
		return this;
	},
	
	/**
	 * 设置菜单单元文字颜色
	 */
	fontColor: function( colorValue ){
		this.css( 'color', colorValue );
	},
	
	showMenuUnit: function(){
		if( !this.attr('visible') ){
			this.attr('visible', true);
			this.bind('mouseover', this._menuUnitMouseover);
			this.bind('mouseout', this._menuUnitMouseout);
		}
	},
	
	hideMenuUnit: function(){
		this.attr('visible', false);
		// 隐藏子菜单
		if( this._childMenu ){
			this._childMenu.hideMenu();
		}
		this.unbind('mouseover', this._menuUnitMouseover);
		this.unbind('mouseout', this._menuUnitMouseout);
	},
	
	_menuUnitMouseover: function(){
		if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
			// 设置子菜单位置
			this._childMenu.attr({
				x: this.attr('x') - 100 + this.attr('w'),
				y: this.attr('y')
			});
			// 展开子菜单
			this._childMenu.showMenu();
		}
	},
	
	_menuUnitMouseout: function( e ){
		if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
			// 判断是否在子菜单上
			var pos = Crafty.DOM.translate(e.clientX, e.clientY);
			if( !this._childMenu.isAt( pos.x, pos.y ) ){
			
				// 关闭子菜单
				this._childMenu.hideMenu();
			}
		}
	}
});

/**
 * 菜单
 */
Crafty.c('menu', {
	
	_menuList: null,
	_menuUpdateOffset: 10,
	_menuUpdateOffsetFrame: 0,
	
	init: function(){
		this.requires('2D, DOM, Color, Mouse');
		this.bind('enterframe', this._updateMenuUnitPos );
		this.bind('mouseover', this.showMenu );
	},
	
	/**
	 * 初始化餐单
	 */
	menuSetup: function( m ){
		if( Crafty.$getType( m ) == 'Object' ){
			this._buildMenu( m, this );
		}
		else {
			Crafty.$e.log('menuSetup: 参数有误！');
		}
		return this;
	},
	
	/**
	 * 显示菜单
	 */
	showMenu: function(){
		this.attr('visible', true);
		// 隐藏所有菜单单元
		this.forEachMenuUnit( function(){
			this.showMenuUnit();
		});
	},
	
	/**
	 * 隐藏菜单
	 */
	hideMenu: function(){
		this.attr('visible', false);
		this.forEachMenuUnit( function(){
			this.hideMenuUnit();
		});
	},
	
	/**
	 * 对所有菜单单元进行操作
	 * @param {Function} fn
	 * @param {All} args 传递给fn的参数
	 */
	forEachMenuUnit: function( fn, args ){
		if( Crafty.$getType( fn ) == 'Function' ){
			var name, m;
			for( name in this._menuList ){
				m = this._menuList[ name ];
				fn.call( m, args );
			}
		}
		else {
			Crafty.$e.log('forEachMenuUnit: 参数有误！');
		}
	},
	
	/**
	 * 根据给定的菜单信息，递归构造菜单
	 */
	_buildMenu: function( m, scope ){
		// 初始化餐单的长宽
		scope.attr({w: 0, h: 0 });
		
		var name, unit;
		if( !scope._menuList ){
			scope._menuList = {};
		}
		for( name in m ){
		
			unit = Crafty.e('menuUnit')
			.text( name );
			scope._menuList[ name ] = unit;
			
			// 修改菜单尺寸并调整菜单单元位置
			// 此处将餐单单元的左上角坐标设置为菜单的左下角坐标
			unit.attr({x: scope.attr('x'), y: scope.attr('y') + scope.attr('h') });
			// 增加长宽
			scope.attr({
				w: scope.attr('w') < unit.attr('w') ? unit.attr('w') : scope.attr('w'),
				h: scope.attr('h') + unit.attr('h')
			});
			// 若为单个菜单单元
			if( Crafty.$getType( m[ name ] ) == 'Function' ){
				unit.addMenuEvent( m[ name ] )
			}
			else {
				// 若为一个子菜单
				if( Crafty.$getType( m[ name ] ) == 'Object' ){
					unit._childMenu = Crafty.e('menu');
					// 设置子菜单位置
					unit._childMenu.attr({
						x: unit.attr('x') - 100 + unit.attr('w'),
						y: unit.attr('y')
					});
					arguments.callee( m[ name ], unit._childMenu );
				}
			}
		}
	},
	
	/**
	 * 用于更新所有菜单单元的位置
	 * @private
	 */
	_updateMenuUnitPos: function(){
		if( this._menuUpdateOffsetFrame == this._menuUpdateOffset ){
			// 遍历菜单单元，修正其位置
			// 将菜单的尺寸初始化为0
			this.attr({w: 0, h: 0});
			var name;
			for( name in this._menuList ){
				// 此处将餐单单元的左上角坐标设置为菜单的左下角坐标
				this._menuList[ name ].attr({x: this.attr('x'), y: this.attr('y') + this.attr('h') });
				// 增加长宽
				this.attr({
					w: this.attr('w') < this._menuList[ name ].attr('w') ? this._menuList[ name ].attr('w') : this.attr('w'),
					h: this.attr('h') + this._menuList[ name ].attr('h')
				});
			}
			this._menuUpdateOffsetFrame = 0;
		}
		this._menuUpdateOffsetFrame++;
	},
});