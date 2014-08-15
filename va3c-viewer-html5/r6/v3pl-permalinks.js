	var V3PL = [] || V3PL;

// defaults & values all lower case to make editing the URL by hand easier
	V3PL.defaultScene = {
		camx: 100,
		camy: 100,
		camz: 100,
		tarx: 0,
		tary: 0,
		tarz: 0,
		name: ''
	};

	V3PL.defaultObject = {
		posx: 0,
		posy: 0,
		posz: 0,
		rotx: 0,
		roty: 0,
		rotz: 0,
		sclx: 1,
		scly: 1,
		sclz: 1,
		scl: 1,

		mat: 'PhongRandom',
		name: 'vA3C',
		src: 'template-basic.html'
	};

	V3PL.addPermalinksTab = function () {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabPermalinks ><p class=buttonFile >' +
				'<i class="fa fa-link"></i> Permalinks...' +
			'</p></a>';
		tabPermalinks.onclick = function() { V3PL.updatePermalinksTab(); JA.toggleTab( V3PL.permalinksTab ); };

		V3PL.permalinksTab = tab.appendChild( document.createElement( 'div' ) );
		V3PL.permalinksTab.style.cssText = 'cursor: auto; display: none; ' ;

	};

	V3PL.updatePermalinksTab = function () {

		var txt =
		'<div>' +

			'<p><small><i><a href="http://en.wikipedia.org/wiki/Permalink" target="_blank">Permalinks</a> ' +
			'enable you to save a scene you have created and send it as a link you can share...</i></small></p>' +

			'<p><a href=JavaScript:V3PL.setPermalinks(); title="Send current display parameters to the address bar" >Create Permalinks</a></p>' +

			'<p><a href=JavaScript:V3.init(); title="Read data from the address bar and display the results" >Parse Permalinks</a></p>' +

			'<p><a href=JavaScript:location.hash="autocrapdoodle";V3.init(); title="Each reload brings randomly generated data files" >Get AUTOcrapdoodle</a></p>' +

			'<p><a href=JavaScript:V3PL.clearPermalink(); title="Reset address bar to the default URL" >Clear Permalink</a></p>' +

			'<p><a href="http://goo.gl/" target="_blank">Google URL Shortener</a></p>' +

			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3PL.permalinksTab); >Close</a> ' +
			'</p>' +

		'</div>';

		V3PL.permalinksTab.innerHTML = txt;

	};

	V3PL.getAutoCrapdoodle = function () {
		var items, item, index;
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
		item = items[ Math.floor( items.length * Math.random() ) ];
		var fileTitle = V3MH.files[ item ][ 1 ];
		var basepath = V3MH.basepath + V3MH.files[ item ][ 0 ] + '/';
		var meierFile = V3MH.files[ item ][ 0 ] + '.html';

// vA3C Objects
		items = ['DrMajentaKlein.json','Hex_01.json','TypTower.json'];
		item = items[ Math.floor( items.length * Math.random() ) ];
		var va3cFile = '../../../json-r2/' + item;

// FGx Aircraft  V3FA.files
		item = V3FA.files[ Math.floor( V3FA.files.length * Math.random() ) ];
		var aircraftFile = V3FA.basepath + item[ 0 ];
		var aircraftScale = 3 * item[ 1 ];

// Three.js models
		items = [ ['animated/elderlyWalk.js',100],['animated/flamingo.js',1],['animated/horse.js',1],['animated/parrot.js',1.5],
			['animated/monster/monster.js',0.05],['animated/ogro/ogro-light.js',3],
			['animated/ratamahatta/ratamahatta.js',2],['gltf/duck/duck.dae',100],['skinned/marine/m4.js',2],
			['skinned/marine/marine.js',0.5]
		];
		index = Math.floor( items.length * Math.random() );

		var threeModelFile = V3TM.basepath + items[ index ][ 0 ];
		var threeModelScale = items[ index ][ 1 ];

		var d1 = 100, dim2 = 50;
		var txt = '' +
			'#camx=' + cx + '#camy=' + cy + '#camz=' + cz +
			'#tarx=0#tary=0#tarz=0' +
			'#name=' + basepath + meierFile +
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) +
			'#sclx=1#scly=1#sclz=1#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#src=' + va3cFile +
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) +
			'#sclx=' + threeModelScale + '#scly=' + threeModelScale + '#sclz=' + threeModelScale + '#mat=' + mats[ Math.floor( mats.length * Math.random() ) ]  +
			'#src=' + threeModelFile +
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) +
			'#sclx=1#scly=1#sclz=1#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#src=../../../../three.js/examples/models/animated/flamingo.js' +
		'&' +

			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) +
			'#sclx=3#scly=3#sclz=3#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#src=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js' +
		'&' +
			'#posx=' + ( d1 * Math.random() - dim2 ) + '#posy=' +( d1 * Math.random() - dim2 ) + '#posz=' + ( d1 * Math.random() - dim2 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) +
			'#sclx=' + aircraftScale + '#scly=' + aircraftScale + '#sclz=' + aircraftScale + '#mat=' + mats[ Math.floor( mats.length * Math.random() ) ] +
			'#src=' + aircraftFile +
		'';

		location.hash = txt;
//		V3PL.parsePermalinks();



//console.log( 'getAutoCrapdoodle', txt );
		V3.getPermalinkBundles();
	};

	V3PL.setPermalinks = function () {
		var c = camera.position;
		var t = controls && controls.target ? controls.target : { x: 0, y: 9, z: 0 } ;
		var d = V3PL.defaultObject;
		var txt = '';
/*

// Create a sparse set of hashes

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

		if ( V3PL.bundles[0].name ) {
			txt += '#name=' + V3PL.bundles[0].name;
		}
		txt += '&';

		for (var i = 0, len = scene.children.length; i < len; i++) {
			var obj = scene.children[i];
			if ( obj.geometry || obj.src ) {
				obj.src = obj.src ? obj.src : V3PL.bundles[1].src ;
				txt += '#src=' + obj.src;

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

// Create a sparse set of hashes

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

		window.location.hash = txt.slice( 0, -1 );
console.log( 'setPermalinks', txt );

	};

	V3PL.setDefaults = function ( defaultSource ) {

		var defaults = {};
		for ( var key in defaultSource ) {
			defaults[ key ] = defaultSource [ key ];
		}
		return defaults;

	};

	V3PL.buildBundle = function ( src, scale, name ) {

		var bundle = V3PL.setDefaults( V3PL.defaultObject );
		bundle.name = src.split('/').pop();
		bundle.scl =  scale ? scale : 1;
		bundle.src = src;

		V3PL.bundles.push( bundle );
//console.log( 'buildBundle', bundle );

		return bundle;

	};

	V3PL.clearPermalink = function () {
		window.history.pushState( '', '', window.location.pathname);
	};


/*

lee + walt
http://va3c.github.io/viewer/va3c-viewer-html5/r4/va3c-viewer-html5-r4.html#camx=576#camy=970#camz=-406#tarx=0#tary=9#tarz=0#src=http://va3c.github.io/three.js/examples/webgl_materials_bumpmap_skin.html&#src=http://va3c.github.io/three.js/examples/webgl_materials_bumpmap_skin.html#mat=PhongRandom#posx=0#posy=-50#posz=0#rotx=0.1385#roty=0.0985#rotz=0#sclx=100#scly=100#sclz=100&#src=http://va3c.github.io/three.js/examples/obj/walt/WaltHead_slim.js#mat=PhongRandom#posx=0#posy=50#posz=14#rotx=-0.0015#roty=0#rotz=0#sclx=8#scly=8#sclz=8&#src=http://va3c.github.io/three.js/examples/obj/walt/WaltHead_slim.js#mat=PhongRandom#posx=0#posy=50#posz=14#rotx=-0.0015#roty=0#rotz=0#sclx=8#scly=8#sclz=8&

http://va3c.github.io/viewer/va3c-viewer-html5/r4/va3c-viewer-html5-r4.html#camx=576#camy=970#camz=-406#tarx=0#tary=9#tarz=0#src=http://va3c.github.io/three.js/examples/webgl_materials_bumpmap_skin.html&#src=http://va3c.github.io/three.js/examples/webgl_materials_bumpmap_skin.html#mat=PhongRandom#posx=0#posy=-50#posz=0#rotx=0.1385#roty=0.0985#rotz=0#sclx=100#scly=100#sclz=100&
#src=http://va3c.github.io/three.js/examples/obj/walt/WaltHead_slim.js#mat=PhongRandom#posx=0#posy=50#posz=14#rotx=-0.0015#roty=0#rotz=0#sclx=8#scly=8#sclz=8&



file:///C:/Users/theo/Dropbox/Public/git-repos/va3c.github.io/viewer/va3c-viewer-html5/r4/va3c-viewer-html5-r4.html
#camx=4000#camy=1500#camz=2000#tarx=20#tary=1300#tarz=200#src=boilerplate-simple.html&
#src=../../../json/revit/rac_basic_sample_project.rvt.js#mat=PhongRandom#posx=0#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&
#src=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRandom#posx=0#posy=1100#posz=1200#rotx=0#roty=0#rotz=0#sclx=50#scly=50#sclz=50&
#src=../../../../three.js/examples/obj/Suzanne.js#mat=PhongRandom#posx=-8000#posy=1100#posz=-10000#rotx=1.75#roty=0#rotz=-1.57#sclx=900#scly=900#sclz=900&


http://va3c.github.io/viewer/va3c-viewer-html5/r4/va3c-viewer-html5-r4.html
#camx=4000#camy=1500#camz=2000#tarx=20#tary=1300#tarz=200#src=boilerplate-simple.html&
#src=../../../json/revit/rac_basic_sample_project.rvt.js#mat=PhongRandom#posx=0#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&
#src=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRandom#posx=0#posy=1100#posz=1200#rotx=0#roty=0#rotz=0#sclx=50#scly=50#sclz=50&
#src=../../../../three.js/examples/obj/Suzanne.js#mat=PhongRandom#posx=-8000#posy=1100#posz=-10000#rotx=1.75#roty=0#rotz=-1.57#sclx=900#scly=900#sclz=900&




file:///C:/Users/theo/Dropbox/Public/git-repos/va3c.github.io/viewer/va3c-viewer-html5/r4/va3c-viewer-html5-r4.html#camx=57#camy=57#camz=57#tarx=0#tary=0#tarz=0#src=boilerplate-simple.html&

#camx=233#camy=169#camz=163#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//jeener-klein-surface/jeener-klein-surface.html&#url=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//jeener-klein-surface/jeener-klein-surface.html#mat=NormalSmooth#posx=0#posy=-35#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#src=../../../../three.js/examples/models/animated/horse.js#mat=NormalSmooth#posx=0#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#src=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRedPlastic#posx=82#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#src=../../../../three.js/examples/models/animated/flamingo.js#mat=PhongGreenSmooth#posx=38#posy=78#posz=46#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#src=../../../../fgx-repos/fgx-aircraft/data/C-160-Transall/c160.js#mat=PhongRandom#posx=74#posy=56#posz=-42#rotx=-0.0015#roty=2.5285#rotz=-0.0015#sclx=5#scly=5#sclz=5&

#camx=-226#camy=-24#camz=-22#tarx=-6#tary=16#tarz=24#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//tranguloid-trefoil/tranguloid-trefoil.html&#src=../../../../fgx-repos/fgx-aircraft/data/zzz-operations/jeep/jeep.js#mat=PhongRandom#posx=-88#posy=-36#posz=34#rotx=-0.0015#roty=-0.0015#rotz=0#sclx=20#scly=20#sclz=20&#src=../../../../fgx-repos/fgx-aircraft/data/wrightFlyer1903/WrightFlyer-pb-jw.js#mat=PhongRandom#posx=-52#posy=20#posz=8#rotx=-0.0015#roty=0#rotz=0#sclx=20#scly=20#sclz=20&

#camx=84#camy=275#camz=197#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//hyperbolic-octahedron/hyperbolic-octahedron.html&#src=../../../../three.js/examples/models/animated/horse.js#mat=PhongRandom#posx=-42#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#src=../../../../three.js/examples/obj/WaltHeadLo.js#mat=PhongPurpleFlat#posx=32#posy=42#posz=50#rotx=-0.5615#roty=0.4485#rotz=-0.0015#sclx=2#scly=2#sclz=2&#src=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRandom#posx=68#posy=70#posz=-6#rotx=-0.0015#roty=-0.0015#rotz=-0.0015#sclx=3#scly=3#sclz=3&

*/
