[Markdown]( http://en.wikipedia.org/wiki/Markdown )
[Daring Firball]( http://daringfireball.net/projects/markdown/ )

<small>
<u>[0]</u> = Open in new tab/window  
<u>links</u> = Open inside this viewer
</small>

<details>
<summary><h2></h2></summary>

</details>

<details>
<summary><h2>About</h2></summary>

Credits: [three.js]( http://threejs.org "Thank you, Mr.doob" ) ~ [webgl]( http://khronos.org/webgl/  "Thank you, Ken" ) ~ [GitHub]( http://GitHub.com )

copyright © 2015 XXX authors ~ MIT license

</details>

<style>#hh { color: #f00; display:inline; margin: 0; padding: 0; }</style>
<style>img { width: 375px; } </style>


[Developer Notes]( #dev-notes.md# )  
[GitHub  web page]( http://va3c.github.io/viewer/va3c-hacker-cookbook/view-file-json4-revit-hackathon-by-url/ "view the files as apps." ) <input value="<< You are here" size=15 style="font:bold 11pt monospace;border-width:0;" >  
[GitHub source code]( https://github.com/va3c/viewer/tree/gh-pages/va3c-hacker-cookbook "View files with GitHub" ) <scan style=display:none ><< You are here</scan>  
[vA3C Hacker Home]( http://va3c.github.io/viewer/va3c-hacker/ )  
[vA3C GitHub Home Page]( #../../../index.html# )   
[vA3C Viewer R1]( #../../index.html# )  



		loadMarkdownInMenu( 'readme.md', menu );

		loadSTLInIframe( '#./stl/' + file[0] + '#axis#gradient#grid#ground#random#' );


	function slideMenu(){

		header.style.left = header.style.left === '20px' ? '350px' : '20px';

	}



	function onHashChange() {

		hashes = location.hash.split ( '#' );

		if ( hashes.length < 1 ) { return; } 

		var fileName = hashes[ 1 ].toLowerCase();

		var fileType = (fileName.substr( fileName.lastIndexOf( '.' )).toLowerCase() );

		if ( fileType === '.html' || fileType === '.htm' ) {

			loadHTMLInIframe( location.hash );

		} else if ( fileType === '.md' ) {

			loadMarkdownInIframe( location.hash );

		} else if ( fileType === '.json' || fileType === '.js' ) {

			loadJSONInIframe( location.hash );

		}

	}



	function loadJSONInIframe( hash, callback ) {

		var hashes = hash.split ( '#' );

		add = hashes.indexOf( 'add=true' ) === -1 ? false : true;

		if ( !ifr || add === false ) {

			loadThreeJSInIframe( hash, callback );

		} else {

			ifr.contentWindow.loadFileJSON( hash, callback );

			history.pushState( '', document.title, window.location.pathname );

		}

		function callback() {

console.log( 'loaded: ', hashes[ 1 ] );

		}

	}

	function loadMarkdownInMenu( fileName, panel ) {

		var converter = new Showdown.converter();

		var xmlHttp = new XMLHttpRequest ();
		xmlHttp.open( 'GET', fileName, true );
		xmlHttp.onreadystatechange = callback;
		xmlHttp.send( null );

		function callback() {

			text = xmlHttp.responseText;

			panel.innerHTML = converter.makeHtml( text );

		}

	}

/*

Using srcdoc means not having to create an extra file.

Yes, quotes are cumbersome - but just for now. ECMA 6 - coming soon - requires quotes only at start and finish 

*/

	function loadMarkdownInIframe( hashes, callback ) {

		ifr = resetIframe( callback );

		var srcdoc =  "<div id=doc ><\/div>" +

			"<script src=http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js ><\/script>" +

			"<script>" +

			"	doc.style.cssText = 'font: bold 12pt monospace; margin-left: 80px; max-width: 900px';" +

			"	var xmlHttp;" +

			"	var converter = new Showdown.converter();" +

			"	requestFile( '" + hashes + "' );" +

			"	function requestFile( fileName ) {" +

			"		xmlHttp = new XMLHttpRequest();" +
			"		xmlHttp.open( 'GET', fileName, true );" +
			"		xmlHttp.onreadystatechange = callback;" +
			"		xmlHttp.send( null );" +

			"	}" +

			"	function callback() {" +

			"		var text = xmlHttp.responseText;" +
			"		text = converter.makeHtml( text );" +
			"		doc.innerHTML = text;" +

			"	}" +

			"<\/script>" +

		"";

		ifr.srcdoc = srcdoc;

		slideMenu(); // to hide

		location.hash = '';

	};


	function resetIframe( callback ) {

		var iframes = document.getElementsByTagName( 'iframe' );

		for ( var i = 0; i < iframes.length; i++ ) {

			iframes[0].parentNode.removeChild( iframes[ 0 ] );

		}

		var ifr = document.body.appendChild( document.createElement( 'iframe' ) );
		ifr.width = window.innerWidth;
		ifr.height = window.innerHeight;
		ifr.style.cssText = 'border-width: 0; position: absolute; z-index: -10';
		ifr.onload = callback || function() {};

		return ifr;

	}
