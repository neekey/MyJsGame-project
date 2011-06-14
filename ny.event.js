
(function( util, e ){

util.addMember( e, {
	
	/**
	 * 实现简单的事件绑定
	 * @param {Dom|jQuery|NodeList} target
	 * @param {String} type
	 * @param {Function} callback
	 */
	bind: function(  target, type, callback  ){
		var tarType = util.getType(  target  ), i;
		// 判断target是否合法并处理target
		if( ( tarType == 'DOM' ? ( target = [target], true ) : false ) ||  tarType == 'jQuery' || tarType == 'NodeList' ){
			for( i = 0; target[i]; i++ ){
				// 避免重复绑定函数，对匿名函数同样有效
				if( !target[i][type + callback] ){
					if ( target[i].attachEvent ){
						target[i][type + callback] = function(){ callback.call( target, window.event ); };
						target[i].attachEvent( 'on' + type, target[i][type + callback] ); 
					}
					else{
						target[i][type + callback] = callback;
						target[i].addEventListener(  type, callback, false  );
					}
				}
				
			}
		}
	},
	
	/**
	 * 事件的解除绑定
	 * @param {Dom|jQuery|NodeList} target
	 * @param {String} type
	 * @param {Function} callback  匿名函数也可以，但是要求和原绑定函数的函数体完全一致
	 */
	unbind: function( target, type, callback ){
		var tarType = util.getType( target ), i;
		// 判断target是否合法并处理target
		if( ( tarType == 'DOM' ? ( target = [target], true ) : false ) ||  tarType == 'jQuery' || tarType == 'NodeList' ){
			for( i = 0; target[i]; i++ ){
				// 检查是否绑定过该函数，对匿名函数同样适用
				if( target[i][type + callback]){
					if ( target[i].detachEvent ){
						target[i].detachEvent( 'on' + type, target[i][type+callback] ); 
					}
					else{
						target[i].removeEventListener( type, target[i][type + callback], false ); 
					}
					delete target[i][type + callback]; 
				}
			}
		}
	},
	
	/**
	 * 触发绑定的事件
	 * 这些被出发的事件 将得到 dom 的上下文，但是无法得到 event 事件对象，@TODO: 这个以后解决
	 * @param {Element} dom
	 * @param {String} type
	 */
	trigger: function( dom, type ){
		var i, ex = new RegExp( '\/^' + type + 'function.+' );
		for( i in dom ){
			if( ex.test( i ) ){
				if( this.getType( dom[ i ] ) == 'Function' ){
					if ( target[i].attachEvent ){
						dom[ i ].call( dom );
					}
				}
			}
		}
	}
	
} );

})( $n.util, $n.event );