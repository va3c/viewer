
	var image, imageSize, imageHeight, imageWidth;
	var imageSizes = [
		'1024 x 1024','1024 x 768','1024 x 512','800 x 600','640 x 480','600 x 600','512 x 512','512 x 256',
		'480 x 480','480 x 320','384 x 384','320 x 240','256 x 256', '128 x 128', '64 x 64'
	];
	var contents;
	var canvas;
	var context;

	exportScreenGrabber();

	function exportScreenGrabber() {

		VH.loadScript( 'http://jaanga.github.io/libs/fs/Blob.js' );
		VH.loadScript( 'http://jaanga.github.io/libs/fs/canvas-toBlob.js ' );
		VH.loadScript( 'http://jaanga.github.io/libs/fs/FileSaver.js' );

		init();

	}

	function init() {

		msg.innerHTML = '<p>' +
			'1. <input type=file id=inpFile onchange=openFile(this) > ' +
			'2. Select a size <select id=selSize onchange=updateSize() ></select> ~ ' +
				'width: <input type=number id=sizeWidth style=width:50px; min=1 /> ' +
				'height: <input type=number id=sizeHeight style=width:50px; min=1 /> ~ ' +
			'3. <a href=JavaScript:grabIt(); >Grab It</a> ~ ' +
			'4. <a href=JavaScript:saveIt(); >Save it</a>' +
		'</p>' +
		'<div id=msg ></div>' +
		'<div id=msg1 ></div>' +
		'<div id=msg2 ></div>' +
		'<div id=msg3 ></div>' +
	'';

		for ( var i = 0, len = imageSizes.length; i < len; i++ ) {

			opt = selSize.appendChild( document.createElement( 'option' ) );
			opt.text = imageSizes[ i ];

		}

		selSize.selectedIndex = 4;

		updateSize();

	}

	function updateSize() {

		imageSize = imageSizes[ selSize.selectedIndex ];
		imageWidth = parseInt( imageSize.substr( 0, imageSize.indexOf(' x ') ), 10 );
		imageHeight = parseInt( imageSize.substr( imageSize.indexOf(' x ') + 3 ), 10);
		css = 'border-width: 1px; margin-left: 19px; margin-top: 60px;';

		sizeWidth.value = imageWidth;
		sizeHeight.value = imageHeight;

		callback = function(){};

		if ( contents ) {

			VH.loadFileHTMLByContents( contents, callback, imageWidth, imageHeight, css );

		} else {

			VH.loadFileHTMLByContents( '<p>Content will appear here...<p><p>And menu will be hidden...', callback, imageWidth, imageHeight, css );

		}

		var canvases = document.getElementsByTagName( 'canvas' ) ;

		for ( var i = 0, len = canvases.length; i < len; i++ ) {

			canvases[0].parentNode.removeChild( canvases[ 0 ] );

		}

		canvas = document.body.appendChild( document.createElement( 'canvas' ) );
		canvas.style.cssText = 'border: 2px #000 solid; margin: 0 10px;';
		canvas.width = imageWidth;
		canvas.height = imageHeight;
		context = canvas.getContext( '2d' );

	}

	function openFile() {

		file = inpFile.files[ 0 ];

		currentTemplate = template;

		template = '../../va3c-hacker/templates/template-lights-shadows-preserve-drawing-buffer.html';

		callback = function() { template = currentTemplate; }

		var reader = new FileReader();

		reader.onload = function ( event ) {

			contents = reader.result;

			var fileType = file.name.toLowerCase().substr( file.name.lastIndexOf( '.' ) );

			if ( fileType === '.html' ) {

				re = /antialias: true/gi;
				mat = contents.match( re );
	//console.log( mat );
				str = 'antialias: true, preserveDrawingBuffer: true' ;

				contents = contents.replace( re, str );

				VH.ifr.onload = function() {
					app = VH.ifr.contentWindow;

					THREE = app.THREE;
					renderer = app.renderer;
					scene = app.scene;
					camera = app.camera;
					controls = app.controls;
					material = app.material;

					VH.updateSceneByHashParameters();

					VH.addShadowsToMeshesInScene( scene );

					callback();

				};

				VH.ifr.srcdoc = contents;

			} else if ( fileType === '.stl' ) {

				VH.loadFileHTMLByURL( template, function() {

					VH.loadFileSTLByContents( contents );

					VH.updateSceneByHashParameters();

					VH.addShadowsToMeshesInScene( scene );

					template = currentTemplate;

				}, imageWidth, imageHeight, css );

			} else if ( fileType === '.json' || fileType === '.js' ) {

				VH.loadFileHTMLByURL( template, function() {

					contents = JSON.parse( contents );

					VH.loadFileJSONByContents( contents, file.name, 'none' );

					template = currentTemplate;

				}, imageWidth, imageHeight, css );

			}

		};

//		reader.readAsText( file );

		if ( reader.readAsBinaryString !== undefined ) {

			reader.readAsBinaryString( file );

		} else {

			reader.readAsArrayBuffer( file );

		}

		location.hash = '';

	}

	function grabIt() {

		image = new Image();

		image.onload = function() {

			context.clearRect ( 0, 0, imageWidth, imageHeight);
			context.drawImage( image, 0, 0 );

		};

		image.src = VH.ifr.contentWindow.renderer.domElement.toDataURL( 'image/png' );

	}

	function seconds3grabIt() {

		setTimeout(function(){

			grabIt();
			console.log( 'got it');

		}, 3000 );

	}

	function saveIt ( ) {

		var name = file.name.replace(/\.html/,'-') + imageSize.replace( / /gi,'' ) + '.png';

		canvas.toBlob( function( blob ) {

			saveAs( blob, name );

		});

	}