
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
		var d = JAPL.defaults;
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

			var txt = geoMsg.innerHTML = scene.select.name.split( '/' ).pop();
			for ( var key in data ) {
				txt += key + ' ' + data[ key ] + '<br>';
			}

//		JATH.attributesDiv.innerHTML = geoMsg.innerHTML = obj.name.split( '/' ).pop();
			JATH.attributesDiv.innerHTML = txt;
			JAGE.updateGeometryTab( scene.select )
// console.log( scene.select )

		}
	}


// code below is a junk pile

	JATH.addThreeJS = function() {
		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		document.body.appendChild( renderer.domElement );
		scene = new THREE.Scene();

		getTrackballController();

		THREE.ImageUtils.crossOrigin = 'anonymous';

		stats = new Stats();
		stats.domElement.style.cssText = 'bottom: 10px; cursor: auto; opacity: 0.5; position: absolute; right: 10px; ';
		stats.domElement.title = 'Frames per second. Click to see ms per frame';
		JA.menu.appendChild( stats.domElement );

	};

	JATH.addDefaults = function() {

		assets = new THREE.Object3D();
		scene.add( assets );
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//		material = JAMA.materials.PhongPureWhite();
		material = JAMA.materials.PhongTextureRandom();
		selectedObject = new THREE.Mesh( geometry, material );

	};

	JATH.getTrackballController = function() {
		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
		camera.position.set( JA.camX, JA.camY, JA.camZ );
		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.target.set( JA.tarX, JA.tarY, JA.tarZ );
	};

	function detectSceneInScene() {
		if ( scene.children[0] instanceof THREE.Scene ) {
			scene = scene.children[0];
			scene.select = scene.children[0];
		}
	}

	JATH.findEmbdeddedScene = function( scene ) {
		for ( var i = 0, len = scene.children.length; i < len; i++) {
//				console.log( scene.children[i] )
			if ( scene.children[i] instanceof THREE.Scene ) {  // does not seem to work
				console.log( 'bingo', scene.children[i] );
				JATH.selection = scene.children[i].children;

			}
		}

	}

// http://stackoverflow.com/questions/22123081/how-to-display-type-of-object-of-elements-arrays
	var getObjectType = function ( object ) {

		var types = {
			'Scene': THREE.Scene,
			'PerspectiveCamera': THREE.PerspectiveCamera,
			'AmbientLight': THREE.AmbientLight,
			'DirectionalLight': THREE.DirectionalLight,
			'HemisphereLight': THREE.HemisphereLight,
			'PointLight': THREE.PointLight,
			'SpotLight': THREE.SpotLight,
			'Mesh': THREE.Mesh,
			'Sprite': THREE.Sprite,
			'Object3D': THREE.Object3D
		};

		for ( var type in types ) {
			if ( object instanceof types[ type ] ) return type;
		}
	};


