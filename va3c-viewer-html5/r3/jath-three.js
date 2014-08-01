
	var JATH = {} || JATH;

	// JATH.controls, JATH.renderer, JATH.stats, JATH.scene, JATH.camera;
	// var material, mesh, wires, outlineMesh;

	var THREE, renderer, scene, camera, controls;
	var geometry, material, mesh;
	var app;

	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }


	JATH.camX = 100;
	JATH.camY = 100;
	JATH.camZ = 100;

	JATH.tarX = 0;
	JATH.tarY = 0;
	JATH.tarZ = 0;

	var projector;
	var interescts;

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

	JATH.addThreeFooter = function() {
		var footer = JA.menu.appendChild( document.createElement( 'div' ) );
		footer.style.cssText = 'cursor: auto;';
		footer.innerHTML =
			'<h2>' +
				'<a id=iconHome ><i class="fa fa-home"></i></a> ' +
			'</h2>'; 
		iconHome.title = "Reset to default view";
		iconHome.href = 'JavaScript:JATH.resetCamera();';
	};

	JATH.resetCamera = function() {
//console.log( camera );
		if ( !controls ) return;
//		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.target.set( JATH.tarX, JATH.tarY, JATH.tarZ );

		if ( !camera ) return;

		camera.position.set( JATH.camX, JATH.camY, JATH.camZ );
	};

/*
	JATH.resetCamera = function() {
		JATH.getTrackballController();
	};
*/

	JATH.addAttributes = function() {
		JATH.attributes = document.body.appendChild( document.createElement( 'div' ) );
		JATH.attributes.style.cssText = 'display: ""; right: 20px; ' +
			'max-height: 900px; position: absolute; text-align: right; top: 20px; width: 250px; z-index:10; ';
		JATH.attributes.innerHTML = '';

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
			var txt = '';
			for ( var key in data ) {
				txt += key + ' ' + data[ key ] + '<br>';
			}
			JATH.attributes.innerHTML = txt;
			JAGE.updateGeometryTab( scene.select )
// console.log( scene.select )

		}
	}

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

	JATH.onWindowResize = function() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
