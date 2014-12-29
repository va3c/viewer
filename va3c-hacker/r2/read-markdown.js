
	displayMarkdown( location.hash );

	function displayMarkdown ( parameters ) {

		if ( !parameters ) return;

		parameters = parameters.split('#');

		var fileName = parameters[2];

//		location.hash = '';

		VH.displayMarkdown( fileName, menuLeft );


	}