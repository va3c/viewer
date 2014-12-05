
	function loadFileJSON4ByContents( data, parameters ) {

		var parameters = parameters || 'nothing';

		parameters = parameters.split( '#' );

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