	var VA3C = {};
//	var info, stats, renderer, scene, camera, controls;

	var obj, light;

    var lastMeshMaterial, lastMeshID, lastObjectMaterial, lastObjectID;
	
	var latlon, latlong = [42.3482, -75.189];
	
//	VA3C.fname = '../json/MissSpacyEyes.json';
//	VA3C.fname = '../RvtVa3c/models/Wall.rvt.js';
//	VA3C.fname = '../json/Project2.rvt.js';
	VA3C.fname = '../RvtVa3c/rac_basic_sample_project.rvt.js';

	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians

	var projector;
	var targetList = [];

	function init(fname) {
		var geometry, material, mesh;
        lastMeshMaterial = -1;
        lastMeshID = -1;
        lastObjectMaterial = -1;
        lastObjectID = -1;

		document.body.style.cssText = 'font: 600 12pt monospace; margin: 0; overflow: hidden' ;

		VA3C.info = document.body.appendChild( document.createElement( 'div' ) );

		VA3C.info.style.cssText = 'background-color: #ccc; left: 20px; opacity: 0.85; position: absolute; top: 35px; ';
		VA3C.info.innerHTML = '<h1>' + document.title + '</h1>' +
			'<div id=msg style=font-size:10pt;padding:8px; ></div>';

		VA3C.stats = new Stats();
		VA3C.stats.domElement.style.cssText = 'bottom: 0; position: absolute; left: 0; zIndex: 100; ';
		document.body.appendChild( VA3C.stats.domElement );

		VA3C.renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		VA3C.renderer.setSize( window.innerWidth, window.innerHeight );
		VA3C.renderer.shadowMapEnabled = true;
		document.body.appendChild( VA3C.renderer.domElement );
		VA3C.scene = new THREE.Scene();

		VA3C.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100000 );
		VA3C.camera.position.set( 15000, 15000, 15000 );
		VA3C.controls = new THREE.OrbitControls( VA3C.camera, VA3C.renderer.domElement );

		projector = new THREE.Projector();
		document.addEventListener( 'click', clickHandler, false );

		loadJS( fname );
		//loadJS( VA3C.fname );
	}
    
//  Loading Sketchup File [Collada .dae] - not fully finished  
//
//  function loadDAE (fname) {
//     	var dae, skin;
//     	var loader = new THREE.ColladaLoader();
// 			loader.options.convertUpAxis = true;
// 			loader.load( fname, function ( collada ) {
//         		dae = collada.scene;
//         		skin = collada.skins[ 0 ];
        
//         		dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
//         		dae.updateMatrix();
//         	});
//     }
			
	function loadJS (fname) {
		if ( VA3C.scene ) VA3C.scene.remove( obj );
		targetList = [];
		var loader = new THREE.ObjectLoader();
        loader.load( fname, function( result ){
			VA3C.scene = result;

// lights
		VA3C.scene.add( new THREE.AmbientLight( 0x444444 ) );

		updateLight();

// axes
            VA3C.scene.add( new THREE.ArrowHelper( v(1, 0, 0), v(0, 0, 0), 30, 0xcc0000) );
            VA3C.scene.add( new THREE.ArrowHelper( v(0, 1, 0), v(0, 0, 0), 30, 0x00cc00) );
            VA3C.scene.add( new THREE.ArrowHelper( v(0, 0, 1), v(0, 0, 0), 30, 0x0000cc) );

// ground box
            geometry = new THREE.BoxGeometry( 20000, 100, 20000 );
            material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( 0, -10, 0 );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            VA3C.scene.add( mesh );

            //call compute function
            computeNormalsAndFaces();
        });
	}

	function updateLight() {
			if ( light ) { VA3C.scene.remove( light ); }

            light = new THREE.DirectionalLight( 0xffffff, 1 );
// (year, month, day, hour, minutes, sec, lat, long)
			latlon = sunPosition( 2014, month.value, day.value, hour.value, 60, 0, latlong[0], latlong[1]  );
// console.log ( latlon );
			var pos = convertPosition(  latlon[0], latlon[1], 10000 );
		// var pos = convertPosition(  43, -75, 10000 );

            light.position = pos;
            light.castShadow = true;
            light.shadowMapWidth = 2048;
            light.shadowMapHeight = 2048;
            var d = 10000;
            light.shadowCameraLeft = -d;
            light.shadowCameraRight = d;
            light.shadowCameraTop = d * 2;
            light.shadowCameraBottom = -d * 2;

            light.shadowCameraNear = 1000;
            light.shadowCameraFar = 20000;
//            light.shadowCameraVisible = true;
            VA3C.scene.add( light );
	}

	function convertPosition( lat, lon, radius ) {
		var rc = radius * Math.cos( lat * d2r );
		return v( rc * Math.cos( lon * d2r ), radius * Math.sin( lat * d2r ), rc * Math.sin( lon * d2r) );
	}

	function getComboA(sel) {
// console.log( sel );
			var value = sel.value;
			//alert(value);
			// var latlong;
			switch(value) {
			case "New York":
				latlong = [42.3482, -75.189];
				break;
			case "Sao Paulo":
				latlong = [-23.55, -46.633];
				break;
			case "Paris":
				latlong = [48.8567, 2.3508];
				break;
			case "Moscow":
				latlong = [55.75, 37.6167];
				break;
			case "Tokyo":
				latlong = [35.6895, 139.6917];
				break;
			default:
				latlong = [42.3482, -75.189];
			} 
			//tokyoLatitude:35.6895, Longitude:139.6917 
			//New York coordinates
			//Latitude:42.3482, Longitude:-75.189
			//saoaulo
			//Latitude:-23.55, Longitude:-46.633 
			//Moscow coordinates
			//Latitude:55.75, Longitude:37.6167
			//Paris coordinates
			//Latitude:48.8567, Longitude:2.3508
//			alert(latlong);
			updateLight();
		}

	function resetCamera() {
		VA3C.controls.target.set( 0, 0, 0  );
		VA3C.camera.position.set( 15,000, 15000, 15000 );
		VA3C.camera.up = v( 0, 1, 0 );
	}

    function zoomExtents(){

        //found this method here: https://github.com/mrdoob/three.js/issues/1424
        // Compute world AABB and radius (approx: better compute BB be in camera space)
        var aabbMin = new THREE.Vector3();
        var aabbMax = new THREE.Vector3();
        var radius = 0;
        //loop over the meshes in the platypus scene
        for (var m = 0; m < VA3C.scene.children.length; m++)
        {
            try {
                //if mesh,
                if(VA3C.scene.children[m].hasOwnProperty("geometry"))
                {
                    var geo = VA3C.meshes[m].Three_Meshes.geometry;
                    geo.computeBoundingBox();

                    aabbMin.x = Math.min(aabbMin.x, geo.boundingBox.min.x);
                    aabbMin.y = Math.min(aabbMin.y, geo.boundingBox.min.y);
                    aabbMin.z = Math.min(aabbMin.z, geo.boundingBox.min.z);
                    aabbMax.x = Math.max(aabbMax.x, geo.boundingBox.max.x);
                    aabbMax.y = Math.max(aabbMax.y, geo.boundingBox.max.y);
                    aabbMax.z = Math.max(aabbMax.z, geo.boundingBox.max.z);
                }

                //if object3d or whatever, figure out how to get a bounding box
                else{
                    var obj = VA3C.scene.children[m].children[0].geometry;
                    obj.computeBoundingBox();

                    aabbMin.x = Math.min(aabbMin.x, obj.boundingBox.min.x);
                    aabbMin.y = Math.min(aabbMin.y, obj.boundingBox.min.y);
                    aabbMin.z = Math.min(aabbMin.z, obj.boundingBox.min.z);
                    aabbMax.x = Math.max(aabbMax.x, obj.boundingBox.max.x);
                    aabbMax.y = Math.max(aabbMax.y, obj.boundingBox.max.y);
                    aabbMax.z = Math.max(aabbMax.z, obj.boundingBox.max.z);

                }
            } catch (e) {
                console.log("VA3C zoom extents error in mesh loop: " + e);
            }
        }

        // Compute world AABB center
        var aabbCenter = new THREE.Vector3();
        aabbCenter.x = (aabbMax.x + aabbMin.x) * 0.5;
        aabbCenter.y = (aabbMax.y + aabbMin.y) * 0.5;
        aabbCenter.z = (aabbMax.z + aabbMin.z) * 0.5;

        // Compute world AABB "radius" (approx: better if BB height)
        var diag = new THREE.Vector3();
        diag = diag.subVectors(aabbMax, aabbMin);
        radius = diag.length() * 0.5;

        // Compute offset needed to move the camera back that much needed to center AABB (approx: better if from BB front face)
        var offset = radius / Math.tan(Math.PI / 180.0 * VA3C.controls.object.fov * 0.5);
        //console.log(offset);

        // Compute new camera position
        var vector = new THREE.Vector3(0,0,1);
        var dir = vector.applyQuaternion(VA3C.controls.object.quaternion);
        //var dir = VA3C.cameraControls.object.matrix.getColumnZ();
        dir.multiplyScalar(offset);
        var newPos = new THREE.Vector3();
        newPos.addVectors(aabbCenter, dir);

        //set camera position and target
        VA3C.controls.object.position = newPos;
        VA3C.controls.object.target = aabbCenter;
    }

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

	function animate() {
		requestAnimationFrame( animate );
		VA3C.renderer.render( VA3C.scene, VA3C.camera );
		VA3C.controls.update( );
		VA3C.stats.update();
	}

	function computeNormalsAndFaces() {
		for(var i=0; i<VA3C.scene.children.length; i++){
			if( VA3C.scene.children[i].hasOwnProperty("geometry")){
				VA3C.scene.children[i].geometry.mergeVertices();
				VA3C.scene.children[i].castShadow = true;
				VA3C.scene.children[i].geometry.computeFaceNormals();
                targetList.push( VA3C.scene.children[i] );
			}
            if( VA3C.scene.children[i].children.length > 0 ){
                for (var k=0; k<VA3C.scene.children[i].children.length ; k++){
                    if(VA3C.scene.children[i].children[k].hasOwnProperty("geometry")){
                        targetList.push(VA3C.scene.children[i].children[k]);
                    }
                }
            }
		}
	}

    var selMaterial;

	function displayAttributes( obj ) {
		msg.innerHTML = '';
		var arr = Object.keys( obj );
		for (var i = 0, len = arr.length; i < len; i++) {
			if ( obj[arr[i]] != undefined) {
				if ( obj[arr[i]].indexOf('http') == 0) {
					msg.innerHTML += '<a href="'+obj[arr[i]]+'">Click here</a><br>';
				} else {
					msg.innerHTML += arr[i] + ': ' + obj[ arr[i] ] + '<br>';
				}
			}
		}
	}


    function clickHandler(event){
// console.log( event );
        event.preventDefault();

        selMaterial = new THREE.MeshBasicMaterial( { color: 'red', side: '2' });   //color for selected mesh element

        //When clicking without selecting object, replace temp material for meshes and object3D
        if(lastMeshMaterial!=-1)
        {
            //reset last material for last lastMeshID
            for(var i = 0; i < VA3C.scene.children.length;i++)
            {
                if (VA3C.scene.children[i].id == lastMeshID)
                {
                    VA3C.scene.children[i].material = lastMeshMaterial;
                }
            }
        }

        if(lastObjectMaterial!=-1)
        {
            //reset last material for last lastObjectID
            for(var i = 0; i < VA3C.scene.children.length;i++)
            {
                if (VA3C.scene.children[i].id == lastObjectID)
                {
                    for (var ii = 0; ii < VA3C.scene.children[i].children.length;ii++)
                    {
                        VA3C.scene.children[i].children[ii].material = lastObjectMaterial;
                    }

                }
            }
        }


        var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        projector.unprojectVector( vector, VA3C.camera );

        var raycaster = new THREE.Raycaster( VA3C.camera.position, vector.sub( VA3C.camera.position ).normalize() );
        //var raycaster = new THREE.Raycaster( VA3C.camera.position, vector.sub( ).normalize() );

        var intersects = raycaster.intersectObjects( targetList );
        //var intersects = raycaster.intersectObjects( VA3C.scene.children.geometry );

        if ( intersects.length > 0 ) {

         //   intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
         //console.log(intersects[0].object.userData);

         var j =0;
         while(j<intersects.length){
             //FOR MESHES:
             if(!$.isEmptyObject(intersects[j].object.userData)){
                 console.log(intersects[j].object.userData);


                 if(lastMeshMaterial!=-1)
                 {
                     //reset last material for last lastMeshID
                     for(var i = 0; i < VA3C.scene.children.length;i++)
                     {
                         if (VA3C.scene.children[i].id == lastMeshID)
                         {
                             VA3C.scene.children[i].material = lastMeshMaterial;
                         }
                     }
                 }

                 //set lastMaterial
                 lastMeshMaterial = intersects[j].object.material;

                 //set lastMeshID
                 lastMeshID = intersects[j].object.id;

                 //apply SelMaterial
                 intersects[j].object.material = selMaterial;


                displayAttributes( intersects[j].object.userData );

                 break;
             }
             //FOR OBJECT3D
             if(!$.isEmptyObject(intersects[j].object.parent.userData)){
                 console.log(intersects[j].object.parent.userData);

                 if(lastObjectMaterial!=-1)
                 {
                     //reset last material for last lastObjectID
                     for(var i = 0; i < VA3C.scene.children.length;i++)
                     {
                         if (VA3C.scene.children[i].id == lastObjectID)
                         {
                             for (var ii = 0; ii < VA3C.scene.children[i].children.length;ii++)
                             {
                                 VA3C.scene.children[i].children[ii].material = lastObjectMaterial;
                             }

                         }
                     }
                 }

                 //set lastMaterial
                 lastObjectMaterial = intersects[j].object.material;

                 //set lastObjectID
                 lastObjectID = intersects[j].object.parent.id;

                 //apply SelMaterial
                 intersects[j].object.material = selMaterial;

                displayAttributes( intersects[j].object.parent.userData );
                 break;
             }
             j++;
         }

        } else {
			msg.innerHTML = '';
		}
	}
