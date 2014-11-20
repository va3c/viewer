
	loadFileJson3();

	function loadFileJson3() {

		if ( location.hash === '' ) return;

		var fileName = location.hash.replace('#load-file-json3#', '' );

		var index = fileName.indexOf( '#' );

		var hashParameters;

		if ( index > -1 ) {

			hashParameters = fileName.substr( index );
			fileName = fileName.substr( 0, index );
			hashParameters = hashParameters.split('#');

		}

		if ( fileName.indexOf( 'open#' ) > -1 ) {

			fileName = fileName.replace( 'open#','');

			scene.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh && mesh.userData.json === true  ) {

					scene.remove ( child );
				}

			} );

		}

		var loader = new THREE.JSONLoader();

		loader.load( fileName, function ( geometry, materials ) {

			if ( materials ) {
				material =  new THREE.MeshFaceMaterial( materials );

				for (var i = 0, len = material.materials.length; i < len; i++) {
					material.materials[i].side = 2;
					material.materials[i].needsUpdate = true;
				}

			} else {

				material = new THREE.MeshPhongMaterial( { color: 0x888888, shading: THREE.SmoothShading, side: 2 } );
			}

			mesh = new THREE.Mesh( geometry, material );

			for ( var i = 1, len = hashParameters.length; i < len; i++) {

				parameter = hashParameters[i].substr( 0, 2 );
				value = parseFloat( hashParameters[i].substr( 3 ) );

				if ( parameter === 'px' ) mesh.position.x = value;
				if ( parameter === 'py' ) mesh.position.y = value;
				if ( parameter === 'pz' ) mesh.position.z = value;

				if ( parameter === 'rx' ) mesh.rotation.x = value;
				if ( parameter === 'ry' ) mesh.rotation.y = value;
				if ( parameter === 'rz' ) mesh.rotation.z = value;

				if ( parameter === 'sx' ) mesh.scale.x = value;
				if ( parameter === 'sy' ) mesh.scale.y = value;
				if ( parameter === 'sz' ) mesh.scale.z = value;

			}

			mesh.userData.json = true;

			scene.add( mesh );

		} );

	}