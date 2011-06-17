
Crafty.c('menuUnit', {
	
	/**
	 * 子菜单
	 */
	_childMenu: null,
	_dom: null,
	
	init: function(){
		this._menuEventList = [];
		var dom = this._dom = document.createElement('div');
		var _this = this;
		// 添加鼠标划过事件
		dom.onmouseover = function(){
			_this._menuUnitMouseover();
		};
		dom.onmouseout = function(){
			_this._menuUnitMouseout();
		}
		dom.onclick = function( e ){
			// 若左键单机
			if( e.button == 0 ){
				if( this._menuEventList ){
					var fn, i;
					for( i = 0; this._menuEventList[ i ]; i++ ){
						this._menuEventList[ i ]();
					}
				}
			}
		};
		
		dom.style.width = '100px';
		dom.style.height = '25px'; 
		// .attr({w: 100, h: 25, z: 1000 });
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
		// this.css( 'color', colorValue );
	},
	
	text: function( text ){
		this._dom.innerHTML = text;
		return this;
	},
	
	/**
	 * 显示菜单单元
	 */
	showMenuUnit: function(){
		if( !this._dom.style.display == 'none' ){
			/*
			dom.onmouseover = function(){
				_this._menuUnitMouseover();
			};
			dom.onmouseout = function(){
				_this._menuUnitMouseout();
			}*/
			this._dom.style.display == 'display'
		}
		return this;
	},
	
	/**
	 * 隐藏菜单单元，若子菜单存在，将同时隐藏子菜单
	 */
	hideMenuUnit: function(){
		this._dom.style.display == 'none';
		// 隐藏子菜单
		if( this._childMenu ){
			this._childMenu.hideMenu();
		}
		/*
		this._dom.onmouseover = null;
		this._dom.onmouseout = null; */
		return this;
	},
	
	/**
	 * mouseover 事件
	 * @private
	 */
	_menuUnitMouseover: function(){
		if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
			// 设置子菜单位置
			var child = this._childMenu;
			/*
			child.attr({
				x: parseInt( this._dom.offsetLeft ) + parseInt( this._dom.style.width ),
				y: parseInt( this._dom.offsetTop ),
				
				w: parseInt( Crafty.$dom.style( child._dom, 'width' ) ),
				h: parseInt( Crafty.$dom.style( child._dom, 'height' ) )
			}); */
			this._childMenu._dom.style.top = parseInt( this._dom.offsetLeft ) + parseInt( this._dom.style.width ) + 'px';
			this._childMenu._dom.style.left = parseInt( this._dom.offsetTop ) + 'px';
			
			
			// 展开子菜单
			this._childMenu.showMenu();
		}
	},
	
	/**
	 * mouseout 事件
	 * @private
	 */
	_menuUnitMouseout: function( e ){
		if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
			// 关闭子菜单
			this._childMenu.hideMenu();
			// 判断是否在子菜单上
			/*
			var pos = Crafty.DOM.translate(e.clientX, e.clientY);
			if( !this._childMenu.isAt( pos.x, pos.y ) ){
			
				
			} */
		}
	}
});

/**
 * 菜单
 */
Crafty.c('menu', {
	
	_menuList: null,
	_menuUpdateOffset: 30,
	_menuUpdateOffsetFrame: 0,
	_dom: null,
	
	init: function(){
		this.requires('2D,DOM');
		this._dom = document.createElement('div');
		this._dom.style.position = 'absolute';
		this.bind('enterframe', this._updateMenuUnitPos );
		var _this = this;
		this._dom.onmouseover = function(){
			_this.showMenu()
		};
		//this._element.appendChild(this._dom);
		this._element.parentNode.appendChild(this._dom);
	},
	
	/**
	 * 初始化餐单
	 * @param {Objcet} m
	 * @param {String} className
	 */
	menuSetup: function( m, className ){
		if( Crafty.$getType( m ) == 'Object' ){
			this._buildMenu( m, this, className );
			// 添加class
			if( className ){
				this._dom.className = this._dom.className + ' ' + className;
			}
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
		this._dom.style.display = 'block';
		// 隐藏所有菜单单元
		this.forEachMenuUnit( function(){
			//this.showMenuUnit();
		});
	},
	
	/**
	 * 隐藏菜单
	 */
	hideMenu: function(){
		this._dom.style.display = 'none';
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
	_buildMenu: function( m, scope, className ){
		
		// 初始化餐单的长宽
		//scope.attr({w: 0, h: 0 });
		
		var name, unit;
		if( !scope._menuList ){
			scope._menuList = {};
		}
		for( name in m ){
		
			unit = Crafty.e('menuUnit')
			.text( name );
			scope._menuList[ name ] = unit;
			// 添加class
			unit._dom.className = unit._dom.className + ' ' + className + 'Child';
			
			// append
			scope._dom.appendChild( unit._dom );
			// 修改菜单尺寸并调整菜单单元位置
			// 此处将餐单单元的左上角坐标设置为菜单的左下角坐标
			//unit.attr({x: scope.attr('x'), y: scope.attr('y') + scope.attr('h') });
			// 增加长宽
			/*
			scope.attr({
				w: scope.attr('w') < unit.attr('w') ? unit.attr('w') : scope.attr('w'),
				h: scope.attr('h') + unit.attr('h')
			});
			*/
			// 若为单个菜单单元
			if( Crafty.$getType( m[ name ] ) == 'Function' ){
				unit.addMenuEvent( m[ name ] )
			}
			else {
				// 若为一个子菜单
				if( Crafty.$getType( m[ name ] ) == 'Object' ){
					unit._childMenu = Crafty.e('menu');
					//unit._dom.className = unit._dom.className + ' ' + className
					// 设置子菜单位置
					/*
					unit._childMenu._dom.style.top = parseInt( unit._dom.style.offsetTop ) + parseInt( unit._dom.width ) + 'px';
					unit._childMenu._dom.style.left = parseInt( unit._dom.style.offsetLeft ) + parseInt( unit._dom.height ) + 'px';
					unit._childMenu.menuSetup( m[ name ], className );
					*/
					//arguments.callee( m[ name ], unit._childMenu, className );
					
					unit._childMenu.attr({
						x: parseInt( unit._dom.offsetLeft ) + parseInt( unit._dom.style.width ),
						y: parseInt( unit._dom.offsetTop )
					});
					unit._childMenu._dom.style.top = parseInt( unit._dom.offsetLeft ) + parseInt( unit._dom.style.width ) + 'px';
					unit._childMenu._dom.style.left = parseInt( unit._dom.offsetTop ) + 'px';
					unit._childMenu.menuSetup( m[ name ], className );
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
			/*
			this._dom.style.top = this.attr('x') + 'px';
			this._dom.style.left = this.attr('y') + 'px'; */
		}
		this._menuUpdateOffsetFrame++;
		
	},
});