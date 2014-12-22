
	VH.loadFileOBJByURL = function ( parameters, callback  ) { 

		var contents = VH.requestFile( parameters[1] );

		VH.loadFileOBJByContents( contents, parameters, callback  )

	}


	VH.loadFileOBJByContents = function ( contents, parameters, callback  ) { 

		var script = document.body.appendChild( document.createElement( 'script' ) );

		script.onload = function() {

			var object = new THREE.OBJLoader().parse( contents );

			mesh = object.children[0];

			scene.add( mesh );

			callback( mesh, parameters );

		};

		script.src = 'http://mrdoob.github.io/three.js/examples/js/loaders/OBJLoader.js';

	}
