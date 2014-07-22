
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
		var file, boilerplate, fname;
		for ( var i = 0, len = V3JB.files.length; i < len; i++ ) {
			file = V3JB.files[ i ][0];
			boilerplate = V3JB.files[ i ][1];
			fileList += '<a href=JavaScript:' +
				'V3LI.updateIframe(V3JB.files,' + i + ',V3JB.basepath,"' + file + '","' + boilerplate + '"); >' + file + '</a><br>';
		}

		V3JB.JSONBrowseTab.innerHTML =
			'<p>' +
				'Sourced from <a href="http://va3c.github.io/three.js/examples/" target="_blank"></a>tvA3C<br><br>' +
				'The files produced during the AEC Hackathon<br>' +
			'</p>' +
			'<p>You have to zoom *way* out or way in to see stuff.</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3JB.JSONBrowseTab); ); >Close</a> ' +
			'</p>' +
		'';

	};

	V3JB.files = [
		['DrCyanKlein.json','boilerplate-va3c-big.html'],
		['DrMajentaKlein.json','boilerplate-va3c-big.html'],
		['Hex_01.js','boilerplate-va3c-big.html'],
		['MissSpacyEyes.json','boilerplate-va3c-big.html'],
		['TTX.json','boilerplate-va3c-big.html'],
		['TypTower.json','boilerplate-va3c-big.html'],
//		['US_Capitol_Building.dae',''],
		['Vase_01.js','boilerplate-va3c-big.html'],
		['3dsmax/test_3dsmax.js',''],
		['3dsmax/TransamericaPyramid2.js','boilerplate-va3c-big.html'],
		['aeron/hey-ron.js','boilerplate-va3c-small.html'],
		['archive/box-light.js',''],
		['archive/Project1.rvt.js','boilerplate-va3c-big.html'],
		['archive/Project2.rvt.js','boilerplate-va3c-big.html'],
		['archive/sample.js',''],
		['archive/scene.Monkey.js','boilerplate-va3c-small.html'],
		['archive/test.js','boilerplate-va3c-small.html'],
		['archive/Wall.rvt - Copy.js','boilerplate-va3c-big.html'],
		['archive/Wall.rvt.js','boilerplate-va3c-big.html'],
		['BH first working sample/jsonTester.json',''],
		['lounge/scrounge.js','boilerplate-va3c-small.html'],
		['noguchi/no-gucci.js','boilerplate-va3c-small.html'],
		['revit/Project1.rvt.js','boilerplate-va3c-big.html'],
		['revit/Project2.rvt.js','boilerplate-va3c-big.html'],
		['revit/rac_basic_sample_project.rvt.js','boilerplate-va3c-big.html'],
		['revit/Wall.rvt.js','boilerplate-va3c-big.html'],
		['revit/WallWindow.rvt.js','boilerplate-va3c-big.html']
	]