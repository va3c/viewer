

	function loadFileJSONByContents( data, fileName, parameters ) {

		data = JSON.parse( data );

		if ( data.metadata === undefined ) { // 2.0
			data.metadata = { type: 'Geometry' };
		}
		if ( data.metadata.type === undefined ) { // 3.0
			data.metadata.type = 'Geometry';
			loadFileJSON3ByURL( parameters );
			return;
		}
		if ( data.metadata.version === undefined ) {

			data.metadata.version = data.metadata.formatVersion;

		}

		if ( data.metadata.type === 'BufferGeometry' ) {

			var loader = new THREE.BufferGeometryLoader();
			var result = loader.parse( data );

			var mesh = new THREE.Mesh( result );

//				scene.addObject( mesh );
			scene.add( mesh );
//				scene.select( mesh );

		} else if ( data.metadata.type.toLowerCase() === 'geometry' ) {

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
			geometry.sourceFile = fileName;

			var mesh;

			if ( geometry.animation && geometry.animation.hierarchy ) {

				mesh = new THREE.SkinnedMesh( geometry, material );

			} else {

				mesh = new THREE.Mesh( geometry, material );

			}

			mesh.name = fileName;

//				scene.addObject( mesh );
			scene.add( mesh );
//				scene.select( mesh );

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			var loader = new THREE.ObjectLoader();
			var result = loader.parse( data );

			if ( result instanceof THREE.Scene ) {

				//scene = result;
				scene.add( result );

			} else {

				scene.add( result );
//					scene.select( result );

			}

		} else if ( data.metadata.type.toLowerCase() === 'scene' ) {

			// DEPRECATED

			var loader = new THREE.SceneLoader();
			loader.parse( data, function ( result ) {

//					scene.setScene( result.scene );
				scene.add( result );

			}, '' );

		}

	}
/*
	function loadFileJSON4Contents( data, parameters ) {

		var parameters = parameters || 'nothing';

		parameters = parameters.split('#');

		data = JSON.parse( data );

		var loader = new THREE.ObjectLoader();

		var result = loader.parse( data );


		if ( result instanceof THREE.Scene ) {

			app.scene = result;

			animate() ;


		} else {

//				scene.addObject( result );
//				scene.select( result );

			var block = new THREE.Object3D();

			VH.updateObjectGometryByHashParameters( block, parameters );

			block.add( result );

			scene.add( block );

			VH.addShadowsToMeshesInScene( scene );

		}

//console.log( 'loadFileJSON4Contents', contents, parameters );

	}



	function animate() {

		renderer.render( scene, camera );
		controls.update();
		requestAnimationFrame( animate );

	}

*/
