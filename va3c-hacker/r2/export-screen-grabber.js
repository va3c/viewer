
	var image, imageSize, imageHeight, imageWidth;
	var imageSizes = [
		'1024 x 1024','1024 x 768','1024 x 512','800 x 600','640 x 480','600 x 600','512 x 512','512 x 256',
		'480 x 480','480 x 320','384 x 384','320 x 240','256 x 256', '128 x 128', '64 x 64'
	];
	var templateItem, templates = [
		['lights-shadows','template-lights-shadows-preserve-drawing-buffer.html'],
		['skybox','template-skybox-preserve-drawing-buffer.html']
	]
	var contents;
	var url;
	var canvas;
	var context;
	var fileName;

	var parameters = [];

	init();

	function init() {

		msg.innerHTML = '<p>' +
			'<p>1a. Paste link <input type=text id=inpURL style=width:600px; onchange=openURL(); /> <button onclick=openURL() >Open</button> ' +
			'1b. <input type=file id=inpFile onchange=openFile(this) >' +
			'Scale: <input type=number id=inpScale step=1 value=5 style=width:3em; /><p>' +
			'2. Select a template <select id=selTemplate onchange=updateTemplate() ></select> ' +
			'3. Select a size <select id=selSize onchange=updateSize() ></select> ~ ' +
				'width: <input type=number id=sizeWidth style=width:50px; min=1 /> ' +
				'height: <input type=number id=sizeHeight style=width:50px; min=1 /> ~ ' +
			'4. <a href=JavaScript:grabIt(); >Grab It</a> ~  ' +
			'5.<a id=download href=# onclick=downloadIt(); >Save It</a>' +
		'</p>' +
		'<div id=msg ></div>' +
		'<div id=msg1 ></div>' +
		'<div id=msg2 ></div>' +
		'<div id=msg3 ></div>' +
	'';

		for ( var i = 0, len = templates.length; i < len; i++ ) {

			opt = selTemplate.appendChild( document.createElement( 'option' ) );
			opt.text = templates[ i ][0];

		}
		selTemplate.selectedIndex = 1;

		for ( var i = 0, len = imageSizes.length; i < len; i++ ) {

			opt = selSize.appendChild( document.createElement( 'option' ) );
			opt.text = imageSizes[ i ];

		}

		selSize.selectedIndex = 4;

		updateSize();

		updateTemplate();

	}

	function downloadIt() {

//		var name = fileName.substr( 1 + fileName.lastIndexOf( '/' ) );

		var slash = navigator.platform === "Win32" ? '\\' : '/' ;

		var name = fileName.substr( 1 + fileName.lastIndexOf( slash ) );

console.log( fileName, name )

		name = name.replace(/\.html|\.json|\.js|\.obj|\.stl/gi,'-') + imageSize.replace( / /gi,'' ) + '.png';

		var c2du = canvas.toDataURL(); 

		download.download = name;

		download.href = c2du;

	}

	function updateTemplate() {

		templateItem = templates[ selTemplate.selectedIndex ];

	}

	function updateSize() {

		imageSize = imageSizes[ selSize.selectedIndex ];
		imageWidth = parseInt( imageSize.substr( 0, imageSize.indexOf(' x ') ), 10 );
		imageHeight = parseInt( imageSize.substr( imageSize.indexOf(' x ') + 3 ), 10);
		css = 'border-width: 1px; margin-left: 19px; margin-top: 100px;';

		sizeWidth.value = imageWidth;
		sizeHeight.value = imageHeight;

		callback = function(){};

		if ( contents ) {

			openFile();

		} else if ( url ) {

			openURL();

		} else {

			VH.loadFileHTMLByContents( '<p>Content will appear here...<p><p>And menu will be hidden...', parameters, callback, imageWidth, imageHeight, css );

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

	function openURL() {

//console.log( inpURL, inpURL.value );

		VH.dispatchFileByURL( parameters );

		template = '../../va3c-hacker/templates/' + templateItem[1];

		callback = function() {}; //  template = currentTemplate; }
		
		fileName = url = inpURL.value;

		var scale = parseFloat( inpScale.value );

		parameters = '#' + url + '#sx=' + scale + '#sy=' + scale + '#sz=' + scale;

		parameters = parameters.split( '#' );

		var fileType = url.toLowerCase().substr( url.lastIndexOf( '.' ) );

		if ( fileType === '.html' || fileType === '.htm' ) {

				var contents = VH.requestFile( url );

				re = /antialias: true/gi;

				mat = contents.match( re );

//console.log( mat );

				str = 'antialias: true, preserveDrawingBuffer: true' ;

				contents = contents.replace( re, str );

				VH.ifr.onload = function() {

					VH.updateSceneVariables();

					VH.updateSceneElements();

					callback();

				};

				VH.ifr.srcdoc = contents;

			} else if ( fileType === '.json' || fileType === '.js' ) {

				VH.loadFileHTMLByURL( template, parameters, function() {

					VH.updateSceneVariables();

					VH.loadFileJSONbyURL( parameters, VH.updateSceneElements );

					callback();

				}, imageWidth, imageHeight, css );

			} else if ( fileType === '.obj' ) {

				VH.loadFileHTMLByURL( template, parameters, function() {

					VH.updateSceneVariables();

					VH.loadFileOBJByURL( parameters, VH.updateSceneElements );

					callback();

				}, imageWidth, imageHeight, css );


			} else if ( fileType === '.stl' ) {

				VH.loadFileHTMLByURL( template, parameters, function() {

					VH.updateSceneVariables();

					VH.loadFileSTLByURL( parameters, VH.updateSceneElements );

					callback();

				}, imageWidth, imageHeight, css );


			} else {

				alert( fileType + ': as yet unhandled file type...' );

			}

		menuLeft.style.display = 'none';

		if ( app && app.menuLeft ) app.menuLeft.style.display = 'none';


	}


	function openFile() {

		file = inpFile.files[ 0 ];

		fileName = file.name;

		currentTemplate = template;

		template = '../../va3c-hacker/templates/' + templateItem[1];

		callback = function() {}; //  template = currentTemplate; }

		var scale = parseFloat( inpScale.value );

		parameters = '#' + fileName + '#sx=' + scale + '#sy=' + scale + '#sz=' + scale;

		parameters = parameters.split( '#' );

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

					VH.updateSceneVariables();

					VH.updateSceneElements();

					callback();

				};

				VH.ifr.srcdoc = contents;

			} else if ( fileType === '.json' || fileType === '.js' ) {

				VH.loadFileHTMLByURL( template, parameters, function() {

					VH.updateSceneVariables();

					VH.loadFileJSONByContents( contents, parameters, VH.updateSceneElements );

					callback();

				}, imageWidth, imageHeight, css );

			} else if ( fileType === '.obj' ) {

				VH.loadFileHTMLByURL( template, parameters, function() {

					VH.updateSceneVariables();

					VH.loadFileOBJByContents( contents, parameters, VH.updateSceneElements );

					callback();

				}, imageWidth, imageHeight, css );

			} else if ( fileType === '.stl' ) {

				VH.loadFileHTMLByURL( template, parameters, function() {

					VH.updateSceneVariables();

					VH.loadFileSTLByContents( contents, parameters, VH.updateSceneElements );

					callback();

				}, imageWidth, imageHeight, css );

			} else {

				alert( file.name + ': as yet unhandled file type...' );

			}

		};


		if ( reader.readAsBinaryString !== undefined ) {

			reader.readAsBinaryString( file );

		} else {

			reader.readAsArrayBuffer( file );

		}

		menuLeft.style.display = 'none';

		if ( app && app.menuLeft ) app.menuLeft.style.display = 'none';


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


