
	VHR.loadFileSTLByURL = function( parameters ) {

		if ( !scene || parameters.indexOf( 'add=true' ) === -1 ) {

			VHR.loadFileHTMLByURL( template, function() {

				VHR.callbackSTLLoader ( parameters );

			} );

		} else {

			VHR.callbackSTLLoader ( parameters );

		}

	};

	VHR.callbackSTLLoader = function( parameters ) {

		fileName = parameters[ 1 ];

		msg.innerHTML = 'Template:' + template + '<br>' +
			'File: ' + fileName;

		var script = document.body.appendChild( document.createElement( 'script' ) );

		script.onload = function() {

			var loader = new THREE.STLLoader();

			loader.addEventListener( 'load', function ( event ) {

				geometry = event.content;
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();

				material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xffffff * Math.random(), shading: THREE.SmoothShading, shininess: 200, specular: 0x111111 } );

				mesh = new THREE.Mesh( geometry, material );

				VHR.updateObjectGometryByHashParameters( mesh, parameters );

				scene.add( mesh );

				VHR.addShadowsToMeshesInScene( scene );

			} );

			loader.load( fileName );

		};

		script.src = 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js';

	};
