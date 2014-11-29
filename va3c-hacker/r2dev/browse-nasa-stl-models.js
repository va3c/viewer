
	viewNasaStlModels ();

	function viewNasaStlModels () {

			displayMarkdown ( '../../../nasa-samples/readme.md', info );

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

			callbackIframe = function() {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL() );

console.log( 'callbackIframe NASA:' );

			}

		} else {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL() );

		}
	}

	function callbackLoadSTL () {

		callbackIframe = callbackIframeDefault;

console.log( 'callbackLoadSTL' );

	}

