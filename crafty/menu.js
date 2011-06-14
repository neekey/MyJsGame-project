
Crafty.c('menuUnit', {
	
	_childMenu: null,
	_menuEventList: null,
	
	init: function(){
		this.requires('2D, DOM, Color, Text');
		// �����껮���¼�
		this.bind('mouseover', function(){
			
			if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
				// չ���Ӳ˵�
				this._childMenu.showMenu();
			}
		})
		.bind('mouseout', function(){
			if( this._childMenu && this._childMenu.has && this._childMenu.has('menu') ){
				// �ر��Ӳ˵�
				this._childMenu.hideMenu();
			}
		})
		.bind('click', function( e ){
			// ���������
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
	 * ��Ӳ˵�����¼�
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
			Crafty.$e.log('addMenuEvent: ��������');
		}
		return this;
	},
	
	/**
	 * ���ò˵���Ԫ������ɫ
	 */
	fontColor: function( colorValue ){
		this.css( 'color', colorValue );
	}
});

/**
 * �˵�
 */
Crafty.c('menu', {
	
	_menuList: null,
	
	init: function(){
		this.requires('2D, DOM, Color');
	},
	
	/**
	 * ��ʼ���͵�
	 */
	menuSetup: function( m ){
		if( Crafty.$getType( m ) == 'Object' ){
			this._buildMenu( m, this );
		}
		else {
			Crafty.$e.log('menuSetup: ��������');
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
			// ����Ԫ���뵽�˵���
			unit.css('display', 'block' ); // �޸���ʾ��ʽ
			scope._element.appendChild( unit._element );
			
			// ��Ϊ�����˵���Ԫ
			if( Crafty.$getType( m[ name ] ) == 'Function' ){
				unit.addMenuEvent( m[ name ] )
			}
			else {
				// ��Ϊһ���Ӳ˵�
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