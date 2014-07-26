	var V3LI = {} || V3LI;

	if ( window.location.origin === 'http://' ) {
		V3LI.loaderBase = '../../../three.js/examples/';
	} else {
		V3LI.loaderBase = '../../../../three.js/examples/';
	}

	V3LI.boilerplate = 'boilerplate-simple.html';


	V3LI.addLibrariesTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'View available libraries';
		tab.innerHTML =
			'<a href=# onclick=JA.toggleTab(V3LI.libraries); ><p class=button >' +
				'<i class="fa fa-paw"></i> Introduction' +
			'</p></a>'; 

		V3LI.libraries = JA.menu.appendChild( document.createElement( 'div' ) );
		V3LI.libraries.style.cssText = 'cursor: auto; display: ; ' ;
		V3LI.libraries.innerHTML =
			'<input type=radio name=fileOpen id=openOver /> Overwrite current view<br>' +
			'<input type=radio name=fileOpen id=openAppend /> Append to current view<br>' +
			'<p>A work in progress. Much broken. Nonetheless lots worth exploring. More goodies on the way...</p>' +
		'';

		openOver.checked = true;
	};

	V3LI.init = function() {
		JA.about.style.height = '450px';
		JA.about.innerHTML =
			'<h3>' + document.title + ' ' + JA.titleIcon + '</h3>' +
				'<p>View Revit, Rhino/Grasshopper 3DS Max and other model types models in 3D with any web browser using Three.js and data rendered as JSON files.</p>' +
				'<p>This script is an update to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a></p>' +
				'<p>Team Members: Benjamin Howes, Jonatan Schumacher, Jeremy Tammik, Matt Mason, Kevin Vandecar, Charlie Portelli, Josh Wentz, Femi King, Zach Flanders & Theo Armour</p>' +
				'<p>Supporters include: Mostapha Roudsari, Ashley Reed, Anne Waelkens, Jim Quanci, Elcin Ertugrul, Amir Tasbihi and many more. Others?</p>' +
			'<small>' +
				'<a href="http://va3c.github.io/viewer/va3c-viewer-html5/readme-reader.html" target="_blank">Read Me ~</a> ' +
				'<a href="https://github.com/va3c/viewer/tree/gh-pages/va3c-viewer-html5" target="_blank">Source Code ~ </a> ' +
				'Credits: <a href="http://threejs.org" target="_blank">three.js</a> - ' +
				'<a href="http://khronos.org/webgl/" target="_blank">webgl</a> - ' +
				'<a href="http://jaanga.github.io" target="_blank">jaanga</a><br>' +
				'copyright &copy; 2014 Jaanga authors ~ MIT license' +
			'</small><br><br>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleDialogs(JA.about); >Close</a> ' +
			'</p>' +
		'';
		var items = [ 1, 11, 12, 14, 33, 42, 54, 58, 62, 131, 151, 155 ];
		index = items[ Math.floor( items.length * Math.random() ) ];
		fileTitle = V3JM.files[ index ][ 1 ];
		basepath = V3JM.basepath + '/' + V3JM.files[ index ][ 0 ] + '/';
		fname = V3JM.files[ index ][ 0 ] + '.html';
		V3LI.updateIframe( V3JM.files, index, basepath, fname, '' );

	}

	V3LI.updateIframe = function( fileList, index, basepath, filename, boilerplate ) {

		V3LI.fileList = fileList;
		V3LI.index = index;
		V3LI.basepath = basepath;
		V3LI.filename = filename;
		V3LI.boilerplate = boilerplate;

		if ( !V3LI.ifr ) {
			V3LI.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
			V3LI.ifr.height = window.innerHeight;
			V3LI.ifr.width = window.innerWidth;
			V3LI.ifr.style.cssText = 'border-width: 0; position: absolute; ';
		}

		var extension = filename.split( '.' ).pop().toLowerCase();
		if ( openOver.checked === true ) {
			V3LI.ifr.onload = function() {

				app = V3LI.ifr.contentWindow;

				THREE = app.THREE;
				renderer = app.renderer;
				scene = app.scene;
				scene.select = app.mesh;
				camera = app.camera;
				controls = app.controls;

				material = app.material;

				V3LI.loadFile( basepath, filename );

// console.log( filename, scene );
				detectSceneInScene( scene );

				divCon.innerHTML = ''; // why is this duplicate needed?

				V3CO.updateControlsTab();
//				V3CO.updateMesh();

				renderer.shadowMapEnabled = true;
				renderer.shadowMapSoft = true;

				chkLightAmbient.checked = true;
				JALI.toggleLightAmbient();

				chkLightCamera.checked = true;
				JALI.toggleLightCamera();

				chkLightPosition.checked = true;
				JALI.toggleLightPosition();

				JAPR.setRandomGradient();

				projector = new THREE.Projector();
				app.window.addEventListener( 'click', onDocumentMouseClick, false );

				divMsg1.innerHTML = 'Overwrite ' + index + ' ' + fileList[ index ][0];

			};

			if ( extension === 'html' ) {
				V3LI.ifr.src = basepath + filename;
			} else {
// console.log( boilerplate );
				V3LI.ifr.src = ( boilerplate != '' ) ? boilerplate : 'boilerplate-simple.html';
			}
		} else {
			V3LI.loadFile( basepath, filename );
			V3CO.updateControlsTab();
			divMsg1.innerHTML = 'append ' + index + ' ' + fileList[ index ][0];
		}

	};

	function detectSceneInScene() {
		if ( scene.children[0] instanceof THREE.Scene ) {
// console.log( 'yup', scene.children[0] ); 
			scene = scene.children[0];
			scene.select = scene.children[0];
		}
	}

	function requestFile( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous"; 
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	}

	V3LI.loadFile = function ( basepath, filename ) {

		var scr, reader, contents, fname, loader, result;

		var extension = filename.split( '.' ).pop().toLowerCase();

		switch ( extension ) {
			case 'html' :

// console.log( basepath, filename);

				break;
			case 'babylon':

				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;
					var json = JSON.parse( contents );

					var loader = new THREE.BabylonLoader();
					var scene = loader.parse( json );

					editor.setScene( scene );

				}, false );
				reader.readAsText( file );

				break;

			case 'ctm':

					var scr = document.body.appendChild( document.createElement( 'script' ) );
					scr.src = basepath + 'js/loaders/ctm/lzma.js';

					scr = document.body.appendChild( document.createElement( 'script' ) );
					scr.src = basepath + 'js/loaders/ctm/ctm.js';

					scr = document.body.appendChild( document.createElement( 'script' ) );

					scr.onload = function() {

						var data = new Uint8Array( contents );

						var stream = new CTM.Stream( data );
						stream.offset = 0;

						var loader = new THREE.CTMLoader();
						loader.createModel( new CTM.File( stream ), function( geometry ) {

							geometry.sourceType = "ctm";
							geometry.sourceFile = file.name;

							var material = new THREE.MeshPhongMaterial();

							var mesh = new THREE.Mesh( geometry, material );
							mesh.name = filename;

							scene.add( mesh );

							} );
					};
					scr.src = V3LI.loaderBase + 'js/loaders/ctm/CTMLoader.js';


/*
				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var data = new Uint8Array( event.target.result );

					var stream = new CTM.Stream( data );
					stream.offset = 0;

					var loader = new THREE.CTMLoader();
					loader.createModel( new CTM.File( stream ), function( geometry ) {

						geometry.sourceType = "ctm";
						geometry.sourceFile = file.name;

						var material = new THREE.MeshPhongMaterial();

						var mesh = new THREE.Mesh( geometry, material );
						mesh.name = filename;

						editor.addObject( mesh );
						editor.select( mesh );

					} );

				}, false );
				reader.readAsArrayBuffer( file );
*/

				break;

			case 'dae':

					scr = document.body.appendChild( document.createElement( 'script' ) );
					scr.onload = function() {

						var fname = basepath + filename;
						var contents = requestFile( fname );

						var parser = new DOMParser();
						var xml = parser.parseFromString( contents, 'text/xml' );

						var loader = new THREE.ColladaLoader();
						loader.parse( xml, function ( collada ) {

							collada.scene.name = filename;

							scene.add( collada.scene );
							scene.select( collada.scene );

						} );
					}
					scr.src = V3LI.loaderBase + 'js/loaders/ColladaLoader.js';


/*
				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var parser = new DOMParser();
					var xml = parser.parseFromString( contents, 'text/xml' );

					var loader = new THREE.ColladaLoader();
					loader.parse( xml, function ( collada ) {

						collada.scene.name = filename;

						editor.addObject( collada.scene );
						editor.select( collada.scene );

					} );

				}, false );
				reader.readAsText( file );
*/
				break;

			case 'js':
			case 'json':

			case '3geo':
			case '3mat':
			case '3obj':
			case '3scn':

					var fname = basepath + filename;
					var contents = requestFile( fname );

					if ( contents.indexOf( 'postMessage' ) !== -1 ) {

						var blob = new Blob( [ contents ], { type: 'text/javascript' } );
						var url = URL.createObjectURL( blob );

						var worker = new Worker( url );

						worker.onmessage = function ( event ) {

							event.data.metadata = { version: 2 };
							V3LI.handleJSON( event.data, filename, filename );

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

					V3LI.handleJSON( data, filename, filename );
console.log( 'handled' );
//				}, false );
//				reader.readAsText( file );

				break;

			case 'obj':

					var fname = basepath + filename;
					var contents = requestFile( fname );

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

				break;

			case 'ply':

					var fname = basepath + filename;
					var contents = requestFile( fname );

					var scr = document.body.appendChild( document.createElement( 'script' ) );
					scr.onload = function() {

						var geometry = new THREE.PLYLoader().parse( contents );
						geometry.sourceType = "ply";
						geometry.sourceFile = fileList[ index ];

						var material = new THREE.MeshNormalMaterial();

						var mesh = new THREE.Mesh( geometry, material );
						mesh.name = filename;

						scene.add( mesh );

					}
					scr.src = V3LI.loaderBase + 'js/loaders/PLYLoader.js';

/*
				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					console.log( contents );

					var geometry = new THREE.PLYLoader().parse( contents );
					geometry.sourceType = "ply";
					geometry.sourceFile = file.name;

					var material = new THREE.MeshPhongMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

					editor.addObject( mesh );
					editor.select( mesh );

				}, false );
				reader.readAsText( file );
*/

				break;

			case 'stl':

					var scr = document.body.appendChild( document.createElement( 'script' ) );
					scr.src = V3LI.loaderBase + 'js/wip/TypedGeometry.js';

					var scr = document.body.appendChild( document.createElement( 'script' ) );
					scr.onload = function() {

						var fname = basepath + filename;
						var xmlhttp;
						var contents = requestSTLFile( fname );

						function requestSTLFile( fname ) {
							xmlhttp = new XMLHttpRequest();
							xmlhttp.open( 'GET', fname, true );
							xmlhttp.responseType = "arraybuffer";
							xmlhttp.onload = function (oEvent) {
								var arrayBuffer = xmlhttp.response;
									if (arrayBuffer) {

										var geometry = new THREE.STLLoader().parse( arrayBuffer );
										var material = new THREE.MeshPhongMaterial();
										var mesh = new THREE.Mesh( geometry, material );
										mesh.castShadow = true;
										mesh.receiveShadow = true;

										scene.add( mesh );
										scene.select = mesh;

									}
								};
							xmlhttp.send( null );
						}

					}
					scr.src = V3LI.loaderBase + 'js/loaders/STLLoader.js';

/*
				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var geometry = new THREE.STLLoader().parse( contents );
					geometry.sourceType = "stl";
					geometry.sourceFile = file.name;

					var material = new THREE.MeshPhongMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

					editor.addObject( mesh );
					editor.select( mesh );

				}, false );

				if ( reader.readAsBinaryString !== undefined ) {

					reader.readAsBinaryString( file );

				} else {

					reader.readAsArrayBuffer( file );

				}
*/

				break;

			/*
			case 'utf8':

				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var geometry = new THREE.UTF8Loader().parse( contents );
					var material = new THREE.MeshLambertMaterial();

					var mesh = new THREE.Mesh( geometry, material );

					editor.addObject( mesh );
					editor.select( mesh );

				}, false );
				reader.readAsBinaryString( file );

				break;
			*/

			case 'vtk':

					var fname = basepath + filename;
					var contents = requestFile( fname );

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


/*
				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var geometry = new THREE.VTKLoader().parse( contents );
					geometry.sourceType = "vtk";
					geometry.sourceFile = file.name;

					var material = new THREE.MeshPhongMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

					editor.addObject( mesh );
					editor.select( mesh );

				}, false );
				reader.readAsText( file );
*/
				break;

			case 'wrl':

					var fname = basepath + filename;
					var contents = requestFile( fname );

					var scr = document.body.appendChild( document.createElement( 'script' ) );
					scr.onload = function() {

						var object = new THREE.VRMLLoader().parse( contents );
						mesh = object.children[0];
						mesh.name = filename;
						mesh.material = new THREE.MeshPhongMaterial();
						mesh.castShadow = true;
						mesh.receiveShadow = true;
						scene.add( object );
						scene.select = mesh;
					}
					scr.src = V3LI.loaderBase + 'js/loaders/VRMLLoader.js';

/*
				var reader = new FileReader();
				reader.addEventListener( 'load', function ( event ) {

					var contents = event.target.result;

					var result = new THREE.VRMLLoader().parse( contents );

					editor.setScene( result );

				}, false );
				reader.readAsText( file );
*/
				break;

			default:

				alert( 'Unsupported file format.' );

				break;

		}

	}

	V3LI.handleJSON = function ( data, filename ) {
// console.log( 'handle' );
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

			var loader = new THREE.JSONLoader();
			var result = loader.parse( data );

			var geometry = result.geometry;
			var material;

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

			scene.add( mesh );
			scene.select = mesh;
//console.log( 'geometry', result );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			var loader = new THREE.ObjectLoader();
			var result = loader.parse( data );

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

			var loader = new THREE.SceneLoader();
			loader.parse( data, function ( result ) {

				scene.add( result.scene );
//console.log( 'scene old', result );
			}, '' );

		}

	};
