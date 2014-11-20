
	viewNasaStlModels ();

	function viewNasaStlModels () {

			displayMarkdown ( 'view-nasa-stl-models.md', info );

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

			callbackIframe = function() {

console.log( 'callbackIframe NASA:' );

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL() );
			}

		} else {

				VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackLoadSTL() );

		}
	}

	function callbackLoadSTL () {

		callbackIframe = callbackIframeDefault;

console.log( 'callbackLoadSTL' );

	}

