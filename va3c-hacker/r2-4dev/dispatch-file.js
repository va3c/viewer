// try pre-loading. But fail often - especially when called by permalink
// so ensure load before first use...
	VH.loadScript( hackerPrefix + 'load-file-html.js' );
	VH.loadScript( hackerPrefix + 'load-file-json.js' );
	VH.loadScript( hackerPrefix + 'load-file-stl.js' );
	VH.loadScript( hackerPrefix + 'load-file-obj.js' );

	VH.dispatchFileByURL = function( parameters )  {

//console.log( 'VH.dispatchFileByURL', parameters );

		var script;

		var fileName = parameters[1].toLowerCase();

		var fileType = fileName.substr( fileName.lastIndexOf( '.' ) );

		if ( fileType === '.html' || fileType === '.htm' ) {

			script = document.body.appendChild( document.createElement( 'script' ) );

			script.onload = function() {

				VH.loadFileHTMLByURL( fileName, parameters, callbackloadFileHTMLByURL );

			};

			function callbackloadFileHTMLByURL() {

				if ( parameters.indexOf( 'noCors' ) === -1 ) { 

					app = VH.ifr.contentWindow ;
					THREE = app.THREE;
					scene = app.scene;
					renderer = app.scene

				}

				VH.updateSceneElements( '', parameters );

			}

			script.src = hackerPrefix + 'load-file-html.js';


// JSON

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

					if ( !scene || parameters.indexOf( 'add=true' ) === -1 ) {

						VH.loadFileHTMLByURL( template, parameters, callbackLoadJSONURL );

					} else {

						callbackLoadJSONURL();

					}

				}

				function callbackLoadJSONURL() {

					app = VH.ifr.contentWindow ;
					THREE = app.THREE;
					scene = app.scene;

					VH.loadFileJSONbyURL( parameters, VH.updateSceneElements );

				}

			}


// OBJ

		} else if ( fileType === '.obj' ) {

			VH.loadScript( hackerPrefix + 'load-file-obj.js', callbackJavaScriptOBJ );

			function callbackJavaScriptOBJ() {

// Two VH.loadScript in a row does not work...

				script = document.body.appendChild( document.createElement( 'script' ) );

				script.onload = function() {

					callbackJavaScriptHTMLOBJ();

				};

				script.src = hackerPrefix + 'load-file-html.js';

			}

			function callbackJavaScriptHTMLOBJ() {

				if ( !app.scene || parameters.indexOf( 'add=true' ) === -1 ) {

					VH.loadFileHTMLByURL( template, parameters, callbackLoadOBJURL );

				} else {

					callbackLoadOBJURL ();

				}

			}

			function callbackLoadOBJURL() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				scene = app.scene;

				VH.loadFileOBJByURL( parameters, VH.updateSceneElements );

			}


// STL

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

					VH.loadFileHTMLByURL( template, parameters, callbackLoadSTLURL );

				} else {

					callbackLoadSTLURL();

				}

			}

			function callbackLoadSTLURL() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				scene = app.scene;

				VH.loadFileSTLByURL( parameters, VH.updateSceneElements );

			}

		} else {

			alert( 'Not a file type, we can deal with yet...')

		}

	};


// Respond to input file onchange

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


	VH.dispatchFileByContents = function( contents, fileName, parameters, callbackFinal ) {

// console.log( 'VH.dispatchFileByContents', contents );
//console.log( 'VH.dispatchFileByContents', fileName, parameters  );


		var fileType = fileName.toLowerCase().substr( fileName.lastIndexOf( '.' ) );

		if ( fileType === '.html' || fileType === '.htm' ) {

			VH.loadFileHTMLByContents( contents, parameters, callbackLoadFileHTMLByContents );

			function callbackLoadFileHTMLByContents( object, parameters ) {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				scene = app.scene;

				VH.updateSceneElements( object, parameters )

			}


// JSON

		} else if ( fileType === '.json' || fileType === '.js' ) {

			if ( !scene || parameters.indexOf( 'add=true' ) === -1 ) {

//console.log( 'JSON - new' );

				VH.loadFileHTMLByURL( template, parameters, prepareJSON );

			} else {

				prepareJSON();

//console.log( 'JSON - add' );

			}

			function prepareJSON(){

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				scene = app.scene;

				VH.loadFileJSONByContents( contents, parameters, VH.updateSceneElements );

			};



// OBJ 

		} else if ( fileType === '.obj' ) {

			if ( !scene || parameters.indexOf( 'add=true' ) === -1 ) {

				VH.loadFileHTMLByURL( template, parameters, prepareOBJ );

			} else {

				prepareOBJ();

			}

			function prepareOBJ() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				scene = app.scene;
				VH.loadFileOBJByContents( contents, parameters, VH.updateSceneElements );

			}


// STL

		} else if ( fileType === '.stl' ) {

			if ( !scene || parameters.indexOf( 'add=true' ) === -1 ) {

				VH.loadFileHTMLByURL( template, parameters, prepareSTL );

			} else {

				prepareSTL();

			}

			function prepareSTL() {

				app = VH.ifr.contentWindow ;
				THREE = app.THREE;
				scene = app.scene;

				VH.loadFileSTLByContents( contents, parameters, VH.updateSceneElements );

			}

		} else {

			alert( 'Not a file type, we can deal with yet...')

		}


	};

	VH.updateSceneElements = function( mesh, parameters ) {

		if ( mesh ) { VH.updateObjectGeometryByHashParameters ( mesh, parameters ); }

		VH.updateSceneByHashParameters( parameters );

		VH.addShadowsToMeshesInScene( app.scene );

		if ( app.callback ) { app.callback(); }

	}
