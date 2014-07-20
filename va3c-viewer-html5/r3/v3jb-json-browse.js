
	var V3JB = {} || V3JB;

	V3JB.basepath = '../../../json/';

	V3JB.addJSONBrowseTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a href=# id=tabJSONBrowse ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> vA3C JSON...' +
			'</p></a>';
		tabJSONBrowse.onclick = function() {JA.toggleDialogs(V3JB.JSONBrowseTab); };

		V3JB.JSONBrowseTab = tab.appendChild( document.createElement( 'div' ) );
		V3JB.JSONBrowseTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, fname;
		for ( var i = 0, len = V3JB.files.length; i < len; i++ ) {
			file = V3JB.files[ i ][0];
			fileList += '<a href=JavaScript:' +
				'V3LI.updateIframe(V3JB.files,' + i + ',V3JB.basepath,"' + file + '"); >' + file + '</a><br>';
		}

		V3JB.JSONBrowseTab.innerHTML =
			'<p>' +
				'Sourced from <a hr; ef="http://mrdoob.github.io/three.js/examples/" target="_blank"></a>threejs.org<br><br>' +
				'Currently supports: .dae, .js, json, .stl, others?<br>' +
			'</p>' +
			'<p>You have to zoom *way* out or way in to see stuff.</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3JB.JSONBrowseTab); ); >Close</a> ' +
			'</p>' +
		'';

	};

	V3JB.files = [
		['DrCyanKlein.json',''],
		['DrMajentaKlein.json',''],
		['Hex_01.js',''],
		['MissSpacyEyes.json',''],
		['TTX.json',''],
		['TypTower.json',''],
//		['US_Capitol_Building.dae',''],
		['Vase_01.js',''],
		['3dsmax/test_3dsmax.js',''],
		['3dsmax/TransamericaPyramid2.js',''],
		['aeron/hey-ron.js',''],
		['archive/box-light.js',''],
		['archive/Project1.rvt.js',''],
		['archive/Project2.rvt.js',''],
		['archive/sample.js',''],
		['archive/scene.Monkey.js',''],
		['archive/test.js',''],
		['archive/Wall.rvt - Copy.js',''],
		['archive/Wall.rvt.js',''],
		['BH first working sample/jsonTester.json',''],
		['lounge/scrounge.js',''],
		['noguchi/no-gucci.js',''],
		['revit/Project1.rvt.js',''],
		['revit/Project2.rvt.js',''],
		['revit/rac_basic_sample_project.rvt.js',''],
		['revit/Wall.rvt.js',''],
		['revit/WallWindow.rvt.js','']
	]