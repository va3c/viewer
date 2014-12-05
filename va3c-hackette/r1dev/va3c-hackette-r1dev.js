	var VHR = VHR || {};

	var container, menuLeft, menuRight, inworld;
	var app;
	var THREE;
	var renderer;
	var scene;
	var camera;
	var controls;

	VHR.init = function () {
 
		var parameters = location.hash.split ( '#' );

		if ( parameters.length > 2 ) {

				VHR.dispatchFile( parameters );

		}

		VHR.buildUserInterface();

		window.addEventListener ( 'hashchange', VHR.init, false );

	};

	VHR.dispatchFile = function( parameters )  {

		var fileName = parameters[1].toLowerCase();

		var fileType = fileName.substr( fileName.lastIndexOf( '.' ) );

		if ( fileType === '.html' || fileType === '.htm' ) {

			VHR.loadFileHTMLByURL( fileName, function(){

				msg.innerHTML = 'File: ' + fileName + '<br>';

			} );

		} else if ( fileType === '.js' || fileType === '.json' ) {

			if ( fileName === 'export-screen-grabber.js' ) {

				VHR.loadScript( fileName );

			} else {

				VHR.loadFileJSONbyURL( parameters );

			}

		} else if ( fileType === '.obj' ) {

			VHR.loadFileOBJByURL( parameters );

		} else if ( fileType === '.stl' ) {

			VHR.loadFileSTLByURL( parameters );

		}

//		location.hash = '';


	};

	VHR.buildUserInterface = function() {

		if ( !container ) {

			var tooltip = 'Helping you to stand on the shoulders of giants';

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
			menuRight.addEventListener( 'mousedown', VHR.mouseMove, false );
			menuRight.header = '<h1><a id=closerIcon href=JavaScript:VHR.toggleMenu(menuRight); title="' + tooltip + '" >&#9776;</a><h1>' +
				'<h1>' +
					'<a href="" title="' + tooltip + '" >' + document.title + '</a> ' +
				'</h1>' +
				'<hr>' +
			'';

			menuLeft = container.appendChild( document.createElement( 'div' ) );
			menuLeft.style.cssText = 'background-color: #ccc; display: none; left: 20px; max-height: ' + ( window.innerHeight - 120 ) + 'px ;' +
				'opacity: 0.9; overflow: auto; padding: 10px; position: absolute; resize: both; top: 80px; width: 400px; z-index: 20;' +
			'';
			menuLeft.id = 'movable';
			menuLeft.title = 'Move this menu panel around the screen or iconize it';
			menuLeft.addEventListener( 'mousedown', VHR.mouseMove, false );
			menuLeft.header = 
				'<h1><a id=closerIcon href=JavaScript:VHR.toggleMenu(menuLeft); >&#9776;</a></h1>' +
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

			window.addEventListener( 'mouseup', VHR.mouseUp, false);

		}

	};

	VHR.displayMarkdown = function( fname, panel ) {

		var converter = new Showdown.converter();

		panel.innerHTML = panel.header + converter.makeHtml( VHR.requestFile( fname ) );

		panel.style.display = '';

	};
 
	VHR.mouseUp = function() {

		window.removeEventListener('mousemove', VHR.divMove, true);

	};

	VHR.mouseMove = function( event ){

		if ( event.target.id === 'movable' ) {

			event.preventDefault();

			offsetX = event.clientX - event.target.offsetLeft;
			offsetY = event.clientY - event.target.offsetTop;

			window.addEventListener('mousemove', VHR.divMove, true);

		}

	};

	VHR.divMove = function( event ){

		event.target.style.left = ( event.clientX - offsetX ) + 'px';
		event.target.style.top = ( event.clientY - offsetY ) + 'px';

	};

	VHR.toggleMenu = function ( panel ) {

		var toggle = panel.children[1].style.display === 'none' ? '' : 'none';
		for (var i = 1; i < panel.children.length; i++) {
			panel.children[i].style.display = toggle;
		}

	};

	VHR.requestFile = function( fileName ){

		var xmlHttp = new XMLHttpRequest ();
		xmlHttp.open( 'GET', fileName, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;

	};

	VHR.loadScript = function ( fileName, callback ) {

		var callback = callback ? callback : function () {} ;

		var js = document.body.appendChild ( document.createElement( 'script' ) );

		js.onload = callback();

		js.setAttribute ( 'src', fileName );

	};

	VHR.updateObjectGometryByHashParameters = function( object, parameters ) {

		if ( parameters.indexOf( 'random' ) > -1 ) {

			object.position.set ( 80 * Math.random() - 40, 50 * Math.random() + 25 , 80 * Math.random() - 40 );
			object.rotation.set( Math.PI * Math.random(), Math.PI * Math.random(), 0 );

		}

		if (parameters.indexOf( 'noBackground' ) === -1 ) {

			VHR.setRandomGradient();

		}

		if ( parameters.indexOf( 'noGrid' ) === -1 ) {

			var helper = new THREE.GridHelper( 100, 10 );
			scene.add( helper );

		}

		if ( parameters.indexOf( 'noAxis' ) === -1 ) {

			var axis = new THREE.AxisHelper( 100 );
			scene.add( axis );

		}

		if ( parameters.indexOf( 'noGround' ) === -1 ) {

			var geometry = new THREE.BoxGeometry( 200, 2, 200 );
			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(), 
				ambient: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 5
			} );

			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0, -1, 0 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );

			var helper = new THREE.BoxHelper( mesh );
			helper.material.color.setRGB( 1, 0, 1 );
			scene.add( helper );

		}

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

	VHR.addShadowsToMeshesInScene = function( scene ) {

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = true;
				child.receiveShadow = true;
				child.frustumCulled = false;
			}
		} );
	};

	VHR.setRandomGradient = function() {

		VHR.cssBackround = VHR.ifr.contentDocument.body.appendChild( document.createElement('style') );
		var col1 = "#" + Math.random().toString(16).slice(2, 8);
		var col2 = "#" + Math.random().toString(16).slice(2, 8);
		var col3 = "#" + Math.random().toString(16).slice(2, 8);
		var X = ( Math.random() * window.innerWidth ).toFixed(0);
		var Y = ( Math.random() * window.innerHeight ).toFixed(0);
		var center =  20 + ( Math.random() * 60 ).toFixed(0);

		VHR.cssBackround.innerText = 'body { ' +
			'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
		'';

	};