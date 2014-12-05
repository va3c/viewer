
//	loadFileJSON4ByURL( location.hash );

	function loadFileJSON4ByURL( parameters ) {

		if ( !parameters ) return;

		parameters = parameters.split('#');

		if ( !parameters[2] ) return;

		fileName = parameters[2];

		location.hash = '';

		contents = VH.requestFile( fileName );
		contents = JSON.parse( contents );

		loader = new THREE.ObjectLoader();
		contents = loader.parse( contents );

		var block = new THREE.Object3D();

		VH.updateObjectGometryByHashParameters( block, parameters );

		block.add( contents );
		scene.add( block );

		VH.addShadowsToMeshesInScene( scene );

//console.log( 'loadFileJSON4ByURL', parameters, contents );

	}


