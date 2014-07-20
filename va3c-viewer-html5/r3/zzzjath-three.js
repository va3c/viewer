
	var JATH = {} || JATH;

	// JATH.controls, JATH.renderer, JATH.stats, JATH.scene, JATH.camera;
	var material, mesh, wires, outlineMesh;

	JATH.addThreeJS = function() {
		JATH.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		JATH.renderer.setSize( window.innerWidth, window.innerHeight );
		JATH.renderer.shadowMapEnabled = true;
		JATH.renderer.shadowMapSoft = true;

		document.body.appendChild( JATH.renderer.domElement );
		JATH.scene = new THREE.Scene();

		JATH.getTrackballController();

		THREE.ImageUtils.crossOrigin = 'anonymous';

		JATH.stats = new Stats();
		JATH.stats.domElement.style.cssText = 'bottom: 10px; cursor: auto; opacity: 0.5; position: absolute; right: 10px; ';
		JATH.stats.domElement.title = 'Frames per second. Click to see ms per frame';
		JA.menu.appendChild( JATH.stats.domElement );

	};

	JATH.addDefaults = function() {

		JATH.assets = new THREE.Object3D();
		JATH.scene.add( JATH.assets );
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//		JATH.material = JAMA.materials.PhongPureWhite();
		JATH.material = JAMA.materials.PhongTextureRandom();
		JATH.selectedObject = new THREE.Mesh( geometry, JATH.material );

	};

	JATH.getTrackballController = function() {
		JATH.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
		JATH.camera.position.set( JA.camX, JA.camY, JA.camZ );
		JATH.controls = new THREE.TrackballControls( JATH.camera, JATH.renderer.domElement );
		JATH.controls.target.set( JA.tarX, JA.tarY, JA.tarZ );
	};

	JATH.resetCamera = function() {
		JATH.getTrackballController();
	};
