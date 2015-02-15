	var VH = VH || {};

	var aMesh
	var meshPointsLength;
	var meshPointsContainer;
	var meshPointsPositions;

	var selected;

	VH.meshMaker = function( vertices ) {

		if ( meshPointsContainer ) { 

			scene.remove ( bMesh );
			scene.remove ( aMesh );
			scene.remove( meshPointsContainer ); 

		}

		meshPointsContainer = new THREE.Object3D();

		scene.add ( meshPointsContainer );

		vertices = parseInt( vertices, 10 );

		meshPointsLength = vertices * vertices;

		meshPointsPositions = [];

		var i = 0;

		for ( var z = 0; z < vertices + 1; z++ ) {

			for ( var x = 0; x < vertices + 1; x++ ) {

				geometry = new THREE.BoxGeometry( 2, 2, 2 );
				material = new THREE.MeshLambertMaterial( { color: 0xffffff * Math.random() } );
				material.ambient = material.color;
				box = new THREE.Mesh( geometry, material );
				box.position.set( (100 / vertices ) * x - 50,  0, (100 / vertices ) * z - 50 );

				box.castShadow = true;
				box.receiveShadow = true;
				meshPointsContainer.add( box );

				meshPointsPositions.push( meshPointsContainer.children[ i++ ].position );

			}

		} 

		geometry = new THREE.PlaneGeometry( 100, 100, vertices, vertices );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );

//				material = new THREE.MeshLambertMaterial( { color: 0x888888, side: 2, transparent: true, wireframe: true  } );
		var material = new THREE.MeshLambertMaterial( {color:  0xffffff * Math.random() } );
		material.ambient = material.color;


		aMesh = new THREE.Mesh( geometry, material );
		aMesh.castShadow = true;
		aMesh.receiveShadow = true;
		scene.add ( aMesh );

		bMesh = aMesh.clone();
		bMesh.material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );

		scene.add( bMesh );

		var dragcontrols = new VH.DragObjects( meshPointsContainer.children );

		dragcontrols.onDragged = VH.meshUpate;

	}


	VH.meshUpate = function () {

		index = selected.parent.children.indexOf( selected );

		geomtery = aMesh.geometry;
		geometry.vertices[ index ].x =  selected.position.x;
		geometry.vertices[ index ].y =  selected.position.y;
		geometry.vertices[ index ].z =  selected.position.z;

		geometry.verticesNeedUpdate = true;
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		count = 0;

		length = geometry.vertices.length;

		for ( var i = 0; i < length; i++ ) {

			if ( geometry.vertices[ i ].y > 0.01 ) {

				count++;

			}

		}

		if ( count < length ) { 

			msg.innerHTML = '<h1>Your score: ' + count + ' out of ' + geometry.vertices.length + '</h1>';


		} else {

			msg.innerHTML = '<h1 style=color:red; ><marquee>!!!Bingo!!! !!!You Win!!! !!!Bingo!!!</marguee></h1>';

		}



	}