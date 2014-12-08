
	var parameters = location.hash.split('#');

	parameters.shift();

	menuLeft.style.display = 'none';

	if ( app && app.menuLeft ) app.menuLeft.style.display = 'none';

	VH.dispatchFileByURL( parameters );
