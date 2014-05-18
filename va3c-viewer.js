	var VA3C = {};
//	info, stats, renderer, scene, camera, controls;

	var obj;
//	VA3C.fname = '../json/twoMobius.json';
//	VA3C.fname = '../RvtVa3c/models/Wall.rvt.js';
	VA3C.fname = '../json/Project2.rvt.js';
	VA3C.fname = '../json/Hex_01.js';

	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians


	function init() {
		var geometry, material, mesh;

		document.body.style.cssText = 'font: 600 12pt monospace; margin: 0; overflow: hidden' ;

		VA3C.info = document.body.appendChild( document.createElement( 'div' ) );

		VA3C.info.style.cssText = 'left: 20px; position: absolute; top: 0px; width: 100% ';
		VA3C.info.innerHTML = '<h1>' + document.title + '<h1>' +
//			'<select id=selJS onchange="loadJS( this.value );" ></select>';
			'<div id=msg></div>';

		VA3C.stats = new Stats();
		VA3C.stats.domElement.style.cssText = 'bottom: 0; position: absolute; left: 0; zIndex: 100; ';
		document.body.appendChild( VA3C.stats.domElement );

		VA3C.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		VA3C.renderer.setSize( window.innerWidth, window.innerHeight );
		VA3C.renderer.shadowMapEnabled = true;
		document.body.appendChild( VA3C.renderer.domElement );
		VA3C.scene = new THREE.Scene();

		VA3C.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100000 );
		VA3C.camera.position.set( 15000, 15000, 15000 );
		VA3C.controls = new THREE.TrackballControls( VA3C.camera, VA3C.renderer.domElement );

		loadJS( VA3C.fname );
	}

	function loadJS ( fname ) {
		if ( obj ) VA3C.scene.remove( obj );
		obj = new THREE.Object3D();
		var loader = new THREE.ObjectLoader();
        loader.load(fname, function(obj){
            VA3C.scene = obj;

            VA3C.scene.add(new THREE.AmbientLight(0x444444));

			updateLight( 2014, 5, 18, 22, 30, 00, 42, -75 );

// axes
            function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
            VA3C.scene.add( new THREE.ArrowHelper( v(1, 0, 0), v(0, 0, 0), 30, 0xcc0000) );
            VA3C.scene.add( new THREE.ArrowHelper( v(0, 1, 0), v(0, 0, 0), 30, 0x00cc00) );
            VA3C.scene.add( new THREE.ArrowHelper( v(0, 0, 1), v(0, 0, 0), 30, 0x0000cc) );

// ground box

            geometry = new THREE.BoxGeometry( 20000, 100, 20000 );
            material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( 0, -10, 0 );

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            VA3C.scene.add( mesh );

            //call compute function
            computeNormalsAndFaces();
        });
	}

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }


	function updateLight( year, month, day, hour, minutes, sec, lat, long) {
            light = new THREE.DirectionalLight( 0xffffff, 1 );
// (year, month, day, hour, minutes, sec, lat, long)
			var latlon = sunPosition( year, month, day, hour, minutes, sec, lat, long  );
			console.log ( latlon );
			var pos = convertPosition(  latlon[0], latlon[1], 10000 );
		// var pos = convertPosition(  43, -75, 10000 );

            light.position = pos;
            light.castShadow = true;
            light.shadowMapWidth = 2048;
            light.shadowMapHeight = 2048;
            var d = 10000;
            light.shadowCameraLeft = -d;
            light.shadowCameraRight = d;
            light.shadowCameraTop = d * 2;
            light.shadowCameraBottom = -d * 2;

            light.shadowCameraNear = 1000;
            light.shadowCameraFar = 20000;
            light.shadowCameraVisible = true;
            VA3C.scene.add( light );

	}

	function convertPosition( lat, lon, radius ) {
		var rc = radius * Math.cos( lat * d2r );
		return v( rc * Math.cos( lon * d2r ), radius * Math.sin( lat * d2r ), rc * Math.sin( lon * d2r) );
	}

	function animate() {
		requestAnimationFrame( animate );
		VA3C.renderer.render( VA3C.scene, VA3C.camera );
		VA3C.controls.update();
		VA3C.stats.update();
	}

    function computeNormalsAndFaces()
    {
        for(var i=0; i<VA3C.scene.children.length; i++){

            if( VA3C.scene.children[i].hasOwnProperty("geometry")){
                VA3C.scene.children[i].geometry.mergeVertices();
                VA3C.scene.children[i].castShadow = true;
//				VA3C.scene.children[i].scale.set(0.01, 0.01, 0.01 );
 //               VA3C.scene.children[i].geometry.computeCentroids();
                VA3C.scene.children[i].geometry.computeFaceNormals();
            }
        }
    }