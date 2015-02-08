
	VH.loadFileMD = function( url, parameters ) {

		parameters = parameters ? parameters : 'none';

		var iframes = document.getElementsByTagName( 'iframe' );

		for ( var i = 0, len = iframes.length; i < len; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );

		}

		VH.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		VH.ifr.width = window.innerWidth;
		VH.ifr.height = window.innerHeight;
		VH.ifr.style.cssText = 'border-width: 0; position: absolute;';

		VH.ifr.onload = function() {

		};
//urll = "readme.md" ;

		var srcdoc = 
			"<div id=doc >" +

			"<script src=http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js ><\/script>" +

			"<script>" +

			"	var xmlHttp;" +

			"	var converter = new Showdown.converter();" +

			"	doc.style.cssText = 'font: bold 12pt monospace; max-width: 900px';" +

			"	var info = doc.appendChild( document.createElement( 'div' ) );" +

			"	requestFile( '" + url + "' );" +

			"	function callback() {" +

			"		text = xmlHttp.responseText;" +
			"		text = converter.makeHtml( text );" +
			"		info.innerHTML = text;" +

			"	}" +

			"	function requestFile( fileName ) {" +

			"		xmlHttp = null;" +
			"		xmlHttp = new XMLHttpRequest();" +
			"		xmlHttp.open( 'GET', fileName, true );" +
			"		xmlHttp.onreadystatechange = callback;" +
			"		xmlHttp.send( null );" +

			"	}" +

			"<\/script>"
			"<\/div>"
		"";

		VH.ifr.srcdoc = srcdoc;

	};