/**
 * game framework - ny.js
 * @author Neekey<ni184775761@gmail.com>
 */
 
(function( util ){

/**
 * 添加成员到一个对象上
 * @param {object} tarObj
 * @param {object} fnObj
 */
util.addMember = function( tarObj, fnObj ){
	for( i in fnObj ){
		tarObj[i] = fnObj[i];
	}
};

/**
 * 常用操作的工具集合
 */
util.addMember( util, {
	
	/**
	 * 根据 类名 和 id 或者 标签名称 获取元素
	 * @example getDom('.class'), getDom('#id'), getDom('a');
	 * @param {String} selector
	 * @param {Element} dom
	 * @returns {Element|Array}
	 */
	getDom: function( selector, dom ) {
		// 去除首尾的空格
		selector = selector.replace( /(^\s+|\s+$)/g, '' );
		if( selector.charAt( 0 ) == '.' ){
			return ( dom || document ).getElementsByClassName( selector.substring( 1 ) );
		}
		else if( selector.charAt( 0 ) == '#' ){
			return document.getElementById( selector.substring( 1 ) );
		}
		else{
			return ( dom || document ).getElementsByTagName( selector );
		}
	},
	
	/**
	 * 获取 computedStyle 
	 * @param {Element} dom
	 * @param {String} type
	 * @param {Boolean} 若为真，则对 'auto', 'inherit' 等属性置为 '0' 
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
	 * 设置dom Style属性
	 * @param {Element} dom
	 * @param {String} type
	 * @param {String} value 若不给定则输出当前属性值
	 */
	domStyle: function(){
		var dom = arguments[ 0 ];
		// 单个属性
		if( this.getType( arguments[ 1 ] ) == 'String' ){
			var type = arguments[ 1 ], value = arguments[ 2 ];
			if( value === undefined ){
				return this.getComputedStyle( dom, type );
			}
			else{
				dom.style.setProperty( type, value );
			}
		}
		// 多个属性
		else if(  this.getType( arguments[ 1 ] ) == 'Object' ) {
			var attr, styObj = arguments[ 1 ];
			for( attr in styObj ){
				dom.style.setProperty( attr, styObj[ attr ] );
			}
		}
	},
	
	/**
	 * 根据 给定的 html 字符串 返回dom对象
	 * @param {String} html
	 * @returns {Element} 
	 */
	html: function( html ){
		var _dom = document.createElement();
		_dom.innerHTML = html;
		return _dom.firstChild;
	},
	
	/**
	 * 对dom进行简单的 操作
	 * @param {Element} dom
	 * @param {String} type 操作类型 'append' 'prepend' 'after' 'before'
	 * @param {Element} tarDom 若 type 为 'after' 或者 'before'， 该参数将被忽略
	 */
	domHandle: function( dom, type, tarDom ){
		// 若tarDom 非法，则置为 document
		if( this.getType( dom ) == 'DOM' ) {
			tarDom = this.getType( tarDom ) == 'DOM' ? tarDom : document;  
			switch( type ){
				case 'append':
					tarDom.appendChild( dom );
					break;
				case 'prepend':
					tarDom.insertBefore( dom, tarDom.firstChild );
					break;
				case 'after':
					if( tarDom.parentNode ){
						tarDom.parentNode.insertBefore( dom, tarDom.nextSibling );
					}
					break;
				case 'before':
					if( tarDom.parentNode ){
						tarDom.parentNode.insertBefore( dom, tarDom );
					}
					break;
				case 'remove':
					if( dom.parentNode ){
						dom.parentNode.removeChild( dom );
					}
					break;
				case 'empty':
					while ( dom.firstChild ) {
						dom.removeChild( dom.firstChild );
					}
					break;
				default:
					break;
			}
		}
	},
	
	/**
	 * 获得数据类型
	 * @param {All} o
	 * @returns {String} 返回数据类型 
	 */
	getType: function( o ){
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
	 * 简单的继承，只集成了原型部分。对构造函数不做处理
	 * @parent {Function} parent
	 * @parent {Function} child
	 */
	extend: function( parent, child ){
		if( child.prototype && parent.prototype ){
			// 建立一个空的构造函数
			var _patent = function(){},
			// 备份子类的原型
			childPrototype = child.prototype;
			// 将父类的原型赋予这个空的构造函数
			_patent.prototype = parent.prototype;
			
			child.prototype = new _patent();
			this.addMember( child.prototype, childPrototype );
			// 设置子类构造函数
			child.prototype.constructor = child;
			/**
			 * 通过以上步骤，可以实现 实例 s
			 * s instanceof child && s instanceof parent 均为true
			 */
			return child;
		}
	}
} );

})( $n.util )