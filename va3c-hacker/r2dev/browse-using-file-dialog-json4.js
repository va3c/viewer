// 2014-11-23 ~ Theo Armour ~ MIT License

	var timeLastModified;

	browseUsingFileDialogJSON4();

	function browseUsingFileDialogJSON4() {

		location.hash = '';

		displayMarkdown( 'browse-using-file-dialog-json4.md', info );

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-basic.html#displayInfo';

			callbackIframe = function() {

				VH.loadScript( 'load-file-json4-by-contents.js', callbackBrowseUsingFileDialogJSON4() );

//console.log( 'callbackIframe browseUsingFileDialogJSON4:' );

			}

		} else {

				VH.loadScript( 'load-file-json4-by-contents.js' );

		}
	}

	function callbackBrowseUsingFileDialogJSON4 () {

		callbackIframe = callbackIframeDefault;

//console.log( 'callbackBrowseUsingFileDialogJSON4' );

	}

	function getFileToMonitor() {

		var txt = '';

		if ( 'files' in inpFileToMonitor ) {

			if ( inpFileToMonitor.files.length == 0 ) {

				txt = 'Select one or more files.';

			} else {

				for (var i = 0, len = inpFileToMonitor.files.length; i < 1; i++) {

					txt += ( i + 1 ) + '. ';

					file = inpFileToMonitor.files[ i ];

					if ('name' in file) {

						txt += "name: " + file.name + "<br>";

					}

					if ('size' in file) {

						txt += "size: " + file.size + " bytes <br>";

					}

			var reader = new FileReader();

			reader.onload = function ( event ) {

				output = reader.result;
//				msg2.innerHTML = output;

				msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + 
				' type: ' + file.type + ' modified: ' + file.lastModifiedDate +
				'';

				timeLastModified = file.lastModified;

				loadFileJSON4Contents( output, '#na=objectToMonitor' );

			};

			reader.readAsText( file );

//console.log( 'file:' + file );

				}

			}

		} else {

			if (x.value == "") {

				txt += 'Select one or more files.';

			} else {

				txt += 'The files property is not supported by your browser!';
				txt += '<br>The path of the selected file: ' + inpFileToMonitor.value; // If the browser does not support the files property, it will return the path of the selected file instead. 

			}

		}

		msg1.innerHTML = txt;

	}

