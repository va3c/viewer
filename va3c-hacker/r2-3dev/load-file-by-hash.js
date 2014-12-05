
	loadFileByHash( location.hash );

	function loadFileByHash( parameters ) {

		if ( !parameters ) return;

		parameters = parameters.split( '#' );

		if ( !parameters[ 2 ] ) { return; }

		fileName = parameters[ 2 ];

		location.hash = '';

		data = VH.requestFile( fileName );
 
		loadFileByContents( data, fileName, parameters )

	}


