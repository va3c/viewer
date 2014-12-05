
	VH.getContentsHTMLZZZZ = function() {

		var file, txt = '';

		if ( 'files' in inpTemplate ) {

			if ( inpTemplate.files.length == 0 ) {

				txt = 'Select one or more files.';

			} else {

				for (var i = 0, len = inpTemplate.files.length; i < 1; i++) {

					txt += ( i + 1 ) + '. ';

					file = inpTemplate.files[ i ];

					if ('name' in file) {

						txt += "name: " + file.name + "<br>";

					}

					if ('size' in file) {

						txt += "size: " + file.size + " bytes <br>";

					}

			var reader = new FileReader();

			reader.onload = function ( event ) {

				contents = reader.result;

				msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + 
				' type: ' + file.type + ' modified: ' + file.lastModifiedDate +
				'';

				timeLastModified = file.lastModified;

				function callback() {

					menuLeft.style.display = 'none';

				}

				VH.loadFileHTMLbyContents( contents, '#na=objectToMonitor', callback );

			};

			reader.readAsText( file );

//console.log( 'file:' + file );

				}

			}

		} else {

			if ( x.value == "") {

				txt += 'Select one or more files.';

			} else {

				txt += 'The files property is not supported by your browser!';
				txt += '<br>The path of the selected file: ' + inpFileToMonitor.value; // If the browser does not support the files property, it will return the path of the selected file instead. 

			}

		}

		msg1.innerHTML = txt;

	}



	VH.loadFileHTMLbyContentsXXXXXXXXXXXX = function( contents, parameters, callback  ) {

		var callback = callback ? callback : function () {} ;

		var parameters = parameters || 'nothing';

		parameters = parameters.split('#');

		var iframes = document.getElementsByTagName( 'iframe' ) ;

		for ( var i = 0, len = iframes.length; i < len; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );

		}

		ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		ifr.height = window.innerHeight;
		ifr.width = window.innerWidth;
		ifr.style.cssText = 'border-width: 0; position: absolute; z-index: -10; ';

		ifr.onload = function() {

			app = ifr.contentWindow;
			THREE = app.THREE;
			renderer = app.renderer;
			scene = app.scene;
			camera = app.camera;
			controls = app.controls;
			material = app.material;

			callback();

		}

		ifr.srcdoc = contents;

//console.log( 'loadFileHTML', parameters, fileName );

	}

	