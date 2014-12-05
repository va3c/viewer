
	VH.loadFileHTMLByURL = function( url, callback, width, height, css, parameters ) {

		var callback = callback ? callback : function () {} ;

		parameters = parameters ? parameters : 'none';

		var iframes = document.getElementsByTagName( 'iframe' );

		for ( var i = 0, len = iframes.length; i < len; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );

		}

		VH.ifr = document.body.appendChild( document.createElement( 'iframe' ) );

		VH.ifr.width = width ? width : window.innerWidth;
		VH.ifr.height = height ? height : window.innerHeight;
		VH.ifr.style.cssText = css ? css : 'border-width: 0; position: absolute; z-index: -10; ';

		VH.ifr.onload = function() {

			app = VH.ifr.contentWindow;

			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			camera = app.camera;
			controls = app.controls;
			material = app.material;

			callback();

		};

		VH.ifr.src = url;

	};

	VH.loadFileHTMLByContents = function( contents, callback, width, height, css ) {

		callback = callback ? callback : function () {} ;

		var iframes = document.getElementsByTagName( 'iframe' ) ;

		for ( var i = 0, len = iframes.length; i < len; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );

		}

		VH.ifr = document.body.appendChild( document.createElement( 'iframe' ) );

		VH.ifr.width = width ? width : window.innerWidth;
		VH.ifr.height = height ? height : window.innerHeight;
		VH.ifr.style.cssText = css ? css : 'border-width: 0; position: absolute; z-index: -10; ';

		VH.ifr.onload= function() {

			app = VH.ifr.contentWindow;
			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			camera = app.camera;
			controls = app.controls;
			material = app.material;

			callback();

		}

		VH.ifr.srcdoc = contents;

	}
