	var JAPL = [] || JAPL;

// defaults & values all lower case to make editing the URL by hand easier
	JAPL.defaults = {
		camx: 100,
		camy: 100,
		camz: 100,
		mat: 'PhongRandom',
		posx: 0,
		posy: 0,
		posz: 0,
		rotx: 0,
		roty: 0,
		rotz: 0,
		sclx: 1,
		scly: 1,
		sclz: 1,
		tarx: 0,
		tary: 0,
		tarz: 0, 
		tmpl: 'boilerplate-simple.html',
		url: ''
	};
	JAPL.values = {}; // current or runtime updates

	JAPL.things = [];

	JAPL.addPermalinksTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabPermalinks style=cursor:pointer; ><p class=button >' +
				'<i class="fa fa-link"></i> Permalinks...' +
			'</p></a>';
		tabPermalinks.onclick = function() { JAPL.refreshParameters(); JA.toggleTab( JAPL.permalinks ); };

		JAPL.permalinks = tab.appendChild( document.createElement( 'div' ) );
		JAPL.permalinks.style.cssText = 'cursor: auto; display: none; ' ;
	};

	JAPL.refreshParameters = function () {

		var txt =
		'<div>' +

			'<p><small><i><a href="http://en.wikipedia.org/wiki/Permalink" target="_blank">Permalinks</a> enable you to create a scene and save it as a link you can share..</i></small></p>' +

			'<p><a href=JavaScript:JAPL.setPermalinks(); >Set Permalinks</a></p>' +

			'<p><a href=JavaScript:JAPL.parsePermalinks(); >Parse Permalinks</a></p>' +

			'<p><a href=JavaScript:location.hash="autocrapdoodle";JAPL.parsePermalinks(); >Get AUTOcrapdoodle</a></p>' +

			'<p><a href=JavaScript:JAPL.clearPermalink(); >Clear Permalink</a></p>' +

			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(JAPL.permalinks); >Close</a> ' +
			'</p>' +

		'</div>';

		JAPL.permalinks.innerHTML = txt;

	};


	JAPL.getAutoCrapdoodle = function() {
		var items, index
		var mats = [
			'BasicRedFlat','LambertRandomSmooth','NormalFlat','NormalSmooth','NormalWireframe','PhongBlueFlat','PhongBlueRefractPisa','PhongDefault',
			'PhongDefaultReflectDenim','PhongDefaultReflectWhite','PhongDefaultReflectionBasic','PhongDefaultRefractDenim','PhongGoldRefLectWhite',
			'PhongGreenSmooth','PhongPurpleFlat','PhongRandom','PhongRandomReflectCadillac','PhongRandomReflectDenim','PhongRandomReflectDisturb',
			'PhongRandomReflectGrid','PhongRandomReflectLavatile','PhongRandomReflectUVGrid','PhongRandomReflectWhite','PhongRandomReflectWire',
			'PhongRedPlastic','PhongWhiteReflectPisa','PhongWhiteReflectWhite','PhongWhiteRelectPalace'
		];

// camera position
		var radius = 250;
		var lat = Math.PI * Math.random();
		var lon = Math.PI * Math.random();
		var cx = radius * Math.sin( lat ) * Math.cos( lon );
		var cy = radius * Math.cos( lat );
		var cz = radius * Math.sin( lat ) * Math.sin( lon );

// Meier's parametric equations
		items = [ 1, 11, 12, 14, 33, 42, 54, 58, 62, 131, 151, 155 ];
		index = items[ Math.floor( items.length * Math.random() ) ];
		fileTitle = V3MH.files[ index ][ 1 ];
		basepath = V3MH.basepath + V3MH.files[ index ][ 0 ] + '/';
		fname = V3MH.files[ index ][ 0 ] + '.html';

// vA3C Objects
		files = ['DrMajentaKlein.json','Hex_01.json','TypTower.json'];
		file = files[ Math.floor( files.length * Math.random() ) ];
		va3cFile = '../../../json-r2/' + file;

// aircraft 	V3FA.files
		index = V3FA.files[ Math.floor( V3FA.files.length * Math.random() ) ];
		var aircraftFile = V3FA.basepath + index[ 0 ];
		var aircraftScale = 3 * index[ 1 ];

// Three.js models
		items = [ ['animated/elderlyWalk.js',100],['animated/flamingo.js',1],['animated/horse.js',1],['animated/parrot.js',1.5],
			['animated/monster/monster.js',0.05],['animated/ogro/ogro-light.js',3],
			['animated/ratamahatta/ratamahatta.js',2],['gltf/duck/duck.dae',100],['skinned/marine/m4.js',2],
			['skinned/marine/marine.js',0.5]
		];
		index = Math.floor( items.length * Math.random() );

		var threeModelName = V3TM.basepath + items[ index ][ 0 ];
		var threeModelScale = items[ index ][ 1 ];

console.log( 'getAutoCrapdoodle load', threeModelName );

		var d1 = 100, dim2 = 50;
		var txt = '' +
			'#camx=' + cx + '#camy=' + cy + '#camz=' + cz + 
			'#tarx=0#tary=0#tarz=0' +
			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' + ( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) + 
			'#rotx=1#roty=1#rotz=1#sclx=1#scly=1#sclz=1#mat=NormalSmooth' + // mat1 +
			'#url=' + basepath + fname + 
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) + 
			'#sclx=1#scly=1#sclz=1#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#url=' + va3cFile +
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) + 
			'#sclx=' + threeModelScale + '#scly=' + threeModelScale + '#sclz=' + threeModelScale + '#mat=' + mats[ Math.floor( mats.length * Math.random() ) ]  +
			'#url=' + threeModelName +
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) + 
			'#sclx=1#scly=1#sclz=1#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#url=../../../../three.js/examples/models/animated/flamingo.js' +
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) + 
			'#sclx=3#scly=3#sclz=3#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js' +
		'&' +
			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) + 
			'#sclx=' + aircraftScale + '#scly=' + aircraftScale + '#sclz=' + aircraftScale + '#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#url=' + aircraftFile +

		'&';
		location.hash = txt;
		JAPL.parsePermalinks();

//console.log( txt );
	};

	JAPL.setPermalinks = function() {
		var c = camera.position;
		var t = controls.target;
		var d = JAPL.defaults;
		var txt = '';
/*
// camera
		if ( c.x !== d.camx ) txt += '#camx=' + parseInt( c.x, 10 );
		if ( c.y !== d.camy ) txt += '#camy=' + parseInt( c.y, 10 );
		if ( c.z !== d.camz ) txt += '#camz=' + parseInt( c.z, 10 );

// target
		if ( t.x !== d.tarx ) txt += '#tarx=' + parseInt( t.x, 10 );
		if ( t.y !== d.tary ) txt += '#tary=' + parseInt( t.y, 10 );
		if ( t.z !== d.tarz ) txt += '#tarz=' + parseInt( t.z, 10 );
*/

// camera
		txt += '#camx=' + parseInt( c.x, 10 );
		txt += '#camy=' + parseInt( c.y, 10 );
		txt += '#camz=' + parseInt( c.z, 10 );

// target
		txt += '#tarx=' + parseInt( t.x, 10 );
		txt += '#tary=' + parseInt( t.y, 10 );
		txt += '#tarz=' + parseInt( t.z, 10 );

		if ( scene.template ) {
			txt += '#tmpl=' + scene.template;
		}
		txt += '&';

		for (var i = 0, len = scene.children.length; i < len; i++) {
			var obj = scene.children[i];
//			if ( obj.geometry && scene.template !== obj.link ) {
			if ( obj.geometry ) {
				txt += '#url=' + obj.link;

				if ( obj.materialKey && obj.materialKey !== 'undefines' ) {
					txt += '#mat=' + obj.materialKey;
				} else {
					txt += '#mat=' + d.mat;
				}
				txt += '#posx=' + obj.position.x;
				txt += '#posy=' + obj.position.y;
				txt += '#posz=' + obj.position.z;

				txt += '#rotx=' + parseFloat( obj.rotation.x );
				txt += '#roty=' + parseFloat( obj.rotation.y );
				txt += '#rotz=' + parseFloat( obj.rotation.z );

				txt += '#sclx=' + parseFloat( obj.scale.x );
				txt += '#scly=' + parseFloat( obj.scale.y );
				txt += '#sclz=' + parseFloat( obj.scale.z );

/*
				if ( obj.materialKey !== d.mat ) txt += '#mat=' + obj.materialKey;

				if ( obj.position.x !== d.posx ) txt += '#posx=' + obj.position.x;
				if ( obj.position.y !== d.posy ) txt += '#posy=' + obj.position.y;
				if ( obj.position.z !== d.posz ) txt += '#posz=' + obj.position.z;

				if ( obj.rotation.x !== d.rotx ) txt += '#rotx=' + parseFloat( obj.rotation.x );
				if ( obj.rotation.y !== d.roty ) txt += '#roty=' + parseFloat( obj.rotation.y );
				if ( obj.rotation.z !== d.rotz ) txt += '#rotz=' + parseFloat( obj.rotation.z );

				if ( obj.scale.x !== d.sclx ) txt += '#sclx=' + parseFloat( obj.scale.x );
				if ( obj.scale.y !== d.scly ) txt += '#scly=' + parseFloat( obj.scale.y );
				if ( obj.scale.z !== d.sclz ) txt += '#sclz=' + parseFloat( obj.scale.z );
*/
				txt += '&';
			}
		}
		window.location.hash = txt;
console.log( 'pmp', txt );
	};

		var hashes, values;

	JAPL.parsePermalinks = function() {
//console.log( 'parsePermalinks' );
		JAPL.things = [];
		var items;
		if ( !location.hash ) {

			values = JAPL.addValues();
			items = [ 1, 11, 12, 14, 33, 42, 54, 58, 62, 131, 151, 155 ];
			index = items[ Math.floor( items.length * Math.random() ) ];
			fileTitle = V3MH.files[ index ][ 1 ];
			basepath = V3MH.basepath + '/' + V3MH.files[ index ][ 0 ] + '/';
			fname = V3MH.files[ index ][ 0 ] + '.html';
			hashes = 
				['#camx=100#camy=100#camz=100#tarx=0#tary=0#tarz=0' +
				'#tmpl=' +  basepath + fname +
				'#posx=0#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1#mat=NormalSmooth' +
				'#url=' + basepath + fname +
			'&'];
			values.url =  basepath + fname;
			JAPL.things.push( values );
		} else if ( location.hash.toLowerCase().indexOf('auto') >  0 ){
			JAPL.getAutoCrapdoodle();
			location.hash = 'autocrapdoodle';
		} else {
			hashes = location.hash.split('&');
			for ( var i = 0; i < hashes.length - 1; i++ ) {
				values = JAPL.addValues();
				items = hashes[i].slice(1).split( '#' );
				for ( var j = 0; j < items.length; j++ ) {
					item = items[j].split( '=' );
					if ( item[0] === 'mat' || item[0] === 'tmpl' || item[0] === 'url' ) {
						values[ item[0] ] = item[1];
					} else {
						values[ item[0] ] = parseFloat( item[1] );
					}
				}
				JAPL.things.push( values );
			}
		}

//console.log( 'parsePermalink things', values, JAPL.things );
		JAFO.openArrayOfPermalinks( JAPL.things );
	};

	JAPL.addValues = function() {
		var values = {};
		for ( var key in JAPL.defaults ) {
			values[ key ] = JAPL.defaults [ key ];
		}
		return values;
	};

	JAPL.clearPermalink = function () {
		window.history.pushState( '', '', window.location.pathname);
	};


/*

#camx=233#camy=169#camz=163#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//jeener-klein-surface/jeener-klein-surface.html&#url=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//jeener-klein-surface/jeener-klein-surface.html#mat=NormalSmooth#posx=0#posy=-35#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/models/animated/horse.js#mat=NormalSmooth#posx=0#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRedPlastic#posx=82#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/models/animated/flamingo.js#mat=PhongGreenSmooth#posx=38#posy=78#posz=46#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../fgx-repos/fgx-aircraft/data/C-160-Transall/c160.js#mat=PhongRandom#posx=74#posy=56#posz=-42#rotx=-0.0015#roty=2.5285#rotz=-0.0015#sclx=5#scly=5#sclz=5&

#camx=-226#camy=-24#camz=-22#tarx=-6#tary=16#tarz=24#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//tranguloid-trefoil/tranguloid-trefoil.html&#url=../../../../fgx-repos/fgx-aircraft/data/zzz-operations/jeep/jeep.js#mat=PhongRandom#posx=-88#posy=-36#posz=34#rotx=-0.0015#roty=-0.0015#rotz=0#sclx=20#scly=20#sclz=20&#url=../../../../fgx-repos/fgx-aircraft/data/wrightFlyer1903/WrightFlyer-pb-jw.js#mat=PhongRandom#posx=-52#posy=20#posz=8#rotx=-0.0015#roty=0#rotz=0#sclx=20#scly=20#sclz=20&

#camx=84#camy=275#camz=197#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//hyperbolic-octahedron/hyperbolic-octahedron.html&#url=../../../../three.js/examples/models/animated/horse.js#mat=PhongRandom#posx=-42#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/obj/WaltHeadLo.js#mat=PhongPurpleFlat#posx=32#posy=42#posz=50#rotx=-0.5615#roty=0.4485#rotz=-0.0015#sclx=2#scly=2#sclz=2&#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRandom#posx=68#posy=70#posz=-6#rotx=-0.0015#roty=-0.0015#rotz=-0.0015#sclx=3#scly=3#sclz=3&

*/
