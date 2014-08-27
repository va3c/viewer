// data files are sourced from https://github.com/va3c/json
// All files created during the Hackathon are included - for hysterical purposes - even though some do not load as anticipated

	var V3VJ = {} || V3VJ;

	V3VJ.basePath = JAFO.basePath + 'json/';

	V3VJ.addVa3cJsonTab = function() {
		var tab = V3.librariesTab.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabVa3cJson title="Hi Mostapha!" ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> vA3C JSON...' +
			'</p></a>';
		tabVa3cJson.onclick = function() { V3VJ.updateVa3cJSONTab(); JA.toggleDialogs(V3VJ.Va3cJsonTab); };

		V3VJ.Va3cJsonTab = tab.appendChild( document.createElement( 'div' ) );
		V3VJ.Va3cJsonTab.style.cssText = 'cursor: auto; display: none; ' ;

	};

	V3VJ.updateVa3cJSONTab = function() {
		var fileList = '<br>';
		var file, boilerplate, fname;
		for ( var i = 0, len = V3VJ.files.length; i < len; i++ ) {
			file = V3VJ.files[ i ][0];
			scale = V3VJ.files[ i ][1];
			title = V3VJ.files[ i ][2] ? V3VJ.files[ i ][2] : '';
			fileList += 
				'<a href=JavaScript:JAFO.openUrl("' + V3VJ.basePath + file + '",' + scale + '); >[O]</a> ' +
				'<a href=JavaScript:' +
				'JAFO.appendUrl("' + V3VJ.basePath + file + '",' + scale + '); title="' + title + '" >' + file.split('/').pop() + '</a><br>';
		}

		V3VJ.Va3cJsonTab.innerHTML =
			'<p title="Data brought in from Revit and Grasshopper" >' +
				'The files below are sourced from the<br><a href="https://github.com/va3c/json" target="_blank">vA3C JSON repository</a>.<br><br>' +
				'These files - mostly Three.js JSON 4.3 - were produced during the AEC Hackathon. ' +
				'Be careful: most files are Three.js scenes and overwrite the current scene.' +
			'</p>' +
			'<details><summary>Not all files load. </summary>Move the cursor over the links. ' +
				'Pop-up tooltips tell you if a file is broken or provide further info.</details>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3VJ.Va3cJsonTab); ); >Close</a> ' +
			'</p>' +
		'';
	}

	V3VJ.files = [

		['DrCyanKlein.json', 0.005, 'Revit model' ],
//'DrCyanKlein.json', {'sclx':'0.01','scly':'0.01','sclz':'0.01} ],

		['DrMajentaKlein.json', 0.01, 'Revit model - scene'],
		['Hex_01.js', 0.0075, 'Grasshopper model - scene' ],
		['MissSpacyEyes.json',0.03, 'Grasshopper model - scene' ],
		['TTX.json', 0.02, 'Grasshopper model scene' ],
		['TypTower.json', 0.02, 'Grasshopper model - scene' ],
		['US_Capitol_Building.dae', 1, 'for testing? No textures'],
		['Vase_01.js', 0.02, 'Grasshopper model - scene' ],
		['3dsmax/test_3dsmax.js', 0.01, '3D Studio model - broken - works in cookbook example'],
		['3dsmax/TransamericaPyramid2.js', 0.01, '3D Studio model - broken - works in cookbook example' ],
		['aeron/hey-ron.js', 100, '3D Studio model' ],
		['archive/box-light.js', 1, 'Blender export - broken'],
		['archive/Project1.rvt.js', 0.01, 'Revit model - broken' ],
		['archive/Project2.rvt.js', 0.01, 'Revit model' ],
		['archive/sample.js', 1, 'Blender export - broken' ],
		['archive/scene.Monkey.js', 10, 'Blender export' ],
		['archive/test.js', 10, 'Blender export' ],
		['archive/Wall.rvt - Copy.js', 0.01, 'Revit model - broken' ],
		['archive/Wall.rvt.js', 0.01, 'Revit model - broken' ],
		['BH first working sample/jsonTester.json', 1, 'broken' ],
		['lounge/scrounge.js', 100, '3D Studio model'],
		['noguchi/no-gucci.js', 1000, '3D Studio model' ],
		['revit/Project1.rvt.js', 0.01, 'Revit model - scene'],
		['revit/Project2.rvt.js', 0.01, 'Revit model scene' ],
		['revit/rac_basic_sample_project.rvt.js', 0.01, 'Revit model - scene - 41 MB - takes a while to load, worth the wait!' ],
		['revit/Wall.rvt.js', 0.01, 'Revit model - scene' ],
		['revit/WallWindow.rvt.js', 0.01, 'Revit model - scene' ]
	]