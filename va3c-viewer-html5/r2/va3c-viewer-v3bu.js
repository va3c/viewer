	var V3BU = {};

	V3BU.addBundleOpen = function() {
		var bundleOpenButton = V3AA.menu.appendChild( document.createElement( 'div' ) );

		bundleOpenButton.innerHTML =
			'<p class=button >' +
				'<a href=# onclick=V3AA.openDialog(V3BU.bundleOpen); ><i class="fa fa-suitcase"></i> Bundles...</a>' +
			'</p>'; 

		V3BU.bundleOpen = container.appendChild( document.createElement( 'div' ) );
		V3BU.bundleOpen.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 0 20px 20px; ' +
			'bottom: 0; height: 530px; left: 0; margin: auto; position: absolute; right: 0; top: 0; width: 450px; ';

// remember: no spaces in the JS below or add quotes
		V3BU.bundleOpen.innerHTML =
			'<div>' +
				'<h3><i class="fa fa-suitcase"></i> Bundle Open</h3>' +

				'<p><small><i>Bundles are collections of permalinks creaated by writing very simple JavaScript functions.</i></small></p>' +

				'<p><small><i>They show that you can combine models from multiple sources and arrange them by position, rotation and scale.</i></small></p>' +

				'<h4>Bundle #1 ~ Vase + TypTower</h4>' +
				'<p><a href=# class=button onclick=V3BU.openBundle1(); >Open it</a></p>' +

				'<h4>Bundle #2 ~ TTX</h4>' +
				'<p><a href=# class=button onclick=V3BU.openBundle2(); >Open it</a></p>' +

				'<h4>Bundle #3 ~ TransamericaPyramid2 + Klein</h4>' +
				'<p><a href=# class=button onclick=V3BU.openBundle3(); >Open it</a></p>' +

				'<h4>Bundle #4 ~ Revit Sample Project + Vase + TTX</h4>' +
				'<p><a href=# class=button onclick=V3BU.openBundle4(); >Open it</a></p>' +

				'<p><small><i>#4 has issues with resetting default positions. Best to reload page before opening this bundle.</i></small></p>' +

				'<p style=text-align:right; >' +
					'<a href=# class=button onclick=V3BU.bundleOpen.style.display="none"; >Close</a> ' +
				'</p>' +
		'</div>';
	};

	V3BU.openBundle1 = function() {
		V3AA.openDialog();
		location.hash = '#camx=18492#camy=12433#camz=7#posx=5000#sclx=3#scly=3#sclz=3#tarx=-161#tary=270#tarz=537#url=../../../json/Vase_01.js';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );

		location.hash = '#camx=18492#camy=12433#camz=7#files=append#posz=5000#sclx=3#scly=2#scly=0.75#sclz=2#tarx=-161#tary=270#tarz=537#url=../../../json/TypTower.json';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );
	};

	V3BU.openBundle2 = function() {
		V3AA.openDialog();
		location.hash = '#camx=9995#camy=672#camz=11021#files=replace#sclx=3#scly=3#sclz=3#tarx=-368#tary=3818#tarz=-143#url=../../../json/TTX.json';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );
	};

	V3BU.openBundle3 = function() {
		V3AA.openDialog();
		location.hash = '#camx=-5232#camy=22747#camz=46874#files=replace#sclx=3#scly=3#sclz=3#tarx=-545#tary=13070#tarz=-2580#url=../../../json/3dsmax/TransamericaPyramid2.js';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );

		location.hash = '#files=append#url=../../../json/DrMajentaKlein.json';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );
	};

	V3BU.openBundle4 = function() {
		V3AA.openDialog();
		chkGroundPlane.checked = false;

		location.hash = '#camx=3922#camy=1899#camz=-6307#files=replace#sclx=1#scly=1#sclz=1#tarx=1423#tary=548#tarz=-79#url=../../../json/revit/rac_basic_sample_project.rvt.js';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );

		location.hash = '#posx=2500#posy=750#sclx=0.15#scly=0.15#sclz=0.15#files=append#url=../../../json/Vase_01.js';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );

		location.hash = '#files=append#posx=4500#posy=0#posz=2000#sclx=0.15#scly=0.15#sclz=0.15#url=../../../json/TypTower.json';
		V3PL.parsePermalink();
		V3FO.loadURL( V3PL.url );
	};