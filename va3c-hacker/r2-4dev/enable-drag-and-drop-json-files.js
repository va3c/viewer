

	dragAndDropJSONFiles()

	function dragAndDropJSONFiles() {


		VH.displayMarkdown( 'enable-drag-and-drop-json-files.md', menuLeft );

		if ( !scene || parameters.indexOf( 'add=true' ) === -1 ) {

			VH.loadFileHTMLByURL( template, function() {

//			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo', function() {

				addDADEvents();

console.log( 'callbackIframe DAD' );

			} );

		} else {

			addDADEvents();

		}
	}

	function callbackDAD () {

		callbackIframe = callbackIframeDefault;

console.log( 'callbackDAD' );

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

				if ( contents.materials.length > 1 ) {
					material = new THREE.MeshFaceMaterial( contents.materials );
				} else {
					material = contents.materials[ 0 ];
				}

// console.log( 'found materials', contents.materials );

			} else {

				material = new THREE.MeshPhongMaterial();

			}

			var mesh = new THREE.Mesh( geometry, material );

			scene.add( mesh );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loader = new THREE.ObjectLoader();
			contents = loader.parse( data );

			if ( contents instanceof THREE.Scene ) {

				scene.add( contents );

console.log( 'found scene' );

			} else {

				scene.add( contents );

console.log( 'found object', contents );

			}
		} else if ( data.metadata.type.toLowerCase() === 'scene' ) {

			var loader = new THREE.SceneLoader();
			loader.load( data, function ( contents ) {

				scene.add( contents );

			} );

console.log( 'found a deprecated scene');

		} else {

console.log( 'found a whoopsie');

		}

//		zoomExtents();
//		menu.innerHTML = '<h3>File: ' + name + '<h3>';
	}
