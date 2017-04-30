// 2014-12-29 ~ vA3C Authors ~ MIT License
// Sources: http://jabtunes.com/labs/3d/spline3editor.html


	var VH = VH || {};

	VH.splineMakerRandomPoints = function( pointsCount ) {

		if ( !THREE ) { alert('Please first open a file...'); return; }

		if ( VH.splinePointsContainer ) { scene.remove( VH.splinePointsContainer ); }

		VH.splinePointsContainer = new THREE.Object3D();

		scene.add ( VH.splinePointsContainer );

		VH.splinePointsLength = parseInt( pointsCount, 10 );

		VH.splinePointsPositions = [];

		for ( var i = 0; i < VH.splinePointsLength; i++ ) {

			VH.addSplineObject( VH.splinePointsPositions[ i ] );

			VH.splinePointsPositions.push( VH.splinePointsContainer.children[ i ].position );

		}

		if ( VH.closed === true ) {

			VH.splineCurve = new THREE.ClosedSplineCurve3( VH.splinePointsPositions );

		} else {

			VH.splineCurve = new THREE.SplineCurve3( VH.splinePointsPositions );

		}

		VH.updateSplineOutline();

		VH.dragcontrols = new VH.DragObjects( VH.splinePointsContainer.children );

		VH.dragcontrols.onDragged = VH.updateSplineOutline;

	};

	VH.points = function( delta ) {

		if ( !VH.splinePointsContainer ) { return; }

		VH.splinePointsLength += delta;


		if ( VH.splinePointsLength < 4 ) {

			VH.splinePointsLength = 4;

			return;

		}

		if ( delta > 0 ) {

			while ( delta-- ) {

				VH.splinePointsPositions.push( VH.addSplineObject().position );

			}

		} else {

			delta = -delta;

			while (delta--) {

				VH.splinePointsPositions.pop();

				VH.splinePointsContainer.remove( VH.splinePointsContainer.children[ VH.splinePointsContainer.children.length - 1 ] );

			}

		}

		VH.updateSplineOutline();

	};

	VH.addSplineObject = function( position ) {

		var geometry = new THREE.BoxGeometry( 2, 2, 2 );

		var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );

		var mesh = new THREE.Mesh( geometry, material );

		mesh.material.ambient = mesh.material.color;

		if ( position ) {

			mesh.position = position;

		} else if ( VH.extend === true ) {

			var pointUltimate = VH.splinePointsContainer.children[ VH.splinePointsContainer.children.length - 1 ];
			var pointPenultimate = VH.splinePointsContainer.children[ VH.splinePointsContainer.children.length - 2 ];
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

		VH.splinePointsContainer.add( mesh );

		return mesh;

	};

	VH.updateSplineOutline = function() {

		if ( VH.splineOutline ) scene.remove( VH.splineOutline );

		if ( VH.closed === true  ) {

			VH.splineCurve = new THREE.ClosedSplineCurve3( VH.splinePointsPositions );

		} else {

			VH.splineCurve = new THREE.SplineCurve3( VH.splinePointsPositions );

		}

		VH.splineCurve.updateArcLengths();

		var arcLen = VH.splineCurve.getLength();

		arcLen = Math.floor( arcLen / 8 );

		var points = VH.splineCurve.getPoints( arcLen );

		var geometry = new THREE.Geometry();

		for ( var i = 0; i < points.length; i ++ ) {

			geometry.vertices.push( v( points[i].x, points[i].y, points[i].z ) );

		}

		VH.splineOutline = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );

		scene.add( VH.splineOutline );

	};

	VH.splineDelete = function() {

		if ( VH.splinePointsContainer ) { scene.remove( VH.splinePointsContainer ); }
		if ( VH.splineOutline ) scene.remove( VH.splineOutline );

	};

	VH.exportSpline = function() {

		var container = new THREE.Object3D()

		container.add( VH.splinePointsContainer.clone() );
		container.add( VH.splineOutline.clone() );

		var output = container.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'spline-objects.json';
		a.click();
		delete a;

	};

	VH.importSpline = function( fileObject, parameters ) {

		parameters = parameters || '';
		var file = fileObject.files[ 0 ];

		var reader = new FileReader();

		reader.onload = function ( event ) {

			output = reader.result;

			msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + 
				' type: ' + file.type + ' modified: ' + file.lastModifiedDate +
			'';

			loadFileJSONObjectSpline( output, parameters, callbackJSON )

		};

		if ( reader.readAsBinaryString !== undefined ) {

			reader.readAsBinaryString( file );

		} else {

			reader.readAsArrayBuffer( file );

		}

	};

	function loadFileJSONObjectSpline( contents, parameters, callbackJSON ) {

		contents = JSON.parse( contents );

		loader = new THREE.ObjectLoader();

		VH.contents = loader.parse( contents );

console.log( 'found object', contents );

//		scene.add( contents );

		callbackJSON( contents, parameters );

	}

	callbackJSON = function(){

//		if ( VH.splinePointsContainer ) { scene.remove( VH.splinePointsContainer ); }
//		if ( VH.splineOutline ) scene.remove( VH.splineOutline );

console.log( VH.contents );


//		if ( !contents && .children.length > 0  ) { return; } 

		VH.splinePointsContainer = VH.contents.children[ 0 ];

		scene.add ( VH.splinePointsContainer );

		VH.dragcontrols = new VH.DragObjects( VH.splinePointsContainer.children );

		VH.splinePointsLength = VH.splinePointsContainer.children.length;

		VH.splinePointsPositions = [];

		for ( var i = 0; i < VH.splinePointsLength; i++ ) {

//			VH.addSplineObject( VH.splinePointsPositions[ i ] );

			VH.splinePointsPositions.push( VH.splinePointsContainer.children[ i ].position );

		}

		if ( VH.closed === true ) {

			VH.splineCurve = new THREE.ClosedSplineCurve3( VH.splinePointsPositions );

		} else {

			VH.splineCurve = new THREE.SplineCurve3( VH.splinePointsPositions );

		}


		VH.updateSplineOutline();

//		VH.splineOutline = object.children[ 0 ];

//		scene.add ( VH.splineOutline );

		VH.dragcontrols.onDragged = VH.updateSplineOutline;


	};


	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
