
	var JSONFileList =[
		['Title', 'Three.js Samples - ~3'],
		['../../samples/WaltHeadLo.js','for testing'],
		['../../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js',''],

		['Title','Revit vA3C Samples - 4.3'],
// 		['../../../../json/revit/Project2.rvt.js','Revit file'], // not

		['../../../../json/DrCyanKlein.json',''],
		['../../../../json/DrMajentaKlein.json',''],
		['../../../../json/Hex_01.js',''],
		['../../../../json/MissSpacyEyes.json',''],
		['../../../../json/TTX.json',''],
		['../../../../json/TypTower.json',''],
		['../../../../json/Vase_01.js',''],
		['../../../../json/3dsmax/test_3dsmax.js',''],
		['../../../../json/3dsmax/TransamericaPyramid2.js',''],
		['../../../../json/aeron/hey-ron.js',''],
		['../../../../json/lounge/scrounge.js',''], 
		['../../../../json/revit/WallWindow.rvt.js',''],
		['../../../../json/revit/Project2.rvt.js',''],
		['../../../../json/revit/rac_basic_sample_project.rvt.js','Revit file'],
		['Title','3D Warehouse Samples - 3.1'],
		['../../../../3d-warehouse-samples/robie-house/untitled/robie-house.js','1909 - loads slowly but worth the wait'],
		['../../../../3d-warehouse-samples/schroder-house/untitled/schroder-house.js','1909'],
		['../../../../3d-warehouse-samples/villa-savoye/images/villa-savoye.js','1929'],
		['../../../../3d-warehouse-samples/barcelona-pavilion/untitled/barcelona-pavilion.js','1930'],
		['../../../../3d-warehouse-samples/glass-house/untitled/glass-house.js','1949']
	];



	

		var JSONLinkList = '<br>';
		var file;
		for ( var i = 0, len = JSONFileList.length; i < len; i++ ) {
			file = JSONFileList[ i ];
			if ( file[0] === 'Title' ) {
				JSONLinkList += '<h3>' + file[1] + '</h3>';
			} else {
				JSONLinkList += '<a href=JavaScript:loadFile("' + file[0] + '"); >' + file[0].split('/').pop() + '</a> ' + file[1] + '<br>';
			}
		}

	var lightAmbient, lightPoint, lightDirectional;
	var zoomSphere;

	function zoomExtents( testing ) {

		scale = 1; // scene.children[3].scale.x;
		var meshes = 0;
		var c, r;
		var geo = new THREE.Geometry();
		scene.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh && child.name !== 'zoomSphere' ) {
				geo.merge( child.geometry );
// while traversing, miht as well do this...
				child.castShadow = true;
				child.receiveShadow = true;
				meshes++;
			}
		} );

		geo.computeBoundingSphere();
		c = geo.boundingSphere.center.multiplyScalar( scale );
		controls.target.set( c.x, c.y, c.z);
		r = 1.25 * geo.boundingSphere.radius * scale;
		camera.position.set( (c.x + r), ( c.y + r ), ( c.z + r ) );


		if ( zoomSphere ) { scene.remove( zoomSphere ); }

		if ( testing ) {

			scene.add( new THREE.AxisHelper( 50 ) );

			geometry = new THREE.SphereGeometry( r );
			material = new THREE.MeshNormalMaterial( { opacity: 0.5, transparent: true, wireframe: true } );
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

/*
		if ( camera.far < r || camera.far >  3 * r ) {
			camera.far = 5 * r;
			camera.updateProjectionMatrix();
console.log( 'camera.far', camera.far );
		}
*/

console.log( 'camera.near', camera.near, 'camera.far', camera.far );
		camera.near = ( r < 100 ) ? r * 0.01 : 1;
		camera.far = ( r > 10000 ) ? r * 10000 : 10000;
		camera.updateProjectionMatrix();
console.log( 'camera.near', camera.near, 'camera.far', camera.far );

		updateShadows( c, r, testing );

	}

	function updateShadows( cen, rad, testing ) {

		var lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );

		lightDirectional.castShadow = true;
		lightDirectional.shadowMapWidth = 2048;
		lightDirectional.shadowMapHeight = 2048;

		cenObj = new THREE.Object3D();
		cenObj.position.set( cen.x, cen.y, cen.z )
		lightDirectional.position.set( -rad + cen.x, rad + cen.y, rad + cen.z );
		lightDirectional.target = cenObj;

		lightDirectional.shadowCameraLeft = -rad;
		lightDirectional.shadowCameraRight = rad;
		lightDirectional.shadowCameraTop = rad;
		lightDirectional.shadowCameraBottom = -rad;

		lightDirectional.shadowCameraNear = 0;
		lightDirectional.shadowCameraFar = 3 * rad;
		lightDirectional.updateMatrix();
		lightDirectional.updateMatrixWorld();  

		if ( testing ) { lightDirectional.shadowCameraVisible = true; }
		scene.add( lightDirectional );
	}

	function requestFile ( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous"; 
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	};
