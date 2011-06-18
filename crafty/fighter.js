
Crafty.c('fighter', {
	
	/* 攻击力 */
	_atk: 20,
	/* 防御力 */
	_def: 10,
	/* 行动力 */
	_mobility: 2,
	_fightEffect: null,
	
	init: function(){
		this.requires('playerHealth, playerGridWalk, playerHealthBar, attrSprite');
		this._fightEffect = Crafty.e('2D, Canvas, fireAttack')
		.attr({ w: 80, h: 120, visible: true });
	},
	
	fighterSetup: function( x, y, isoMap, prefix ){
		this.playerGridWalkSetup( x, y, isoMap, prefix );
		return this;
	},
	
	/**
	 * 对指定角色进行攻击
	 * @param {fighter} p
	 */
	attack: function( p ){
		if( p.has && p.has('playerHealth') ){
			if( p !== this ){
				// 获取对方防御力
				var def = p._def, _this = this;
				p.fightEffect( 'fireAttack', function(){
					p.deHP( _this._atk - def );
				});
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
	
	/**
	 * 执行动作动画
	 */
	fightEffect: function( name, callback ){
		var _this = this;
		this._fightEffect.attr({x: this.attr('x'), y: this.attr('y'), z: this.attr('z') + 1, visible: true });
		this._fightEffect.flashSprite( name, function(){
			_this._fightEffect.attr( 'visible', false );
			callback();
		});
		var x = this.attr('x'), y = this.attr('y');
		this.attrSprite({alpha: 0.7, x: x + 10, y: y + 10 }, 100 )
		.attrSprite({alpha: 0.5, x: x - 10, y: y - 10 }, 300 )
		.attrSprite({alpha: 1, x: x, y: y}, 100 );
		Crafty.audio.play('fireAttack');
	},
	
	getMoveableMap: function( m ){
		
		var cur = this._curGridCoor,
		m = m || this._mobility, result = [],
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