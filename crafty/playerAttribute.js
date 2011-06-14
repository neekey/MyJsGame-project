/**
 * 定义与玩家相关的一些属性组件
 */
Crafty.c('playerHealth',{
	
	_playerMaxHP: 100,
	_playerHP: 100,
	_playerMinHP: 0,
	
	init: function(){
		this.bind('playerHPEmpty', this.onPlayerHPEmpty );
		this.bind('playerHPDecrease', this.onPlayerHPDecrease );
		this.bind('playerHPIncrease', this.onPlayerHPIncrease );
	},
	
	setPlayerHealthInfo: function( max, min ){
		this._playerMaxHP = max;
		this._playerMinHP = min;
	},
	
	getHP: function(){
		return this._playerHP;
	},
	
	deHP: function( value ){
		if( value > 0 ){
			if( this._playerHP > value ){
				this._playerHP -= value;
				//this.trigger('playerHPDecrease');
			}
			else {
				this._playerHP = 0;
				//this.trigger('playerHPDecrease');
				//this.trigger('playerHPEmpty');
			}
			
		}
		return this;
	},
	
	addHP: function( value ){
		if( value > 0 ){
			this._playerHP += value;
			if( this._playerHP > this._playerMaxHP ){
				this._playerHP = this._playerMaxHP
			}
			this.trigger('playerHPIncrease');
		}
		return this;
	},
	
	onPlayerHPEmpty: function(){
	}
});

Crafty.c('healthBar', {
	_barColor: 'rgba(255, 0, 0, 0.5)',
	_player: null,
	
	
	init: function(){
		this.requires('Color');
		this.visible = false;
	},
	
	initBar: function( p ){
		var _this = this;
		this._player = p;
		this.attr({
			w: p.w,
			h: 10,
			x: p.x,
			y: p.y + this.h,
			z: 100
		});
		this.bind('enterframe', this.updateBar );
		this._player.bind('mouseover', function(){
			_this.visible = true;
		}).bind('mouseout', function(){
			_this.visible = false;
		});
	},
	
	updateBar: function(){
		
		this._updateBarPos();
		this._updateBarWidth();
		this.drawBar();
	},
	
	_updateBarPos: function(){
		this.attr({
			x: this._player.x,
			y: this._player.y + this.h
		});
	},
	
	_updateBarWidth: function(){
		this.w = parseInt( this._player.w * this._player._playerHP / this._player._playerMaxHP );
	},
	
	drawBar: function(){
		if( this.visible ){
			this.color( this._barColor );
		}
	}
});

Crafty.c('playerHealthBar',{

	init: function(){
		this.requires('playerHealth');
		this._playerHealthBar = Crafty.e('2D, Canvas, healthBar');
		this._playerHealthBar.initBar( this );
	}
});

