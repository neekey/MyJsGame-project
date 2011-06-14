Crafty.extend({
	/**
	 * 获得数据类型
	 * @param {All} o
	 * @returns {String} 返回数据类型 
	 */
	$getType: function( o ){
		var toString = Object.prototype.toString;
		if( o === null || o === undefined ){
			return String( o );
		}
		else {
			var typeStr = /\[object\s(\w+)\]/.exec( toString.call( o ) )[1];
			if( typeStr.indexOf( 'HTML' ) >= 0 || o === window ){
				return 'DOM';
			}
			else if( o.selector ){
				return 'jQuery';
			}
			else return typeStr;
		}
	},
	
	/**
	 * 进行错误处理
	 */
	$e: {
		/**
		 * throw an error, an stop script executing
		 * @param {String} msg
		 */
		exit: function( msg ){
			this.log( msg, 'Error' );
			throw new Error( msg );
		},

		/**
		 * save info to logList, if in FF and chrome, this method will alse output info to the console
		 * @param {String} msg
		 * @param {String} type [optional]
		 */
		log: function( msg, type ){
			type = type || 'Info';
			if( console && console.log ){
				console.log( '[ ' + type + ' ] ' + msg );
			}
		}
	}
	
});