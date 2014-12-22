
	tweenCameraAndTarget( location.hash );

	function tweenCameraAndTarget ( parameters ) {

		parameters = location.hash.split( '#' );

		location.hash = '';

//console.log( parameters )

		endPoint1 = new THREE.Vector3( parseFloat(parameters[2]), parseFloat(parameters[3]), parseFloat( parameters[4] ) );

		endPoint2 = new THREE.Vector3( parseFloat( parameters[5] ), parseFloat( parameters[6] ), parseFloat( parameters[7] ) );

		duration = parseInt( parameters[8], 10 );

		var startTime = performance.now();
		var counter = 0;

		var startPoint1 = camera.position.clone();
		line1 = new THREE.LineCurve( startPoint1, endPoint1 );

		var startPoint2 = controls.target.clone();
		line2 = new THREE.LineCurve( startPoint2, endPoint2 );

		function doTween( timestamp ) {

			var time = ( timestamp - startTime ) / duration;

			if ( time < 1 ) {

				pt1 = line1.getPointAt( time );
				camera.position.set( pt1.x, pt1.y, pt1.z );

				pt2 = line2.getPointAt( time );
				controls.target = pt2;

//				msg1.innerHTML = 'time:' + time + ' counter:' + counter++;
				requestAnimationFrame( doTween );

			} else {
//console.log( parameters );
			}
		}

		requestAnimationFrame( doTween )

	};
