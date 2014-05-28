
	var V3FO = {};

	V3FO.addFileOpen = function() {
		var fileOpenButton = V3AA.menu.appendChild( document.createElement( 'div' ) );

		fileOpenButton.innerHTML =
			'<a href=# onclick=V3AA.openDialog(V3FO.fileOpen); ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> File Open...' +
			'</p></a>'; 

		V3FO.fileOpen = container.appendChild( document.createElement( 'div' ) );
		V3FO.fileOpen.style.cssText = 'display: none; background-color: #ccc; opacity: 0.9; padding: 0 20px 20px; ' +
			'bottom: 0; height: 550px; left: 0;  margin: auto; position: absolute; right: 0; top: 0; width: 450px; ';

// remember: no spaces in the JS below or add quotes
		V3FO.fileOpen.innerHTML =
			'<div>' +
				'<h3><i class="fa fa-file-image-o"></i> File Open</h3>' +
				'<p><small><i>Open files locally or from an URL...</i></small></p>' +

				'<input type=radio name=filesFO onclick=V3PL.files=this.value value="replace" checked=' + ( V3PL.files === 'replace' ) + ' />Replace - new file erases current scene<br>' +
				'<input type=radio name=filesFO onclick=V3PL.files=this.value value="append" />Append - new file added to current scene<br>' +

				'Add random gradient background <input type=checkbox id=chkGradient /><br> ' +
				'Add ground plane <input type=checkbox id=chkGroundPlane /><br> ' +
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
				'<select id=selSample ></select>' +

				'<h4>Or: Select a local file</h4>' +
				'<input type=file id=inpFile >' +

				'<h4>Or: Drag and Drop a local file</h4>' +
				'<span>TBD</span>' +

				'<h4>Or: Paste a JSON URL</h4>' +
				'<input type=text id=inpURL style=width:450px; ></br>' +
//				'Sample URL: <a href=JavaScript:V3FO.operation="loadURL";V3FO.data="http://va3c.github.io/json/revit/Project2.rvt.js"; );>Revit Project 2</a><br>' +
				'Sample <a href=# id=linkSample1 >Revit Project 2</a> ' +
				'Sample <a href=# id=linkSample2 >Revit Project 2</a> ' +
				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:V3AA.openDialog(); >Cancel</a> ' +
					'<a class=button href=JavaScript:V3FO.open(); >Open</a>' +
				'</p>' +
			'</div>';

		V3FO.fileOpen.title = 'Open a new file';

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

		selSample.onchange = function() { V3FO.clearSelect( 1); V3FO.operation = "loadFile"; V3FO.data = "../../../json/" + V3FO.samples[ this.selectedIndex ]; };

		inpFile.onchange = function() { V3FO.clearSelect( 2 ); V3FO.operation = "readFile"; V3FO.data = this; };

		inpURL.onchange = function() { V3FO.clearSelect( 3 ); V3FO.operation = "loadURL"; V3FO.data = this.value; };
		linkSample1.onclick = function() { V3FO.clearSelect( 3 ); inpURL.value = "../../../json/revit/Project2.rvt.js";  V3FO.operation="loadURL"; V3FO.data = inpURL.value; };
		linkSample2.onclick = function() { V3FO.clearSelect( 3 ); inpURL.value = "http://va3c.github.io/json/revit/Project2.rvt.js";  V3FO.operation="loadURL"; V3FO.data = inpURL.value; };

	};

	V3FO.clearSelect = function( select ) {
		if ( select !== 1 ) selSample.selectedIndex = 0;
		if ( select !== 2 ) inpFile.value = '';
		if ( select !== 3 ) inpURL.value = '';

	};

	V3FO.open = function () {
		V3AA.openDialog(); // closes any open dialog
		if ( V3FO.operation === 'loadFile' ) V3FO.loadFile( V3FO.data );
		if ( V3FO.operation === 'readFile' ) V3FO.readFile( V3FO.data );
		if ( V3FO.operation === 'loadURL' ) V3FO.loadURL( V3FO.data );
	};

	V3FO.loadFile = function ( fname ) {
		V3FO.fname = fname;

// prettify the demo files
		chkGroundPlane.checked = ( V3FO.fname.search('sample_project') > -1 ) ? false : true;

		if ( V3FO.fname.search('MissSpacyEyes') > -1 ||
			V3FO.fname.search('TTX.json') > -1 ||
			V3FO.fname.search('Vase_01') > -1
		) {
			V3PL.sclX = 5; V3PL.sclY = 5; V3PL.sclZ = 5; 
		} else {
			V3PL.sclX = V3PL.sclY = V3PL.sclZ = 1; 
		}

// WIP: break out thing stuff into a function and apply to all three

		var loader = new THREE.ObjectLoader();
        loader.load( fname, function( result ){
			if ( V3PL.files === 'replace' ) {
				V3FO.targetList = [];
				scene = new THREE.Scene();
				V3AA.addAssets();
				V3SU.addLights();
			}
			V3FO.things = new THREE.Object3D();
			V3FO.things.add( result );
			V3FO.things.position.set( V3PL.posX, V3PL.posY, V3PL.posZ );
			V3FO.things.rotation.set( V3PL.rotX, V3PL.rotY, V3PL.rotZ );
			V3FO.things.scale.set( V3PL.sclX, V3PL.sclY, V3PL.sclZ );
			scene.add( V3FO.things );

			V3FO.computeNormalsAndFaces( V3FO.things.children[0] );
        });
	};

	V3FO.readFile = function ( that ){
		var loader = new THREE.ObjectLoader();
		if ( that.files && that.files[0]){
			var reader = new FileReader();
			reader.onload = function ( event ) {  
				V3FO.targetList = [];
				var data = JSON.parse( event.target.result );
				scene = loader.parse( data );
				V3AA.addAssets();
				V3SU.addLights();
// console.log( scene );
				V3FO.computeNormalsAndFaces( scene );
			};
			reader.readAsText( that.files[0] );
		}
	};

	V3FO.loadURL = function  ( url ) {
		var loader = new THREE.ObjectLoader();
		var data = V3FO.requestFile( url );
		var result = JSON.parse( data );
		if ( V3PL.files === 'replace' ) {
			V3FO.targetList = [];
			scene = new THREE.Scene();
			V3AA.addAssets();
			V3SU.addLights();
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

		V3FO.computeNormalsAndFaces( thing.children[0] );
	};

	V3FO.requestFile = function ( fname ) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.crossOrigin = "Anonymous"; 
		xmlHttp.open( 'GET', fname, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	};

	V3FO.computeNormalsAndFaces = function( obj ) {
		
//console.log( obj );
		for ( var i = 0, iLen = obj.children.length, items; i < iLen; i++ ) {
			items = obj.children;
			if ( items[i].hasOwnProperty("geometry") ) {
				items[i].geometry.mergeVertices();
				items[i].geometry.computeFaceNormals();
				items[i].castShadow = true;
				items[i].receiveShadow = true;
				V3FO.targetList.push( items[i] );
			}
			if ( items[i].children.length > 0 ){
				V3FO.attributes = 'revit-style';
				var itemsChildren = items[i].children;
				for ( var k = 0, kLen = itemsChildren.length; k < kLen; k++ ) {
					if ( itemsChildren[k].hasOwnProperty("geometry") ) {
//console.log( itemsChildren[k]  );
						V3FO.targetList.push( itemsChildren[k] );
					}
				}
			}
		}
//console.log( V3FO.targetList );
	};
