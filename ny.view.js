
( function( util, res, e, v ){
	
util.addMember( v, {
	
	/**
	 * 根据给定的视图名称和数据，渲染视图
	 * @param {String} name
	 * @param {Object} obj optional, 如果不给定，则直接输出视图的字符串
	 * @returns {String}
	 */
	render: function( name, obj ){
		
		var v = this.getView( name );
		if( v ){
			return v( obj );
		}
		else {
			e.log( '视图 ' + name + ' 不存在!', 'warning' );
		}
	},
	
	/**
	 * 根据视图名称获取视图
	 * @param {String} name
	 * @returns {Function}
	 */
	getView: function( name ){
		return viewList[ name ];
	},
	
	/**
	 * 向视图列表中添加试图
	 * @param {String} str 试图字符串
	 * @param {String} name 视图的名称
	 */
	addView: function( str, name ){
		// 检查参数是否正确
		if( str && name && typeof str == 'string' && typeof name == 'string' ){
			var t = this.tmpl( str );
			viewList[ name ] = t;
		}
		else {
			e.log( 'addView 参数有误！', 'warning' );
		}
	},
	
	/**
	 * 视图的动态加载
	 */
	load: function( name, callback ){
		var _this = this;
		res.load({
			url: [ res.getUrl( 'view', name ) + ' ' + name ],
			callback: function( m ){
				_this.addView( m[ name ].data, name );
				if( callback ){
					callback.apply( this, arguments );
				}
			}
		});
	}
});
	
/**
 * 视图列表
 * @private
 */
var viewList = {};

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
  
  v.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
      
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        // if obj not specified , return str
	"if( !obj ){ return '" + str.replace(/[\r\t\n]/g, " ") + "'; } " +
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})( v );
	
} )( $n.util, $n.resource, $n.error, $n.view )