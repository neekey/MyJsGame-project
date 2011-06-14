window.onload = function() {
    //start crafty
    Crafty.init(50, 600, 600); // 50 frames/sec, 600x600 pixels
    Crafty.canvas();

	Crafty.c('cairotile',{
	  _tileframe: 0,
	  _currcolor: 0,
	  _nextcolor: 1,
	  _flipping: false,



	  init: function() {
	    this.bind('enterframe',this.randoflip);
		},
		
	  doflip: function() {
	   this.removeComponent("color"+this._currcolor+this._tileframe);
	   this._tileframe++;
	   if (this._tileframe==6) this._currcolor = this._nextcolor;
	   if (this._tileframe==12) {
			this._tileframe=0;
			this._flipping=false;
			this.unbind('enterframe',this.doflip);
			this.bind('enterframe',this.randoflip);
			}
	   this.addComponent("color"+this._currcolor+this._tileframe);
	   },

	  setupflip: function(newcolor) {
		this._nextcolor=newcolor;
		this._tileframe=0;
		this._flipping=true;
			this.bind('enterframe',this.doflip);
			this.unbind('enterframe',this.randoflip);
		},
				
	  randoflip: function() {
		if (Crafty.randRange(0,99)==0) this.setupflip(Crafty.randRange(0,7));
		},
		
	  });
    
    //turn the sprite map into usable components
    Crafty.sprite(6, "CairoTiles12x8.png", {
 	  color00: [0,0,19,13],  color01: [19,0,19,13],  color02: [38,0,19,13],  color03: [57,0,19,13],  color04: [76,0,19,13],  color05: [95,0,19,13],  color06: [114,0,19,13],  color07: [133,0,19,13],  color08: [152,0,19,13],  color09: [171,0,19,13],  color010: [190,0,19,13],  color011: [209,0,19,13], 
	  color10: [0,13,19,13],  color11: [19,13,19,13],  color12: [38,13,19,13],  color13: [57,13,19,13],  color14: [76,13,19,13],  color15: [95,13,19,13],  color16: [114,13,19,13],  color17: [133,13,19,13],  color18: [152,13,19,13],  color19: [171,13,19,13],  color110: [190,13,19,13],  color111: [209,13,19,13], 
	  color20: [0,26,19,13],  color21: [19,26,19,13],  color22: [38,26,19,13],  color23: [57,26,19,13],  color24: [76,26,19,13],  color25: [95,26,19,13],  color26: [114,26,19,13],  color27: [133,26,19,13],  color28: [152,26,19,13],  color29: [171,26,19,13],  color210: [190,26,19,13],  color211: [209,26,19,13], 
	  color30: [0,39,19,13],  color31: [19,39,19,13],  color32: [38,39,19,13],  color33: [57,39,19,13],  color34: [76,39,19,13],  color35: [95,39,19,13],  color36: [114,39,19,13],  color37: [133,39,19,13],  color38: [152,39,19,13],  color39: [171,39,19,13],  color310: [190,39,19,13],  color311: [209,39,19,13], 
	  color40: [0,52,19,13],  color41: [19,52,19,13],  color42: [38,52,19,13],  color43: [57,52,19,13],  color44: [76,52,19,13],  color45: [95,52,19,13],  color46: [114,52,19,13],  color47: [133,52,19,13],  color48: [152,52,19,13],  color49: [171,52,19,13],  color410: [190,52,19,13],  color411: [209,52,19,13], 
	  color50: [0,65,19,13],  color51: [19,65,19,13],  color52: [38,65,19,13],  color53: [57,65,19,13],  color54: [76,65,19,13],  color55: [95,65,19,13],  color56: [114,65,19,13],  color57: [133,65,19,13],  color58: [152,65,19,13],  color59: [171,65,19,13],  color510: [190,65,19,13],  color511: [209,65,19,13], 
	  color60: [0,78,19,13],  color61: [19,78,19,13],  color62: [38,78,19,13],  color63: [57,78,19,13],  color64: [76,78,19,13],  color65: [95,78,19,13],  color66: [114,78,19,13],  color67: [133,78,19,13],  color68: [152,78,19,13],  color69: [171,78,19,13],  color610: [190,78,19,13],  color611: [209,78,19,13], 
	  color70: [0,91,19,13],  color71: [19,91,19,13],  color72: [38,91,19,13],  color73: [57,91,19,13],  color74: [76,91,19,13],  color75: [95,91,19,13],  color76: [114,91,19,13],  color77: [133,91,19,13],  color78: [152,91,19,13],  color79: [171,91,19,13],  color710: [190,91,19,13],  color711: [209,91,19,13], 
    });
    
/*    //method to randomy generate the map
    function generateWorld() {
		Crafty.e("2D, DOM, color0, animate")
			.attr({x:100,y:100})
			.animate("tileanimation",0,11,5);
    }
*/    
    //the loading screen that will display while our assets load
    Crafty.scene("loading", function() {
        //load takes an array of assets and a callback when complete
        Crafty.load(["CairoTiles12x8.png"], function() {
            Crafty.scene("main"); //when everything is loaded, run the main scene
        });
        
        //black background with some loading text
        Crafty.background("#080");
        Crafty.e("2D, DOM, text").attr({w: 100, h: 20, x: 150, y: 120})
            .text("Loading")
            .css({"text-align": "center"});
    });
    
    //automatically play the loading scene
    Crafty.scene("loading");
    
    Crafty.scene("main", function() {
//        generateWorld();
                     
        //create our player entity with some premade components
/*        var tile = Crafty.e("2D, DOM, color4,animate")
            .attr({x: 100, y: 100, z: 1,rotation:0})
			.origin(57,39)
			.animate("spin",0,4,11)
            .bind("enterframe", function() {
              if (!this.isPlaying())
                this.animate("spin", 8);
			});
*/			
		var offx=[0,78,155,77];
		var offy=[0,-38,-1,38];
		var rota=[90,0,270,180];
		var width=230;
		var height=114;
		for (i=0;i<5;i++) for (j=0;j<5;j++) for (t=0;t<4;t++) {

			Crafty.e("2D, DOM, color00, cairotile")
				.attr({x: (-width/2-28)+i*width+offx[t]+(j%2*width/2), y: 38+j*height+offy[t], z: 2, rotation: rota[t] })
				.origin(57,39);
			};
    });
};