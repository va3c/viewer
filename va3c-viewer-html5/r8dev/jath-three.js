
	var JATH = {} || JATH;

	var THREE, renderer, scene, camera, controls;
	var geometry, material, mesh;
	var app;

	var projector;
	var interescts;

	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

// Add to Parent window
	JATH.addThreeFooterTab = function () {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.style.cssText = 'cursor: auto;';
		tab.innerHTML =
			'<h2>' +
				'<a id=iconHome href=JavaScript:JATH.resetCamera(V3PL.defaultScene); title="Reset camera position" ><i class="fa fa-home"></i></a> ' +
				'<a id=iconHome href=JavaScript:JATH.zoomExtents(); title="Zoom Extents"><i class="fa fa-arrows-alt"></i></a> ' +
			'</h2>'; 
		iconHome.title = "Reset to default view";

		window.addEventListener( 'resize', JATH.onWindowResize, false );
//		window.addEventListener( 'click', JATH.resetCamera, false );

	};

	JATH.addAttributesDiv = function() {

		JATH.attributesDiv = document.body.appendChild( document.createElement( 'div' ) );
		JATH.attributesDiv.style.cssText = 'display: ""; right: 20px; ' +
			'max-height: 900px; position: absolute; text-align: right; top: 20px; width: 250px; z-index:10; ';
		JATH.attributesDiv.innerHTML = '';

	};

// called in jafo-file-open.js
// Needs iframe and THREE to be loaded first...

	JATH.addObjectClickEvent = function () {
//console.log( 'addObjectClickEvent' );
//		projector = new THREE.Projector();

		app.window.addEventListener( 'click', JATH.onDocumentMouseClick, false );

		app.window.addEventListener( 'dragover', function ( event ) {

			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';

		}, false );

		app.window.addEventListener( 'drop', function ( event ) {

			event.preventDefault();

//			JAFO.openDragAndDrop( event.dataTransfer );

			JAFO.appendFile( event.dataTransfer );

		}, false );

	};


// Manipulate the view

	JATH.resetCamera = function ( camaraParameters ) {


//		if ( !controls ) return;

		if ( !JAFO.ifr.contentWindow.controls ) {

			var script = document.body.appendChild( document.createElement( 'script' ) );
			script.onload = function() {
				JAFO.ifr.contentWindow.controls = new THREE.OrbitControls( camera, renderer.domElement );

				JAFO.ifr.contentWindow.animate2 = function() {
					requestAnimationFrame( JAFO.ifr.contentWindow.animate2 );
					JAFO.ifr.contentWindow.controls.update();
				};
				controls = JAFO.ifr.contentWindow.controls;
			};
			script.src = 'http://mrdoob.github.io/three.js/examples/js/controls/OrbitControls.js';
		}

//		controls = new THREE.TrackballControls( camera, renderer.domElement );

// need more standard way to handle default scene...
 
		var p = camaraParameters;
		controls.target.set( p.tarx, p.tary, p.tarz );

		if ( !camera ) return;
		camera.position.set( p.camx, p.camy, p.camz );
		camera.up = v( 0, 1, 0 );

//console.log( 'resetCamera', camera.position, controls.target );

	};

	JATH.zoomExtents = function ( scale ) {
		if ( JATH.zoomSphere ) { scene.remove( JATH.zoomSphere ); }

		scale = scale ? scale : 1; // scene.children[3].scale.x;
		var meshes = 0, c, r;
		var geo = new THREE.Geometry();
		scene.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				geo.merge( child.geometry );
				meshes++;
			}
		} );

		geo.computeBoundingSphere();
		c = geo.boundingSphere.center.multiplyScalar( scale );
		controls.target.set( c.x, c.y, c.z);
		r = 1.25 * geo.boundingSphere.radius * scale;
		camera.position.set( (c.x + r), ( c.y + r ), ( c.z + r ) );

		if ( chkPrefsZoom.checked ) {

			scene.add( new THREE.AxisHelper( r ) );

			geometry = new THREE.SphereGeometry( r );
			material = new THREE.MeshNormalMaterial( { wireframe: true } );
			JATH.zoomSphere = new THREE.Mesh( geometry, material );
			JATH.zoomSphere.position.set( c.x, c.y, c.z);
			scene.add( JATH.zoomSphere );

console.clear();
console.log( 'meshes', meshes, 'rad', r, 'scl', scale );
console.log( 'center', c );
console.log( 'target', controls.target );
console.log( 'camera', camera.position );
console.log( 'geo', geo);

		}

//console.log( 'camera.near', camera.near, 'camera.far', camera.far );
		camera.near = ( r < 100 ) ? r * 0.01 : 1;
		camera.far = ( r > 10000 ) ? r * 10000 : 10000;
		camera.updateProjectionMatrix();
//console.log( 'camera.near', camera.near.toFixed( 3 ), 'camera.far', camera.far );

	}

// handle events

	JATH.onWindowResize = function () {
//console.log( 'resize event' );

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	};

	JATH.onDocumentMouseClick = function ( event ) {
//console.log( 'onDocumentMouseClick', scene.select );
		event.preventDefault();

		var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
		vector.unproject( camera );
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		intersects = raycaster.intersectObjects( JAFO.targetList );

		if ( intersects.length > 0 ) {

			scene.select = intersects[ 0 ].object;
			var data = scene.select.userData;
			var keys = Object.keys( data );

			var txt = divMsg1.innerHTML + '<br>' + scene.select.name.split( '/' ).pop() + '<br>';
			for ( var key in data ) {
				txt += key + ' ' + data[ key ] + '<br>';
			}

			JATH.attributesDiv.innerHTML = txt;
			JAGE.updateGeometryTab( scene.select );

		}

	};
