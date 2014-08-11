
	var V3VJ = {} || V3VJ;

	V3VJ.basepath = '../../../json/';

	V3VJ.addVa3cJsonTab = function() {
		var tab = V3LI.libraries.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabVa3cJson title="Hi Mostapha!" ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> vA3C JSON...' +
			'</p></a>';
		tabVa3cJson.onclick = function() { V3VJ.updateVa3cTab(); JA.toggleDialogs(V3VJ.Va3cJsonTab); };

		V3VJ.Va3cJsonTab = tab.appendChild( document.createElement( 'div' ) );
		V3VJ.Va3cJsonTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, boilerplate, fname;
		for ( var i = 0, len = V3VJ.files.length; i < len; i++ ) {
			file = V3VJ.files[ i ][0];
			scale = V3VJ.files[ i ][1];
			fileList += '<a href=JavaScript:' +
//				'V3LI.updateIframe(V3VJ.files,' + i + ',V3VJ.basepath,"' + file + ',' + thing + '","' + boilerplate + '"); >' + file + '</a><br>';
				'JAFO.appendUrl("' + V3VJ.basepath + file + '",' + scale + '); >' + file + '</a><br>';
		}

	};

	V3VJ.updateVa3cTab = function() {
		var fileList = '<br>';
		var file, boilerplate, fname;
		for ( var i = 0, len = V3VJ.files.length; i < len; i++ ) {
			file = V3VJ.files[ i ][0];
			scale = V3VJ.files[ i ][1];
			fileList += '<a href=JavaScript:' +
//				'V3LI.updateIframe(V3VJ.files,' + i + ',V3VJ.basepath,"' + file + ',' + thing + '","' + boilerplate + '"); >' + file + '</a><br>';
				'JAFO.appendUrl("' + V3VJ.basepath + file + '",' + scale + '); >' + file + '</a><br>';
		}

		V3VJ.Va3cJsonTab.innerHTML =
			'<p title="Data brought in from Revit and Grasshopper" >' +
				'Sourced from the<br><a href="https://github.com/va3c/json" target="_blank">vA3C JSON repository</a>.<br><br>' +
				'Files were produced during the AEC Hackathon. Not all files work. ' +
				'Be careful: most files are Three.js scenes and will overwrite the current display.' +
			'</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3VJ.Va3cJsonTab); ); >Close</a> ' +
			'</p>' +
		'';
	}

	V3VJ.files = [

		['DrCyanKlein.json', 0.005 ],
//'DrCyanKlein.json', {'sclx':'0.01','scly':'0.01','sclz':'0.01} ],

		['DrMajentaKlein.json', 0.01],
		['Hex_01.js', 0.0075 ],
		['MissSpacyEyes.json',0.03],
		['TTX.json', 0.02 ],
		['TypTower.json', 0.02 ],
//		['US_Capitol_Building.dae',''],
		['Vase_01.js', 0.02 ],
		['3dsmax/test_3dsmax.js', 0.01],
		['3dsmax/TransamericaPyramid2.js', 0.01 ],
		['aeron/hey-ron.js', 100 ],
		['archive/box-light.js', 1],
		['archive/Project1.rvt.js', 0.01 ],
		['archive/Project2.rvt.js', 0.01 ],
		['archive/sample.js', 1],
		['archive/scene.Monkey.js', 10 ],
		['archive/test.js', 1 ],
		['archive/Wall.rvt - Copy.js', 0.01],
		['archive/Wall.rvt.js', 0.01 ],
		['BH first working sample/jsonTester.json', 1],
		['lounge/scrounge.js', 100],
		['noguchi/no-gucci.js', 1000 ],
		['revit/Project1.rvt.js', 0.01],
		['revit/Project2.rvt.js', 0.01 ],
		['revit/rac_basic_sample_project.rvt.js', 0.01 ],
		['revit/Wall.rvt.js', 0.01 ],
		['revit/WallWindow.rvt.js', 0.01]
	]