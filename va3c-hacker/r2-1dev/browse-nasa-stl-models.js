
	viewNasaStlModels ( location.hash );

	function viewNasaStlModels ( parameters ) {

		displayMarkdown ( '../../../nasa-samples/readme.md', info );

/*
		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

			callbackIframe = function() {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL () );

			}

		} else {

			VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL () );

		}
*/
console.log( 'viewNasaStlModels' );

	}

/*
	function callbackLoadSTL () {

		callbackIframe = callbackIframeDefault;

		VH.loadScript( 'load-file-stl.js' );

console.log( 'callbackLoadSTL' );

	}
*/
