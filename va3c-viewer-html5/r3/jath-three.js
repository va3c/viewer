
	var JATH = {} || JATH;

	// JATH.controls, JATH.renderer, JATH.stats, JATH.scene, JATH.camera;
	// var material, mesh, wires, outlineMesh;

	var THREE, renderer, scene, camera, controls;
	var geometry, material, mesh;

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
		if ( !camera ) return;
//		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );

		camera.position.set( JATH.camX, JATH.camY, JATH.camZ );
		if ( !controls ) return;
//		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.target.set( JATH.tarX, JATH.tarY, JATH.tarZ );
	};

/*
	JATH.resetCamera = function() {
		JATH.getTrackballController();
	};
*/

	function onDocumentMouseClick( event ) {
		event.preventDefault();

		var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
		projector.unprojectVector( vector, camera );
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		intersects = raycaster.intersectObjects( scene.children );
//console.log( intersects );
		if ( intersects.length > 0 ) {
			scene.select = intersects[ 0 ].object;
		}
	}

	JATH.findEmbdeddedScene = function( scene ) {
		for ( var i = 0, len = scene.children.length; i < len; i++) {
//				console.log( scene.children[i] )
			if ( scene.children[i] instanceof THREE.Scene ) {
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
