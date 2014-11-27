
	loadFileJSON4( location.hash );

	function loadFileJSON4( parameters ) {

		if ( !parameters ) return;

		parameters = parameters.split('#');

		fileName = parameters[2];

		location.hash = '';

		contents = requestFile( fileName );
		contents = JSON.parse( contents );

		loader = new THREE.ObjectLoader();
		contents = loader.parse( contents );

		var block = new THREE.Object3D();

		VH.updateObjectGometryByHashParameters( block, parameters );

		block.add( contents );
		scene.add( block );

		VH.addShadowsToMeshesInScene( scene );

//console.log( 'loadFileJson4', parameters, contents );

	}


