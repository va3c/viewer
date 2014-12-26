	var VA = VA || {};

	VA.meshMaker = function( vertices ) {

		if ( VA.meshPointsContainer ) { scene.remove( VA.meshPointsContainer ); }

		VA.meshPointsContainer = new THREE.Object3D();

		scene.add ( VA.meshPointsContainer );

		vertices = parseInt( vertices, 10 );

		var i = 0;

		var separation = 100 / vertices;

		for ( var z = 0; z < vertices + 1; z++ ) {

			for ( var x = 0; x < vertices + 1; x++ ) {

				geometry = new THREE.BoxGeometry( 2, 2, 2 );

				material = new THREE.MeshLambertMaterial( { color: 0xffffff * Math.random() } );
				material.ambient = material.color;

				mesh = new THREE.Mesh( geometry, material );
				mesh.position.set( separation * x - 50,  0, separation * z - 50 );
				mesh.castShadow = true;
				mesh.receiveShadow = true;

				VA.meshPointsContainer.add( mesh );

			}

		}

		if ( VA.mesh ) {

			scene.remove( VA.mesh );
			scene.remove( VA.meshWire );

		}

		geometry = new THREE.PlaneGeometry( 100, 100, vertices, vertices );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );

		var material = new THREE.MeshLambertMaterial( {color: Math.random() * 0x888888, side: 2 } );
		material.ambient = material.color;

		VA.mesh = new THREE.Mesh( geometry, material );
		VA.mesh.castShadow = true;
		VA.mesh.receiveShadow = true;
		scene.add ( VA.mesh );

		VA.meshWire = VA.mesh.clone();
		VA.meshWire.material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
		scene.add( VA.meshWire );

	}

	VA.meshUpate = function () {
		var selected = VA.selected;
		var index = selected.parent.children.indexOf( selected );

		VA.mesh.geometry.vertices[ index ].x =  selected.position.x;
		VA.mesh.geometry.vertices[ index ].y =  selected.position.y;
		VA.mesh.geometry.vertices[ index ].z =  selected.position.z;

		VA.mesh.geometry.verticesNeedUpdate = true;
		VA.mesh.geometry.computeFaceNormals();
		VA.mesh.geometry.computeVertexNormals();

	}

	function exportMesh() {

		var geometry = VA.mesh.geometry;

		var output = geometry.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'mesh-geometry.json';
		a.click();
		delete a;

	}
