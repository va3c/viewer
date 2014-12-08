
	var parameters = location.hash.split('#');

	parameters.shift();

	VH.dispatchFileByURL( parameters );
