
	loadFileJson3( location.hash );

	function loadFileJson3( parameters ) {

		if ( !parameters ) return;

		parameters = parameters.split('#');

		fileName = parameters[2];

// move following to separate function & make it delete everything
		if ( parameters.indexOf( 'open' ) > -1 ) {

			scene.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {

					scene.remove ( child );
				}

			} );

		}
//

		loader = new THREE.JSONLoader();

		loader.load( fileName, function ( geometry, materials ) {

			var mesh, material;

			location.hash = '';

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

			if ( parameters.indexOf( 'random' ) > -1 ) {

				mesh.position.set ( 50 * Math.random() - 25, 50 * Math.random(), 50 * Math.random() - 25 );
				mesh.rotation.set( Math.PI * Math.random(), Math.PI * Math.random(), 0 );

			} else {

				for ( var i = 3, len = parameters.length; i < len; i++) {

					parameter = parameters[i].substr( 0, 2 );
					value = parseFloat( parameters[i].substr( 3 ) );

					if ( parameter === 'px' ) mesh.position.x = value;
					if ( parameter === 'py' ) mesh.position.y = value;
					if ( parameter === 'pz' ) mesh.position.z = value;

					if ( parameter === 'rx' ) mesh.rotation.x = value;
					if ( parameter === 'ry' ) mesh.rotation.y = value;
					if ( parameter === 'rz' ) mesh.rotation.z = value;

					if ( parameter === 'sx' ) mesh.scale.x = value;
					if ( parameter === 'sy' ) mesh.scale.y = value;
					if ( parameter === 'sz' ) mesh.scale.z = value;

					if ( parameter === 'na' ) mesh.name = parameters[i].substr( 3 );

				}
			}

			mesh.castShadow = true;
			mesh.receiveShadow = true;
			mesh.frustumCulled = false;

			scene.add( mesh );

		} );

//console.log( 'loadFileJson3', parameters );

	}