
	var V3VJ = {} || V3VJ;

	V3VJ.basepath = '../../../json/';

	V3VJ.addVA3CJSONTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a href=# id=tabJSONBrowse ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> vA3C JSON...' +
			'</p></a>';
		tabJSONBrowse.onclick = function() {JA.toggleDialogs(V3VJ.JSONBrowseTab); };

		V3VJ.JSONBrowseTab = tab.appendChild( document.createElement( 'div' ) );
		V3VJ.JSONBrowseTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, boilerplate, fname;
		for ( var i = 0, len = V3VJ.files.length; i < len; i++ ) {
			file = V3VJ.files[ i ][0];
			boilerplate = V3VJ.files[ i ][1];
			fileList += '<a href=JavaScript:' +
				'V3LI.updateIframe(V3VJ.files,' + i + ',V3VJ.basepath,"' + file + '","' + boilerplate + '"); >' + file + '</a><br>';
		}

		V3VJ.JSONBrowseTab.innerHTML =
			'<p>' +
				'Sourced from <a href="https://github.com/va3c/json" target="_blank"></a>vA3C<br><br>' +
				'Files were produced during the AEC Hackathon. Not all files work.' +
			'</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3VJ.JSONBrowseTab); ); >Close</a> ' +
			'</p>' +
		'';
	};

	V3VJ.files = [
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