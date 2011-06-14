
Crafty.c('menuUnit', {
	
	_childMenu: null,
	_menuEventList: null,
	
	init: function(){
		this.requires('2D, DOM, Color, Text');
		// 添加鼠标划过事件
		this.bind('mouseover', function(){
			
			if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
				// 展开子菜单
				this._childMenu.showMenu();
			}
		})
		.bind('mouseout', function(){
			if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
				// 关闭子菜单
				this._childMenu.hideMenu();
			}
		})
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
		});
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
	}
});

/**
 * 菜单
 */
Crafty.c('menu', {
	
	_menuList: null,
	
	init: function(){
		this.requires('2D, DOM, Color');
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
	},
	
	_buildMenu: function( m, scope ){
		var name, unit;
		if( !scope._menuList ){
			scope._menuList = {};
		}
		for( name in m ){
		
			unit = Crafty.e('menuUnit')
			.text( name );
			scope._menuList[ name ] = unit;
			// 将单元放入到菜单中
			unit.css('display', 'block' ); // 修改显示样式
			scope._element.appendChild( unit._element );
			
			// 若为单个菜单单元
			if( Crafty.$getType( m[ name ] ) == 'Function' ){
				unit.addMenuEvent( m[ name ] )
			}
			else {
				// 若为一个子菜单
				if( Crafty.$getType( m[ name ] ) == 'Object' ){
					unit._childMenu = Crafty.e('menu');
					arguments.callee( m[ name ], unit._childMenu );
				}
			}
		}
	},
	
	showMenu: function(){
		this._visible = true;
	},
	
	hideMenu: function(){
		this._visible = false;
	}
});