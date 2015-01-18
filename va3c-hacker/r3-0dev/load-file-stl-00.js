
	VH.loadFileSTLByURL = function( parameters, callback ) {

		callback = callback ? callback : function () {} ;

		fileName = parameters[ 1 ];

		var script = document.body.appendChild( document.createElement( 'script' ) );

		script.onload = function() {

			var loader = new THREE.STLLoader();

			loader.addEventListener( 'load', function ( event ) {

				geometry = event.content;
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();

				material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xffffff * Math.random(), shading: THREE.SmoothShading, shininess: 200, specular: 0x111111 } );

				mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );

				callback( mesh, parameters );

			} );

			loader.load( fileName );

		};

		script.src = 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js';

	};

	VH.loadFileSTLByContents = function ( contents, parameters, callback  ) { 

		var script = document.body.appendChild( document.createElement( 'script' ) );

		script.onload = function() {

			geometry = new THREE.STLLoader().parse( contents );
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xffffff * Math.random(), shading: THREE.SmoothShading, shininess: 200, specular: 0x111111 } );

			var mesh = new THREE.Mesh( geometry, material );

			scene.add( mesh );

			callback( mesh, parameters );

		}

		script.src = 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js';

	}

