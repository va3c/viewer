
	var JATH = {} || JATH;

	var THREE, renderer, scene, camera, controls;
	var geometry, material, mesh;
	var app;

	var projector;
	var interescts;

	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

	JATH.addThreeFooterTab = function() {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.style.cssText = 'cursor: auto;';
		tab.innerHTML =
			'<h2>' +
				'<a id=iconHome href=# onclick=JATH.resetCamera(); ><i class="fa fa-home"></i></a> ' +
			'</h2>'; 
		iconHome.title = "Reset to default view";

		window.addEventListener( 'resize', JATH.onWindowResize, false );
//		window.addEventListener( 'click', JATH.resetCamera, false );

	};

	JATH.onWindowResize = function() {
//console.log( 'resize event' );

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	JATH.resetCamera = function() {
//console.log( 'reset camera event' );

		if ( !controls ) return;
//		controls = new THREE.TrackballControls( camera, renderer.domElement );
		var d = JAPL.defaultScene;
		controls.target.set( d.tarx, d.tary, d.tarz );

		if ( !camera ) return;
		camera.position.set( d.camx, d.camy, d.camz );
		camera.up = v( 0, 1, 0 );

	};

	JATH.addAttributesDiv = function() {

		JATH.attributesDiv = document.body.appendChild( document.createElement( 'div' ) );
		JATH.attributesDiv.style.cssText = 'display: ""; right: 20px; ' +
			'max-height: 900px; position: absolute; text-align: right; top: 20px; width: 250px; z-index:10; ';
		JATH.attributesDiv.innerHTML = '';

	}

	JATH.addObjectClickEvent = function() {

		projector = new THREE.Projector();
		app.window.addEventListener( 'click', JATH.onDocumentMouseClick, false );

	}

	JATH.onDocumentMouseClick = function ( event ) {

		event.preventDefault();

		var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
		projector.unprojectVector( vector, camera );
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

	}
