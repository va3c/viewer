
	browseRevitJson4Files ();

	function browseRevitJson4Files () {

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-skybox.html#displayInfo';

		}

		displayMarkdown ( 'browse-revit-json4-files.md', info );

//console.log( 'browseRevitJson4Files:' );

	}
