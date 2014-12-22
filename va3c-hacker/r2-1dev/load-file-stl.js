
	loadFileSTL( location.hash );
 
	function loadFileSTL ( parameters ) { 

console.log( 'loadFileSTL', parameters );

		if ( !parameters ) return;

		parameters = parameters.split( '#' );

		if ( !parameters[ 2 ] ) { return; }

		fileName = parameters[ 2 ];

		location.hash = '';

		var loader = new THREE.STLLoader();

		loader.addEventListener( 'load', function ( event ) {

			geometry = event.content;
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xffffff * Math.random(), shading: THREE.SmoothShading, shininess: 200, specular: 0x111111 } );

			mesh = new THREE.Mesh( geometry, material );

			VH.updateObjectGometryByHashParameters( mesh, parameters );

			scene.add( mesh );

			VH.addShadowsToMeshesInScene( scene );

		} );

		loader.load( fileName );



	}
	