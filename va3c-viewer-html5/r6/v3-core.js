	var V3 = {} || V3;

	V3.titleBase = document.title;

	V3.addLibrariesTab = function() {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'View available libraries';
		tab.innerHTML =
			'<a JA.toggleTab(V3.librariesTab); id=librariesTab ><p class=buttonLibrary >' +
				'<span id=libOpen ><i class="fa fa-chevron-down"></i></span> ' +
				'<span id=libClose style=display:none; ><i class="fa fa-chevron-right"></i></span> ' +
				'<i class="fa fa-thumbs-up"></i>Library Introduction' +
			'</p></a>'; 
		librariesTab.onclick = function() { JA.toggleTab( libOpen ); JA.toggleTab( libClose ); JA.toggleDialogs( V3.librariesTab ); };

		V3.librariesTab = JA.menu.appendChild( document.createElement( 'div' ) );
		V3.librariesTab.style.cssText = 'cursor: auto; display: ""; ' ;
		V3.librariesTab.innerHTML =
			'<p>' +
				'A work in progress. Much broken. ' +
				'Nonetheless <b><i><a href="http://va3c.github.io/viewer/va3c-viewer-html5/r5/va3c-viewer-r5.html#autocrapdoodle" title="launches the \'autocrapdoodle\' feature">some aspects</a></i></b> worth exploring. ' +
			'</p>' +
			'<p>' +
				'<b><a href="http://va3c.github.io/viewer/va3c-viewer-html5/readme-reader.html" title="lots of good stuff here..." target="_blank">Read Me w/ Features, Issues, Road Map</a></b>' +
			'</p>' +
			'<p>' +
				'Click on a blue tab below to access the Library.<br>Key: [O] = Open in new scene<br>' +
			'</p><p>' +
				'Best to keep the <b><a href="http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers" title="Watch the bugs appear..." target="_blank">JavaScript console</a></b> open.' +
			'</p>' +
		'';

	};

	V3.addAboutVa3cTab = function() {

		JA.addAboutTab();

		JA.aboutDialog.style.height = '450px';
		JA.aboutDialog.innerHTML =
			'<h3>' + document.title + ' ' + JA.titleIcon + '</h3>' +
				'<p>View Revit, Rhino/Grasshopper 3DS Max and other model types models in 3D with any web browser using Three.js and data rendered as JSON files.</p>' +
				'<p>This script is an update to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a></p>' +
				'<p>Team Members: Benjamin Howes, Jonatan Schumacher, Jeremy Tammik, Matt Mason, Kevin Vandecar, Charlie Portelli, Josh Wentz, Femi King, Zach Flanders & Theo Armour</p>' +
				'<p>Supporters include: Mostapha Roudsari, Ashley Reed, Anne Waelkens, Jim Quanci, Elcin Ertugrul, Amir Tasbihi and many more. Others?</p>' +
			'<small>' +
				'<a href="http://va3c.github.io/viewer/va3c-viewer-html5/readme-reader.html" target="_blank">Read Me ~</a> ' +
				'<a href="https://github.com/va3c/viewer/tree/gh-pages/va3c-viewer-html5" target="_blank">Source Code ~ </a> ' +
				'Credits: <a href="http://threejs.org" target="_blank">three.js</a> - ' +
				'<a href="http://khronos.org/webgl/" target="_blank">webgl</a> - ' +
				'<a href="http://jaanga.github.io" target="_blank">jaanga</a><br>' +
				'copyright &copy; 2014 vA3C authors ~ MIT license' +
			'</small><br><br>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleDialogs(JA.aboutDialog); >Close</a> ' +
			'</p>' +
		'';

	};


	V3.init = function () {
//console.log( 'parseHref' );

		if ( !location.hash ) { 

			V3.getSplashScreen();

		} else if ( location.hash.toLowerCase().indexOf('auto') >  0 ){
// add more choices...
			V3.getAutoCrapdoodle(); 

		} else {

			V3.getPermalinkBundles ();

		}

	};

	V3.getSplashScreen = function () { // Call a Meier parametric equation
		var items, item, basepath, fileName;

		V3PL.bundles = [];
		V3PL.bundles.push( V3PL.setDefaults( V3PL.defaultScene ) );

		items = [ 1, 11, 12, 14, 33, 42, 54, 58, 62, 131, 151, 155 ];
		item = items[ Math.floor( items.length * Math.random() ) ];
		basepath = V3MH.basepath + V3MH.files[ item ][ 0 ] + '/';
		fileName = V3MH.files[ item ][ 0 ] + '.html';
		src = basepath + fileName;
		name = V3MH.files[ item ][ 1 ];
		V3PL.buildBundle( src, 1, name );

		V3PL.bundles[ 1 ].mat = 'PhongRandom';
		V3PL.bundles[ 1 ].override = true;
		JAFO.openBundles( V3PL.bundles );
	};

	V3.getAutoCrapdoodle = function () {

		V3PL.getAutoCrapdoodle();
		location.hash = 'autocrapdoodle';

	};

	V3.getPermalinkBundles = function () {

		var hashes, defaults, src, name;
		var items, item, basepath, fileName;

		hashes = decodeURIComponent( location.hash );  // because goo.gl encodes hashes
		hashes = hashes.split('&');

		V3PL.bundles = [];
		V3PL.bundles.push( V3PL.setDefaults( V3PL.defaultScene ) );
console.log( 'getPermalinkBundles', hashes );

		for ( var i = 1; i < hashes.length; i++ ) {
			defaults = V3PL.setDefaults( V3PL.defaultObject );
			items = hashes[i].slice(1).split( '#' );
			for ( var j = 0; j < items.length; j++ ) {
				item = items[j].split( '=' );
				if ( item[0] === 'mat' || item[0] === 'name' || item[0] === 'tmpl' || item[0] === 'src' ) {
					defaults[ item[0] ] = item[1];
				} else {
					defaults[ item[0] ] = parseFloat( item[1] );
				}
			}
			V3PL.bundles.push( defaults );
		}

//console.log( 'getPermalinkBundles', V3PL.bundles );
		JAFO.openBundles( V3PL.bundles );

	}
