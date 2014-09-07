// data files are sourced from https://github.com/va3c/json
// All files created during the Hackathon are included - for hysterical purposes - even though some do not load as anticipated

	var V3VJ = {} || V3VJ;

	V3VJ.basePath = JAFO.basePath + 'json/';
	V3VJ.basePathRevit = JAFO.basePath + 'RvtVa3c/models/';

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
			file = V3VJ.files[ i ];

			if ( file[0] === 'Title' ) {
				fileList += '<h3 style=margin-bottom:0; >' + file[1] + '</h3>';
			} else {

				title = 
				scale = file[1];
				title = file[2] ? file[2] : '';

				fileList += 
				'<a href=JavaScript:JAFO.openUrl("' + file[0] + '",' + scale + '); title="' + title + '" >[O]</a> ' +
				'<a href=JavaScript:' +
				'JAFO.appendUrl("' + file[0] + '",' + scale + '); title="' + title + '" >' + file[0].substr( 1 + file[0].lastIndexOf( '/' ) ) + '</a><br>';
			}

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

		[ 'Title','<a href=https://github.com/va3c/json/ >Hackathon files</a>'],
		[ V3VJ.basePath + 'DrCyanKlein.json', 0.005, 'Revit model' ],
		[ V3VJ.basePath + 'DrMajentaKlein.json', 0.01, 'Revit model - scene'],
		[ V3VJ.basePath + 'Hex_01.js', 0.0075, 'Grasshopper model - scene' ],
		[ V3VJ.basePath + 'MissSpacyEyes.json',0.03, 'Grasshopper model - scene' ],
		[ V3VJ.basePath + 'TTX.json', 0.02, 'Grasshopper model scene' ],
		[ V3VJ.basePath + 'TypTower.json', 0.02, 'Grasshopper model - scene' ],
		[ V3VJ.basePath + 'US_Capitol_Building.dae', 1, 'for testing? No textures'],
		[ V3VJ.basePath + 'Vase_01.js', 0.02, 'Grasshopper model - scene' ],
		[ V3VJ.basePath + '3dsmax/test_3dsmax.js', 0.01, '3D Studio model - broken - works in cookbook example'],
		[ V3VJ.basePath + '3dsmax/TransamericaPyramid2.js', 0.01, '3D Studio model - broken - works in cookbook example' ],
		[ V3VJ.basePath + 'aeron/hey-ron.js', 100, '3D Studio model' ],
		[ V3VJ.basePath + 'archive/box-light.js', 1, 'Blender export - broken'],
		[ V3VJ.basePath + 'archive/Project1.rvt.js', 0.01, 'Revit model - broken' ],
		[ V3VJ.basePath + 'archive/Project2.rvt.js', 0.01, 'Revit model' ],
		[ V3VJ.basePath + 'archive/sample.js', 1, 'Blender export - broken' ],
		[ V3VJ.basePath + 'archive/scene.Monkey.js', 10, 'Blender export' ],
		[ V3VJ.basePath + 'archive/test.js', 10, 'Blender export' ],
		[ V3VJ.basePath + 'archive/Wall.rvt - Copy.js', 0.01, 'Revit model - broken' ],
		[ V3VJ.basePath + 'archive/Wall.rvt.js', 0.01, 'Revit model - broken' ],
		[ V3VJ.basePath + 'BH first working sample/jsonTester.json', 1, 'broken' ],
		[ V3VJ.basePath + 'lounge/scrounge.js', 100, '3D Studio model'],
		[ V3VJ.basePath + 'noguchi/no-gucci.js', 1000, '3D Studio model' ],
		[ V3VJ.basePath + 'revit/Project1.rvt.js', 0.01, 'Revit model - scene'],
		[ V3VJ.basePath + 'revit/Project2.rvt.js', 0.01, 'Revit model scene' ],
		[ V3VJ.basePath + 'revit/rac_basic_sample_project.rvt.js', 0.01, 'Revit model - scene - 41 MB - takes a while to load, worth the wait!' ],

		[ V3VJ.basePath + 'revit/Wall.rvt.js', 0.01, 'Revit model - scene' ],

		[ V3VJ.basePath + 'revit/WallWindow.rvt.js', 0.01, 'Revit model - scene' ],

		[ 'Title','<a href=https://github.com/va3c/3d-warehouse-samples >Post-Hackathon Updates</a>'],
		[ V3VJ.basePathRevit + 'rac_basic_sample_project_obj.rvt.js', 0.01, 'Revit model - scene - 41 MB - takes a while to load, worth the wait!' ],
		[ V3VJ.basePathRevit + 'rac_basic_sample_project_site.rvt.js', 0.01, 'Revit model - scene - 41 MB - takes a while to load, worth the wait!' ],
		[ V3VJ.basePathRevit + 'wall_2015.rvt.js', 0.01, 'Revit model - scene' ],
		[ V3VJ.basePathRevit + 'wall_brick.rvt.js', 0.01, 'Revit model - scene' ],
	]