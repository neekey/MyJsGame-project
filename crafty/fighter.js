
Crafty.c('fighter', {
	
	/* 攻击力 */
	_atk: 20,
	/* 防御力 */
	_def: 10,
	/* 行动力 */
	_mobility: 2,
	
	init: function(){
		this.requires('playerHealth, playerGridWalk');
	},
	
	/**
	 * 对指定角色进行攻击
	 * @param {fighter} p
	 */
	attack: function( p ){
		if( p.has && p.has('playerHealth') ){
			if( p !== this ){
				// 获取对方防御力
				var def = p._def;
				p.deHP( this._atk - def );
				return true;
			}
			else {
				Crafty.$e.log('attack: 无法攻击玩家自身!');
				return false;
			}
		}
		else {
			Crafty.$e.log('attack: 攻击对象类型有误!');
			return false;
		}
		
	},
	
	getAvaliavleMap: function(){
		var cur = this._curGridCoor,
		m = this._mobility, map = [];
		// 先获取两端点坐标
		var side1 = {}, side2 = {};
		
		// 确定y坐标
		side1.y = ( cur.y - m ) < 0 ? 0 : cur.y - m;
		side2.y = ( cur.y + m ) < 0 ? 0 : cur.y + m;
		// 确定x坐标
		
		// 若x为偶数
		side2.x = cur.x + parseInt( m / 2 );
		side1.x = cur.x - parseInt( m / 2 );
		if( cur.x % 2 == 0 ){
			if( m % 2 != 0 ){
				side1.x--;
			}
		}
		else {
			if( m % 2 != 0 ){
				side2.x++;
			}
		}
		
		side2.x = side2.x < 0 ? 0 : side2.x;
		side1.x = side1.x < 0 ? 0 : side1.x;
		// 确定i轴右边端点
		var iEnd = ( side1.y % 2 == 0 ) ? side2.x - 1 : side2.x,
		iBegin = ( side1.y % 2 == 0 ) ? side1.x : side1.x + 1;
		for( var j = side1.y; j <= side2.y; j++ ){
			for( var i = ( ( ( side1.y + j ) % 2 ) == 0 ? side1.x : iBegin ); 
				i <= ( ( side1.y + j ) % 2 != 0 ? iEnd : side2.x );
					i++ ){
				map.push( { x: i, y: j } );
			}
		}
		return map;
	}
});