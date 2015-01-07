
	var segments = 200;
	var radius = 0.1;
	var radiusSegments = 3;

	var cameraBot, tube, tubeMesh;
	var actionCamera, splineCamera, cameraHelper;
	var t = 0;

	var follow = false;
	var updates = true;

	var startTime = performance.now();

	function initCameraFollow() {

		actionCamera = camera;

		if ( cameraBot ) { scene.remove( cameraBot ); }
		cameraBot = new THREE.Object3D();
		scene.add( cameraBot );

		if ( splineCamera ) { cameraBot.remove( splineCamera ); }

		splineCamera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 5000 );
		cameraBot.add( splineCamera );

		if ( cameraHelper ) { cameraBot.remove( cameraHelper ); }
 
		cameraHelper = new THREE.CameraHelper( splineCamera );
		cameraBot.add( cameraHelper );

		updateTube();

		app.animate = animate;

	}


	function updateTube() {

		if ( tubeMesh ) { scene.remove( tubeMesh ); }

		tube = new THREE.TubeGeometry( VH.splineCurve, segments, radius, radiusSegments );
		material = new THREE.MeshNormalMaterial();
		tubeMesh = new THREE.Mesh( tube, material );
		scene.add( tubeMesh );

	}

	function updatePosition() {

		var binormal = new THREE.Vector3();
		var normal = new THREE.Vector3();
		t += 0.002;
		t = t >= 1.0 ? 0 : t;

//		tube = VH.splineCurve;

		var pos = tube.parameters.path.getPointAt( t );
		var segments = tube.tangents.length;
		var pickt = t * segments;
		var pick = Math.floor( pickt );
		var pickNext = ( pick + 1 ) % segments;
		binormal.subVectors( tube.binormals[ pickNext ], tube.binormals[ pick ] );
		binormal.multiplyScalar( pickt - pick ).add( tube.binormals[ pick ] );

		var dir = tube.parameters.path.getTangentAt( t );
		normal.copy( binormal ).cross( dir );
		pos.add( normal.clone() );

		cameraBot.position.set( pos.x, pos.y, pos.z );
		var lookAt = tube.parameters.path.getPointAt( ( t + 30 / tube.parameters.path.getLength() ) % 1 );
		cameraBot.matrix.lookAt(cameraBot.position, lookAt, normal);
		cameraBot.rotation.setFromRotationMatrix( cameraBot.matrix, cameraBot.rotation.order );

/*
		camera.position.set( pos.x,pos.y,pos.z );
//msg.innerHTML = camera.position.x + ' ' + camera.position.y + ' ' + camera.position.z;
		var lookAt = tube.parameters.path.getPointAt( ( t + 30 / tube.parameters.path.getLength() ) % 1 );
		camera.matrix.lookAt(camera.position, lookAt, normal);
		camera.rotation.setFromRotationMatrix( camera.matrix, camera.rotation.order );
*/
/*
		pos = tube.parameters.path.getPointAt( ( t + 60 / tube.parameters.path.getLength() ) % 1 );
		aircraft.position.set( pos.x, pos.y, pos.z );
		var aircraftLookAt = tube.parameters.path.getPointAt( ( t + 90 / tube.parameters.path.getLength() ) % 1 );
		aircraft.matrix.lookAt(aircraft.position, aircraftLookAt, normal);
		aircraft.rotation.setFromRotationMatrix( aircraft.matrix, aircraft.rotation.order );
*/

	}


	function animate( timestamp ) {

		controls.update();
		renderer.render( scene, actionCamera );
		if ( updates && tube && ( timestamp - startTime >  25 ) ) {
			updatePosition();
			startTime = timestamp;
		}
		requestAnimationFrame( animate );
	}

