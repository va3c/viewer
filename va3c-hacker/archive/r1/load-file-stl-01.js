	var link;

	loadFileSTL();



	function loadFileSTL () {

		hashes = location.hash.split('#');
		link = hashes[2];

		console.log( link );
		callbackRun();


//		VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js', callbackRun() );

/*
		script1 = document.body.appendChild( document.createElement( 'script' ) );
		script1.onload = function() {
console.log( 's1' );

//			var script2 = document.body.appendChild( document.createElement( 'script' ) );
//			script2.onload = function() {
console.log( 's2' );
				var script3 = document.body.appendChild( document.createElement( 'script' ) );
				script3.onload = function() {
					var loader = new THREE.STLLoader();
					loader.addEventListener( 'load', function ( event ) {

						geometry = event.content;
						geometry.computeFaceNormals();
						geometry.computeVertexNormals();

						material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
						mesh = new THREE.Mesh( geometry, material );

						mesh.rotation.set( Math.PI / 2, 0, 0 );

						mesh.castShadow = true;
						mesh.receiveShadow = true;

						scene.add( mesh );

						location.hash = '';

					} );
					loader.load( link );

				};
				script3.src='http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js';
//			};
//			script2.src='http://mrdoob.github.io/three.js/examples/js/wip/TypedGeometry.js';

		};
		script1.src='open-new-model-space.js';
*/

	};


	function callbackRun() {
		var loader = new THREE.STLLoader();
		loader.addEventListener( 'load', function ( event ) {
			geometry = event.content;
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
			mesh = new THREE.Mesh( geometry, material );

			mesh.rotation.set( Math.PI / 2, 0, 0 );

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );

//			location.hash = '';

		} );
		loader.load( link );
	}
	