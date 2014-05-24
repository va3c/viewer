
	var V3FO = {};

	V3FO.addFileOpen = function() {
		fileOpenButton = menu.appendChild( document.createElement( 'div' ) );

		fileOpenButton.innerHTML =
			'<p class=button >' +
				'<a href=# id=fileOpen onclick=fileOpen.style.display="block" >File Open...</a>' +
			'</p>'; 

		fileOpen = document.body.appendChild( document.createElement( 'div' ) );
		fileOpen.style.cssText = 'display: none; background-color: #ccc; left: 50px; opacity: 0.9; padding: 0 20px 20px; ' +
			'bottom: 0; height: 500px; left: 0;  margin: auto; position: absolute; right: 0; top: 0; width: 450px; zIndex:10; ';

// remember: no spaces in the JS below or add quotes
		fileOpen.innerHTML =
			'<div>' +
				'<h3>File Open</h3>' +

				'<input type=radio name=filesFO onclick=V3PL.files=this.value value="replace" checked=' + ( V3PL.files === 'replace' ) + ' >Replace - new file erases current scene<br>' +
				'<input type=radio name=filesFO onclick=V3PL.files=this.value value="append" >Append - new file added to current scene<br>' +

				'<h4>Parameters</h4>' +

				'<table style=width=500px >' +
				'<tr><td>Position: </td><td>X <input type=text class=xyz value=' + V3PL.posX + ' onchange=V3PL.posX=parseInt(this.value,10); ></td>' +
				'<td>Y <input type=text class=xyz value=' + V3PL.posY + ' onchange=V3PL.posY=parseInt(this.value,10); ></td>'  +
				'<td>Z <input type=text class=xyz value=' + V3PL.posZ + ' onchange=V3PL.posZ=parseInt(this.value,10); ></td></tr>' +
				'<tr><td>Rotation: </td><td>X <input type=text class=xyz value=' + (V3PL.rotX * r2d)+ ' onchange=V3PL.rotX=this.value*d2r; ></td>' +
				'<td>Y <input type=text class=xyz value=' + (V3PL.rotY * r2d) + ' onchange=V3PL.rotY=this.value*d2r; ></td>' +
				'<td>Z <input type=text class=xyz value=' + (V3PL.rotZ * r2d) + ' onchange=V3PL.rotZ=this.value*d2r; ></td></tr>' +
				'<tr><td>Scale: </td><td>X <input type=text class=xyz value=' + V3PL.sclX + ' onchange=V3PL.sclX=parseInt(this.value,10); ></td>' +
				'<td>Y <input type=text class=xyz value=' + V3PL.sclY + ' onchange=V3PL.sclY=parseInt(this.value,10); ></td>' +
				'<td>Z <input type=text class=xyz value=' + V3PL.sclZ + ' onchange=V3PL.sclZ=parseInt(this.value,10); ></td></tr>' +
				'</table>' +

				'<h4>Select a sample file</h4>' +
//				'<select id=selSample onchange=V3FO.loadFile("../../json/"+V3FO.samples[this.selectedIndex]) ></select>' +
				'<select id=selSample onchange=V3FO.operation="loadFile";V3FO.data="../../json/"+V3FO.samples[this.selectedIndex]; ></select>' +

				'<h4>Select a local file</h4>' +
				'<input type=file onchange=V3FO.operation="readFile";V3FO.data=this; >' +

				'<h4>Drag and Drop a local file</h4>' +
				'<span>TBD</span>' +

				'<h4>Paste a JSON URL</h4>' +
				'<input type=text onchange=V3FO.operation="loadURL";V3FO.data=this.value; style=width:450px; ></br>' +
//				'Sample URL: <a href=JavaScript:V3FO.operation="loadURL";V3FO.data="http://va3c.github.io/json/revit/Project2.rvt.js"; );>Revit Project 2</a><br>' +
				'Sample <a href=# onclick=V3FO.operation="loadURL";V3FO.data="../../json/revit/Project2.rvt.js"; >Revit Project 2</a>' +
				'<p style=text-align:right; >' +
					'<span class=button onclick=fileOpen.style.display="none"; >Cancel</span> ' +
					'<span class=button onclick=V3FO.open(); >Open</span>' +
				'</p>' +
			'</div>';
		fileOpen.title = 'Open a different file';

		V3FO.samples = [ 'Select a model...',
//			'DrCyanKlein.json',
			'DrMajentaKlein.json',
			'Hex_01.js', 
			'MissSpacyEyes.json',
			'TTX.json',
			'TypTower.json',
			'Vase_01.js',
			'3dsmax/TransamericaPyramid2.js',
			'revit/Project2.rvt.js',
			'revit/rac_basic_sample_project.rvt.js'
		];

		for (var len = V3FO.samples.length, option, i = 0; i < len; i++) {
			option = document.createElement( 'option' );
			option.innerText = V3FO.samples[i];
			selSample.appendChild( option );
		}
	};

	V3FO.open = function () {
		if ( V3FO.operation === 'loadFile' ) V3FO.loadFile( V3FO.data );
		if ( V3FO.operation === 'readFile' ) V3FO.readFile( V3FO.data );
		if ( V3FO.operation === 'loadURL' ) V3FO.loadURL( V3FO.data );
	};

	V3FO.loadFile = function (fname) {
		var loader = new THREE.ObjectLoader();
        loader.load( fname, function( result ){
			if ( V3PL.files === 'replace' ) {
				scene = new THREE.Scene();
				addAssets();
			}
			var thing = new THREE.Object3D();
			thing.add( result );
			thing.position.set( V3PL.posX, V3PL.posY, V3PL.posZ );
			thing.rotation.set( V3PL.rotX, V3PL.rotY, V3PL.rotZ );
			thing.scale.set( V3PL.sclX, V3PL.sclY, V3PL.sclZ );
			scene.add( thing );

// console.log( scene, result );
        });
	};

	V3FO.readFile = function ( that ){
		var loader = new THREE.ObjectLoader();
		if ( that.files && that.files[0]){
			var reader = new FileReader();
			reader.onload = function ( event ) {  
				var data = JSON.parse( event.target.result );
				scene = loader.parse( data );
				addAssets();
// console.log( scene );
			};
			reader.readAsText(that.files[0]);
		}
	};

// ../../json/Vase_01.js

	V3FO.loadURL = function  ( url ) {
		var loader = new THREE.ObjectLoader();
		var data = V3FO.requestFile( url );
		var result = JSON.parse( data );
		if ( V3PL.files === 'replace' ) {
			scene = new THREE.Scene();
			addAssets();
		}
		var thing = new THREE.Object3D();
		result = loader.parse( result );
		thing.add( result );
		thing.position.set( V3PL.posX, V3PL.posY, V3PL.posZ );
		thing.rotation.set( V3PL.rotX, V3PL.rotY, V3PL.rotZ );
		thing.scale.set( V3PL.sclX, V3PL.sclY, V3PL.sclZ );
		camera.position.set( V3PL.camX, V3PL.camY, V3PL.camZ );
		controls.target.set( V3PL.tarX, V3PL.tarY, V3PL.tarZ );
		scene.add( thing );
	};

	V3FO.requestFile = function ( fname ) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.crossOrigin = "Anonymous"; 
		xmlHttp.open( 'GET', fname, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	};
