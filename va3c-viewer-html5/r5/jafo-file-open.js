// all code here derived from https://github.com/mrdoob/three.js/blob/master/editor/js/Loader.js

	var JAFO = {} || JAFO;

	if ( window.location.origin === 'http://' ) {
		JAFO.loadersBase = '../../../three.js/examples/';
	} else {
		JAFO.loadersBase = '../../../../three.js/examples/';
	}

	JAFO.template = 'template-basic.html';

	JAFO.addFileOpenTab = function() {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Open a file';
		tab.innerHTML =
			'<a href=# id=tabFileOpen ><p class=button >' +
				'<i class="fa fa-files-o"></i> File Open...' +
			'</p></a>'; 
		tabFileOpen.style.cssText = 'background-color: #88f; ';
		tabFileOpen.onclick = function() { JA.toggleTab( JAFO.FileOpen ); };

		JAFO.FileOpen = JA.menu.appendChild( document.createElement( 'div' ) );
		JAFO.FileOpen.style.cssText = 'cursor: auto; display: none; ' ;
		JAFO.FileOpen.innerHTML =
			'<p>Select a file to load</p>' +
			'Scale: <input type=number id=inpScale value=1.000 max=1000 min=0.001 step=0.1 /><br>' +
			'<p>Open & overwrite current view: <input type=file id=inpOpenFile ></p>' +
			'<p>Append to current view: <input type=file id=inpAppendFile ></p>' +
			'<p>Notes: files that are scenes overwrite the current view. ' +
				'Local files cannot be used to create permalinks. Best to reload page between opens.' +
			'</p>' +
		'';

		inpOpenFile.onchange = function() { JAFO.openFile ( this ); };
		inpAppendFile.onchange = function() { JAFO.appendFile ( this ); };

	};

	JAFO.openBundles = function ( bundles ) {
//console.clear();
//console.log( 'openBundles', bundles ) 

		var iframes = document.getElementsByTagName( 'iframe' ) ;

		for (var i = 0, len = iframes.length; i < len; i++) {
			iframes[0].parentNode.removeChild(iframes[0]);
		}

		JAFO.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		JAFO.ifr.height = window.innerHeight;
		JAFO.ifr.width = window.innerWidth;
		JAFO.ifr.style.cssText = 'border-width: 0; position: absolute; ';

		JAFO.ifr.onload = function() {
			JAFO.updateIframe( bundles );

			for (var i = 1, len = JAPL.bundles.length; i < len; i++) {
				JAFO.appendBundle( JAPL.bundles[i] );
			}

			if ( location.hash.toLowerCase().indexOf('auto') >  0 ){  // autocrapdoodle

				JAFO.ifr.contentWindow.animate3 = function() {
					var cnt = 0;
					var camRadius = 250;
					requestAnimationFrame( JAFO.ifr.contentWindow.animate3 );
					for (var i = 0, len = scene.children.length; i < len; i++) {
						if ( scene.children[i].geometry ) {
							scene.children[i].rotation.y += 0.001;
							scene.children[i].rotation.z += 0.001;
						}
					}
					cnt += 0.001;
					camera.position.set( Math.sin( cnt * 0.7 ) * camRadius, Math.cos( cnt * 0.3 ) * camRadius,  Math.sin( cnt * 0.2 ) * camRadius );
				};
//				JAFO.ifr.contentWindow.animate3();

			}
// zoomExtents();
		};
		JAFO.ifr.src = bundles[1].src;

	};

	JAFO.appendBundle = function ( bundle ) {
//console.log( 'appendBundle', bundle);

		var contents = JAFO.requestFile( bundle.src );
		JAFO.switchType( bundle, contents );

//		divMsg1.innerHTML += '<br>file: ' + bundle.name;

	};

	JAFO.openFile = function ( that ) {

		if ( !that.files ) return;

		var fileName = that.files[0].name;
		var extension = fileName.split( '.' ).pop().toLowerCase();
		var scale = inpScale.value;

		JAPL.bundles = [];
		JAPL.bundles.push( JAPL.setDefaults( JAPL.defaultScene ) );
		var bundle = JAPL.buildBundle( fileName, scale );

		if ( extension === 'html' ) {
//console.log( 'openFile html', bundle );

				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {
					var contents = reader.result;
					JAFO.ifr.onload = function() {
						JAFO.updateIframe( JAPL.bundles );
					};
					JAFO.ifr.srcdoc = contents;
				}, false );
				reader.readAsText( that.files[0] );

		} else {

			JAFO.ifr.onload = function() {
//console.log( 'openFile Object', bundle );

				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {
					var contents = reader.result;
					JAFO.switchType( bundle, contents );
				}, false );


				if ( reader.readAsBinaryString !== undefined ) {
					reader.readAsBinaryString( that.files[0] );
				} else {
//					reader.readAsArrayBuffer( file );
					reader.readAsText( that.files[0] );
				}

				JAFO.updateIframe( JAPL.bundles );

			};
			JAFO.ifr.src = JAFO.template;

		}

	};

	JAFO.appendFile = function ( that ) { // good
		if ( !that.files ) return;

		var bundle = JAPL.buildBundle( that.files[0].name );
//console.log( 'append file', bundle );

		var reader = new FileReader();
		reader.addEventListener( 'load', function ( event ) {
			var contents = reader.result;
			JAFO.switchType( bundle, contents );
		}, false );
		reader.readAsText( that.files[0] );

//		divMsg1.innerHTML += '<br>Append ' + bundle.name;

	};

	JAFO.openUrl = function ( src ) {

		JAPL.bundles = [];
		JAPL.bundles.push( JAPL.setDefaults( JAPL.defaultScene ) );
		var bundle = JAPL.buildBundle( src );
		var extension = src.split( '.' ).pop().toLowerCase();

		if ( extension === 'html' ) {
//console.log( 'open src HTML ', JAPL.bundles );

			JAFO.ifr.onload = function() {
				JAFO.updateIframe( JAPL.bundles );


//				JAFO.loadHtml = ( bundle )
			};
			JAFO.ifr.src = src;

		} else {
			JAFO.ifr.onload = function() {
//console.log( 'open src Object', src );

				JAFO.updateIframe( bundles );
				var contents = JAFO.requestFile( src );
				JAFO.switchType( bundle, contents );
			};
			JAFO.ifr.src = JAFO.template;
		}

	};

	JAFO.appendUrl = function ( src, scale ) {

		var bundle = JAPL.buildBundle( src, scale );

//console.log( 'appendUrl', src, scale, bundle);

		var contents = JAFO.requestFile( bundle.src );
		JAFO.switchType( bundle, contents );

//		divMsg1.innerHTML += '<br>Append: ' + bundle.name;

	};

	JAFO.updateIframe = function( bundles ) {

		var bundle = bundles[0];

		if ( JAFO.ifr.contentDocument.title ) {
			bundle.name = JAFO.ifr.contentDocument.title;
		} 

// Connect to Three.js
		app = JAFO.ifr.contentWindow;
		THREE = app.THREE;
		renderer = app.renderer;
		scene = app.scene;
		camera = app.camera;
		controls = app.controls;
		material = app.material;

// Update shade, shadow and lights
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		scene.add( camera );

		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();

		chkLightCamera.checked = true;
		JALI.toggleLightCamera();

		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

// Update controls and camera
		if ( !JAFO.ifr.contentWindow.controls ) {

			var script = document.body.appendChild( document.createElement( 'script' ) );
			script.onload = function() {
				JAFO.ifr.contentWindow.controls = new THREE.OrbitControls( camera, renderer.domElement );

				JAFO.ifr.contentWindow.animate2 = function() {
					requestAnimationFrame( JAFO.ifr.contentWindow.animate2 );
					JAFO.ifr.contentWindow.controls.update();
				};
			};
			script.src = 'http://mrdoob.github.io/three.js/examples/js/controls/OrbitControls.js';
		}

		if ( controls && controls.target ) {
			controls.target.set( bundle.tarx, bundle.tary, bundle.tarz );
			camera.position.set( bundle.camx, bundle.camy, bundle.camz );
			camera.up = v( 0, 1, 0 );
		}

// Add scene things
		JATH.addObjectClickEvent();
		JAFO.targetList = [];

// update parent screen
		JAPR.setRandomGradient();

		JATH.attributesDiv.innerHTML = geoMsg.innerHTML = bundle.name;
		divMsg1.innerHTML = 'Base: ' + bundle.name + '<br>';

	};

	JAFO.switchType = function ( bundle, contents ) {

		var extension = bundle.src.split( '.' ).pop().toLowerCase();

		JATH.attributesDiv.innerHTML += '<br>Append: ' + bundle.name;
		divMsg1.innerHTML += '<br>Append: ' + bundle.name;

		switch ( extension ) {

			case 'html':
//console.log('switchType html', bundle );

				JAFO.loadHtml( bundle, contents );
				break;

			case 'dae':
				JAFO.loadDAE( bundle, contents );
				break;

			case 'js':
			case 'json':

			case '3geo':
			case '3mat':
			case '3obj':
			case '3scn':
				JAFO.loadJSON( bundle, contents );

				break;

			case 'obj':
				JAFO.loadOBJ( bundle, contents );
				break;

			case 'stl':
				JAFO.loadSTL( bundle, contents );
				break;

			case 'vtk':
				JAFO.loadVTK( bundle, contents );
				break;

			case 'wrl':
				JAFO.loadVRML( bundle, contents );
				break;

			default:
				alert( 'Unsupported file format.' );
				break;
		}
	};

/*

Each of the following functions should be enhanced to take advatage of the special features and unique characteristics of each file type...

*/

	JAFO.loadHtml = function ( bundle ) {
//console.log( 'load HTML', bundle );

		scene.select = scene.children[0];

		JAFO.updateObject ( scene.select, bundle );

		JAFO.updateTargetList( bundle.src );


	};

	JAFO.loadDAE = function ( bundle, contents ) {
console.log( 'loadDAE', bundle, contents );

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var loader = new THREE.ColladaLoader();
			loader.load( bundle.src, function ( collada ) {

// Following may be used to open files using file dialog, but materials are a no show. WIP

//			var parser = new DOMParser();
//			var xml = parser.parseFromString( contents, 'text/xml' );//
//			loader.parse( xml, function ( collada ) {

				collada.scene.name = bundle.name;

				JAFO.updateObject ( scene.select, bundle );
				JAFO.updateTargetList( bundle.src );
				scene.add( collada.scene );
				scene.select = collada.scene;



			} );
		};
		script.src = JAFO.loadersBase + 'js/loaders/ColladaLoader.js';

	};

	JAFO.loadJSON = function ( bundle, contents ) {

		if ( contents.indexOf( 'postMessage' ) !== -1 ) {
console.log( 'worker did some work!', src );
			var blob = new Blob( [ contents ], { type: 'text/javascript' } );
			var src = URL.createObjectURL( blob );
			var worker = new Worker( src );
			worker.onmessage = function ( event ) {
				event.data.metadata = { version: 2 };
				JAFO.handleJSON( event.data, src, scale );
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
		JAFO.handleJSON( bundle, data );

	};

	JAFO.loadOBJ = function ( bundle, contents ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var object = new THREE.OBJLoader().parse( contents );

			mesh = object.children[0];

			JAFO.updateObject ( mesh, bundle );
			JAFO.targetList.push( mesh );
			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/OBJLoader.js';

	};

	JAFO.loadSTL = function ( bundle, contents ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = JAFO.loadersBase + 'js/wip/TypedGeometry.js';

		script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			geometry = new THREE.STLLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			material = new THREE.MeshNormalMaterial();

			mesh.material = new THREE.MeshNormalMaterial();

			mesh.geometry.verticesNeedUpdate = true;

			mesh.geometry.normalsNeedUpdate = true;
			mesh.geometry.computeFaceNormals();
			mesh.geometry.computeVertexNormals();
	//		mesh.geometry.computeTangents();
	//		mesh.geometry.computeMorphNormals();
			mesh.geometry.buffersNeedUpdate = true;
			mesh.geometry.uvsNeedUpdate = true;
			mesh.material.needsUpdate = true;

			JAFO.updateObject ( mesh, bundle );
			JAFO.targetList.push( mesh );
			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/STLLoader.js';

	};

	JAFO.loadVTK = function ( bundle, contents ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			geometry = new THREE.VTKLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );

			JAFO.updateObject ( mesh, bundle );
			JAFO.targetList.push( mesh );
			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/VTKLoader.js';
	};

	JAFO.loadVRML = function ( bundle, contents ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			object = new THREE.VRMLLoader().parse( contents );

// needs work...
			mesh = object.children[0];

			JAFO.updateObject ( mesh, bundle );
			JAFO.targetList.push( mesh );
			scene.add( object );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/VRMLLoader.js';
	};

	JAFO.handleJSON = function ( bundle, data ) {
//console.log( 'handleJSON', bundle );

		var loader, content;

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
			content = loader.parse( data );

			geometry = content.geometry;

			if ( content.materials !== undefined ) {
//console.log( 'found geometry', content.materials );
				if ( content.materials.length > 1 ) {
					material = new THREE.MeshFaceMaterial( content.materials );
				} else {
					material = content.materials[ 0 ];
				}
			} else if ( bundle ){
				material = JAMA.materials[ bundle.mat ].set();
			} else {
				material = JAMA.materials.NormalSmooth.set();
			}

//			material = JAMA.materials[ bundle.mat ].set();

			geometry.sourceType = "ascii";
			geometry.sourceFile = bundle.src;

			var mesh = new THREE.Mesh( geometry, material );

			JAFO.updateObject ( mesh, bundle );

			scene.add( mesh );
			scene.select = mesh;
			JAFO.targetList.push( mesh );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loader = new THREE.ObjectLoader();
			content = loader.parse( data );

			if ( content instanceof THREE.Scene ) {
//console.log( 'found scene' );

				JAFO.updateScene( bundle, content );

			} else {
//console.log( 'found object', content );

				scene.add( content );
				scene.select = content;
				JAFO.updateObject ( content, bundle );
				JAFO.targetList.push( contents );

			}
		} else if ( data.metadata.type.toLowerCase() === 'scene' ) {
console.log( 'found deprecated');

// DEPRECATED
			var loader = new THREE.SceneLoader();
			loader.load( bundle.src, function ( contents ) {
				JAFO.updateScene( bundle, contents );
			}, '' );
		} else {
console.log( 'found a whoopsie');
		}
	};

	JAFO.updateScene = function( bundle, contents ) {
//console.log( 'updateScene', bundle );

		scene = contents;
		JAFO.targetList = scene.children;

// Update controller and camera
		var values = JAPL.addValues;
		JAPL.bundles[0].src = JAFO.template;

// Update Three.js
		app.scene = scene;
		scene.add( camera );


		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();
		chkLightCamera.checked = true;
		JALI.toggleLightCamera();
		chkLightPosition.checked = true;
		JALI.toggleLightPosition();


		for (var i = 0, len = contents.children.length; i < len; i++) {
			if ( contents.children[i].geometry ) {
				contents.children[i].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			} 
			for (var j = 0, lenJ = contents.children[i].length; j < lenJ; j++) {
				if ( contents.children[i].children[j] && contents.children[i].children[j].geometry ) {
					contents.children[i].children[j].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
				}
			}
		}

		scene.select = contents.children[0];
//		scene.name = scene.select.name = bundle.name;
//		scene.scr = scene.select.src = bundle.src;
//		scene.select.materialKey = JAPL.mat;

		JAFO.updateTargetList( bundle.src );

// Update parent
		JATH.attributesDiv.innerHTML = geoMsg.innerHTML = bundle.name + '<br>';
		divMsg1.innerHTML = 'Base: ' + bundle.name;



	};

	JAFO.updateObject = function ( obj, bundle ) {

		obj.position.set( bundle.posx, bundle.posy, bundle.posz );
		obj.rotation.set( bundle.rotx, bundle.roty, bundle.rotz );
		obj.scale.set( bundle.sclx, bundle.scly, bundle.sclz );
		obj.name = bundle.name;
		obj.scale = bundle.scl;
		obj.src = bundle.src;

		obj.material = JAMA.materials[ bundle.mat ].set();
		obj.materialKey = bundle.mat;

		obj.castShadow = true;
		obj.receiveShadow = true;
	};

	JAFO.updateTargetList = function( src ) {

		if ( src.indexOf( '.rvt.js' ) > 0 ) {
			JAFO.targetList = [];
			for ( var i = 0; i < scene.children.length; i++ ){
				for ( var k = 0; k < scene.children[i].children.length; k++){
						JAFO.targetList.push( scene.children[i].children[k] );
						scene.children[i].children[k].userData = scene.children[i].userData;
				}
			}
		} else {
			JAFO.targetList = scene.children;
		}

// console.log( 'updateTargetList', JAFO.targetList );
	};

	JAFO.requestFile = function( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous"; 
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	};
