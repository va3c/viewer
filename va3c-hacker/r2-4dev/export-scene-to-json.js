
	exportSceneToJSON();

	function exportSceneToJSON() {

		VH.displayMarkdown( './export-scene-to-json.md', menuLeft );

		if ( !scene ) {

			alert( 'Please load something to export first' );

			menuLeft.style.display = 'none'; 

			return;

		}

		VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/exporters/SceneExporter.js', function() { console.log( 'SceneExporter loaded'); } );

	}

	function exportScene() {

		var output = scene.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'wonderful.json';
		a.click();
		delete a;

	}