
	VH.loadFileJSONbyURL = function( parameters ) {

		if ( !scene || parameters.indexOf( 'add=true' ) === -1 ) {

			VH.loadFileHTMLByURL( template, function() {

				VH.callbackLoadFileJSONbyURL( parameters );

				msg.innerHTML = 'Template:' + template + '<br>' + 'File: ' + parameters[1];

			} );

		} else {

			VH.callbackLoadFileJSONbyURL( parameters );

		}

	};

	VH.callbackLoadFileJSONbyURL = function( parameters ) {

		var data = VH.requestFile( parameters[1] );

		data = JSON.parse( data );

		VH.loadFileJSONByContents( data, parameters );

	};

	VH.loadFileJSONByContents = function( data, parameters ) {

		if ( data.metadata === undefined ) { // 2.0

			data.metadata = { type: 'Geometry' };

//			loadFileJSON3ByURL( parameters )

//			return;

		}

		if ( data.metadata.type === undefined ) { // 3.0

			data.metadata.type = 'Geometry';

//			loadFileJSON3ByURL( parameters )

//			return;

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

console.log( 'found scene' );

			scene.add( contents );

		} else {

console.log( 'found object', contents );

			VH.updateObjectGeometryByHashParameters( contents, parameters );

			scene.add( contents );

		}
	}

	function loadFileJSONGeometry( contents, parameters ) {

console.log( 'found geometry', contents, parameters );

		var texturePath = parameters ? parameters[1].substr( 0, 1 + parameters[1].lastIndexOf('/') ) : '' ;

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

//					material = contents.materials[ 0 ];
					material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), shading: THREE.SmoothShading, side: 2 } );

				}

			} else {

				material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), shading: THREE.SmoothShading, side: 2 } );

			}

			mesh = new THREE.Mesh( geometry, material );

			VH.updateObjectGeometryByHashParameters( mesh, parameters );

			VH.updateSceneByHashParameters( parameters );
			VH.addShadowsToMeshesInScene( scene );

			scene.add( mesh );

			VH.addShadowsToMeshesInScene( scene );

	}

	function loadFileJSON3ByURL( parameters ) {

//		if ( !parameters ) return;

		fileName = parameters[1];

console.log( parameters, fileName );

		loader = new THREE.JSONLoader();

		loader.load( fileName, function ( geometry, materials ) {

			var mesh, material;

			if ( materials ) {

				material =  new THREE.MeshFaceMaterial( materials );

				for (var i = 0, len = material.materials.length; i < len; i++) {

					material.materials[i].side = 2;
					material.materials[i].needsUpdate = true;

				}

			} else {

				material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), shading: THREE.SmoothShading, side: 2 } );

			}

			mesh = new THREE.Mesh( geometry, material );

			VH.updateObjectGeometryByHashParameters( mesh, parameters );

			VH.updateSceneByHashParameters( parameters );
			VH.addShadowsToMeshesInScene( scene );

			scene.add( mesh );

		} );

//console.log( 'loadFileJson3', parameters );

	}
