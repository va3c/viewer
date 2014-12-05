
	VHR.loadFileHTMLByURL = function( fileName, callback ) {

//		var callback = callback ? callback : function () {} ;

		var iframes = document.getElementsByTagName( 'iframe' );

		for ( var i = 0, len = iframes.length; i < len; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );

		}

		VHR.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		VHR.ifr.height = window.innerHeight;
		VHR.ifr.width = window.innerWidth;
		VHR.ifr.style.cssText = 'border-width: 0; position: absolute; z-index: -10; ';

		VHR.ifr.onload = function() {

			app = VHR.ifr.contentWindow;

			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			camera = app.camera;
			controls = app.controls;
			material = app.material;

			callback();

		};

		VHR.ifr.src = fileName;

	};
