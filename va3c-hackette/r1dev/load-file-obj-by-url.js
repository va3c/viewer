
	VHR.loadFileOBJByURL = function( parameters ) {

			VHR.loadFileHTMLByURL( template, function() {

				VHR.callbackOBJLoader ( parameters );

			} );

	};

	VHR.callbackOBJLoader = function( parameters ) {

		fileName = parameters[ 1 ];

		msg.innerHTML = 'Template:' + template + '<br>' +
			'File: ' + fileName;

		contents = VHR.requestFile( fileName );

		var script = document.body.appendChild( document.createElement( 'script' ) );

		script.onload = function() {

			object = new THREE.OBJLoader().parse( contents );

			object.children[0].material.ambient.setRGB( 0.8, 0.3, 0.8 );

			object.children[0].material.color.setRGB( 0.8, 0.3, 0.8 );

			object.children[0].material.needsUpdate = true;

			VHR.updateObjectGometryByHashParameters( object, parameters );

			scene.add( object );

			VHR.addShadowsToMeshesInScene( scene );

		};

		script.src = 'http://mrdoob.github.io/three.js/examples/js/loaders/OBJLoader.js';

	}
