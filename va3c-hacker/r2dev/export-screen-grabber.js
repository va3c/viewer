

	var image, imageSize, imageHeight, imageWidth;
	var imageSizes = [
		'1024 x 1024','1024 x 768','1024 x 512','800 x 600','640 x 480','600 x 600','512 x 512','512 x 256',
		'480 x 480','480 x 320','384 x 384','320 x 240','256 x 256', '128 x 128', '64 x 64'
	];
	var contents;
	var canvas;

	exportScreenGrabber();

	function exportScreenGrabber() {

		location.hash = '';

		displayMarkdown( './export-screen-grabber.md', info );

		VH.loadScript( 'http://jaanga.github.io/libs/fs/Blob.js' );
		VH.loadScript( 'http://jaanga.github.io/libs/fs/canvas-toBlob.js ' );
		VH.loadScript( 'http://jaanga.github.io/libs/fs/FileSaver.js' );

		init();

	}

	function init() {

		inworld.style.cssText += 'padding-top: 0px; max-width:100%; ';
		inworld.innerHTML = '<p>' +
			'1. <input type=file id=inpFile onchange=openFile() > ' +
			'2. Select a size <select id=selSize onchange=updateSize() ></select> ~ ' +
				'width: <input type=number id=sizeWidth style=width:50px; min=1 /> ' +
				'height: <input type=number id=sizeHeight style=width:50px; min=1 /> ~ ' +
			'3. <a href=JavaScript:grabIt(); >Grab It</a> ~ ' +
			'4. <a href=JavaScript:saveIt(); >Save it</a>' +
		'</p>';

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

		sizeWidth.value = imageWidth;
		sizeHeight.value = imageHeight;

		if ( contents ) {
			addIframe( contents )
		}

	}

	function addIframe( contents, parameters ) {

		var iframes = document.getElementsByTagName( 'iframe' ) ;
		var canvases = document.getElementsByTagName( 'canvas' ) ;

		for ( var i = 0, len = iframes.length; i < len; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );
			canvases[0].parentNode.removeChild( canvases[ 0 ] );

		}

		ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		ifr.style.cssText = 'border-width: 1px; margin-left: 19px; margin-top: 50px;';
		ifr.width = sizeWidth.value; // window.innerWidth;
		ifr.height = sizeHeight.value; //window.innerHeight;

		ifr.onload= function() {

			location.hash = '';

			app = ifr.contentWindow;
			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			camera = app.camera;
			controls = app.controls;
			material = app.material;

			if ( parameters && parameters.indexOf( 'displayInfo' ) > -1 ) { 

				info.style.display = ''; 

			 } else {

				info.style.display = 'none'; 

			}

			callbackIframe();

		}

		ifr.srcdoc = contents;

		canvas = document.body.appendChild( document.createElement( 'canvas' ) );
		canvas.style.cssText = 'border: 2px #000 solid; margin: 0 10px;';
		canvas.width = ifr.width;
		canvas.height = ifr.height;
		context = canvas.getContext( '2d' );

	}

	function openFile() {

		file = inpFile.files[ 0 ];

		var reader = new FileReader();

		reader.onload = function ( event ) {

			contents = reader.result;

			re = /antialias: true/gi;
			mat = contents.match( re );
//console.log( mat );
			str = 'antialias: true, preserveDrawingBuffer: true' ;

			contents = contents.replace( re, str );

			addIframe( contents ) ;

		};

		reader.readAsText( file );

	}

	function grabIt() {

		image = new Image();

		image.onload = function() {

			context.clearRect ( 0, 0, imageWidth, imageHeight);
			context.drawImage( image, 0, 0 );

		};

		image.src = ifr.contentWindow.renderer.domElement.toDataURL('image/png');

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