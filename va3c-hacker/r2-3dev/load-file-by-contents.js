
	function loadFileByContents( data, fileName, parameters ) {

		if ( fileName.substr( -4 ).toLowerCase() === '.stl' ) {

			loadFileSTLByContents( data, fileName, parameters );

		} else if ( 

				fileName.substr( -5 ).toLowerCase() === '.json' ||
				fileName.substr( -3 ).toLowerCase() === '.js' 

		) {

			loadFileJSONByContents( data, fileName, parameters );

		}

	}

/*
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



	function animate() {

		renderer.render( scene, camera );
		controls.update();
		requestAnimationFrame( animate );

	}
*/