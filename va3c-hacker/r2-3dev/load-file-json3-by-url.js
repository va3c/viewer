
//	loadFileJSON3ByURL( location.hash );

	function loadFileJSON3ByURL( parameters ) {

		if ( !parameters ) return;

		parameters = parameters.split('#');

		fileName = parameters[2];

		location.hash = '';

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

			VH.updateObjectGometryByHashParameters( mesh, parameters );

			scene.add( mesh );

			VH.addShadowsToMeshesInScene( scene );

		} );

//console.log( 'loadFileJson3', parameters );

	}
