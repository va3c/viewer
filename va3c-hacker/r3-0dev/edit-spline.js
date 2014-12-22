//	VH.loadScript( 'draggable-objects.js' );


	var splinePointsLength = 4;
	var splinePointsPositions = [];
	var splineObjects = [];
	var splineOutline;
	var splineCurve;
	var splineObject = new THREE.Object3D();

// Uncomment this line if you wish to load from exports
//	load();

	parameters = location.hash;

	if ( parameters.indexOf( 'displayMenuLeft' ) > -1 ) {

		VH.displayMarkdown( 'spline-maker.md', menuLeft )

	}

	function splineMakerRandomPoints() {

		if ( splineOutline ) scene.remove( splineOutline );

		var len = splineObjects.length;

		while ( len-- ) {

			splinePointsPositions.pop();

			scene.remove( splineObjects.pop() );

		}

		for ( var i = 0; i < splinePointsLength; i++ ) {

			addSplineObject( splinePointsPositions[ i ] );

			splinePointsPositions.push( splineObjects[ i ].position );

		}

		if ( inpClosed.checked ) {

			splineCurve = new THREE.ClosedSplineCurve3( splinePointsPositions );

		} else {

			splineCurve = new THREE.SplineCurve3( splinePointsPositions );

		}

		updateSplineOutline();

		var dragcontrols = new JA.DragObjects( splineObjects );

		dragcontrols.onDragged = updateSplineOutline;

	}

	function points( offset ) {

		splinePointsLength += offset;

		if ( splinePointsLength < 4 ) {

			splinePointsLength = 4;

			return;

		}

		if ( offset > 0 ) {

			while ( offset-- ) {

				splinePointsPositions.push( addSplineObject().position );

			}

		} else {

			offset = -offset;

			while (offset--) {

				splinePointsPositions.pop();

				scene.remove( splineObjects.pop() );

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

		splineObject.add( mesh );
		scene.add( splineObject );

		splineObjects.push( mesh );

		return mesh;

	}

	function updateSplineOutline() {

		if ( splineOutline ) scene.remove( splineOutline );

		splineCurve.updateArcLengths();

		var arcLen = splineCurve.getLength();

		arcLen = Math.floor( arcLen / 8 );

		var points = splineCurve.getPoints( arcLen );

		inpPoints.value = splinePointsLength;

		var geometry = new THREE.Geometry();

		for ( var i = 0; i < points.length; i ++ ) {

			geometry.vertices.push( v( points[i].x, points[i].y, points[i].z ) );

		}

		splineOutline = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );

		scene.add( splineOutline );

	}

	function exportSpline() {

		var geometry = splineOutline.geometry;

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


	function load() {

		splinePointsPositions = [
			v(-213.12552068360054, -294.1922074745087, -0.03978996232257259),
			v(29.99553601021495, -243.11318001675306, 280.78482599069616),
			v(-97.75986506175894, -64.54552418022524, 55.64806371267258),
			v(-314.408250336442, 235.23205516762346, -5.893017170859991),
			v(22.034622881439077, 162.8965831284607, -345.10495452036184),
			v(134.59056654199452, 382.5168668673815, -198.91479606872133),
			v(477.5022172612489, -4.8651203633506555, -210.47236097401574),
			v(449.0486673017501, 4.918562856246474, 52.560123928679985),
			v(280.6397761972279, -290.27337790622795, 40.210017846524124),
			v(163.10498799765227, -369.03871116931487, -173.83095096616034)
		];

		splinePointsLength = splinePointsPositions.length;

	}

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

	var JA = {};
		var intersected;

	JA.DragObjects = function( objects ) {

		me = this;

		var mouse = new THREE.Vector2();

		var offset = new THREE.Vector3();

		var selected;

		var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
		var material = new THREE.MeshBasicMaterial( );
		plane = new THREE.Mesh( geometry, material );
		plane.visible = false;
		scene.add( plane );

		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

		function onDocumentMouseMove( event ) {

			event.preventDefault();

			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 )
			vector.unproject( camera );

			var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

			if ( selected ) {

				var intersects = raycaster.intersectObject( plane );

				selected.position.copy( intersects[ 0 ].point.sub( offset ) );

				return;

			}

			var intersects = raycaster.intersectObjects( splineObject.children );

			if ( intersects.length > 0 ) {

				if ( intersected != intersects[ 0 ].object ) {

//					if ( intersected ) intersected.material.emissive.setHex( intersected.currentHex );

					intersected = intersects[ 0 ].object;
//					intersected.currentHex = intersected.material.emissive.getHex();
//					intersected.material.emissive.setHex( 0xff0000 );

					plane.position.copy( intersected.position );

					plane.lookAt( camera.position );

				}

				document.body.style.cursor = 'pointer';

			} else {

//				if ( intersected ) intersected.material.emissive.setHex( intersected.currentHex );

				intersected = null;

				document.body.style.cursor = 'auto';

			}

		}

		function onDocumentMouseDown( event ) {

			event.preventDefault();

			var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 )
			vector.unproject( camera );

			var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

			var intersects = raycaster.intersectObjects( splineObject.children );

			if ( intersects.length > 0 ) {

				controls.enabled = false;

				selected = intersects[ 0 ].object;

				var intersects = raycaster.intersectObject( plane );

				offset.copy( intersects[ 0 ].point ).sub( plane.position );

				document.body.style.cursor = 'move';

			}

		}

		function onDocumentMouseUp( event ) {

			event.preventDefault();

			controls.enabled = true;

			if ( intersected ) {

				plane.position.copy( intersected.position );

				if ( me.onDragged ) {

					me.onDragged();

				}

				selected = null;

			}

			document.body.style.cursor = 'auto';

		}

	}


