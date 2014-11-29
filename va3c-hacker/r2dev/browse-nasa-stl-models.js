
	viewNasaStlModels ( location.hash );

	function viewNasaStlModels ( parameters ) {

		if ( !parameters ) return;

		parameters = location.hash.split('#');

		foolName = parameters[2];

		displayMarkdown ( '../../../nasa-samples/readme.md', info );

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

			callbackIframe = function() {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL( foolName ) );

				VH.loadScript( 'load-file-stl.js', callbackLoadSTL( foolName ) );

console.log( 'callbackIframe NASA:', foolName );

			}

		} else {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL( foolName ) );

		}
	}

	function callbackLoadSTL ( foolName ) {

		callbackIframe = callbackIframeDefault;

		location.hash = '#load-file-stl.js#' + foolName;

console.log( 'callbackLoadSTL', foolName );

	}

