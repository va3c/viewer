	var VA3C = {};
//	info, stats, renderer, scene, camera, controls;

	var obj;
	VA3C.fname = '../json/test.js';



	function init() {
		var geometry, material, mesh;

		document.body.style.cssText = 'font: 600 12pt monospace; margin: 0; overflow: hidden' ;

		VA3C.info = document.body.appendChild( document.createElement( 'div' ) );

		VA3C.info.style.cssText = 'left: 20px; position: absolute; top: 0px; width: 100% ';
		VA3C.info.innerHTML = '<h1>' + document.title + '<h1>' +
//			'<select id=selJS onchange="loadJS( this.value );" ></select>';
			'<div id=msg></div>';

		VA3C.stats = new Stats();
		VA3C.stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0; zIndex: 100; ';
		document.body.appendChild( VA3C.stats.domElement );

		VA3C.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		VA3C.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( VA3C.renderer.domElement );
		VA3C.scene = new THREE.Scene();

		VA3C.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		VA3C.camera.position.set( 10, 10, 10 );
		VA3C.controls = new THREE.TrackballControls( VA3C.camera, VA3C.renderer.domElement );

		VA3C.scene.add(new THREE.AmbientLight(0x444444));

// light
		var light = new THREE.PointLight( 0xffffff, 1 );
		light.position = VA3C.camera.position;
		VA3C.scene.add( light );

// axes
		function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
		VA3C.scene.add( new THREE.ArrowHelper( v(1, 0, 0), v(0, 0, 0), 30, 0xcc0000) );
		VA3C.scene.add( new THREE.ArrowHelper( v(0, 1, 0), v(0, 0, 0), 30, 0x00cc00) );
		VA3C.scene.add( new THREE.ArrowHelper( v(0, 0, 1), v(0, 0, 0), 30, 0x0000cc) );

// ground box
		geometry = new THREE.BoxGeometry( 200, 1, 100 );
		material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, -10, 0 );
		VA3C.scene.add( mesh );

		loadJS( VA3C.fname );
	}

	function loadJS ( fname ) {
		if ( obj ) VA3C.scene.remove( obj );
		obj = new THREE.Object3D();
		var loader = new THREE.ObjectLoader();
        loader.load(fname, function(obj){
            VA3C.scene.add(obj);
        });
		VA3C.scene.add( obj );
	}

	function animate() {
		requestAnimationFrame( animate );
		VA3C.renderer.render( VA3C.scene, VA3C.camera );
		VA3C.controls.update();
		VA3C.stats.update();
	}