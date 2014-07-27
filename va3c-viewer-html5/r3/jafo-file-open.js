// all code here derived from https://github.com/mrdoob/three.js/blob/master/editor/js/Loader.js

	var JAFO = {} || JAFO;

	JAFO.count = 0;

	JAFO.addFileOpenTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Open a file';
		tab.innerHTML =
			'<a href=# id=tabFileOpen ><p class=button >' +
				'<i class="fa fa-paw"></i> File Open...' +
			'</p></a>'; 
		tabFileOpen.onclick = function() { JA.toggleTab( JAFO.FileOpen ); };

		JAFO.FileOpen = JA.menu.appendChild( document.createElement( 'div' ) );
		JAFO.FileOpen.style.cssText = 'cursor: auto; display: none; ' ;
		JAFO.FileOpen.innerHTML =
			'<p>Select a file to load</p>' +
			'Scale: <input type=number id=inpScale value=1.000 max=1000 min=0.001 step=0.1 /><br>' +
			'<p>Append file: <input type=file id=inpAppendFile ></p>' +
			'<p>Open file: <input type=file id=inpOpenFile ></p>' +
		'';
		inpAppendFile.onchange = function() { JAFO.appendFile ( this ); };
		inpOpenFile.onchange = function() { JAFO.openFile ( this ); };

	};

	JAFO.appendFile = function ( that ) {

		var filename = that.files[0].name;
		var scale = inpScale.value;
		var reader = new FileReader();

		reader.addEventListener( 'load', function ( event ) {
			var contents = reader.result;
			JAFO.switchType( filename, contents, scale );
		}, false );

		reader.readAsText( that.files[0] );

	};

	JAFO.openFile = function ( that ) {

		V3LI.ifr.onload = function() {
			app = V3LI.ifr.contentWindow;

			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			scene.select = app.mesh;
			camera = app.camera;
			controls = app.controls;
			material = app.material;

			var filename = that.files[0].name;
			var scale = inpScale.value;
			var reader = new FileReader();

			reader.addEventListener( 'load', function ( event ) {
				var contents = reader.result;
				JAFO.switchType( filename, contents, scale );
			}, false );

			reader.readAsText( that.files[0] );

			renderer.shadowMapEnabled = true;
			renderer.shadowMapSoft = true;
//			scene.add( camera );  // to track light

			chkLightAmbient.checked = true;
			JALI.toggleLightAmbient();

			chkLightCamera.checked = true;
			JALI.toggleLightCamera();

			chkLightPosition.checked = true;
			JALI.toggleLightPosition();

			JAPR.setRandomGradient();

		}
		V3LI.ifr.src = 'boilerplate-simple.html';

	};

	JAFO.switchType = function ( filename, contents, scale ) {
console.log( 'switch - extension', extension, filename);
		var extension = filename.split( '.' ).pop().toLowerCase();

		switch ( extension ) {
			case 'html' :
// console.log( filename);
				break;

			case 'dae':
				JAFO.loadDAE( contents, filename, scale );
				break;

			case 'js':
			case 'json':

			case '3geo':
			case '3mat':
			case '3obj':
			case '3scn':
console.log( 'stype', filename );
				JAFO.loadJSON( contents, filename, scale );

				break;

			case 'obj':
				JAFO.loadOBJ( contents, filename, scale );
				break;

			case 'stl':
				JAFO.loadSTL( contents, filename, scale );
				break;

			case 'vtk':
				JAFO.loadVTK( contents, filename, scale );
				break;

			case 'wrl':
				JAFO.loadVRML( contents, filename, scale );
				break;

			default:
				alert( 'Unsupported file format.' );
				break;
		}
	};

	JAFO.loadDAE = function ( contents, filename, scale ) {
		scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = function() {

			var parser = new DOMParser();
			var xml = parser.parseFromString( contents, 'text/xml' );

			var loader = new THREE.ColladaLoader();
			loader.parse( xml, function ( collada ) {

				collada.scene.name = filename;
				scene.add( collada.scene );

			} );
		};
		scr.src = V3LI.loaderBase + 'js/loaders/ColladaLoader.js';
	};

	JAFO.loadJSON = function ( contents, filename, scale ) {
console.log( 'lj', filename );
		if ( contents.indexOf( 'postMessage' ) !== -1 ) {
			var blob = new Blob( [ contents ], { type: 'text/javascript' } );
			var url = URL.createObjectURL( blob );
			var worker = new Worker( url );
			worker.onmessage = function ( event ) {
				event.data.metadata = { version: 2 };
				JAFO.handleJSON( event.data, filename, scale );
			};
			worker.postMessage( Date.now() );
			return;
		}
		// >= 3.0
		var data;
		try {
			data = JSON.parse( contents );
		} catch ( error ) {
			alert( error );
			return;
		}
		JAFO.handleJSON( data, filename, scale );
	};

	JAFO.loadOBJ = function ( contents, filename, scale ) {
		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = function() {

			var object = new THREE.OBJLoader().parse( contents );

			mesh = object.children[0];
			mesh.name = filename;
			mesh.material = new THREE.MeshPhongMaterial();
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		scr.src = V3LI.loaderBase + 'js/loaders/OBJLoader.js';
	};

	JAFO.loadSTL = function ( contents, filename, scale ) {

		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.src = V3LI.loaderBase + 'js/wip/TypedGeometry.js';

		scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = function() {

			geometry = new THREE.STLLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		scr.src = V3LI.loaderBase + 'js/loaders/STLLoader.js';
	};

	JAFO.loadVTK = function ( contents, filename, scale ) {
		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = function() {

			geometry = new THREE.VTKLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			mesh.name = filename;
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		scr.src = V3LI.loaderBase + 'js/loaders/VTKLoader.js';
	};

	JAFO.loadVRML = function ( contents, filename, scale ) {
		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = function() {

			object = new THREE.VRMLLoader().parse( contents );

			mesh = object.children[0];
			mesh.name = filename;
			mesh.material = new THREE.MeshPhongMaterial();
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( object );
			scene.select = mesh;

		};
		scr.src = V3LI.loaderBase + 'js/loaders/VRMLLoader.js';
	};


	JAFO.handleJSON = function ( data, filename, scale ) {
		var loader, result;
console.log( 'handle' );
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
			loader = new THREE.JSONLoader();
			result = loader.parse( data );

			geometry = result.geometry;
//			material;

			if ( result.materials !== undefined ) {
				if ( result.materials.length > 1 ) {
					material = new THREE.MeshFaceMaterial( result.materials );
				} else {
					material = result.materials[ 0 ];
				}
			} else {
				material = new THREE.MeshPhongMaterial();
			}

			geometry.sourceType = "ascii";
			geometry.sourceFile = filename;

			var mesh = new THREE.Mesh( geometry, material );
			mesh.name = filename;
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			mesh.scale.set( scale, scale, scale );

			scene.add( mesh );
			scene.select = mesh;
//console.log( 'geometry', result );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loader = new THREE.ObjectLoader();
			result = loader.parse( data );

			if ( result instanceof THREE.Scene ) {

//				scene = result;
				scene.add( result );
//console.log( 'scene', result );
			} else {

				scene.add( result );
				scene.select( result );
//console.log( 'object', result );

			}

		} else if ( data.metadata.type.toLowerCase() === 'scene' ) {

			// DEPRECATED

			loader = new THREE.SceneLoader();
			loader.parse( data, function ( result ) {

				scene.add( result.scene );
//console.log( 'scene old', result );
			}, '' );

		}

	};

	JAFO.requestFile = function( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous"; 
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	};
