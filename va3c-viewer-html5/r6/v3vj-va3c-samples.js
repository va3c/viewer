// data files are sourced from https://github.com/va3c/viewer samples


	var V3SA = {} || V3SA;

	V3SA.warehouse3DBasePath = '../../../3d-warehouse-samples/';
	V3SA.programming3DApplicationsBasePath = '../../../../Programming3DApplications/models/';
	V3SA.nasaSamplesBasePath = '../../../nasa-samples/';


	V3SA.addVa3cSamplesTab = function() {
		var tab = V3.librariesTab.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabVa3cSamples title="Hi Mostapha!" ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> vA3C Samples...' +
			'</p></a>';
		tabVa3cSamples.onclick = function() { V3SA.updateVa3cSamplesTab(); JA.toggleDialogs(V3SA.Va3cSamplesTab); };

		V3SA.Va3cSamplesTab = tab.appendChild( document.createElement( 'div' ) );
		V3SA.Va3cSamplesTab.style.cssText = 'cursor: auto; display: none; ' ;

	};

	V3SA.updateVa3cSamplesTab = function() {

		var fileList = '';
		var file, boilerplate, fname;
		for ( var i = 0, len = V3SA.files.length; i < len; i++ ) {
			file = V3SA.files[ i ];

			if ( file[0] === 'Title' ) {
				fileList += '<h3 style=margin-bottom:0; >' + file[1] + '</h3>';
			} else {
//				fileList += '<a href=JavaScript:loadFile("' + file[0] + '"); >' + file[0].split('/').pop() + '</a> ' + file[1] + '<br>';
				title = 
				scale = file[1];
				title = file[2] ? file[2] : '';
				fileList += '<a href=JavaScript:' +
				'JAFO.appendUrl("' + file[0] + '",' + scale + '); title="' + title + '" >' + file[0].substr( 1 + file[0].lastIndexOf( '/' ) ) + '</a><br>';
			}

		}

		V3SA.Va3cSamplesTab.innerHTML =
			'<p title="Data brought in from a variety of sources" >' +
				'The files below are sourced from various <a href="https://github.com/va3c/" target="_blank">vA3C samples repositories</a>.' +
//				'These files were produced during the AEC Hackathon. Not all files load. ' +
//				'Be careful: most files are Three.js scenes and overwrite the current scene.' +
			'</p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3SA.Va3cSamplesTab); ); >Close</a> ' +
			'</p>' +
		'';
	}

	V3SA.files = [

		[ 'Title','<a href=https://github.com/va3c/3d-warehouse-samples >3D Warehouse Samples - Three.js JSON 3.1</a>'],
		[ V3SA.warehouse3DBasePath + 'robie-house/untitled/robie-house.js', 1, '1909 - slow but worth it'],
		[ V3SA.warehouse3DBasePath + 'schroder-house/untitled/schroder-house.js', 1, '1909'],
		[ V3SA.warehouse3DBasePath + 'villa-savoye/images/villa-savoye.js', 1, '1929'],
		[ V3SA.warehouse3DBasePath + 'barcelona-pavilion/untitled/barcelona-pavilion.js', 1, '1930'],
		[ V3SA.warehouse3DBasePath + 'glass-house/untitled/glass-house.js', 1, '1949'],

		[ 'Title','<a href=https://github.com/va3c/3d-warehouse-samples >3D Warehouse Samples - Collada</a>'],
		[ V3SA.warehouse3DBasePath + 'monkey.dae', 1, 'Suzanne - zoom extents issues'],
		[ V3SA.warehouse3DBasePath + 'robie-house/robie-house.dae', 1, '1909 may freeze browser!!!'],
		[ V3SA.warehouse3DBasePath + 'schroder-house/schroder-house.dae', 1, '1919'],
		[ V3SA.warehouse3DBasePath + 'villa-savoye/models/villa-savoye.dae', 1, '1929'],
		[ V3SA.warehouse3DBasePath + 'barcelona-pavilion/barcelona-pavilion.dae', 1, '1930'],
		[ V3SA.warehouse3DBasePath + 'glass-house/glass-house.dae', 1, '1949 - slow loading'],


		['Title','Programming 3D Applications - Three.js JSON' ],
		[ V3SA.programming3DApplicationsBasePath + 'ball_chair/ball_chair.js', 1, '' ],
//		[ V3SA.programming3DApplicationsBasePath + 'duck/duck.json', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'egg_chair/eggchair.js', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'flashdrive/flashdrive.Plane.js', 1, '' ],
//		[ V3SA.programming3DApplicationsBasePath + 'futurgo_mobile/futurgo_mobile.json', 1, '' ],  // binary

		['Title','Programming 3D Applications - Collada' ],
		[ V3SA.programming3DApplicationsBasePath + 'duck.dae', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'Cottus_Elec/cottus_elec.DAE', 1, 'add lights' ],
		[ V3SA.programming3DApplicationsBasePath + 'Cottus_Rktlauncher/cottus_rktlauncher.DAE', 1, 'add lights' ],
		[ V3SA.programming3DApplicationsBasePath + 'Cottus_Twincannon/cottus_twincannon.DAE', 1, 'add lights' ],
		[ V3SA.programming3DApplicationsBasePath + 'futurgo/futurgo.dae', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'futurgo_city/futurgo_city.dae', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'futurgo_mobile/futurgo_mobile.dae', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'rambler/Rambler.dae', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'ruins/Ruins_dae.dae', 1, '' ],
		[ V3SA.programming3DApplicationsBasePath + 'vc/vc.dae', 1, '' ],

		['Title','NASA Samplez - OBJ / STL ' ],
		[ V3SA.nasaSamplesBasePath + 'obj/acesjustforroomshow.obj', 20, '' ],
		[ V3SA.nasaSamplesBasePath + 'stl/Block_Island_08152013.stl', 1, '' ],
		[ V3SA.nasaSamplesBasePath + 'stl/cassini.stl', 1, '' ],
		[ V3SA.nasaSamplesBasePath + 'stl/Dawn_19.stl', 1, '' ],
		[ V3SA.nasaSamplesBasePath + 'stl/Stardust_35.stl', 1, '' ]
	]