

	dragAndDropJSONFiles()

	function dragAndDropJSONFiles() {


		displayMarkdown( 'drag-and-drop-json-files.md', info );

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

			callbackIframe = function() {

				addDADEvents();

console.log( 'callbackIframe DAD' );

			}

		} else {

			addDADEvents();

		}
	}

	function callbackDAD () {

		callbackIframe = callbackIframeDefault;

console.log( 'callbackLoadSTL' );

	}

	function addDADEvents() {

		renderer.domElement.addEventListener( 'dragover', function ( event ) {

			event.preventDefault();

			event.dataTransfer.dropEffect = 'copy';

		}, false );


		renderer.domElement.addEventListener( 'drop', function ( event ) {
console.log( 'event' );
			event.preventDefault();

			readFile( event.dataTransfer );

		}, false );

	}

/*
	dragAndDropJSONFiles()

	function dragAndDropJSONFiles() {

		location.hash = '';

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

		}

		renderer.domElement.addEventListener( 'dragover', function ( event ) {

			event.preventDefault();

			event.dataTransfer.dropEffect = 'copy';

		}, false );


		renderer.domElement.addEventListener( 'drop', function ( event ) {
console.log( 'event' );
			event.preventDefault();

			readFile( event.dataTransfer );

		}, false );

console.log( 'dragAndDropJSONFiles' );

		displayMarkdown( 'drag-and-drop-json-files.md', info );

	}

*/


	function readFile( that ) {
thing = that;
console.log( that );

		name = that.files[0].name;

		var reader = new FileReader();
		reader.addEventListener( 'load', function ( event ) {

			var contents = reader.result;
			processFile( contents, that.files[0] ) 

		}, false );

		reader.readAsText( that.files[0] );

	}

	var texturePath;

	function processFile( data ) {

		var loader, contents, geomtery, material, mesh;
//		scene = new THREE.Scene();

		data = JSON.parse( data );

		if ( data.metadata === undefined ) { // 2.0
			data.metadata = { type: 'Geometry' };
		}
		if ( data.metadata.type === undefined ) { // 3.0
			data.metadata.type = 'Geometry';
		}
		if ( data.metadata.version === undefined ) {
			data.metadata.version = data.metadata.formatVersion;
		}

		if ( data.metadata.type.toLowerCase() === 'geometry' ) {
console.log( 'found geometry' );

			loader = new THREE.JSONLoader();
			contents = loader.parse( data, texturePath  );

			geometry = contents.geometry, material;

			if ( contents.materials !== undefined ) {
// console.log( 'found materials', contents.materials );
				if ( contents.materials.length > 1 ) {
					material = new THREE.MeshFaceMaterial( contents.materials );
				} else {
					material = contents.materials[ 0 ];
				}
			} else {
				material = new THREE.MeshPhongMaterial();
			}

			var mesh = new THREE.Mesh( geometry, material );

			scene.add( mesh );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loader = new THREE.ObjectLoader();
			contents = loader.parse( data );

			if ( contents instanceof THREE.Scene ) {
console.log( 'found scene' );

				scene.add( contents );

			} else {
console.log( 'found object', contents );

				scene.add( contents );

			}
		} else if ( data.metadata.type.toLowerCase() === 'scene' ) {
console.log( 'found a deprecated scene');

			var loader = new THREE.SceneLoader();
			loader.load( data, function ( contents ) {

				scene.add( contents );

			} );

		} else {

console.log( 'found a whoopsie');

		}

//		zoomExtents();
//		menu.innerHTML = '<h3>File: ' + name + '<h3>';
	}
