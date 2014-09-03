// all code here derived from https://github.com/mrdoob/three.js/blob/master/editor/js/Loader.js

	var JAFO = {} || JAFO;

	if ( window.location.origin === 'http://' ) {
		JAFO.loadersBase = '../../../three.js/examples/';
	} else {
		JAFO.loadersBase = '../../../../three.js/examples/';

	}

	JAFO.basePath = window.location.href.substr( 0, window.location.href.indexOf( 'viewer') );

// console.log( 'JAFO.basePath', JAFO.basePath );

	JAFO.template = JAFO.basePath + 'viewer/va3c-viewer-html5/r6/template-basic.html';

	JAFO.addFileOpenTab = function() {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Open a file';
		tab.innerHTML =
			'<a id=tabFileOpen title="Select a file to load or start a new file" ><p class=buttonFile >' +
				'<i class="fa fa-files-o"></i> File Open...' +
			'</p></a>';
		tabFileOpen.onclick = function() { JA.toggleTab( JAFO.FileOpenTab ); };

		JAFO.FileOpenTab = tab.appendChild( document.createElement( 'div' ) );
		JAFO.FileOpenTab.style.cssText = 'cursor: auto; display: none; ' ;
		JAFO.FileOpenTab.innerHTML =
			'<p title="Adjust size of incoming object" >Scale: <input type=number id=inpScale value=1.000 max=1000 min=0.001 step=1 /></p>' +
			'<p>Open & overwrite current scene: <input type=file id=inpOpenFile ></p>' +
			'<p title="WIP: combine with regular Open command" >Open binary JSON file: <input type=file id=inpOpenBinaryFile ></p>' +
			'<p>Insert into current scene: <input type=file id=inpAppendFile ></p>' +
			'<p><a href=JavaScript:JAFO.openUrl(JAFO.template); >Create new empty scene</a></p>' +
			'<p>Notes: files that are scenes overwrite the current scene. ' +
				'Local files cannot be used to create permalinks. Best to reload page between opens.' +
			'</p>' +
		'';

		inpOpenFile.onchange = function() { JAFO.openFile ( this ); };
		inpOpenBinaryFile.onchange = function() { JAFO.openFileBinary ( this ); };
		inpAppendFile.onchange = function() { JAFO.appendFile ( this ); };

	};

// Bundles are collections of permalinks

	JAFO.openBundles = function ( bundles ) {
//console.log( 'openBundles', bundles[1].src );

		JAFO.initIframe();

		JAFO.ifr.onload = function() {

			JAFO.updateIframe( bundles );

			for ( var i = 1, len = V3PL.bundles.length; i < len; i++ ) {

//JAFO.appendBundle( V3PL.bundles[i] );
				JAFO.switchType( bundles[i] );

			}

			if ( location.hash.toLowerCase().indexOf('auto') >  0 ){  // autocrapdoodle

				JAFO.ifr.contentWindow.animate3 = function () {
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

				JAFO.ifr.contentWindow.animate3();

			}

		};

		JAFO.ifr.src = bundles[1].src;

	};

	JAFO.initIframe = function () {

		var iframes = document.getElementsByTagName( 'iframe' ) ;

		for ( var i = 0, len = iframes.length; i < len; i++ ) {
			iframes[0].parentNode.removeChild(iframes[0]);
		}

		JAFO.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		JAFO.ifr.height = window.innerHeight;
		JAFO.ifr.width = window.innerWidth;
		JAFO.ifr.style.cssText = 'border-width: 0; position: absolute; ';

	};

	JAFO.openFile = function ( inpFile ) {
// console.log( 'OpenFile', inpFile, inpFile.files[0] );

		if ( !inpFile.files ) return;

		V3PL.bundles = [];
		V3PL.bundles.push( V3PL.setDefaults( V3PL.defaultScene ) );

		var scale = inpScale.value;
		var fileName = inpFile.files[0].name;
		var bundle = V3PL.buildBundle( fileName, scale );
		var extension = fileName.split( '.' ).pop().toLowerCase();

		if ( extension === 'html' ) {

			var reader = new FileReader();
			reader.addEventListener( 'load', function ( event ) {
				var contents = reader.result;
				JAFO.ifr.onload = function() {
					JAFO.updateIframe( V3PL.bundles );
				};
				JAFO.ifr.srcdoc = contents;
			}, false );

			reader.readAsText( inpFile.files[0] );

		} else if ( extension === 'dae' ) {

			alert( 'Opening a .dae file with the file dialog is still under construction. \n' +
					'Opening a .dae file is possible, but prevents any further interaction the Viewer. \n' +
					'Currently .dae files are best viewed using URLs and permalinks.' +
			'');

			JAFO.openFileParseDAE( bundle, inpFile );

		} else if ( extension === 'stl' ) {

			JAFO.ifr.onload = function() {

				JAFO.updateIframe( V3PL.bundles );
				JAFO.loadSTL( bundle, null, inpFile );

			};
			JAFO.ifr.src = JAFO.template;

		} else {

			JAFO.ifr.onload = function() {

//console.log( 'openFile Object', bundle );
				JAFO.updateIframe( V3PL.bundles );
				JAFO.getFileReaderContents( bundle, inpFile );

			};

			JAFO.ifr.src = JAFO.template;

		}

	};

	JAFO.openFileBinary = function ( inpFile ) {
		alert( 'Coming soon! Maybe...' );
	}

// Needs adjusting according to extension...
	JAFO.appendFile = function ( inpFile ) { // good
		if ( !inpFile.files ) return;

		var scale = inpScale.value;
		var bundle = V3PL.buildBundle( inpFile.files[0].name, scale );
		var extension = inpFile.files[0].name.split( '.' ).pop().toLowerCase();

		if ( extension === 'dae' ) {

			JAFO.openFileParseDAE( bundle, inpFile );

		} else if ( extension === 'stl' ) {

			JAFO.loadSTL( bundle, null, inpFile );

		} else {

			JAFO.getFileReaderContents( bundle, inpFile );

		}
	};

	JAFO.getFileReaderContents = function ( bundle, inpFile ) {

		var reader = new FileReader();
		reader.addEventListener( 'load', function ( event ) {

			var contents = reader.result;
//console.log( 'getFileReaderContents', contents );

			JAFO.switchType( bundle, contents );

		}, false );


		if ( reader.readAsBinaryString !== undefined ) {
//console.log( 'reader.readAsBinaryString', reader.readAsBinaryString );

			reader.readAsBinaryString( inpFile.files[0] );

		} else {

			reader.readAsText( inpFile.files[0] );

		}

	}

	JAFO.openDragAndDrop = function( inpFile ) {

		var name = inpFile.files[0].name;
		var scale = inpScale.value;
		var bundle = V3PL.buildBundle( name, scale );

		var extension = inpFile.files[0].name.split( '.' ).pop().toLowerCase();
/*
		if ( extension === 'stl' ) {
console.log( 'openDragAndDrop', inpFile,'name:', inpFile.files[0].name );
			JAFO.loadSTL( bundle, null, inpFile );

		} else {
*/
			var reader = new FileReader();
			reader.addEventListener( 'load', function ( event ) {

				var contents = reader.result;

				JAFO.switchType( bundle, contents );

			}, false );

			if ( reader.readAsBinaryString !== undefined ) {
	//console.log( 'reader.readAsBinaryString', reader.readAsBinaryString );

				reader.readAsBinaryString( inpFile.files[0] );

			} else {

				reader.readAsText( inpFile.files[0] );

			}
//		}
	}

	JAFO.openUrl = function ( source, scale ) {
// console.log( 'openUrl', source );
		var contents;
		var scl = scale  ? scale : 1;

		V3PL.bundles = [];
		V3PL.bundles.push( V3PL.setDefaults( V3PL.defaultScene ) );
		var bundle = V3PL.buildBundle( source, scale );

		var extension = source.split( '.' ).pop().toLowerCase();

		if ( extension === 'html' ) {

//console.log( 'open source HTML ', V3PL.bundles );
			JAFO.ifr.onload = function() {
				JAFO.updateIframe( V3PL.bundles );

				JAFO.loadHtml = ( bundle );
			};

			JAFO.ifr.src = source;

		} else if ( extension === 'dae' ) {

			JAFO.ifr.onload = function() {

				JAFO.updateIframe( V3PL.bundles );
				JAFO.loadDAE( bundle );

			};
			JAFO.ifr.src = JAFO.template;

		} else if ( extension === 'stl' ) {

			JAFO.ifr.onload = function() {

				JAFO.updateIframe( V3PL.bundles );
				JAFO.switchType( bundle, null, null );

			};
			JAFO.ifr.src = JAFO.template;

		} else {
			JAFO.ifr.onload = function() {

				JAFO.updateIframe( V3PL.bundles );
				contents = JAFO.requestFile( bundle.src );
				JAFO.switchType( bundle, contents, scale );

			};
			JAFO.ifr.src = JAFO.template;
		}

	};

	JAFO.openUrlBinary = function ( source, scale ) {
console.log( 'openUrlBinary', source, scale );

		V3PL.bundles = [];
		V3PL.bundles.push( V3PL.setDefaults( V3PL.defaultScene ) );

		var scl = scale ? scale : 1;
		var bundle = V3PL.buildBundle( source, scale );

		JAFO.ifr.onload = function() {

console.log( 'openFile Object', bundle );
			JAFO.updateIframe( V3PL.bundles );

//			JAFO.getFileReaderContents( bundle, inpFile );
			JAFO.loadBinaryFile( bundle );

		};
		JAFO.ifr.src = JAFO.template;

	};

	JAFO.appendUrl = function ( source, scale ) {

//console.log( 'appendUrl', source );
		var contents;
		var scl = scale ? scale : 1 ;

		var bundle = V3PL.buildBundle( source, scl );

//console.log( 'appendUrl', source, scale, bundle);
		var extension = source.split( '.' ).pop().toLowerCase();

		if ( extension === 'stl' ) {
			JAFO.switchType( bundle );
		} else {
			contents = JAFO.requestFile( bundle.src );
			JAFO.switchType( bundle, contents );
		}
	};

	JAFO.appendUrlBinary = function ( source, scale ) {

		var scl = scale ? scale : 1 ;

		var bundle = V3PL.buildBundle( source, scl );

		JAFO.loadBinaryFile( bundle );

	};

	JAFO.updateIframe = function( bundles ) {

		var bundle = bundles[0];

		if ( JAFO.ifr.contentDocument.title ) {
			bundle.name = JAFO.ifr.contentDocument.title;
			document.title = V3.titleBase + ' ~ ' + bundle.name;
		}

// Connect to Three.js
		app = JAFO.ifr.contentWindow;
		THREE = app.THREE;
		renderer = app.renderer;
		scene = app.scene;
		camera = app.camera;
		controls = app.controls;
		material = app.material;

// Update controls and camera
// should be in JATH...


/*
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
			camera.up = new THREE.Vector3( 0, 1, 0 );
		}
*/
//		JATH.resetCamera( bundle );

		JALI.initLights();

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

		switch ( extension ) {

			case 'html':


				JAFO.loadHTML( bundle, contents );
//console.log('switchType html', bundle );

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

// console.log('switchType json', bundle );
//				JAFO.loadJSON( bundle, contents );
				JAFO.handleJSON( bundle, contents );

				break;

			case 'obj':

				JAFO.loadOBJ( bundle, contents );

				break;

			case 'stl':

//console.log('switchType stl', bundle );
				JAFO.loadSTL( bundle, contents, null );

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

Each of the following functions should be enhanced to take advantage of the special features and unique characteristics of each file type...

*/

	JAFO.loadBinaryFile = function ( bundle ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			loader = new THREE.BinaryLoader( true );
			loader.load( bundle.src, function ( geometry, materials ) {
console.log( 'loader.load' );

				if ( materials ) {
					material =  new THREE.MeshFaceMaterial( materials );

					for (var i = 0, len = material.materials.length; i < len; i++) {
						material.materials[i].side = 2;
						material.materials[i].needsUpdate = true;
					}

				} else {
					material = new THREE.MeshPhongMaterial( { color: 0x888888, shading: THREE.SmoothShading, side: 2 } );
				}

				mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );

				scene.select = mesh;
				JAFO.updateObject ( mesh, bundle );
				JAFO.targetList.push( mesh );

				JATH.zoomExtents();

			} );
		};
		script.src = JAFO.loadersBase + 'js/loaders/BinaryLoader.js';
	};

	JAFO.loadHTML = function ( bundle ) {
//console.log( 'load HTML', bundle );


		scene.select = scene.children[0];

		JAFO.updateObject ( scene.select, bundle );

		JAFO.updateTargetList( bundle.src );

		JATH.resetCamera( V3PL.bundles[0] );

	};

// look into getDataUrl...

	JAFO.openFileParseDAE = function ( bundle, file ) {

		var reader = new FileReader();

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			reader.addEventListener( 'load', function ( event ) {
				var contents = event.target.result;

				var parser = new DOMParser();
				var xml = parser.parseFromString( contents, 'text/xml' );

				loader = new THREE.ColladaLoader();
				loader.options.convertUpAxis = true;
				loader.parse( xml, function ( collada ) {

					collada.scene.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh && child.material instanceof THREE.MeshFaceMaterial ) {

							child.material = new THREE.MeshPhongMaterial();
							child.material.needsUpdate = true;
						}
					} );

console.log( 'openFileDAE', bundle );
					scene.add( collada.scene );
					scene.select = collada.scene;
					JAFO.updateObject ( scene.select, bundle );
					JAFO.updateTargetList( bundle.src );
					JATH.zoomExtents();

				}, bundle.src );

			}, false );

			reader.readAsText( file.files[0] );
		};
		script.src = JAFO.loadersBase + 'js/loaders/ColladaLoader.js';
	};

/*
	JAFO.openFileLoadDAE = function ( inpFile, bundle ) {
console.log( 'openFileLoadDAE', bundle );

		var reader = new FileReader();
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			reader.addEventListener( 'load', function ( event ) {
				var contents = event.target.result;

				var loader = new THREE.ColladaLoader();
				loader.load( bundle.src, function ( collada ) {

					collada.scene.name = bundle.name;

					JAFO.updateObject ( scene.select, bundle );
					JAFO.updateTargetList( bundle.src );
					scene.add( collada.scene );
					scene.select = collada.scene;

				} );

			}, false );

			reader.readAsText( inpFile.files[0] );
		};
		script.src = JAFO.loadersBase + 'js/loaders/ColladaLoader.js';

	};
*/

var coll;

	JAFO.loadDAE = function ( bundle, contents ) {
console.log( 'loadDAE', bundle );

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var loader = new THREE.ColladaLoader();
//			loader.options.centerGeometry = true;  // does this work?
			loader.options.convertUpAxis = true;
			loader.load( bundle.src, function colladaReady( collada ) {

//coll = collada;
//console.log( collada.dae.materials );
//console.log( collada );

				collada.scene.traverse( function ( child ) {

					if ( child instanceof THREE.Mesh && child.material instanceof THREE.MeshFaceMaterial ) {

						child.material = new THREE.MeshPhongMaterial();
						child.material.needsUpdate = true;
					}
				} );

				scene.add( collada.scene );
//				scene = collada.scene;  // does not compute

				scene.select = collada.scene;
				JAFO.updateObject ( scene.select, bundle );
				JAFO.updateTargetList( bundle.src );
				JATH.zoomExtents();

			} );
		};
		script.src ='http://mrdoob.github.io/three.js/examples/js/loaders/ColladaLoader.js' ;

	};

	JAFO.loadJSON = function ( bundle, contents ) {
console.log( 'loadJSON', contents );

		contents = contents ? contents : JAFO.requestFile( bundle.src );

// the following code is from the Three.js Editor
// Not everybody understands it. Leave it out if you wish...

		if ( contents && contents.indexOf( 'postMessage' ) !== -1 ) {
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
		try {
			contents = JSON.parse( contents );
		} catch ( error ) {
			alert( error );
			return;
		}
		JAFO.handleJSON( bundle, contents );

	};

	JAFO.loadOBJ = function ( bundle, contents ) {

		contents = contents ? contents : JAFO.requestFile( bundle.src );

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var object = new THREE.OBJLoader().parse( contents );

			mesh = object.children[0];

			scene.add( mesh );
			scene.select = mesh;
			JAFO.updateObject ( mesh, bundle );
			JAFO.targetList.push( mesh );

		};
		script.src = JAFO.loadersBase + 'js/loaders/OBJLoader.js';

	};

	JAFO.loadSTL = function ( bundle, contents, inpFile ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = JAFO.loadersBase + 'js/wip/TypedGeometry.js';

		var reader = new FileReader();
		script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {
//console.log( 'loadSTL', bundle,  inpFile, contents );
			if ( contents  ) {

//				reader.addEventListener( 'load', function ( event ) {
//console.log( 'got here' );
//					var contents = event.target.result;
					geometry = new THREE.STLLoader().parse( contents );
					material = new THREE.MeshPhongMaterial();

					mesh = new THREE.Mesh( geometry, material );
//					material = new THREE.MeshNormalMaterial();

//					mesh.material = new THREE.MeshNormalMaterial();

					mesh.geometry.verticesNeedUpdate = true;

					mesh.geometry.normalsNeedUpdate = true;
					mesh.geometry.computeFaceNormals();
					mesh.geometry.computeVertexNormals();
			//		mesh.geometry.computeTangents();
			//		mesh.geometry.computeMorphNormals();
					mesh.geometry.buffersNeedUpdate = true;
					mesh.geometry.uvsNeedUpdate = true;
					mesh.material.needsUpdate = true;


					scene.add( mesh );
					scene.select = mesh;
					JAFO.updateObject ( mesh, bundle );
					JAFO.targetList.push( mesh );

					JATH.zoomExtents();
//console.log( mesh );

			} else if ( inpFile ) {

				reader.addEventListener( 'load', function ( event ) {
//console.log( 'got here', inpFile.files[0] );
					var contents = event.target.result;
					geometry = new THREE.STLLoader().parse( contents );
					material = new THREE.MeshPhongMaterial();

					mesh = new THREE.Mesh( geometry, material );
//					material = new THREE.MeshNormalMaterial();

//					mesh.material = new THREE.MeshNormalMaterial();

					mesh.geometry.verticesNeedUpdate = true;

					mesh.geometry.normalsNeedUpdate = true;
					mesh.geometry.computeFaceNormals();
					mesh.geometry.computeVertexNormals();
			//		mesh.geometry.computeTangents();
			//		mesh.geometry.computeMorphNormals();
					mesh.geometry.buffersNeedUpdate = true;
					mesh.geometry.uvsNeedUpdate = true;
					mesh.material.needsUpdate = true;

					scene.add( mesh );
					scene.select = mesh;
					JAFO.updateObject ( mesh, bundle );
					JAFO.targetList.push( mesh );

					JATH.zoomExtents();
//console.log( mesh );

				}, false );

				if ( reader.readAsBinaryString !== undefined ) {
//console.log( 'reader.readAsBinaryString', reader.readAsBinaryString );

					reader.readAsBinaryString( inpFile.files[0] );

				} else {

					reader.readAsText( inpFile.files[0] );
				}

			} else {
//console.log( 'loadStl loader' );
				var loader = new THREE.STLLoader();
				loader.addEventListener( 'load', function ( event ) {

					geometry = event.content;
					material = new THREE.MeshPhongMaterial();
					var mesh = new THREE.Mesh( geometry, material );

					mesh.rotation.set( - Math.PI / 2, 0, 0 );

					scene.add( mesh );
					scene.select = mesh;
					JAFO.updateObject ( mesh, bundle );
					JAFO.targetList.push( mesh );

					JATH.zoomExtents();

				} );
				loader.load( bundle.src );
			}

		};
		script.src = JAFO.loadersBase + 'js/loaders/STLLoader.js';

	};

	JAFO.loadVTK = function ( bundle, contents ) {
//console.log( 'JAFO.loadVTK', bundle );

		contents = contents ? contents : JAFO.requestFile( bundle.src );

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

		contents = contents ? contents : JAFO.requestFile( bundle.src );
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

	JAFO.handleJSON = function ( bundle, contents ) {


		contents = contents ? contents : JAFO.requestFile( bundle.src );

		contents = JSON.parse( contents );
//console.log( 'handleJSON', bundle, contents );
		var loader;
		var mesh;

		if ( contents.metadata === undefined ) { // 2.0
			contents.metadata = { type: 'Geometry' };
		}

		if ( contents.metadata.type === undefined ) { // 3.0
			contents.metadata.type = 'Geometry';
		}
		if ( contents.metadata.version === undefined ) {
			contents.metadata.version = contents.metadata.formatVersion;
		}
		if ( contents.metadata.type.toLowerCase() === 'geometry' ) {
// console.log( 'found geometry' );

/*
//3DS Version

			loader = new THREE.ObjectLoader();
			loader.load( 'file:///C:/Users/theo/Dropbox/Public/git-repos/va3c.github.io/json/3dsmax/TransamericaPyramid2.js', function( result ){
				scene = result;
				JAFO.updateScene( bundle, result );
			} );
*/

// JSONLoader loads all revs of geometry...

			var texturePath = bundle.src.substr( 0, 1 + bundle.src.lastIndexOf('/') );

			loader = new THREE.JSONLoader();
			contents = loader.parse( contents, texturePath );

			var geometry = contents.geometry;

			if ( contents.materials !== undefined ) {
//console.log( 'found geometry', contents.materials );
				if ( contents.materials.length > 1 ) {
					material = new THREE.MeshFaceMaterial( contents.materials );

					for (var i = 0, len = contents.materials.length; i < len; i++) {
						contents.materials[i].side = 2;
						contents.materials[i].needsUpdate = true;
					}

				} else {
					material = contents.materials[ 0 ];
				}
			} else if ( bundle ){
				material = JAMA.materials[ bundle.mat ].set();
			} else {
				material = JAMA.materials.NormalSmooth.set();
			}

			geometry.sourceFile = bundle.src;

			mesh = new THREE.Mesh( geometry, material );

			JAFO.updateObject ( mesh, bundle );

			scene.add( mesh );
			scene.select = mesh;
//			JAFO.targetList.push( mesh );


		} else if ( contents.metadata.type.toLowerCase() === 'object' ) {

			loader = new THREE.ObjectLoader();
			contents = loader.parse( contents );

			if ( contents instanceof THREE.Scene ) {
//console.log( 'found scene' );

				JAFO.loadScene( bundle, contents );

			} else {
//console.log( 'found object', contents );

				scene.add( contents );
//				scene = contents;
				scene.select = contents;
				JAFO.updateObject ( contents, bundle );
//				JAFO.targetList.push( contents );

			}
		} else if ( contents.metadata.type.toLowerCase() === 'scene' ) {

console.log( 'found deprecated');

// DEPRECATED
			var loader = new THREE.SceneLoader();
			loader.load( bundle.src, function ( contents ) {
				JAFO.loadScene( bundle, contents );
			}, '' );

		} else {

console.log( 'found a whoopsie');

		}
	};

	JAFO.loadScene = function( bundle, contents ) {
console.log( 'updateScene', bundle );

		scene = contents;
//		JAFO.targetList = scene.children;

// Update controller and camera
		V3PL.bundles[0].src = JAFO.template;

// Update Three.js
		app.scene = scene;

		JALI.checkLights();

// where is scale coming from?
		for (var i = 0, len = contents.children.length; i < len; i++) {
			if ( contents.children[i].geometry ) {
				contents.children[i].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( bundle.scl ) );
			}
			for (var j = 0, lenJ = contents.children[i].length; j < lenJ; j++) {
				if ( contents.children[i].children[j] && contents.children[i].children[j].geometry ) {
					contents.children[i].children[j].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( bundle.scl ) );
				}
			}
		}

		JATH.resetCamera( V3PL.bundles[0] );
//		JATH.zoomExtents();

		scene.select = contents.children[0];
		scene.name = scene.select.name = bundle.name;
		scene.scr = scene.select.src = bundle.src;
		scene.select.materialKey = V3PL.mat;

		JAFO.updateTargetList( bundle.src );

// Update parent
		JATH.attributesDiv.innerHTML = geoMsg.innerHTML = bundle.name + '<br>';
		divMsg1.innerHTML = 'Base: ' + bundle.name;



	};

	JAFO.updateObject = function ( obj, bundle ) {

		obj.position.set( bundle.posx, bundle.posy, bundle.posz );
		obj.rotation.set( bundle.rotx, bundle.roty, bundle.rotz );
		obj.scale.set( bundle.sclx * bundle.scl, bundle.scly * bundle.scl, bundle.sclz * bundle.scl);
		obj.name = bundle.name;
		obj.scale = bundle.scl;
		obj.src = bundle.src;

		if ( bundle.override ) {
			obj.material = JAMA.materials[ bundle.mat ].set();
		}
		obj.materialKey = bundle.mat;

		obj.castShadow = true;
		obj.receiveShadow = true;

	};

	JAFO.updateTargetList = function( src ) {

		if ( src.indexOf( '.rvt.js' ) > -1 ) {
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

			JATH.zoomExtents();
	};

	JAFO.requestFile = function( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous";
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	};

	var xmlhttp;
	JAFO.requestFileBinary = function( bundle ) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.bundle = bundle;
		xmlhttp.crossOrigin = "Anonymous";
		xmlhttp.responseType = "arraybuffer";
		xmlhttp.open( 'GET', bundle.src, true );
		xmlhttp.onreadystatechange = callbackFile;
		xmlhttp.send( null );
	};

	function callbackFile() {
		if ( xmlhttp.readyState == 4  ) {
			JAFO.switchType( xmlhttp.bundle, xmlhttp.response  );
		} else {
console.log('waiting...');
		}

	}

