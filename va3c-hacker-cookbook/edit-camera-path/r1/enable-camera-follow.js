
	var segments = 200;
	var radius = 0.1;
	var radiusSegments = 3;
	var follow = false;

	var aircraft, cameraBot, tube;
	var splineCamera, cameraHelper;
	var clock = new THREE.Clock;
	var delta = 0;
	var t = 0;

	var b = '<br>';
	var pointStart;


	function init2() {

		cameraBot = new THREE.Object3D();
		scene.add( cameraBot );

		splineCamera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 5000 );
		cameraBot.add( splineCamera );
		cameraHelper = new THREE.CameraHelper( splineCamera );
		cameraBot.add( cameraHelper );
/*
		camera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 5000 );
		cameraBot.add( camera );
		cameraHelper = new THREE.CameraHelper( camera );
		cameraBot.add( cameraHelper );
*/



		tube = new THREE.TubeGeometry( VH.splineCurve, segments, radius, radiusSegments );
		material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( tube, material );
		scene.add( mesh );

		app.animate = animate;
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


	function animate() {

		controls.update();
		renderer.render( scene, VH.follow === true ? splineCamera : camera );
//		renderer.render( scene, camera );
		delta += clock.getDelta();
		if ( tube && delta > 0.025 ) {
			updatePosition();
			delta = 0;
		}
		requestAnimationFrame( animate );
	}

