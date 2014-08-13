
	var JSONFileList = [
		['Title', 'Three.js Samples - ~3'],
		['../../samples/WaltHeadLo.js','for testing'],
		['../../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js',''],
		['../../../../../three.js/examples/obj/cubecolors/cubecolors.js',''],
		['../../../../../three.js/examples/obj/female02/Female02_slim.js',''],
		['../../../../../three.js/examples/obj/leeperrysmith/LeePerrySmith.js',''],

		['Title','vA3C Hackathon Samples - 4.3'],
		['../../../../json/DrCyanKlein.json','Revit'],
		['../../../../json/DrMajentaKlein.json','Revit'],
		['../../../../json/Hex_01.js','Grasshopper'],
		['../../../../json/MissSpacyEyes.json','Grasshopper'],
		['../../../../json/TTX.json','Grasshopper'],
		['../../../../json/TypTower.json','Grasshopper'],
		['../../../../json/Vase_01.js','Grasshopper'],
		['../../../../json/3dsmax/test_3dsmax.js','3DS'],
		['../../../../json/3dsmax/TransamericaPyramid2.js','3DS'],
		['../../../../json/aeron/hey-ron.js','3DS'],
		['../../../../json/lounge/scrounge.js','3DS'], 
		['../../../../json/revit/WallWindow.rvt.js','Revit'],
		['../../../../json/revit/Project2.rvt.js','Revit'],
		['../../../../json/revit/rac_basic_sample_project.rvt.js','Revit'],

		['Title','3D Warehouse Samples - 3.1'],
		['../../../../3d-warehouse-samples/robie-house/untitled/robie-house.js','1909 - slow but worth it'],
		['../../../../3d-warehouse-samples/schroder-house/untitled/schroder-house.js','1909'],
		['../../../../3d-warehouse-samples/villa-savoye/images/villa-savoye.js','1929'],
		['../../../../3d-warehouse-samples/barcelona-pavilion/untitled/barcelona-pavilion.js','1930'],
		['../../../../3d-warehouse-samples/glass-house/untitled/glass-house.js','1949'],

		['Title','Programming 3D Applications'],
		['../../../../../Programming3DApplications/models/ball_chair/ball_chair.js',''],
//		['../../../../../Programming3DApplications/models/duck/duck.json',''],
		['../../../../../Programming3DApplications/models/egg_chair/eggchair.js',''],
		['../../../../../Programming3DApplications/models/flashdrive/flashdrive.Plane.js','']
//		['../../../../../Programming3DApplications/models/futurgo_mobile/futurgo_mobile.json',''],  // binary

	];

	var lightAmbient, lightPoint, lightDirectional;
	var zoomSphere;

	function getJSONLinkList() {
		var JSONLinkList = '<br>';
		var file;
		for ( var i = 0, len = JSONFileList.length; i < len; i++ ) {
			file = JSONFileList[ i ];
			if ( file[0] === 'Title' ) {
				JSONLinkList += '<h3 style=margin-bottom:0; >' + file[1] + '</h3>';
			} else {
				JSONLinkList += '<a href=JavaScript:loadFile("' + file[0] + '"); >' + file[0].split('/').pop() + '</a> ' + file[1] + '<br>';
			}
		}
		return JSONLinkList;
	}

	var binaryJSONFileList = [
		['Title', 'Three.js Samples - ~3'],
		['Bird.js','','Bird.js - broken'],
		['Qrcode.js','','Qrcode.js - broken'],
		['Suzanne.js','','Suzanne.js'],
		['terrain.js','','terrain.js'],
		['WaltHeadLo.js','','WaltHeadLo.js'],
		['blenderscene/scene.Cube.js','','blenderscene/scene.Cube.js'],
		['blenderscene/scene.js','','blenderscene/scene.js'],
		['blenderscene/scene.Monkey.js','','blenderscene/scene.Monkey.js'],
		['blenderscene/scene.Plane.js','','blenderscene/scene.Plane.js'],
		['box/box.js','ok',],
		['camaro/CamaroNoUv_bin.js','oj'],
		['cubecolors/cubecolors.js',''],
		['cubecolors/cube_fvc.js',''],
		['f50/F50NoUv_bin.js','ok'],
		['female02/Female02_bin.js','ok',],
		['female02/Female02_slim.js',''],
		['gallardo/GallardoNoUv_bin.js','ok'],
		['gallardo/parts/gallardo_body_bin.js','ok'],
		['gallardo/parts/gallardo_wheel_bin.js','ok'],
		['leeperrysmith/LeePerrySmith.js',''],
		['lightmap/lightmap.js',''],
		['lucy/Lucy100k_bin.js','ok'],
		['lucy/Lucy100k_slim.js',''],
		['male02/Male02_bin.js','ok'],
		['male02/Male02_dds.js',''],
		['male02/Male02_slim.js',''],
		['ninja/NinjaLo_bin.js','ok'],
		['suzanne/suzanne.js',''],
		['suzanne/suzanne.Monkey.003.js',''],
		['suzanne/suzanneHi.js',''],
		['suzanne/suzanneHi.Monkey.003.js',''],
		['tree/tree.js',''],
		['veyron/VeyronNoUv_bin.js','ok'],
		['veyron/parts/veyron_body_bin.js','ok'],
		['veyron/parts/veyron_wheel_bin.js','ok'],
		['walt/WaltHead.obj',''],
		['walt/WaltHead_bin.js','ok'],
		['walt/WaltHead_slim.js',''],
	];

	function getBinaryJSONLinkList() {
		var JSONLinkList = '<br>';
		var file;
		for ( var i = 0, len = binaryJSONFileList.length; i < len; i++ ) {
			file = binaryJSONFileList[ i ];
			if ( file[0] === 'Title' ) {
				JSONLinkList += '<h3 style=margin-bottom:0; >' + file[1] + '</h3>';
			} else {
				JSONLinkList += '<a href=JavaScript:loadFile("../../../../../three.js/examples/obj/' + file[0] + '"); >' + file[0].split('/').pop() + '</a> ' + file[1] + '<br>';
			}
		}
		return JSONLinkList;
	}

	function zoomExtents( scale ) {
		if ( zoomSphere ) { scene.remove( zoomSphere ); }

		scale = scale ? scale : 1; // scene.children[3].scale.x;
		var meshes = 0, c, r;
		var geo = new THREE.Geometry();
		scene.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				geo.merge( child.geometry );
// while traversing, might as well do this...
				child.castShadow = true;
				child.receiveShadow = true;
				meshes++;
			}
		} );

		geo.computeBoundingSphere();
		c = scene.extentsCenter = geo.boundingSphere.center.multiplyScalar( scale );
		controls.target.set( c.x, c.y, c.z);
		r = scene.extentsRadius = 1.25 * geo.boundingSphere.radius * scale;
		camera.position.set( ( c.x + r), ( c.y + r ), ( c.z + r ) );



		if ( chkZoom.checked ) {

			scene.add( new THREE.AxisHelper( 50 ) );

			geometry = new THREE.SphereGeometry( r );
			material = new THREE.MeshNormalMaterial( { wireframe: true } );
			zoomSphere = new THREE.Mesh( geometry, material );
			zoomSphere.position.set( c.x, c.y, c.z);
			zoomSphere.name = 'zoomSphere';
			scene.add( zoomSphere );

console.log( 'meshes', meshes, 'rad', r, 'scl', scale );
console.log( 'center', c );
console.log( 'target', controls.target );
console.log( 'camera', camera.position );
console.log( 'geo', geo);

		}

//console.log( 'camera.near', camera.near, 'camera.far', camera.far );
		camera.near = ( r < 100 ) ? r * 0.01 : 1;
		camera.far = ( r > 10000 ) ? r * 10000 : 10000;
		camera.updateProjectionMatrix();
//console.log( 'camera.near', camera.near.toFixed( 3 ), 'camera.far', camera.far );

		updateLights( c, r );

	}

	function updateLights( cen, rad ) {

		scene.add( camera );  // needed for light to track

		lightAmbient = new THREE.AmbientLight( 0x555555 );
		scene.add( lightAmbient );

		if ( !lightPoint && camera.children.length < 1 ) {
			lightPoint = new THREE.PointLight( 0xffffff, 1 );
			lightPoint.position = camera.position;
			camera.add( lightPoint );
		}

		lightDirectional = new THREE.DirectionalLight( 0xffffff, 0.5 );
		scene.add( lightDirectional );

		lightDirectional.castShadow = true;
		lightDirectional.shadowMapWidth = 2048;
		lightDirectional.shadowMapHeight = 2048;

		var cenObj = new THREE.Object3D();
		var c = scene.extentsCenter;

		cenObj.position.set( c.x, c.y, c.z );
		var r = scene.extentsRadius;
		lightDirectional.position.set( -r + c.x, r + c.y, r + c.z );
		lightDirectional.target = cenObj;

		lightDirectional.shadowCameraLeft = -rad;
		lightDirectional.shadowCameraRight = rad;
		lightDirectional.shadowCameraTop = rad;
		lightDirectional.shadowCameraBottom = -rad;

		lightDirectional.shadowCameraNear = 0;
		lightDirectional.shadowCameraFar = 3 * rad;
		lightDirectional.updateMatrix();
		lightDirectional.updateMatrixWorld();  

		if ( chkZoom.checked ) { lightDirectional.shadowCameraVisible = true; }

	}

	function requestFile ( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous"; 
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	}
