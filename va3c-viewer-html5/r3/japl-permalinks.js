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
		tabPermalinks.onclick = function() { JA.toggleTab( JAPL.permalinks ); JAPL.refreshParameters(); };

		JAPL.permalinks = tab.appendChild( document.createElement( 'div' ) );
		JAPL.permalinks.style.cssText = 'cursor: auto; display: none; ' ;
		JAPL.permalinks.innerHTML =
			'<div id=divPermalinks ></div>' +
		'';
	};

	JAPL.refreshParameters = function () {

// remember: no spaces in the JS below or add quotes
		JAPL.camX = parseInt( camera.position.x, 10 );
		JAPL.camY = parseInt( camera.position.y, 10 );
		JAPL.camZ = parseInt( camera.position.z, 10 );

		if ( controls ) {
			JAPL.tarX = parseInt( controls.target.x, 10 );
			JAPL.tarY = parseInt( controls.target.y, 10 );
			JAPL.tarZ = parseInt( controls.target.z, 10 );
		}

		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML = '.xyz { width: 50px; text-align: right; }';

		var txt =
		'<div>' +
//				'<h3><i class="fa fa-link"></i> Permalinks</h3>' +

			'<p><small><i><a href="http://en.wikipedia.org/wiki/Permalink" target="_blank">Permalinks</a> enable you to create a scene and save it as a link you can share..</i></small></p>' +

//			'<p><a href=JavaScript:JAPL.setPermalink(); >Set Permalink</a></p>' +
			'<p><a href=JavaScript:JAPL.setDemoPermalinks(); >Set Demo Permalinks</a></p>' +

			'<p><a href=JavaScript:JAPL.setMultiplePermalinks(); >Set Multiple Permalinks</a></p>' +
			'<p><a href=JavaScript:JAPL.clearPermalink(); >Clear Permalink</a></p>' +

			'<p><a href=JavaScript:JAPL.parseMutiplePermalinks(); >Parse Multiple Permalinks</a></p>' +

			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(JAPL.permalinks); >Close</a> ' +
			'</p>' +
		'</div>';
		divPermalinks.innerHTML = txt;

	};

	JAPL.parsePermalink = function () {
		var item, index;
		var hashes = ''; // location.hash.split('#');

// if the hash exists set the appropriate value
		for (var i = 1, len = hashes.length; i < len; i++) {
			item = hashes[i].split('=');
			index = item[0];
			if ( JAPL.defaults[ index ] !== undefined ){
				JAPL.values[ index ] = item;
			}
		}

		JAPL.camX = JAPL.values.camx ? parseFloat( JAPL.values.camx[1] ) : JAPL.defaults.camx;
		JAPL.camY = JAPL.values.camy ? parseFloat( JAPL.values.camy[1] ) : JAPL.defaults.camy;
		JAPL.camZ = JAPL.values.camz ? parseFloat( JAPL.values.camz[1] ) : JAPL.defaults.camz;

		JAPL.mat = JAPL.values.mat ? JAPL.values.mat[1] : JAPL.defaults.mat;

		JAPL.posX = outPosX.value = rngPosX.value = JAPL.values.posx ? parseFloat( JAPL.values.posx[1] ) : JAPL.defaults.posx;
		JAPL.posY = outPosY.value = rngPosY.value = JAPL.values.posy ? parseFloat( JAPL.values.posy[1] ) : JAPL.defaults.posy;
		JAPL.posZ = outPosZ.value = rngPosZ.value = JAPL.values.posz ? parseFloat( JAPL.values.posz[1] ) : JAPL.defaults.posz;

		JAPL.rotX = outRotX.value = rngRotX.value = JAPL.values.rotx ? parseFloat( JAPL.values.rotx[1] ) : JAPL.defaults.rotx;
		JAPL.rotY = outRotX.value = rngRotY.value = JAPL.values.roty ? parseFloat( JAPL.values.roty[1] ) : JAPL.defaults.roty;
		JAPL.rotZ = outRotZ.value = rngRotZ.value = JAPL.values.rotz ? parseFloat( JAPL.values.rotz[1] ) : JAPL.defaults.rotz;

		JAPL.sclX = outSclX.value = rngSclX.value = JAPL.values.sclx ? parseFloat( JAPL.values.sclx[1] ) : JAPL.defaults.sclx;
		JAPL.sclY = outSclY.value = rngSclY.value = JAPL.values.scly ? parseFloat( JAPL.values.scly[1] ) : JAPL.defaults.scly;
		JAPL.sclZ = outSclZ.value = rngSclZ.value = JAPL.values.sclz ? parseFloat( JAPL.values.sclz[1] ) : JAPL.defaults.sclz;

		JAPL.tarX = JAPL.values.tarx ? parseFloat( JAPL.values.tarx[1] ) : JAPL.defaults.tarx;
		JAPL.tarY = JAPL.values.tary ? parseFloat( JAPL.values.tary[1] ) : JAPL.defaults.tary;
		JAPL.tarZ = JAPL.values.tarz ? parseFloat( JAPL.values.tarz[1] ) : JAPL.defaults.tarz;

		JAPL.url = JAPL.values.url ? JAPL.values.url[1] : JAPL.defaults.url;

	};

	JAPL.XXXparseMutiplePermalinks = function () {
		hashSplits = location.hash.split('&');

		var item, index;
//		var hashes = location.hash.split('#');

// if the hash exists set the appropriate value
		for (var i = 0, len = hashSplits.length; i < len; i++) {

			hashes = hashSplits[i].slice(1).split('#');
console.log( i, hashes );
			for (var j = 0, len = hashes.length; j < len; j++) {

				item = hashes[j].split('=');

				JAPL.camX = item[0] === 'camx' ? item[1] : JAPL.defaults.camx;
				JAPL.camY = item[0] === 'camy' ? item[1] : JAPL.defaults.camy;
				JAPL.camZ = item[0] === 'camz' ? item[1] : JAPL.defaults.camz;

				JAPL.tarX = item[0] === 'tarx' ? item[1] : JAPL.defaults.tarx;
				JAPL.tarY = item[0] === 'tary' ? item[1] : JAPL.defaults.tary;
				JAPL.tarZ = item[0] === 'tarz' ? item[1] : JAPL.defaults.tarz;

				JAPL.posX = item[0] === 'posx' ? item[1] : JAPL.defaults.posx;
				JAPL.posY = item[0] === 'posy' ? item[1] : JAPL.defaults.posy;
				JAPL.posZ = item[0] === 'posz' ? item[1] : JAPL.defaults.posz;

				JAPL.rotX = item[0] === 'rotx' ? item[1] : JAPL.defaults.rotx;
				JAPL.rotY = item[0] === 'roty' ? item[1] : JAPL.defaults.roty;
				JAPL.rotZ = item[0] === 'rotz' ? item[1] : JAPL.defaults.rotz;

				JAPL.sclX = item[0] === 'sclx' ? item[1] : JAPL.defaults.sclx;
				JAPL.sclY = item[0] === 'scly' ? item[1] : JAPL.defaults.scly;
				JAPL.sclZ = item[0] === 'sclz' ? item[1] : JAPL.defaults.sclz;

				JAPL.mat = item[0] === 'mat' ? item[1] : JAPL.defaults.mat;
//				JAPL.url = item[0] == 'url' ? item[1] : JAPL.defaults.url;
				if ( item[0] === 'url' ) { 
//					console.log( i, j, 'jjj', item[0], item[1] );
					JAPL.url = item[1];
				}
			}
console.log( i, JAPL.url );
//			if ( i === 1 ) JAFO.openUrl( JAPL.url );
			if ( i > 1 && JAPL.url ) JAFO.appendUrl( JAPL.url );
		}

	};

	JAPL.setPermalink = function() {
		var c = camera.position;
		var t = controls.target;
		var d = JAPL.defaults;
		var txt = '';

// file
//		if ( JAPL.url && JAPL.url !== JAPL.defaults.url ) txt += '#url=' + JAPL.url;
		txt += '#url=' + scene.select.name;

// camera
		if ( c.x !== d.camx ) txt += '#camx=' + parseInt( c.x, 10 );
		if ( c.y !== d.camy ) txt += '#camy=' + parseInt( c.y, 10 );
		if ( c.z !== d.camz ) txt += '#camz=' + parseInt( c.z, 10 );

// target
		if ( t.x !== d.tarx ) txt += '#tarx=' + parseInt( t.x, 10 );
		if ( t.y !== d.tary ) txt += '#tary=' + parseInt( t.y, 10 );
		if ( t.z !== d.tarz ) txt += '#tarz=' + parseInt( t.z, 10 );

//Object
		if ( outPosX.value !== d.posx ) txt += '#posx=' + parseInt( outPosX.value, 10 );
		if ( outPosY.value !== d.posy ) txt += '#posy=' + parseInt( outPosY.value, 10 );
		if ( outPosZ.value !== d.posz ) txt += '#posz=' + parseInt( outPosZ.value, 10 );

		if ( outRotX.value !== d.rotx ) txt += '#rotx=' + parseFloat( outRotX.value );
		if ( outRotY.value !== d.roty ) txt += '#roty=' + parseFloat( outRotY.value );
		if ( outRotZ.value !== d.rotz ) txt += '#rotz=' + parseFloat( outRotZ.value );

		if ( outSclX.value !== d.sclx ) txt += '#sclx=' + parseFloat( outSclX.value );
		if ( outSclY.value !== d.scly ) txt += '#scly=' + parseFloat( outSclY.value );
		if ( outSclZ.value !== d.sclz ) txt += '#sclz=' + parseFloat( outSclZ.value );

		window.location.hash = txt;
console.log( 'pp', txt );
	};


	JAPL.setDemoPermalinks = function() {
		location.hash = '#camx=0#camy=0#camz=150#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//tranguloid-trefoil/tranguloid-trefoil.html&#posx=100#posy=0#posz=0#rotx=0.5#roty=0.9#rotz=0.2#sclx=1#scly=1#sclz=1#mat=SmoothNormal#url=../../../../three.js/examples/models/animated/flamingo.js&#posx=-100#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1#mat=SmoothNormal#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js&'; 

	}

	JAPL.setMultiplePermalinks = function() {
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
			if ( obj.geometry && scene.template !== obj.link ) {
				txt += '#url=' + obj.link;

				txt += '#mat=' + obj.materialKey;

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
	}

	JAPL.parseMutiplePermalinks = function() {
		if ( !location.hash ) return;

		var txt = '';
		var hashes = location.hash.split('&');

		for ( var i = 0; i < hashes.length - 1; i++ ) {

			values = {};
			for ( var key in JAPL.defaults ) {
				values[ key ] = JAPL.defaults [ key ];
			}

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

console.log( 'things', JAPL.things, JAPL.things[0]["tmpl"] );

	JAFO.openUrl( JAPL.things[0]["tmpl"] );

	}


	JAPL.resetValues = function() {
		JAPL.camX = JAPL.defaults.camx;
		JAPL.camY = JAPL.defaults.camy;
		JAPL.camZ = JAPL.defaults.camz;

		JAPL.mat =  JAPL.defaults.mat;

		JAPL.posX = JAPL.defaults.posx;
		JAPL.posY = JAPL.defaults.posy;
		JAPL.posZ = JAPL.defaults.posz;

		JAPL.rotX = JAPL.defaults.rotx;
		JAPL.rotY = JAPL.defaults.roty;
		JAPL.rotZ = JAPL.defaults.rotz;

		JAPL.sclX = JAPL.defaults.sclx;
		JAPL.sclY = JAPL.defaults.scly;
		JAPL.sclZ = JAPL.defaults.sclz;

		JAPL.tarX = JAPL.defaults.tarx;
		JAPL.tarY = JAPL.defaults.tary;
		JAPL.tarZ = JAPL.defaults.tarz;

		JAPL.url = JAPL.defaults.url;
	}

	JAPL.clearPermalink = function () {
		window.history.pushState( '', '', window.location.pathname);
	};

/*

#camx=-226#camy=-24#camz=-22#tarx=-6#tary=16#tarz=24#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//tranguloid-trefoil/tranguloid-trefoil.html&#url=../../../../fgx-repos/fgx-aircraft/data/zzz-operations/jeep/jeep.js#mat=PhongRandom#posx=-88#posy=-36#posz=34#rotx=-0.0015#roty=-0.0015#rotz=0#sclx=20#scly=20#sclz=20&#url=../../../../fgx-repos/fgx-aircraft/data/wrightFlyer1903/WrightFlyer-pb-jw.js#mat=PhongRandom#posx=-52#posy=20#posz=8#rotx=-0.0015#roty=0#rotz=0#sclx=20#scly=20#sclz=20&

#camx=84#camy=275#camz=197#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//hyperbolic-octahedron/hyperbolic-octahedron.html&#url=../../../../three.js/examples/models/animated/horse.js#mat=PhongRandom#posx=-42#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/obj/WaltHeadLo.js#mat=PhongPurpleFlat#posx=32#posy=42#posz=50#rotx=-0.5615#roty=0.4485#rotz=-0.0015#sclx=2#scly=2#sclz=2&#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRandom#posx=68#posy=70#posz=-6#rotx=-0.0015#roty=-0.0015#rotz=-0.0015#sclx=3#scly=3#sclz=3&

*/
