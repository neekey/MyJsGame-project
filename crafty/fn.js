Crafty.extend({
	/**
	 * �����������
	 * @param {All} o
	 * @returns {String} ������������ 
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
	 * ���д�����
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
	},
	
	$dom: {
		/**
		 * ��ȡ computedStyle 
		 * @param {Element} dom
		 * @param {String} type
		 * @param {Boolean} ��Ϊ�棬��� 'auto', 'inherit' ��������Ϊ '0' 
		 * @param {String}
		 */
		getComputedStyle: function( dom, type, ifParse ){
		
			var value = document.defaultView.getComputedStyle( dom )[ type ];
			if( ifParse ){
				ex = /[(auto)(inherit)(null)(undefined)]/;
				value = ( ex.test( String( value ) ) || value == '' ) ? '0' : value;
			}
			return value;
		},
		
		/**
		 * ����dom Style����
		 * @param {Element} dom
		 * @param {String} type
		 * @param {String} value ���������������ǰ����ֵ
		 */
		style: function(){
			var dom = arguments[ 0 ];
			// ��������
			if( typeof arguments[ 1 ] == 'string' ){
				var type = arguments[ 1 ], value = arguments[ 2 ];
				if( value === undefined ){
					return this.getComputedStyle( dom, type );
				}
				else{
					dom.style.setProperty( type, value );
				}
			}
			// �������
			else if(  Crafty.$getType( arguments[ 1 ] ) == 'Object' ) {
				var attr, styObj = arguments[ 1 ];
				for( attr in styObj ){
					dom.style.setProperty( attr, styObj[ attr ] );
				}
			}
		}
	}
	
});