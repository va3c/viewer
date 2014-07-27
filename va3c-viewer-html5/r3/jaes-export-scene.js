	var JAES = {} || JAES;

	JAES.count = 0;

	JAES.addExportSceneTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Export current view to a data file';
		tab.innerHTML =
			'<a href=# id=tabExportScene ><p class=button >' +
				'<i class="fa fa-paw"></i> Save Scenes...' +
			'</p></a>'; 
		tabExportScene.onclick = function() { JA.toggleTab( JAES.exportScene ); };

		JAES.exportScene = JA.menu.appendChild( document.createElement( 'div' ) );
		JAES.exportScene.style.cssText = 'cursor: auto; display: none; ' ;
		JAES.exportScene.innerHTML =
			'<p>Save what you have created...</p>' +
			'<p><a href=# onclick=JAES.saveFile(); >Save scene</a></p>' +

		'';

	}

	JAES.loadScripts = function() {
		var p = 'http://mrdoob.github.io/three.js/examples/js/';

		var scripts = [
			'utils/GeometryUtils.js',
			'exporters/BufferGeometryExporter.js',
			'exporters/TypedGeometryExporter.js',
			'exporters/GeometryExporter.js',
			'exporters/MaterialExporter.js',
			'exporters/ObjectExporter.js',
			'exporters/SceneExporter.js'
		];

		for (var i = 0; i < 7; i++) {
			JAES.loadScript( p + scripts[i] );
		}
	}

	JAES.loadScript = function ( source ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = source;
		script.onload = function () { 
			if ( JAES.count >= 6 ) { JAES.saveFile(); }
			JAES.count++;
		};
	}

	JAES.saveFile = function() {
		if ( !THREE.ObjectExporter ) { JAES.loadScripts(); return; }

		var exporter = new THREE.ObjectExporter();
		var output = exporter.parse( scene );
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'scene.json';
		a.click();
		delete a;

	}

/*
	JAES.loadFile = function ( that ) {
		var filename = that.files[0].name;
		var extension = filename.split( '.' ).pop().toLowerCase();
		var reader = new FileReader();
		reader.addEventListener( 'load', function ( event ) {
			var contents = reader.result;

			switch ( extension ) {
				case 'html' :
// console.log( filename);
					break;

				case 'dae':
					JAES.loadDAE( contents, filename );
					break;

				case 'js':
				case 'json':

				case '3geo':
				case '3mat':
				case '3obj':
				case '3scn':
					JAES.loadJSON( contents, filename );
					break;

				case 'obj':
					JAES.loadOBJ( contents, filename );
					break;

				case 'stl':
					JAES.loadSTL( contents, filename );
					break;

				case 'vtk':
					JAES.loadVTK( contents, filename );
					break;

				case 'wrl':
					JAES.loadVRML( contents, filename );
					break;

				default:
					alert( 'Unsupported file format.' );
					break;
			}

		}, false );
		reader.readAsText( that.files[0] );

	}

	JAES.loadDAE = function ( contents, filename ) {
		scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = function() {

			var parser = new DOMParser();
			var xml = parser.parseFromString( contents, 'text/xml' );

			var loader = new THREE.ColladaLoader();
			loader.parse( xml, function ( collada ) {

				collada.scene.name = filename;
// console.log( collada, collada.scene )
				scene.add( collada.scene );
// 				scene.select( collada.scene.children[0].children[0] );

			} );
		}
		scr.src = V3LI.loaderBase + 'js/loaders/ColladaLoader.js';
	}

	JAES.loadJSON = function ( contents, filename ) {
		if ( contents.indexOf( 'postMessage' ) !== -1 ) {
			var blob = new Blob( [ contents ], { type: 'text/javascript' } );
			var url = URL.createObjectURL( blob );
			var worker = new Worker( url );
			worker.onmessage = function ( event ) {
				event.data.metadata = { version: 2 };
				V3LI.handleJSON( event.data, filename );
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
		V3LI.handleJSON( data, filename );
	}

	JAES.loadOBJ = function ( contents, filename ) {
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

		}
		scr.src = V3LI.loaderBase + 'js/loaders/OBJLoader.js';
	}

	JAES.loadSTL = function ( contents, filename ) {

		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.src = V3LI.loaderBase + 'js/wip/TypedGeometry.js';

		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = function() {

			geometry = new THREE.STLLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		}
		scr.src = V3LI.loaderBase + 'js/loaders/STLLoader.js';
	}

	JAES.loadVTK = function ( contents, filename ) {
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

		}
		scr.src = V3LI.loaderBase + 'js/loaders/VTKLoader.js';
	}

	JAES.loadVRML = function ( contents, filename ) {
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

		}
		scr.src = V3LI.loaderBase + 'js/loaders/VRMLLoader.js';
	}

	JAES.addLights = function() {
		light = new THREE.AmbientLight( 0x888888 );
		scene.add( light );

		light = new THREE.PointLight( 0xffffff, 1 );
		scene.add( light );
	}

*/
