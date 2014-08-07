// all code here derived from https://github.com/mrdoob/three.js/blob/master/editor/js/Loader.js

	var JAFO = {} || JAFO;

	var cnt = 0;
	var camRadius = 250;

	if ( window.location.origin === 'http://' ) {
		JAFO.loadersBase = '../../../three.js/examples/';
	} else {
		JAFO.loadersBase = '../../../../three.js/examples/';
	}

	JAFO.addFileOpenTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Open a file';
		tab.innerHTML =
			'<a href=# id=tabFileOpen ><p class=button >' +
				'<i class="fa fa-paw"></i> File Open...' +
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
			'<p>Note: files that are scenes overwrite the current view.</p>' +
			'<p>Note: You cannot use local files to create permalinks.</p>' +
		'';

		inpOpenFile.onchange = function() { JAFO.openFile ( this ); };
		inpAppendFile.onchange = function() { JAFO.appendFile ( this ); };

		if ( !JAFO.ifr ) {
			JAFO.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
			JAFO.ifr.height = window.innerHeight;
			JAFO.ifr.width = window.innerWidth;
			JAFO.ifr.style.cssText = 'border-width: 0; position: absolute; ';
		}
	};

	JAFO.openFile = function ( that ) {  // good
console.clear();
		if ( !that.files ) return;

		var filename = that.files[0].name;
		var extension = filename.split( '.' ).pop().toLowerCase();
		var scale = inpScale.value;
		var reader = new FileReader();

//		var thing = JAPL.addValues();
//		thing.url = that.files[0].name;
//		JAPL.things.push( thing );

		JAPL.things = [];
		JAFO.buildThing( that.files[0].name );  

// opening an HTML file and then opening another file type has issues

		if ( extension === 'html' ) {

console.log( 'openFile HTML ' );
			reader.addEventListener( 'load', function ( event ) {
				var contents = reader.result;
				JAFO.ifr.onload = function() {
					JAFO.addUsefelThings( JAPL.things );
				};
				JAFO.ifr.srcdoc = contents;
			}, false );
			reader.readAsText( that.files[0] );

		} else {

console.log( 'openFile Object ' );
			JAFO.ifr.onload = function() {
				reader.addEventListener( 'load', function ( event ) {
					var contents = reader.result;
					JAFO.addUsefelThings( JAPL.things );
					JAFO.switchType( filename, contents, scale, thing );

				}, false );
				reader.readAsText( that.files[0] );
			};
			JAFO.ifr.src = 'boilerplate-simple.html';
		}
	};

	JAFO.appendFile = function ( that ) { // good
		if ( !that.files ) return;

		var fileName = that.files[0].name;
		var scale = inpScale.value;

console.log( 'appendFile', fileName );
//		var thing = JAPL.addValues();
//		thing.url = that.files[0].name;
//		JAPL.things.push( thing );
//		JAPL.things = [];
		JAFO.buildThing( fileName );  

		var reader = new FileReader();

		reader.addEventListener( 'load', function ( event ) {
			var contents = reader.result;
			JAFO.switchType( fileName, contents, scale, thing );
		}, false );
		reader.readAsText( that.files[0] );

		divMsg1.innerHTML += '<br>append ' + fileName;
	};

	JAFO.openUrl = function ( link ) {  // good
console.clear();

//		var thing = JAPL.addValues();
//		thing.url = link;
		JAPL.things = [];
//		JAPL.things.push( thing );
		JAFO.buildThing( link );  

		var extension = link.split( '.' ).pop().toLowerCase();
		JAFO.ifr.src = '';
		if ( extension === 'html' ) {

console.log( 'open link HTML ', JAPL.things );

			JAFO.ifr.onload = function() {
				JAFO.addUsefelThings( JAPL.things );
			};
			JAFO.ifr.src = link;

		} else {
			JAFO.ifr.onload = function() {

console.log( 'open link Object', link );
				JAFO.addUsefelThings( things );
				link = things[0].url;
				var contents = JAFO.requestFile( link );
				JAFO.switchType( link, contents, inpScale.value, JAPL.things[0] );
			};
			JAFO.ifr.src = 'boilerplate-simple.html';
		}
	};

	JAFO.appendUrl = function ( link, scale ) { // good
//console.clear();

//		var thing = JAPL.addValues();
//		thing.url = link;
//		JAPL.things.push( thing );
		JAFO.buildThing( link );  

		var scl = scale ? scale : 1;
console.log( 'append URL',link, scl, thing);
		var contents = JAFO.requestFile( link );
		JAFO.switchType( link, contents, scl, thing );

		var filename = link.split('/').pop();
		divMsg1.innerHTML += '<br>append: ' + filename;
	};

	JAFO.openArrayOfPermalinks = function ( things ) {
// console.clear();
// console.log( 'openArrayOfPermalinks', things ) 
		var iframes = document.getElementsByTagName('iframe');
		iframes[0].parentNode.removeChild(iframes[0]);
		JAFO.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		JAFO.ifr.height = window.innerHeight;
		JAFO.ifr.width = window.innerWidth;
		JAFO.ifr.style.cssText = 'border-width: 0; position: absolute; ';

		JAFO.ifr.onload = function() {
			JAFO.addUsefelThings( things );
			for (var i = 1, len = JAPL.things.length; i < len; i++) {
				JAFO.appendThing( JAPL.things[i] );
			}
			if ( location.hash.toLowerCase().indexOf('auto') >  0 ){
				JAFO.ifr.contentWindow.animate3 = function() {
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
				JAFO.ifr.contentWindow.animate3();
			}
		};
		JAFO.ifr.src = things[0].url;
	};

	JAFO.appendThing = function ( thing ) { // good
//console.clear();
//console.log( 'append Thing', thing);

		var link = thing.url;
		var filename = link.split('/').pop();
		var scale = inpScale.value;
		var contents = JAFO.requestFile( link );

		JAFO.switchType( link, contents, scale, thing );

		divMsg1.innerHTML += '<br>append: ' + filename;
	};

	JAFO.buildThing = function ( link ) {
		var thing = JAPL.addValues();
		thing.url = link;
		JAPL.things.push( thing );
	}

	JAFO.addUsefelThings = function( things ) {

		var name;
		var thing = things[0];

// Establish dialog with iframe three.js
		app = JAFO.ifr.contentWindow;
		THREE = app.THREE;
		renderer = app.renderer;
		scene = app.scene;
		camera = app.camera;
		controls = app.controls;
		material = app.material;

// add shadows, light that move to iframe three.js
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		scene.add( camera );

		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();

		chkLightCamera.checked = true;
		JALI.toggleLightCamera();

		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

// add controls and position camera as needed

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
			controls.target.set( thing.tarx, thing.tary, thing.tarz );
			camera.position.set( thing.camx, thing.camy, thing.camz );
			camera.up = v( 0, 1, 0 );
		}

// add events to iframe
		JATH.addObjectClickEvent();

// update scene and scene.select
		scene.name = name;
		scene.select = app.mesh ? app.mesh : scene.children[ 0 ];
		scene.select.name = name;
		scene.select.link = things.url;

		JAFO.updateObjectParameters ( scene.select, thing );

		JAFO.targetList = scene.children;

// Update top window
		if ( JAFO.ifr.contentDocument.title ) {
			name = JAFO.ifr.contentDocument.title;
		} else {
			name = thing.url.split('/').pop();
		}

		JAPR.setRandomGradient();

		JATH.attributesDiv.innerHTML = geoMsg.innerHTML = name;
		divMsg1.innerHTML = 'Base: ' + name;
	};


	JAFO.switchType = function ( link, contents, scale, thing ) {

//console.log( 'switchType', link, thing );
		var extension = link.split( '.' ).pop().toLowerCase();

		switch ( extension ) {
			case 'html' :

				JAFO.loadHtml( link, contents, scale, thing );
				break;

			case 'dae':
				JAFO.loadDAE( link, contents, scale, thing );
				break;

			case 'js':
			case 'json':

			case '3geo':
			case '3mat':
			case '3obj':
			case '3scn':
				JAFO.loadJSON( link, contents, scale, thing );

				break;

			case 'obj':
				JAFO.loadOBJ( link, contents, scale );
				break;

			case 'stl':
				JAFO.loadSTL( link, contents, scale );
				break;

			case 'vtk':
				JAFO.loadVTK( link, contents, scale );
				break;

			case 'wrl':
				JAFO.loadVRML( link, contents, scale );
				break;

			default:
				alert( 'Unsupported file format.' );
				break;
		}
	};

/*

Each of the following functions should be enhanced to take advatage of the special features and unique characteristics of each file type...

*/

	JAFO.loadHtml = function ( link, contents, scale, thing ) {
//console.log( 'load HTML', thing );
		scene.select = scene.children[0];
		scene.select.name = link.split('/').pop();
		scene.select.link = link;
		scene.select.castShadow = true;
		scene.select.receiveShadow = true;
		scene.select.position.set( thing.posx, thing.posy, thing.posz );
		scene.select.rotation.set( thing.rotx, thing.roty, thing.rotz );
		scene.select.scale.set( thing.sclx, thing.scly, thing.sclz );
		scene.select.material = JAMA.materials[ thing.mat ].set();
		scene.select.materialKey = thing.mat;

	};


	JAFO.loadDAE = function ( link, contents, scale ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var parser = new DOMParser();
			var xml = parser.parseFromString( contents, 'text/xml' );

			var loader = new THREE.ColladaLoader();
			loader.parse( xml, function ( collada ) {

				collada.scene.name = link;
				scene.add( collada.scene );

			} );
		};
		script.src = JAFO.loadersBase + 'js/loaders/ColladaLoader.js';

	};

	JAFO.loadJSON = function ( link, contents, scale, thing ) {
//console.log( 'loadJSON', link, scale, thing );

		if ( contents.indexOf( 'postMessage' ) !== -1 ) {
console.log( 'worker did some work!', link );
			var blob = new Blob( [ contents ], { type: 'text/javascript' } );
			var url = URL.createObjectURL( blob );
			var worker = new Worker( url );
			worker.onmessage = function ( event ) {
				event.data.metadata = { version: 2 };
				JAFO.handleJSON( event.data, link, scale );
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
		JAFO.handleJSON( data, link, scale, thing );

	};

	JAFO.loadOBJ = function ( link, contents, scale ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var object = new THREE.OBJLoader().parse( contents );

			mesh = object.children[0];
			mesh.name = link;
			mesh.material = new THREE.MeshPhongMaterial();
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/OBJLoader.js';

	};

	JAFO.loadSTL = function ( link, contents, scale ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = JAFO.loadersBase + 'js/wip/TypedGeometry.js';

		script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			geometry = new THREE.STLLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/STLLoader.js';

	};

	JAFO.loadVTK = function ( link, contents, scale ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			geometry = new THREE.VTKLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			mesh.name = link;
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/VTKLoader.js';
	};

	JAFO.loadVRML = function ( link, contents, scale ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			object = new THREE.VRMLLoader().parse( contents );

			mesh = object.children[0];
			mesh.name = link;
			mesh.material = new THREE.MeshPhongMaterial();
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			mesh.geometry.buffersNeedUpdate = true;
			mesh.geometry.uvsNeedUpdate = true;
			mesh.material.needsUpdate = true;

			scene.add( object );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/VRMLLoader.js';
	};

	JAFO.handleJSON = function ( data, link, scale, thing ) {
//console.log( 'handleJSON', thing );
		var loader, result;

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
			result = loader.parse( data );

			geometry = result.geometry;
/*
			if ( result.materials !== undefined ) {
				if ( result.materials.length > 1 ) {
					material = new THREE.MeshFaceMaterial( result.materials );
				} else {
					material = result.materials[ 0 ];
				}
			} else if ( thing ){
				material = JAMA.materials[ thing['mat'] ].set();
			} else {
				material = JAMA.materials[ 'NormalSmooth' ].set();
			}
*/
			material = JAMA.materials[ thing.mat ].set();

			geometry.sourceType = "ascii";
			geometry.sourceFile = link;

			mesh = new THREE.Mesh( geometry, material );
console.log ( mesh );
/*

trying to stop: [.WebGLRenderingContext]GL ERROR :GL_INVALID_OPERATION : glDrawElements: range out of bounds for buffer 

		mesh.geometry.dynamic = true;
		mesh.geometry.verticesNeedUpdate = true;
		mesh.geometry.normalsNeedUpdate = true;
		mesh.geometry.computeFaceNormals();
		mesh.geometry.computeVertexNormals();
		mesh.geometry.computeTangents();
		mesh.geometry.computeMorphNormals();
		mesh.geometry.buffersNeedUpdate = true;
		mesh.geometry.uvsNeedUpdate = true;
		mesh.material.needsUpdate = true;
*/

			JAFO.updateObjectParameters ( mesh, thing );

/*
			mesh.position.set( thing.posx, thing.posy, thing.posz );
			mesh.rotation.set( thing.rotx, thing.roty, thing.rotz );
			mesh.scale.set( thing.sclx, thing.scly, thing.sclz );
			mesh.materialKey = thing.mat;
*/

			if  ( scale ) {
				mesh.scale.set( scale * thing.sclx, scale * thing.scly, scale * thing.sclz );
			}
//			mesh.scale.set( scale, scale, scale );
			mesh.name = link.split('/').pop();
			mesh.link = link;

			scene.add( mesh );
			scene.select = mesh;

			JAFO.targetList.push( mesh );
//			JAPL.resetValues();

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loader = new THREE.ObjectLoader();
			result = loader.parse( data );

			if ( result instanceof THREE.Scene ) {
console.log( 'found scene' );
				JAFO.updateScene( result, link, scale, thing );

			} else {
console.log( 'found object', result );
				scene.add( result );
				scene.select = result;
				scene.select.name = link.split('/').pop();
				scene.select.link = link;

				JAFO.updateObjectParameters ( scene.select, thing );
/*

				scene.select.castShadow = true;
				scene.select.receiveShadow = true;
				scene.select.position.set( thing.posx, thing.posy, thing.posz );
				scene.select.rotation.set( thing.rotx, thing.roty, thing.rotz );
				scene.select.scale.set( thing.sclx, thing.scly, thing.sclz );
				scene.select.material = JAMA.materials[ thing.mat ].set();
				scene.select.materialKey = thing.mat;
*/
				JAFO.targetList.push( scene.select );

			}
		} else if ( data.metadata.type.toLowerCase() === 'scene' ) {

console.log( 'found deprecated');
			// DEPRECATED
			loader = new THREE.SceneLoader();
			loader.parse( data, function ( result ) {
				JAFO.updateScene( result, link, scale );
			}, '' );
		} else {
console.log( 'found a whoopsie');
		}
	};

	JAFO.updateScene = function( result, link, scale, thing ) {
console.log( 'updateScene', link );

		JATH.attributesDiv.innerHTML = '';

		scene = result;
		var values = JAPL.addValues;

		JAPL.things[0].url = 'boilerplate-simple.html';

		app.scene = scene;

		scene.add( camera );
		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();
		chkLightCamera.checked = true;
		JALI.toggleLightCamera();
		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

		for (var i = 0, len = result.children.length; i < len; i++) {
//			result.children[i].scale.set( scale, scale, scale );
			if ( result.children[i].geometry ) {
				result.children[i].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			} 
			if ( result.children[i].children[0] && result.children[i].children[0].geometry ) {
				result.children[i].children[0].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			}
			if ( result.children[i].children[1] && result.children[i].children[1].geometry ) {
				result.children[i].children[1].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			}
			if ( result.children[i].children[2] && result.children[i].children[2].geometry ) {
				result.children[i].children[2].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			}
		}

		scene.select = result.children[0];
		scene.select.name = link.split('/').pop();
		scene.select.link = link;
		scene.select.materialKey = JAPL.mat;

		JAFO.updateTargetList( link );

	};

	JAFO.updateObjectParameters = function( obj, thing ) {

		obj.castShadow = true;
		obj.receiveShadow = true;
		obj.position.set( thing.posx, thing.posy, thing.posz );
		obj.rotation.set( thing.rotx, thing.roty, thing.rotz );
		obj.scale.set( thing.sclx, thing.scly, thing.sclz );
		obj.material = JAMA.materials[ thing.mat ].set();
		obj.materialKey = thing.mat;
	}

	JAFO.updateTargetList = function( link ) {

		if ( link.indexOf( '.rvt.js' ) > 0 ) {
			JAFO.targetList = [];
			for ( var i = 0; i < scene.children.length; i++ ){
				for ( var k = 0; k < scene.children[i].children.length; k++){
//					if ( scene.children[i].children[k].hasOwnProperty("geometry") ) {
						JAFO.targetList.push( scene.children[i].children[k] );
						scene.children[i].children[k].userData = scene.children[i].userData;
				}
			}
		} else {
			JAFO.targetList = scene.children;
		}
	};

	JAFO.requestFile = function( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous"; 
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	};
