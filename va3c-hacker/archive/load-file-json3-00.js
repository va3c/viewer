
	loadFileJson3();

	function loadFileJson3( fileName ) {


		var fileName = fileName || location.hash.replace('#load-file-json3#', '' );

		var parameters = ['px','py','pz','rx','ry','rz','sx','sy','sz'];
		var meshParameters = [mesh.position.x,mesh.position.y,mesh.position.z,mesh.rotation.x,mesh.rotation.y,mesh.rotation.z,mesh.scale.x,mesh.scale.y,mesh.scale.z];
		for (var i = 0, len = parameters.length; i < len; i++) {
			parameter = '#' + parameters[i] + '=';
			var index = fileName.indexOf( parameter );
			if ( fileName.indexOf( parameter ) > -1 ) {
				meshParameters[i] = fileName.substr( index + 4 );
			}

		}
console.log( fileName );
		var index = fileName.indexOf( '#scale' );

		if ( index > -1 ) {
			var scale = fileName.substr( index +  7 );

			fileName = fileName.replace( /#scale=(.*?) /gi, '' );
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

			mesh.scale.set ( scale, scale, scale );

			mesh.userData.json = true;

			scene.add( mesh );


		} );

	}