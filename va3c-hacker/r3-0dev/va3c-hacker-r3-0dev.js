	var VH = VH || {};

	VH.add = false;
	var hackerPrefix = './';
	var displayMenuLeft = false;
	var container, menuLeft, menuRight, inworld;
	var app = {};

	var THREE;
	var renderer;
	var scene;
	var camera;
	var controls;

	var airDoodleDisplay = true;
	var airDoodleVisible;

	VH.initHacker = function () {

		VH.buildUserInterface();

		var parameters = location.hash.split ( '#' );

		if ( parameters.length > 1 ) {

			VH.loadScript ( parameters[ 1 ] );

		}

		window.addEventListener ( 'hashchange', VH.initHacker, false );

	};

	VH.initHackette = function () {

//console.log( 'initHackette', parameters );

		VH.buildUserInterface();

		var parameters = location.hash.split ( '#' );

		var script = document.body.appendChild( document.createElement( 'script' ) );

		script.onload = function() {

			if ( parameters.length > 2 ) {

					VH.dispatchFileByURL( parameters );

			}

		};

		script.src = hackerPrefix + 'dispatch-file.js';

		window.addEventListener ( 'hashchange', VH.initHackette, false );

	};

	VH.buildUserInterface = function() {

		if ( !container ) {

			VH.loadScript( hackerPrefix + 'dispatch-file.js' );
			VH.loadScript( hackerPrefix + 'load-file-html.js' );


			var tooltip = 'Helping us to stand on the shoulders of giants';

			var css = document.body.appendChild( document.createElement('style') );
			css.innerHTML = 'body { font: 600 12pt monospace; margin: 0; overflow: hidden; }' +
				'h1 { margin: 0; }' +
				'h1 a {text-decoration: none; }' +
			'';

			container = document.body.appendChild( document.createElement( 'div' ) );

			menuRight = container.appendChild( document.createElement( 'div' ) );
			menuRight.style.cssText = 'background-color: #ccc; display: none; max-height: ' + ( window.innerHeight - 120 ) + 'px ;'  +
				'opacity: 0.9; overflow: auto; padding: 10px; position: absolute; right: 20px; top: 80px; width: 400px;  z-index: 20;' +
			'';

			menuRight.id = 'movable';
			menuRight.title = 'Move this menu panel around the screen or iconize it';
			menuRight.addEventListener( 'mousedown', VH.mouseMove, false );
			menuRight.header = '<h1><a id=closerIcon href=JavaScript:VH.toggleMenu(menuRight); title="' + tooltip + '" >&#9776;</a><h1>' +
				'<h1>' +
					'<a href="" title="' + tooltip + '" >' + document.title + '</a> ' +
				'</h1>' +
				'<hr>' +
			'';
			if ( airDoodleDisplay === true ) {
				menuRight.addEventListener( 'onmouseover', showDoodle, false );
				menuRight.addEventListener( 'onmouseout', hideDoodle, false );
			}

			menuLeft = container.appendChild( document.createElement( 'div' ) );
			menuLeft.style.cssText = 'background-color: #ccc; display: none; left: 20px; max-height: ' + ( window.innerHeight - 120 ) + 'px ;' +
				'opacity: 0.9; overflow: auto; padding: 10px; position: absolute; resize: both; top: 80px; width: 400px; z-index: 20;' +
			'';
			menuLeft.id = 'movable';
			menuLeft.title = 'Move this menu panel around the screen or iconize it';
			menuLeft.addEventListener( 'mousedown', VH.mouseMove, false );
			menuLeft.header = 
				'<h1><a id=closerIcon href=JavaScript:VH.toggleMenu(menuLeft); >&#9776;</a></h1>' +
			'';

			inworld = document.body.appendChild( document.createElement( 'div' ) );
			inworld.style.cssText = 'padding: 10px; position: absolute; /* max-width: 450px;*/ z-index: 10;';
			inworld.header = //'<a href="" ><h1>' + document.title + '</h1></a>' +
				'<div id=msg ></div>' +
				'<div id=msg1 ></div>' +
				'<div id=msg2 ></div>' +
				'<div id=msg3 ></div>' +
					'';
			inworld.innerHTML = inworld.header;

			window.addEventListener( 'mouseup', VH.mouseUp, false);

		}

	};


	function showDoodle() {
	
		if ( !airDoodleVisible ) { 

			VH.dispatchFileByURL( ['','../../va3c-hacker-cookbook/enable-air-doodle/r1/enable-air-doodle.html','noGrid','noAxis','noGround' ]);

			airDoodleVisible = true;

		}

	}

	function hideDoodle() {

		VH.ifr.src = '';

		airDoodleVisible = false;

	}


	VH.displayMarkdown = function( fname, panel ) {

		var converter = new Showdown.converter();

		VH.requestFile( fname, callback );

		function callback() {

			text = VH.xmlHttp.responseText;

			panel.innerHTML = panel.header + converter.makeHtml( text );

			menuLeft.style.display = 'none';

			if ( app && app.menuLeft ) app.menuLeft.style.display = 'none';

			panel.style.display = '';

		}

	};

 
	VH.mouseUp = function() {

		window.removeEventListener('mousemove', VH.divMove, true);

	};

	VH.mouseMove = function( event ){

		if ( event.target.id === 'movable' ) {

			event.preventDefault();

			offsetX = event.clientX - event.target.offsetLeft;
			offsetY = event.clientY - event.target.offsetTop;

			window.addEventListener('mousemove', VH.divMove, true);

		}

	};

	VH.divMove = function( event ){

		event.target.style.left = ( event.clientX - offsetX ) + 'px';
		event.target.style.top = ( event.clientY - offsetY ) + 'px';

	};

	VH.toggleMenu = function ( panel ) {

		var toggle = panel.children[1].style.display === 'none' ? '' : 'none';
		for (var i = 1; i < panel.children.length; i++) {
			panel.children[i].style.display = toggle;
		}

	};

	VH.requestFileCallback = function() {

		return VH.xmlHttp.responseText;

	}

	VH.requestFile = function( fileName, callback ){

		VH.xmlHttp = new XMLHttpRequest ();
		VH.xmlHttp.open( 'GET', fileName, true );
		VH.xmlHttp.onreadystatechange = callback;
		VH.xmlHttp.send( null );
//		return xmlHttp.responseText;

	};


	VH.loadScript = function ( fileName, callback ) {

		callback = callback ? callback : function () {} ;

		var js = document.body.appendChild ( document.createElement( 'script' ) );

		js.onload = callback;

		js.setAttribute ( 'src', fileName );

	};

	VH.updateSceneByHashParameters = function( parameters ) {

		parameters = parameters ? parameters : '';

		if ( parameters.indexOf( 'noMenuLeft' ) > -1 ) {

			menuLeft.style.display = 'none';

			if ( app && app.menuLeft ) app.menuLeft.style.display = 'none';

		}


		if ( parameters.indexOf( 'displayMenuLeft' ) > -1 ) {

			menuLeft.style.display = '';

		}


// change to 'displayBackground'

		if ( parameters.indexOf( 'noBackground' ) === -1 ) {

			VH.setRandomGradient();

		}

		if ( !THREE ) { return; }

		if ( parameters.indexOf( 'noGrid' ) === -1 ) {

			var helper = new THREE.GridHelper( 50, 10 );
			scene.add( helper );

		}

		if ( parameters.indexOf( 'noAxis' ) === -1 ) {

			var axisHelper = new THREE.AxisHelper( 5 );
			scene.add( axisHelper );

		}

		if ( parameters.indexOf( 'noGround' ) === -1 ) {

			var geometry = new THREE.BoxGeometry( 100, 2, 100 );
			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(), 
				ambient: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 5
			} );

			groundPlane = new THREE.Mesh( geometry, material );
			groundPlane.position.set( 0, -1, 0 );
			groundPlane.castShadow = true;
			groundPlane.receiveShadow = true;
			scene.add( groundPlane );

			var helper = new THREE.BoxHelper( groundPlane );
			helper.material.color.setRGB( 1, 0, 1 );
			scene.add( helper );

		}
	} 

	VH.updateObjectGeometryByHashParameters = function( object, parameters ) {

		if ( !object ) { return; }

		if ( parameters.indexOf( 'random' ) > -1 ) {

			object.position.set ( 80 * Math.random() - 40, 50 * Math.random() + 25 , 80 * Math.random() - 40 );
			object.rotation.set( Math.PI * Math.random(), Math.PI * Math.random(), 0 );

		}

		var parameter, value;

		for ( var i = 0, len = parameters.length; i < len; i++) {

			parameter = parameters[i].substr( 0, 2 );
			value = parseFloat( parameters[i].substr( 3 ) );

			if ( parameter === 'px' ) object.position.x = value;
			if ( parameter === 'py' ) object.position.y = value;
			if ( parameter === 'pz' ) object.position.z = value;

			if ( parameter === 'rx' ) object.rotation.x = value;
			if ( parameter === 'ry' ) object.rotation.y = value;
			if ( parameter === 'rz' ) object.rotation.z = value;

			if ( parameter === 'sx' ) object.scale.x = value;
			if ( parameter === 'sy' ) object.scale.y = value;
			if ( parameter === 'sz' ) object.scale.z = value;

			if ( parameter === 'na' ) object.name = parameters[i].substr( 3 );

		}

	};

	VH.addShadowsToMeshesInScene = function( scene ) {

		if ( ! scene ) { return; }

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = true;
				child.receiveShadow = true;
				child.frustumCulled = false;

			}

		} );

	};

	VH.setRandomGradient = function() {

		if ( ! scene ) { return; }

		if ( VH.ifr ) {

			VH.cssBackround = VH.ifr.contentDocument.body.appendChild( document.createElement('style') );

		} else {

//			document.body.appendChild( document.createElement('style') );

			return;

		}

		var col1 = "#" + Math.random().toString(16).slice(2, 8);
		var col2 = "#" + Math.random().toString(16).slice(2, 8);
		var col3 = "#" + Math.random().toString(16).slice(2, 8);
		var X = ( Math.random() * window.innerWidth ).toFixed(0);
		var Y = ( Math.random() * window.innerHeight ).toFixed(0);
		var center =  20 + ( Math.random() * 60 ).toFixed(0);

		VH.cssBackround.innerText = 'body { ' +
			'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
		'';

		//airDoodle = true;

	};
