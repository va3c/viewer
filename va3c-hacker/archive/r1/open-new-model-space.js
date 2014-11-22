
	openNewModelSpace();

	function openNewModelSpace() {

		var iframes = document.getElementsByTagName( 'iframe' ) ;

		for ( var i = 0, len = iframes.length; i < len; i++ ) {
			iframes[0].parentNode.removeChild( iframes[ 0 ] );
		}

		var ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		ifr.height = window.innerHeight;
		ifr.width = window.innerWidth;
		ifr.style.cssText = 'border-width: 0; position: absolute; z-index: -10; ';

		ifr.onload = function() {

			app = ifr.contentWindow;
			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			camera = app.camera;
			controls = app.controls;
			material = app.material;

			mesh = new THREE.GridHelper( 100, 20 );
			scene.add( mesh );

			if ( info.style.display === '' ) { info.style.display = 'none'; }

			callbackIframe();

		}

		ifr.src = '../templates/template-basic.html';

	}


