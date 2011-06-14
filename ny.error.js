
( function( e ){

/**
 * throw an error, an stop script executing
 * @param {String} msg
 */
e.exit = function( msg ){
	this.log( msg, 'Error' );
	throw new Error( msg );
};

/**
 * save info to logList, if in FF and chrome, this method will alse output info to the console
 * @param {String} msg
 * @param {String} type [optional]
 */
e.log = function( msg, type ){
	type = type || 'Info';
	logList.push( [ type, msg ] );
	if( console && console.log ){
		console.log( '[ ' + type + ' ] ' + msg );
	}
};

/**
 * return logList
 */
e.getLog = function(){
	return logList;
};

/**
 * info list
 * @private
 */
var logList = [];

} )( $n.error );