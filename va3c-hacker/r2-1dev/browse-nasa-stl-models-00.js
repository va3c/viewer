
	viewNasaStlModels ( location.hash );

	function viewNasaStlModels ( parameters ) {

//		if ( !parameters ) return;

//		parameters = location.hash.split('#');

		displayMarkdown ( '../../../nasa-samples/readme.md', info );

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

			callbackIframe = function() {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL () );

//				VH.loadScript( 'load-file-stl.js' );

console.log( 'callbackIframe NASA:' );

			}

		} else {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL () );

//				VH.loadScript( 'load-file-stl.js' );

		}

	}

	function callbackLoadSTL () {

		callbackIframe = callbackIframeDefault;

		VH.loadScript( 'load-file-stl.js' );

//		parameters = hash.split('#');

//		fileName = parameters[2] ;

//		if ( fileName ) { location.hash = '#load-file-stl.js#' + foolName; }

console.log( 'callbackLoadSTL' );

	}

