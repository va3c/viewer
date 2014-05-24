	var fname = '../../json/Hex_01.js';

	var container, menu, stats, renderer, scene, camera, controls;
	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians

	init();
	animate();

	function init() {
		container = document.body.appendChild( document.createElement( 'div' ) );

		addCSS();
		addMenu();
		addInfo();
		V3PL.parsePermalink();
		V3FO.addFileOpen();
		addThreeJS();
		V3PL.addPermalinks();
		V3BU.addBundleOpen();

		if ( V3PL.url ) {
			V3FO.loadURL( V3PL.url );
		} else {
			V3FO.loadFile( fname );
		}
	}

	function addCSS() {
		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML = 'body { font: 600 12pt monospace; margin: 0; overflow: hidden; }' +
			'a {text-decoration: none; }' +
			'h4 { margin: 10px 0 0 0; padding: 0; }' +
			'#menu { right: 20px; overflow: auto; padding: 10px; position: absolute; top: 20px; }' +
			'.button { background-color: #eee; outline: 1px #aaa solid; padding: 5px; }' +
			'.xyz { width: 50px; text-align: right; }' +
		'';
	}

	function addMenu() {
		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';
		menu.style.cssText = ' background-color: #ccc; opacity: 0.8; ';
		menu.innerHTML = 
			'<h1>' +
				'<a href="" >' + document.title + '</a> ' +
				'<a href=# id=infoIcon onclick=info.style.display="block"; >&#x24D8;</a>' +
			'</h1>' +
			'<hr><br>' +
		'';
	}

	function addInfo() {
		info = document.body.appendChild( document.createElement( 'div' ) );
		info.style.cssText = 'display: none; background-color: #ccc; left: 50px; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; left: 0; height: 370px; margin: auto; position: absolute; right: 0; top: 0; width: 500px; zIndex:10; ';
		info.innerHTML =
			'<div onclick=info.style.display="none"; >' +
				'<h3>' + document.title + '</h3>' +
				'<h4>Features include the following:</h4>' +
				'<ul>' +
					'<li>xxx</li>' +
					'<li>xxx</li>' +
				'</ul>' +
				'<a href="https://github.com/va3c/" target="_blank">Source code</a><br>' +
				'<small>' +
					'credits: <a href="http://threejs.org" target="_blank">three.js</a> - ' +
					'<a href="http://khronos.org/webgl/" target="_blank">webgl</a> - ' +
					'<a href="http://va3c.github.io" target="_blank">vA3C</a><br>' +
					'copyright &copy; 2014 vA3C authors ~ MIT license' +
				'</small><br><br>' +
				'<i>Click anywhere in this message to hide...</i>' +
		'</div>';
		infoIcon.style.cssText += 'text-decoration: none; ';
		infoIcon.title = 'Get some helpful information';
	}

	function addThreeJS() {
		stats = new Stats();
		stats.domElement.style.cssText = 'bottom: 0; position: absolute; left: 0; ';
		document.body.appendChild( stats.domElement );

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.set( V3PL.camX, V3PL.camY, V3PL.camZ );
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.target.set( V3PL.tarX, V3PL.tarY, V3PL.tarZ );
	}

	function addAssets() {
		var geometry, material, mesh;

		targetList = [];
// lights
		scene.add( new THREE.AmbientLight( 0x444444 ) );

		var light = new THREE.PointLight( 0xffffff, 1 );
		light.position = camera.position;
		scene.add( light );

// axes
		scene.add( new THREE.ArrowHelper( v(1, 0, 0), v(0, 0, 0), 30, 0xcc0000) );
		scene.add( new THREE.ArrowHelper( v(0, 1, 0), v(0, 0, 0), 30, 0x00cc00) );
		scene.add( new THREE.ArrowHelper( v(0, 0, 1), v(0, 0, 0), 30, 0x0000cc) );

// ground box
		geometry = new THREE.BoxGeometry( 20000, 100, 20000 );
		material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, -10, 0 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );

//			computeNormalsAndFaces();
	}

	function computeNormalsAndFaces() {
		for ( var i = 0, iLen = scene.children.length, items; i < iLen; i++ ) {
			items = scene.children;
			if ( items[i].hasOwnProperty("geometry") ) {
				items[i].geometry.mergeVertices();
				items[i].castShadow = true;
				items[i].geometry.computeFaceNormals();
				targetList.push( items[i] );
			}
			if ( items[i].children.length > 0 ){
				for ( var k = 0, itemsChildren = items[i], kLen = itemsChildren.length ; k < kLen; k++ ) {
					if ( itemsChildren[k].hasOwnProperty("geometry") ) {
						targetList.push( itemsChildren[k] );
					}
				}
			}
		}
	}

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		controls.update();
		stats.update();
	}