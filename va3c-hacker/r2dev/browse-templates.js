	var contents;

	browseTemplates();

	function browseTemplates() {

		location.hash = '';

		displayMarkdown( './browse-templates.md', info );

		VH.loadScript( 'load-file-html-by-contents.js' );

	}


	function getContentsHTML() {

		var txt = '';

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
//				msg2.innerHTML = contents;

				msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + 
				' type: ' + file.type + ' modified: ' + file.lastModifiedDate +
				'';

				timeLastModified = file.lastModified;

				loadFileHTML( contents, '#na=objectToMonitor' );

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

