console.log( 'Hello, world!');

	cons = document.body.appendChild( document.createElement( 'div' ) );
	cons.style.cssText = 'background-color: #ccc; opacity: 0.9; overflow: auto; padding: 10px; ' +
		'height: 500px; position: absolute; right: 20px; top: 20px; width: 400px; ';
	cons.innerHTML = 'console' +

	'';

	JA.toggleTab( JAPR.Preferences );
	JAPR.Preferences.scrollIntoView( true )