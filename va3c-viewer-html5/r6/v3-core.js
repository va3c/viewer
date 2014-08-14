	var V3 = {} || V3;

	V3.titleBase = document.title;

	V3.init = function () {
console.log( 'parseHref' );

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
		basepath = V3MH.basepath + '/' + V3MH.files[ item ][ 0 ] + '/';
		fileName = V3MH.files[ item ][ 0 ] + '.html';
		src =  basepath + fileName;
		name = V3MH.files[ item ][ 1 ];
		V3PL.buildBundle( src, 1, name );

		JAFO.openBundles( V3PL.bundles );
	};

	V3.getAutoCrapdoodle = function () {

		V3PL.getAutoCrapdoodle();
		location.hash = 'autocrapdoodle';

		JAFO.openBundles( V3PL.bundles );
	};

	V3.getPermalinkBundles = function () {
		var hashes, defaults, src, name;
		var items, item, basepath, fileName;

		hashes = decodeURIComponent( location.hash );  // because goo.gl encodes hashes
		hashes = hashes.split('&');

		V3PL.bundles = [];
		V3PL.bundles.push( V3PL.setDefaults( V3PL.defaultScene ) );

		for ( var i = 0; i < hashes.length; i++ ) {
			defaults = V3PL.setDefaults( V3PL.defaultObject );
			items = hashes[i].slice(1).split( '#' );
			for ( var j = 0; j < items.length; j++ ) {
				item = items[j].split( '=' );
				if ( item[0] === 'mat' || item[0] === 'tmpl' || item[0] === 'src' ) {
					defaults[ item[0] ] = item[1];
				} else {
					defaults[ item[0] ] = parseFloat( item[1] );
				}
			}
			V3PL.bundles.push( defaults );
		}

		JAFO.openBundles( V3PL.bundles );

	}
