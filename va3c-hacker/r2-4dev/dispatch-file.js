
	VH.loadScript( hackerPrefix + 'load-file-html.js' );
	VH.loadScript( hackerPrefix + 'load-file-json.js' );
	VH.loadScript( hackerPrefix + 'load-file-stl.js' );

	VH.dispatchFileByURL = function( parameters )  {

		var script;

		var fileName = parameters[1].toLowerCase();

		var fileType = fileName.substr( fileName.lastIndexOf( '.' ) );

		if ( fileType === '.html' || fileType === '.htm' ) {

			script = document.body.appendChild( document.createElement( 'script' ) );

			script.onload = function() {

				VH.loadFileHTMLByURL( fileName, function(){

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

				script = document.body.appendChild( document.createElement( 'script' ) );

				script.onload = function() {

					VH.loadFileJSONbyURL( parameters );

					VH.updateObjectGeometryByHashParameters ( scene, parameters );



				};

				script.src = hackerPrefix + 'load-file-json.js';


			}

		} else if ( fileType === '.obj' ) {

			VH.loadFileOBJByURL( parameters );

		} else if ( fileType === '.stl' ) {

// VH.loadScript has callback issues here...

			script = document.body.appendChild( document.createElement( 'script' ) );

			script.onload = function() {

				callbackSTL = function( mesh ) {

					VH.updateObjectGeometryByHashParameters ( mesh, parameters );

					VH.updateSceneByHashParameters( parameters );

					VH.addShadowsToMeshesInScene( scene );

//					msg.innerHTML = 'Template:' + template + '<br>' + 'File: ' + fileName;

				};

				VH.loadFileSTLByURL( parameters, callbackSTL );

			};

			script.src = hackerPrefix + 'load-file-stl.js';

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

		if ( fileType === '.html' ) {

			VH.loadFileHTMLByContents( contents );

		} else if ( fileType === '.stl' ) {

			VH.loadFileHTMLByURL( template, function() {

				VH.loadFileSTLByContents( contents );

//				VH.updateObjectGeometryByHashParameters ( scene, parameters );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( scene );

			} );

		} else if ( fileType === '.json' || fileType === '.js' ) {

			VH.loadFileHTMLByURL( template, function() {

				contents = JSON.parse( contents );

				VH.loadFileJSONByContents( contents, fileName, parameters );

				VH.updateSceneByHashParameters( parameters );

				VH.addShadowsToMeshesInScene( scene );

			} );

		}

	};
