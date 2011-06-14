
( function( $n ){
/**
 * the interface class
 * @constructor
 * @private
 * @param {String} name 
 * @param {Object} methods
 */
var Interface = function( name, methods ){
	
	if(arguments.length != 2) {
		throw new Error("Interface constructor called with " + arguments.length
		+ "arguments, but expected exactly 2.");
	}
    
	var i, j;
	this.name = name;
	this.methods = { fn: [], attr: [] };
	for( j in methods ){
		
		if(  j == 'fn' || j == 'attr' ){
			if( methods[ j ].constructor == Array ){
			
				for( i = 0, len = methods[ j ].length; i < len; i++) {
					if(typeof methods[ j ][ i ] !== 'string') {
						throw new Error("Interface constructor expects method names to be " 
						+ "passed in as a string.");
					}
					this.methods[ j ].push(methods[ j ][ i ]);        
				}
			}
			else {
				throw new Error("Interface constructor expects method member to be " 
					+ "Array of String");
			}
		}
		else {
			throw new Error("Interface constructor expects method member to be " 
					+ "'fn' or 'attr'.");
		}
	}
};

/**
 * interface namespace and create an instance of interface add to interfaceList
 * @param {String} name 
 * @param {Array[String]} methods
 */
$n.interface = function(name, methods) {
	
	interfaceList[ name ] = new Interface( name, methods );
	
};

// Static class method.
$n.interface.ensure = function( object ) {
	if(arguments.length < 2) {
		throw new Error("Function Interface.ensureImplements called with " + 
		arguments.length  + "arguments, but expected at least 2.");
	}

	var interface, i, j, k;
	for(var i = 1, len = arguments.length; i < len; i++) {
		
		// get interface
		if( typeof arguments[i] == 'string' ){
			interface = interfaceList[ arguments[ i ] ];
		}
		else {
			interface = arguments[ i ];
		}
		// check interface
		if(interface.constructor !== Interface) {
			throw new Error("Function Interface.ensureImplements expects arguments "   
			+ "two and above to be instances of Interface.");
		}
		
		for( k in interface.methods ){
	
			for( j = 0, methodsLen = interface.methods[ k ].length; j < methodsLen; j++) {
				var method = interface.methods[ k ][ j ];
				if(!object[ method ] || ( k == 'fn' && typeof object[ method ] !== 'function') ) {
				throw new Error("Function Interface.ensureImplements: object " 
					+ "does not implement the " + interface.name 
					+ " interface. " + ( k == 'fn' ? 'Method' : 'attribute' ) + " " + method + " was not found.");
				}
			}
		}
		
	} 
	return true;
};

/**
 * get interface by name
 * @param {String}
 */
$n.interface.get = function( name ){
	
		return interfaceList[ name ]
};

/**
 * @private to store all the interface instance
 */
var interfaceList = {};

})( $n );