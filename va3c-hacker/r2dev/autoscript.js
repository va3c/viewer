
	var container, menu, info, inworld;
//	var callbackIframeDefault = function () { console.log( 'callbackIframeDefault' ); };
	var callbackIframeDefault = function () {};
	var callbackIframe = callbackIframeDefault;

	var app;
	var THREE;
	var renderer;
	var scene
	var camera;
	var controls;

	autoScript();

	function autoScript () {

		if ( !container ) {

			var tooltip = 'Helping you to stand on the shoulders of giants';

			var css = document.body.appendChild( document.createElement('style') );
			css.innerHTML = 'body { font: 600 12pt monospace; margin: 0; overflow: hidden; }' +
				'h1 { margin: 0; }' +
				'h1 a {text-decoration: none; }' +
			'';

			container = document.body.appendChild( document.createElement( 'div' ) );

			menu = container.appendChild( document.createElement( 'div' ) );
			menu.style.cssText = 'background-color: #ccc; max-height: ' + ( window.innerHeight - 60 ) + 'px ; opacity: 0.9; overflow: auto; padding: 10px; ' +
				' position: absolute; right: 20px; top: 20px; width: 400px;  z-index: 20;' +
			'';

			menu.id = 'movable';
			menu.title = 'Move this menu panel around the screen or iconize it';
			menu.addEventListener( 'mousedown', mouseMove, false );
			menu.header = '<h1><a id=closerIcon href=JavaScript:toggleMenu(menu); title="' + tooltip + '" >&#9776;</a><h1>' +
				'<h1>' +
					'<a href="" title="' + tooltip + '" >' + document.title + '</a> ' +
				'</h1>' +
				'<hr>' +
			'';

			window.addEventListener( 'mouseup', mouseUp, false);

			info = container.appendChild( document.createElement( 'div' ) );
			info.style.cssText = 'background-color: #ccc; display: none; left: 20px; max-height: ' + ( window.innerHeight - 150 ) + 'px ; opacity: 0.9; overflow: auto; ' +
				'padding: 10px; position: absolute; resize: both; top: 80px; width: 450px; z-index: 20;' +
			'';
			info.id = 'movable';
			info.title = 'Move this menu panel around the screen or iconize it';
			info.addEventListener( 'mousedown', mouseMove, false );
			info.header = 
				'<h1><a id=closerIcon href=JavaScript:toggleMenu(info); >&#9776;</a></h1>' +
			'';

			inworld = document.body.appendChild( document.createElement( 'div' ) );
			inworld.style.cssText = 'padding: 10px; position: absolute; max-width: 450px; z-index: 10;';
			inworld.header = //'<a href="" ><h1>' + document.title + '</h1></a>' +
				'<div id=msg ></div>' +
				'<div id=msg1 ></div>' +
				'<div id=msg2 ></div>' +
				'<div id=msg3 ></div>' +
			'';
			inworld.innerHTML = inworld.header;

			displayMarkdown( 'autoscript.md', menu );

		}

	}

	function displayMarkdown ( fname, panel ) {

		var converter = new Showdown.converter();

		panel.innerHTML = panel.header + converter.makeHtml( requestFile( fname ) );
		panel.style.display = '';

	}
 
	function requestFile ( fileName ){

		var xmlHttp = new XMLHttpRequest ();
		xmlHttp.open( 'GET', fileName, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;

	}

	function mouseUp() {

		window.removeEventListener('mousemove', divMove, true);

	};

	 function mouseMove( event ){

		if ( event.target.id === 'movable' ) {
			event.preventDefault();

			offsetX = event.clientX - event.target.offsetLeft;
			offsetY = event.clientY - event.target.offsetTop;

			window.addEventListener('mousemove', divMove, true);
		}

	};

	function divMove( event ){

		event.target.style.left = ( event.clientX - offsetX ) + 'px';
		event.target.style.top = ( event.clientY - offsetY ) + 'px';

	};

	toggleMenu = function ( panel ) {

		var toggle = panel.children[1].style.display === 'none' ? '' : 'none';
		for (var i = 1; i < panel.children.length; i++) {
			panel.children[i].style.display = toggle;
		}

	};

	VH.updateObjectGometryByHashParameters = function( object, parameters ) {

		if ( parameters.indexOf( 'random' ) > -1 ) {

			object.position.set ( 50 * Math.random() - 25, 50 * Math.random(), 50 * Math.random() - 25 );
			object.rotation.set( Math.PI * Math.random(), Math.PI * Math.random(), 0 );

		} else {

			for ( var i = 3, len = parameters.length; i < len; i++) {

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
		}
	}

	VH.addShadowsToMeshesInScene = function( scene ) {

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = true;
				child.receiveShadow = true;
				child.frustumCulled = false;
			}

		} );
	}