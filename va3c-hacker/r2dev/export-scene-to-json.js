
	exportSceneToJSON();

	function exportSceneToJSON() {

		location.hash = '';

		displayMarkdown( './export-scene-to-json.md', info );

		VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/exporters/SceneExporter.js', callbackLoadSTL() );

	}

	function exportScene() {

		var output = scene.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'wonder.json';
		a.click();
		delete a;


	}