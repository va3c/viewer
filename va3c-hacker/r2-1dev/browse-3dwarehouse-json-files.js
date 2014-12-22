
	view3dWarehouseJsonFiles ();

	function view3dWarehouseJsonFiles () {

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html#displayInfo';

		}

		displayMarkdown ( 'browse-3dwarehouse-json-files.md', info );

//console.log( 'view3dWarehouseJsonFiles:' );

	}
