// https://github.com/zz85/zz85-bookmarklets/tree/master/js
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_draggablecubes.html
// https://github.com/zz85/ThreeLabs/blob/master/DragControls.js

	var objects = [];
	var plane;

	var mouse;
	var offset;
	var intersected;
	var selected;

	draggableObjects()

	function draggableObjects () {

		location.hash = '';

		if ( !scene ) {

			alert( 'Please load some objects first...');

			return;

		}

		displayMarkdown( 'draggable-objects.md', info );

		objects = [];

		mouse = new THREE.Vector2();
		offset = new THREE.Vector3();

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				objects.push( child );

			}

		} );

		geometry = new THREE.PlaneBufferGeometry( 1000, 1000, 8, 8 );
		material = new THREE.MeshBasicMaterial( )
		plane = new THREE.Mesh( geometry, material );
		plane.visible = false;
		scene.add( plane );

		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

console.log( objects );

	}

	function onDocumentMouseMove( event ) {

		event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );

		raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

		if ( selected ) {

			var intersects = raycaster.intersectObject( plane );
			selected.position.copy( intersects[ 0 ].point.sub( offset ) );
			return;

		}

//console.log( objects, raycaster );

		var intersects = raycaster.intersectObjects( scene.children );

		if ( intersects.length > 0 ) {

			if ( intersected != intersects[ 0 ].object ) {

//				if ( intersected ) intersected.material.emissive.setHex( intersected.currentHex );

				intersected = intersects[ 0 ].object;
				intersected.currentHex = intersected.material.emissive.getHex();
				intersected.material.emissive.setHex( 0xff0000 );

				plane.position.copy( intersected.position );
				plane.lookAt( camera.position );

			}

			document.body.style.cursor = 'pointer';

		} else {

//			if ( intersected ) intersected.material.emissive.setHex( intersected.currentHex );

			intersected = null;

			document.body.style.cursor = 'auto';

		}

	}

	function onDocumentMouseDown( event ) {

		event.preventDefault();

		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );

		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

		var intersects = raycaster.intersectObjects( scene.children );

console.log( intersects )

		if ( intersects.length > 1 ) {

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

			selected = null;

		}

		document.body.style.cursor = 'auto';

	}