
	var VA = VA || {};
	var splinePointsLength;
	var splinePointsContainer;
	var splinePointsPositions;

	var splineOutline;
	var splineCurve;

	VA.splineMakerRandomPoints = function( pointsCount ) {

		if ( VA.splinePointsContainer ) { scene.remove( VA.splinePointsContainer ); }

		VA.splinePointsContainer = new THREE.Object3D();

		scene.add ( VA.splinePointsContainer );

		VA.splinePointsLength = parseInt( pointsCount, 10 );

		VA.splinePointsPositions = [];

		for ( var i = 0; i < VA.splinePointsLength; i++ ) {

			VA.addSplineObject( VA.splinePointsPositions[ i ] );

			VA.splinePointsPositions.push( VA.splinePointsContainer.children[ i ].position );

		}

		if ( inpClosed.checked ) {

			VA.splineCurve = new THREE.ClosedSplineCurve3( VA.splinePointsPositions );

		} else {

			VA.splineCurve = new THREE.SplineCurve3( VA.splinePointsPositions );

		}

		VA.updateSplineOutline();

	}

	function points( delta ) {

		VA.splinePointsLength += delta;

		if ( VA.splinePointsLength < 4 ) {

			VA.splinePointsLength = 4;

			return;

		}

		if ( delta > 0 ) {

			while ( delta-- ) {

				VA.splinePointsPositions.push( VA.addSplineObject().position );

			}

		} else {

			delta = -delta;

			while (delta--) {

				VA.splinePointsPositions.pop();

				VA.splinePointsContainer.remove( VA.splinePointsContainer.children[ VA.splinePointsContainer.children.length - 1 ] );

			}

		}

		VA.updateSplineOutline();

	}

	VA.addSplineObject = function( position ) {

		var geometry = new THREE.BoxGeometry( 2, 2, 2 );

		var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );

		var mesh = new THREE.Mesh( geometry, material );

		mesh.material.ambient = mesh.material.color;

		if ( position ) {

			mesh.position = position;

		} else if ( inpExtend.checked === true ) {

			var pointUltimate = VA.splinePointsContainer.children[ VA.splinePointsContainer.children.length - 1 ];
			var pointPenultimate = VA.splinePointsContainer.children[ VA.splinePointsContainer.children.length - 2 ];
			var distance = pointUltimate.position.distanceTo( pointPenultimate.position );

			mesh.position.x = pointUltimate.position.x;
			mesh.position.y = pointUltimate.position.y;
			mesh.position.z = pointUltimate.position.z;

			mesh.lookAt( pointPenultimate.position );
			mesh.translateZ( -0.5 * distance );

		} else {

			mesh.position.x = Math.random() * 100 - 50;
			mesh.position.y = Math.random() * 100 - 50;
			mesh.position.z = Math.random() * 100 - 50;

		}

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		VA.splinePointsContainer.add( mesh );

		return mesh;

	}

	VA.updateSplineOutline = function() {

		if ( VA.splineOutline ) scene.remove( VA.splineOutline );

		if ( inpClosed.checked ) {

			VA.splineCurve = new THREE.ClosedSplineCurve3( VA.splinePointsPositions );

		} else {

			VA.splineCurve = new THREE.SplineCurve3( VA.splinePointsPositions );

		}

		VA.splineCurve.updateArcLengths();

		var arcLen = VA.splineCurve.getLength();

		arcLen = Math.floor( arcLen / 8 );

		var points = VA.splineCurve.getPoints( arcLen );

		var geometry = new THREE.Geometry();

		for ( var i = 0; i < points.length; i ++ ) {

			geometry.vertices.push( v( points[i].x, points[i].y, points[i].z ) );

		}

		VA.splineOutline = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );

		scene.add( VA.splineOutline );

	}

	VA.exportSpline = function() {

		var geometry = VA.splineOutline.geometry;

		var output = geometry.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'spline-geometry.json';
		a.click();
		delete a;

	}

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
