	var texturePathPrefix;

	VH.loadFileJSONbyURL = function( parameters, callback ) {

		var data = VH.requestFile( parameters[1] );

		VH.loadFileJSONByContents( data, parameters, callback );

	};

	VH.loadFileJSONByContents = function( data, parameters, callback ) {

		data = JSON.parse( data );

		if ( data.metadata === undefined ) { // 2.0

			data.metadata = { type: 'Geometry' };

//			loadFileJSON3ByURL( parameters, callback )

//			return;

		}

		if ( data.metadata.type === undefined ) { // 3.0

			data.metadata.type = 'Geometry';

//			loadFileJSON3ByURL( parameters, callback )

//			return;

		}

		if ( data.metadata.version === undefined ) {

			data.metadata.version = data.metadata.formatVersion;

		}

		if ( data.metadata.type.toLowerCase() === 'geometry' ) {

			loadFileJSONGeometry( data, parameters, callback  );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loadFileJSONObject( data, parameters, callback );

		}

	};



	function loadFileJSONObject( contents, parameters, callback ) {

		loader = new THREE.ObjectLoader();
		contents = loader.parse( contents );

		if ( contents instanceof THREE.Scene ) {

//console.log( 'found scene' );

			scene.add( contents );

			callback( contents, parameters );

		} else {

//console.log( 'found object', contents );

			scene.add( contents );

			callback( contents, parameters );

		}

	}



	function loadFileJSONGeometry( contents, parameters, callback ) {

//console.log( 'found geometry', contents, parameters );

		if ( parameters[2].indexOf( 'textures=' ) > -1 ) {

			texturePath = parameters[2].substr( 9 );

		} else {

			var slash = navigator.platform === "Win32" ? '\\' : '/' ;

			var slash = '/';

			var texturePath = parameters.length > 0 ? parameters[1].substr( 0, 1 + parameters[1].lastIndexOf( slash ) ) : '' ;

			texturePathPrefix = texturePathPrefix || '';

			texturePath = texturePathPrefix + texturePath;

		}

//console.log( 'texturePath', texturePath );


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

			scene.add( mesh );

			callback( mesh, parameters );

	}



	function loadFileJSON3ByURL( parameters, callback ) {

//		if ( !parameters ) return;

		fileName = parameters[1];

//console.log( 'loadFileJSON3ByURL', parameters, fileName );

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

			scene.add( mesh );

			callback( mesh, parameters );


		} );

//console.log( 'loadFileJson3', parameters );

	}
