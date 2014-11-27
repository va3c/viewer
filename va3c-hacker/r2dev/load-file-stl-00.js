	var callbackLoadFileSTL = function() {};

	loadFileSTL ();

	function loadFileSTL ( ) {

		VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackSTL() );

	}

	function callbackSTL() {

		if ( location.hash === '' ) return;

		parameters = location.hash.split('#');

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

		var loader = new THREE.STLLoader();
		loader.addEventListener( 'load', function ( event ) {

			location.hash = '';
			geometry = event.content;
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xffffff * Math.random(), specular: 0x111111, shininess: 200 } );
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

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );

			callbackLoadFileSTL();

		} );

		loader.load( fileName );

//console.log( 'callbackSTL', parameters, fileName );

	}
	