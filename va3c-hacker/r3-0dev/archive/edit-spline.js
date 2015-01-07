	VH.loadScript( 'enable-draggable-objects.js' );

	var splinePointsLength;
	var splinePointsContainer;
	var splinePointsPositions;

	var splineOutline;
	var splineCurve;

	parameters = location.hash;

	if ( parameters.indexOf( 'displayMenuLeft' ) > -1 ) {

		VH.displayMarkdown( 'edit-spline.md', menuLeft );



	}

	function splineMakerRandomPoints( pointsCount ) {

		if ( splinePointsContainer ) { scene.remove( splinePointsContainer ); }

		splinePointsContainer = new THREE.Object3D();

		scene.add ( splinePointsContainer );

		splinePointsLength = parseInt( pointsCount, 10 );

		splinePointsPositions = [];

		for ( var i = 0; i < splinePointsLength; i++ ) {

			addSplineObject( splinePointsPositions[ i ] );

			splinePointsPositions.push( splinePointsContainer.children[ i ].position );

		}

		if ( inpClosed.checked ) {

			splineCurve = new THREE.ClosedSplineCurve3( splinePointsPositions );

		} else {

			splineCurve = new THREE.SplineCurve3( splinePointsPositions );

		}

console.log( splinePointsPositions );


		updateSplineOutline();


		VA.dragcontrols = new VA.DragObjects( splinePointsContainer.children );

		VA.dragcontrols.onDragged = updateSplineOutline;

	}

	function points( delta ) {

		splinePointsLength += delta;

		if ( splinePointsLength < 4 ) {

			splinePointsLength = 4;

			return;

		}

		if ( delta > 0 ) {

			while ( delta-- ) {

				splinePointsPositions.push( addSplineObject().position );

			}

		} else {

			delta = -delta;

			while (delta--) {

				splinePointsPositions.pop();

				scene.remove( splinePointsContainer.children[ splinePointsContainer.children.length - 1 ] );

			}

		}

		updateSplineOutline();

	}

	function addSplineObject( position ) {

		var geometry = new THREE.BoxGeometry( 2, 2, 2 );

		var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );

		var mesh = new THREE.Mesh( geometry, material );

		mesh.material.ambient = mesh.material.color;

		if ( position ) {

			mesh.position = position;

		} else {

			mesh.position.x = Math.random() * 100 - 50;
			mesh.position.y = Math.random() * 100 - 50;
			mesh.position.z = Math.random() * 100 - 50;

		}

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		splinePointsContainer.add( mesh );

		return mesh;

	}

	function updateSplineOutline() {

		if ( splineOutline ) scene.remove( splineOutline );

		if ( inpClosed.checked ) {

			splineCurve = new THREE.ClosedSplineCurve3( splinePointsPositions );

		} else {

			splineCurve = new THREE.SplineCurve3( splinePointsPositions );

		}

		splineCurve.updateArcLengths();

		var arcLen = splineCurve.getLength();

		arcLen = Math.floor( arcLen / 8 );

		var points = splineCurve.getPoints( arcLen );

		var geometry = new THREE.Geometry();

		for ( var i = 0; i < points.length; i ++ ) {

			geometry.vertices.push( v( points[i].x, points[i].y, points[i].z ) );

		}

		splineOutline = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );

		scene.add( splineOutline );

	}

	function exportSpline() {

		var object = splineOutline;


		var output = object.toJSON();
//		var output = geometry.toJSON();
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
