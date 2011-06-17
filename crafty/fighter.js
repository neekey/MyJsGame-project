
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
		m = this._mobility, result = [],
		x1 = cur.x - m, y1 = cur.y - m,
		x2 = cur.x + m, y2 = cur.y + m,
		len, i, j;
		
		for( i = y1; i <= y2; i+= 2 ){
			len = i - y1 + 1;
			for( j = 0; j < len; j++ ){
				if( ( x1 + j )>= 0 && ( i - j ) >= 0 ){
					result.push( { x: x1 + j, y: i - j } );
				}
			}	
		}
		for( i = x1 + 2; i <= x2; i+= 2 ){
			len = x2 - i + 1;
			for( j = 0; j < len; j++ ){
				if( ( i + j ) >= 0 && ( y2 - j ) >= 0 ){
					result.push( { x: i + j, y: y2 - j } );
				}
			}	
		}
		
		return result;
	}
});