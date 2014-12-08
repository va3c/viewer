// try pre-loading. But fail often - especially when called by permalink
// so ensure load before first use...
	VH.loadScript( hackerPrefix + 'load-file-html.js' );
	VH.loadScript( hackerPrefix + 'load-file-json.js' );
	VH.loadScript( hackerPrefix + 'load-file-stl.js' );
	VH.loadScript( hackerPrefix + 'load-file-obj.js' );

	VH.dispatchFileByURL = function( parameters )  {

		var script;

		var fileName = parameters[1].toLowerCase();

		var fileType = fileName.substr( fileName.lastIndexOf( '.' ) );

		if ( fileType === '.html' || fileType === '.htm' ) {

			script = document.body.appendChild( document.createElement( 'script' ) );

			script.onload = function() {

				VH.loadFileHTMLByURL( fileName, function(){

					if ( parameters.indexOf( 'cors=false' ) > -1 ) { return; }

					app = VH.ifr.contentWindow ;

					THREE = app.THREE;
					renderer = app.renderer;
					scene = app.scene;
					camera = app.camera;
					controls = app.controls;
					material = app.material;


					VH.updateObjectGeometryByHashParameters ( scene, parameters );

					VH.updateSceneByHashParameters( parameters );

					VH.addShadowsToMeshesInScene( scene );

					msg.innerHTML = 'File: ' + fileName + '<br>';

				} );

			};

			script.src = hackerPrefix + 'load-file-html.js';



		} else if ( fileType === '.js' || fileType === '.json' ) {

			if ( fileName === 'export-screen-grabber.js' ) {

				VH.loadScript( fileName );

			} else {

				VH.loadScript( hackerPrefix + 'load-file-json.js', callbackJavaScriptJSON );

				function callbackJavaScriptJSON() {

	// Two VH.loadScript in a row does not work...

					script = document.body.appendChild( document.createElement( 'script' ) );

					script.onload = function() {

						callbackJavaScriptHTMLJSON( );

					};

					script.src = hackerPrefix + 'load-file-html.js';

				}

				function callbackJavaScriptHTMLJSON() {

					if ( !app.scene || parameters.indexOf( 'add=true' ) === -1 ) {

						VH.loadFileHTMLByURL( template, function() {
	 
							callbackLoadJSONURL( parameters, callbackUpdateJSON )

						} );

					} else {

						callbackLoadJSONURL ( parameters, callbackUpdateJSON );

					}

				}

				function callbackLoadJSONURL( parameters ) {

//console.log( 'callbackJavaScriptHTML', VH, parameters );

					app = VH.ifr.contentWindow ;
					THREE = app.THREE;
					renderer = app.renderer;
					scene = app.scene;
					camera = app.camera;
					controls = app.controls;
					material = app.material;

					VH.loadFileJSONbyURL( parameters, callbackUpdateJSON );

				}

				function callbackUpdateJSON( objectJSON ) {

					VH.updateObjectGeometryByHashParameters ( objectJSON, parameters );

					VH.updateSceneByHashParameters( parameters );

					VH.addShadowsToMeshesInScene( scene );

				}

			}

		} else if ( fileType === '.obj' ) {

			VH.loadScript( hackerPrefix + 'load-file-obj.js', callbackJavaScriptOBJ );

			function callbackJavaScriptOBJ() {

// Two VH.loadScript in a row does not work...

				script = document.body.appendChild( document.createElement( 'script' ) );

				script.onload = function() {

					callbackJavaScriptHTMLOBJ( );

				};

				script.src = hackerPrefix + 'load-file-html.js';

			}

			function callbackJavaScriptHTMLOBJ() {

				if ( !app.scene || parameters.indexOf( 'add=true' ) === -1 ) {

					VH.loadFileHTMLByURL( template, function() {
 
//console.log( 'callbackJavaScriptHTML', parameters );

						callbackLoadOBJURL( parameters, callbackUpdateOBJ )

					} );

				} else {

					callbackLoadOBJURL ( parameters, callbackUpdateOBJ );

				}

			}

			function callbackLoadOBJURL() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				renderer = app.renderer;
				scene = app.scene;
				camera = app.camera;
				controls = app.controls;
				material = app.material;

				VH.loadFileOBJByURL( parameters, callbackUpdateOBJ );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( scene );

			}

			function callbackUpdateOBJ( objectOBJ ) {

				VH.updateObjectGeometryByHashParameters ( objectOBJ, parameters );

			}

		} else if ( fileType === '.stl' ) {

			VH.loadScript( hackerPrefix + 'load-file-stl.js', callbackJavaScriptSTL );

			function callbackJavaScriptSTL() {

// Two VH.loadScript in a row does not work...

				script = document.body.appendChild( document.createElement( 'script' ) );

				script.onload = function() {

					callbackJavaScriptHTMLSTL( );

				};

				script.src = hackerPrefix + 'load-file-html.js';

			}

			function callbackJavaScriptHTMLSTL() {

				if ( !app.scene || parameters.indexOf( 'add=true' ) === -1 ) {

					VH.loadFileHTMLByURL( template, function( object ) {

// console.log( 'callbackJavaScriptHTMLSTL', parameters );

						callbackLoadSTLURL( )

					} );

				} else {

					callbackLoadSTLURL ();

				}

			}

			function callbackLoadSTLURL() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				renderer = app.renderer;
				scene = app.scene;
				camera = app.camera;
				controls = app.controls;
				material = app.material;

				VH.loadFileSTLByURL( parameters, callbackUpdateSTL );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( scene );

			}

			function callbackUpdateSTL( objectSTL ) {

				VH.updateObjectGeometryByHashParameters ( objectSTL, parameters );

			}

		}

	};



	VH.getFile = function( fileObject, parameters ) {

		var file = fileObject.files[ 0 ];

		var reader = new FileReader();

		reader.onload = function ( event ) {

			output = reader.result;

			msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + 
				' type: ' + file.type + ' modified: ' + file.lastModifiedDate +
			'';

			timeLastModified = file.lastModified;

			VH.dispatchFileByContents ( output, file.name, parameters );

		};

//		reader.readAsText( file );

		if ( reader.readAsBinaryString !== undefined ) {

			reader.readAsBinaryString( file );

		} else {

			reader.readAsArrayBuffer( file );

		}

	};


	VH.dispatchFileByContents = function( contents, fileName, parameters ) {

		var fileType = fileName.toLowerCase().substr( fileName.lastIndexOf( '.' ) );

		if ( fileType === '.html' || fileType === '.htm' ) {

			VH.loadFileHTMLByContents( contents, callbackLoadFileHTMLByContents );

			function callbackLoadFileHTMLByContents( object ) {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				renderer = app.renderer;
				scene = app.scene;
				camera = app.camera;
				controls = app.controls;
				material = app.material;

				VH.updateObjectGeometryByHashParameters ( object, parameters );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( scene );

			}


		} else if ( fileType === '.json' || fileType === '.js' ) {

			if ( !app.scene || parameters.indexOf( 'add=true' ) === -1 ) {

				VH.loadFileHTMLByURL( template, prepareJSON );

			} else {

				prepareJSON();

			}

			function prepareJSON(){

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				renderer = app.renderer;
				scene = app.scene;
				camera = app.camera;
				controls = app.controls;
				material = app.material;

				contents = JSON.parse( contents );

				VH.loadFileJSONByContents( contents, parameters, callbackUpdateJSON );

			};


			function callbackUpdateJSON( objectJSON ) {

				VH.updateObjectGeometryByHashParameters ( objectJSON, parameters );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( scene );

			}


		} else if ( fileType === '.obj' ) {

			if ( !app.scene || parameters.indexOf( 'add=true' ) === -1 ) {

console.log( 'stl - new', parameters );

				VH.loadFileHTMLByURL( template, prepareOBJ );

			} else {

console.log( 'stl - adding', parameters )

				prepareOBJ();

			}

			function prepareOBJ() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				renderer = app.renderer;
				scene = app.scene;
				camera = app.camera;
				controls = app.controls;
				material = app.material;

				VH.loadFileOBJByContents( contents, callbackOBJ );

			}

			function callbackOBJ( mesh ) {

				VH.updateObjectGeometryByHashParameters ( mesh, parameters );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( app.scene );

			}

// STL

		} else if ( fileType === '.stl' ) {

			if ( !app.scene || parameters.indexOf( 'add=true' ) === -1 ) {

				VH.loadFileHTMLByURL( template, prepareSTL );

			} else {

				prepareSTL();

			}

			function prepareSTL() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				VH.loadFileSTLByContents( contents, VH.updateSceneElements );

			}


/*
			function callbackSTL( mesh ) {

				VH.updateObjectGeometryByHashParameters ( mesh, parameters );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( app.scene );

			}
*/

		}

	};

	VH.updateSceneElements = function( scene, mesh parameters) {

		VH.updateObjectGeometryByHashParameters ( mesh, parameters );

		VH.updateSceneByHashParameters( parameters );

		VH.addShadowsToMeshesInScene( app.scene );

	}
