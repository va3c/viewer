

	function loadFileHTMLbyContents( contents, parameters  ) {

		var parameters = parameters || 'nothing';

		parameters = parameters.split('#');

		var iframes = document.getElementsByTagName( 'iframe' ) ;

		for ( var i = 0, len = iframes.length; i < len; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );

		}

		ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		ifr.height = window.innerHeight;
		ifr.width = window.innerWidth;
		ifr.style.cssText = 'border-width: 0; position: absolute; z-index: -10; ';

		ifr.onload = function() {

			location.hash = '';

//ifr.contentWindow.Detector = Detector;
//ifr.contentWindow.THREE = THREE;
//ifr.contentWindow.TrackballControls = TrackballControls;

			app = ifr.contentWindow;
			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			camera = app.camera;
			controls = app.controls;
			material = app.material;


			if ( parameters.indexOf( 'displayInfo' ) > -1 ) { 

				menuLeft.style.display = ''; 

			 } else {

				menuLeft.style.display = 'none'; 

			}

			callbackIframe();

		}

		ifr.srcdoc = contents;

//console.log( 'loadFileHTML', parameters, fileName );

	}

	