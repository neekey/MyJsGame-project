
( function( util, res, e, cfg, $n ){
	
util.addMember( res, $r );

util.addMember( res, {

	getSuffix: function( type ){
		
	},
	
	getUrl: function( type, name ){
		return cfg.getUrl( type, name );
	},
	
	getAppControllerUrl: function( name ){
		return cfg.getUrl( 'appController', name );
	},
	
	getStageControllerUrl: function( name ){
		return cfg.getUrl( 'stageController', name );
	},
	
	getSceneControllerUrl: function( name ){
		return cfg.getUrl( 'sceneController', name );
	},
	
	/**
	 * 对下载好的资源进行预处理
	 * 
	 */
	resourceHandle: function( type, data, name ){
		if( type && data && name && typeof type == 'string' && typeof name == 'string' ){
			
			switch( type ){
				case 'view':
					$n.view.addView( data, name );
					break;
				default:
					break;
			}
		}
		else {
			e.exit( '资源预处理失败！参数有误！' );
		}
	}
});

var resourceBasePath = {
	
};
	
} )( $n.util, $n.resource, $n.error, $n.config, $n );