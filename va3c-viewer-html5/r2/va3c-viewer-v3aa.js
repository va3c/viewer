
	var container, stats, renderer, scene, camera, controls;
	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

	var V3AA = {};

	V3AA.addCSS = function() {
		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML = 'body { color: #888; font: 600 12pt monospace; margin: 0; overflow: hidden; }' +
			'a { text-decoration: none; opacity: 0.5; }' +
			'h1 a { color: #888; opacity: 0.5; } ' +
			'h4 { margin: 10px 0 0 0; padding: 0; }' +
//			'#menu { right: 20px; overflow: auto; padding: 0 10px 10px 10px; position: absolute; top: 10px; }' +
			'.button { background-color: #eee; outline: 1px #aaa solid; padding: 5px; }' +
			'.xyz { width: 50px; text-align: right; }' +

			'input[type=range] { -webkit-appearance: none; -moz-apperance:none; background-color: silver; height: 15px; opacity: 0.5; width: 100px;}' +
			'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none; -moz-apperance:none; background-color: #666; border-radius:50px; opacity: 0.5; width: 10px; height: 26px; }' +
		'';
	};

	V3AA.addHeader = function() {
		V3AA.header = document.body.appendChild( document.createElement( 'div' ) );
		V3AA.header.style.cssText = ' right: 20px; position: absolute; top: 0px; transition: right 1s; ';
		V3AA.header.innerHTML = '<h1><a href="" title="Reload this page" >' + document.title + 
			'</a> <a href=JavaScript:V3AA.slideMenu()><i class="fa fa-bars"></a></i>'+
		'</h1>';
	};

	V3AA.addMenu = function() {
		V3AA.menu = V3AA.header.appendChild( document.createElement( 'div' ) );
		V3AA.menu.style.cssText = ' background-color: #ccc; opacity: 0.8; right: -300px; padding: 0 10px; position: absolute; top: 10px; width: 250px; ';
		V3AA.menu.innerHTML = 
			'<h2>Settings</h2>' +
			'<hr><br>' +
		'';
	};

	V3AA.slideMenu = function(){
		V3AA.header.style.right = V3AA.header.style.right === '20px' ? '300px' : '20px';
		V3AA.openDialog(); // closes any open dialog
	};

	V3AA.addAbout = function() {
		var aboutButton = V3AA.menu.appendChild( document.createElement( 'div' ) );
		aboutButton.innerHTML =
			'<a href=# onclick=V3AA.openDialog(V3AA.about); ><p class=button >' +
				'<i class="fa fa-paw"></i> About vA3C...' +
			'</p></a>'; 

		V3AA.about = container.appendChild( document.createElement( 'div' ) );
		V3AA.about.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; left: 0; height: 500px; margin: auto; position: absolute; right: 0; top: 0; width: 500px; ';
		V3AA.about.innerHTML =
			'<div>' +
				'<h3><i class="fa fa-paw"></i> ' + document.title + '</h3>' +
				'<div>' +
				'<p>View Revit, Rhino/Grasshopper and 3DS Max models in 3D with any web browser using Three.js and data rendered as JSON files.</p>' +
				'<p>This script is an update to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a></p>' +
				'<p>Team Members: Benjamin Howes, Jonatan Schumacher, Jeremy Tammik, Matt Mason, Kevin Vandecar, Charlie Portelli, Josh Wentz, Femi King, Zach Flanders & Theo Armour</p>' +
				'<p>Supporters include: Mostapha Roudsari, Ashley Reed, Anne [from Sao Paulo], Jim Quanci, Elcin Ertugrul, Amir Tasbihi and many more. Others?</p>' +
//				'<ul>' +
//					'<li>xxx
//					'<li>xxx
//				'</ul>' +

				'<small>' +
					'<a href="https://github.com/va3c/" target="_blank">Source code on GitHub</a> ' +
					'Credits: <a href="http://threejs.org" target="_blank">Three.js</a> - ' +
					'<a href="http://khronos.org/webgl/" target="_blank">WebGL</a> - ' +
					'<a href="http://va3c.github.io" target="_blank">vA3C</a><br>' +
					'copyright &copy; 2014 the vA3C team ~ MIT license' +
				'</small>' +
				'</div>'  +
				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:V3AA.openDialog(); >Close</a> ' +
				'</p>' +
		'</div>';
	};

	V3AA.addFooter = function() {
		var footer = V3AA.menu.appendChild( document.createElement( 'div' ) );
		footer.innerHTML =
			'<h2>' +
				'<a href=# onclick=V3AA.resetCamera(); title="Return to default view"><i class="fa fa-home"></i></a>  ' +
				'<a href=# onclick=V3AA.zoomExtents(); title="Zoom extents" ><i class="fa fa-arrows"></i></a>' +
			'</h2>'; 
	};

	V3AA.openDialog = function( dialog ) {
		for (var i = 0, len = container.children.length; i < len; i++) {
			if ( container.children[i].nodeName === 'DIV' ) container.children[i].style.display = 'none';
		}
		if ( dialog ) dialog.style.display="block";
	};

	V3AA.addThreeJS = function() {
		stats = new Stats();
		stats.domElement.style.cssText = 'bottom: 10px; opacity: 0.5; position: absolute; right: 10px; ';
		V3AA.menu.appendChild( stats.domElement );

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		container.appendChild( renderer.domElement );
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.set( V3PL.camX, V3PL.camY, V3PL.camZ );
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.target.set( V3PL.tarX, V3PL.tarY, V3PL.tarZ );
	};

	V3AA.addAssets = function() {
		if ( chkGroundPlane.checked ) {
			var geometry, material, mesh;
			geometry = new THREE.BoxGeometry( 20000, 100, 20000 );
			material = new THREE.MeshPhongMaterial( {color: 0xaaaaaa, ambient: 0xaaaaaa, shininess: 150, specular: 0x333333 } );
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0, -10, 0 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		}

		if ( chkGradient.checked === true ) V3AA.addGradient();
	};

	V3AA.addGradient = function() {
		var css = document.body.appendChild( document.createElement('style') );
		var col1 = "#" + Math.random().toString(16).slice(2, 8);
		var col2 = "#" + Math.random().toString(16).slice(2, 8);
		var col3 = "#" + Math.random().toString(16).slice(2, 8);
		var X = ( Math.random() * window.innerWidth ).toFixed(0);
		var Y = ( Math.random() * window.innerHeight ).toFixed(0);
		var center =  20 + ( Math.random() * 60 ).toFixed(0);

		css.innerHTML += 'body { ' +
			'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
		'';
	};

// events
	function mouseUp() {
		window.removeEventListener('mousemove', divMove, true);
	}

	function mouseMove( event ){
		if ( event.target.class === 'movable' ) {
			event.preventDefault();
			offsetX = event.clientX - event.target.offsetLeft;
			offsetY = event.clientY - event.target.offsetTop;
			window.addEventListener('mousemove', divMove, true);
		}
	}

	function divMove( event ){
		event.target.style.left = ( event.clientX - offsetX ) + 'px';
		event.target.style.top = ( event.clientY - offsetY ) + 'px';
	}