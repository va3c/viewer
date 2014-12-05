
	VHR.loadFileJSONbyURL = function( parameters ) {

		callbackloadFileHTMLByURL = function() {

			VHR.callbackLoadFileJSONbyURL( parameters );

			msg.innerHTML = 'Template:' + template + '<br>' + 'File: ' + parameters[1];

		};

		VHR.loadFileHTMLByURL( template, callbackloadFileHTMLByURL );

	};

	VHR.callbackLoadFileJSONbyURL = function( parameters ) {

		data = VHR.requestFile( parameters[1] );

		data = JSON.parse( data );

		VHR.loadFileJSONByContents( data, parameters );

	};

	VHR.loadFileJSONByContents = function( data, parameters ) {

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

			loadFileJSONGeometry( data, parameters  );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loadFileJSONObject( data, parameters );

		}

	};

	function loadFileJSONObject( contents, parameters ) {

		loader = new THREE.ObjectLoader();
		contents = loader.parse( contents );

		if ( contents instanceof THREE.Scene ) {

//console.log( 'found scene' );

			scene.add( contents );

		} else {

//console.log( 'found object', contents );

			VHR.updateObjectGometryByHashParameters( contents, parameters );

			scene.add( contents );

			VHR.addShadowsToMeshesInScene( scene );

		}
	}

	function loadFileJSONGeometry( contents, parameters ) {

		var texturePath = parameters[1].substr( 0, 1 + parameters[1].lastIndexOf('/') );

		loader = new THREE.JSONLoader();

			contents = loader.parse( contents, texturePath );

			var geometry = contents.geometry;

			if ( contents.materials !== undefined ) {

				if ( contents.materials.length > 1 ) {

					material = new THREE.MeshFaceMaterial( contents.materials );

					for (var i = 0, len = contents.materials.length; i < len; i++) {

						contents.materials[i].side = 2;
						contents.materials[i].needsUpdate = true;

					}

				} else {

					material = contents.materials[ 0 ];

				}

			} else {

				material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), shading: THREE.SmoothShading, side: 2 } );

			}

			mesh = new THREE.Mesh( geometry, material );

			VHR.updateObjectGometryByHashParameters( mesh, parameters );

			scene.add( mesh );

			VHR.addShadowsToMeshesInScene( scene );

	}
