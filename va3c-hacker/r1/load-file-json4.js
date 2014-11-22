
	loadFileJson3( location.hash );

	function loadFileJson3( parameters ) {

		if ( !parameters ) return;

		parameters = location.hash.split('#');

		fileName = parameters[2];

		location.hash = '';

// move following to separate function & make it delete everything
		if ( parameters.indexOf( 'open' ) > -1 ) {

			scene.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					scene.remove ( child );
				}

			} );

		}
//

		var texturePath = fileName.substr( 0, 1 + fileName.lastIndexOf('/') );

		contents = requestFile( fileName );
		contents = JSON.parse( contents );

		loader = new THREE.ObjectLoader();
		contents = loader.parse( contents );

		var block = new THREE.Object3D();

		if ( parameters.indexOf( 'random' ) > -1 ) {

			block.position.set ( 50 * Math.random() - 25, 50 * Math.random(), 50 * Math.random() - 25 );
			block.rotation.set( Math.PI * Math.random(), Math.PI * Math.random(), 0 );

		} else {

			for ( var i = 3, len = parameters.length; i < len; i++) {

				parameter = parameters[i].substr( 0, 2 );
				value = parseFloat( parameters[i].substr( 3 ) );

				if ( parameter === 'px' ) block.position.x = value;
				if ( parameter === 'py' ) block.position.y = value;
				if ( parameter === 'pz' ) block.position.z = value;

				if ( parameter === 'rx' ) block.rotation.x = value;
				if ( parameter === 'ry' ) block.rotation.y = value;
				if ( parameter === 'rz' ) block.rotation.z = value;

				if ( parameter === 'sx' ) block.scale.x = value;
				if ( parameter === 'sy' ) block.scale.y = value;
				if ( parameter === 'sz' ) block.scale.z = value;

				if ( parameter === 'na' ) block.name = parameters[i].substr( 3 );

			}
		}

		contents.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = true;
				child.receiveShadow = true;
				child.frustumCulled = false;
			}

		} );

		block.add( contents );
		scene.add( block );

console.log( 'loadFileJson4', fileName, texturePath, contents );

	}