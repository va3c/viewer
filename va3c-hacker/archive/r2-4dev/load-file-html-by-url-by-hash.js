
	parameters = location.hash.split('#');

//	fileName = parameters[2];

	parameters.shift();

//	VH.loadFileHTMLByURL( fileName, function() { console.log( 'got hereeeeee' ), menuLeft.style.display = ''; } );

	VH.dispatchFileByURL ( parameters );
