	var V3CC = {};

	V3CC.addCameraControls = function() {
		var cameraControlsButton = V3AA.menu.appendChild( document.createElement( 'div' ) );

		cameraControlsButton.innerHTML =
			'<p class=button >' +
				'<a href=# onclick=V3AA.openDialog(V3CC.cameraControls); ><i class="fa fa-camera"></i> Camera controls...</a>' +
			'</p>'; 

		V3CC.cameraControls = container.appendChild( document.createElement( 'div' ) );


		V3CC.cameraControls.style.cssText = 'display: none; background-color: #ccc; left: 10px; opacity: 0.9; padding: 0 20px 20px; ' +
			'height: 530px; position: absolute; top: 10px; width: 320px; ';
		V3CC.cameraControls.class = 'movable';
		V3CC.cameraControls.addEventListener( 'mousedown', mouseMove, false );

		V3CC.cameraControls.innerHTML =
			'<div>' +
				'<h2><i class="fa fa-camera"></i> Camera Controls</h2>' +
				'<p><a href=JavaScript:V3CC.getOrbitController(); title="best for getting and overview of the whole project" >Orbit Controls</a></p>' +
				'<p><a href=JavaScript:V3CC.getFirstPersonController(); title="Enhanced version. Best for walkthroughs">First Person Controls</a></p>' +
				'<p><small><i>The following are FPC parameters only.</i></small></p>' +
				'<p>' +
					'Freeze <input type=checkbox id=chkFreeze >' +
				'</p>' +

				'<p>' +
					'Look speed <input type=range id=rngLook onmousemove="outpLook.value=value" /> ' +
					'<output id=outpLook >50</output><br>' +
				'</p>' +
				'<p>' +
					'Movement speed <input type=range id=rngMove onmousemove="outpMove.value=value"> ' +
					'<output id=outpMove >5000</output><br>' +
				'</p>' +
				'<div id=msg></div>' +

				'<div style="border:1px solid white; height:200px; overflow-y:scroll; padding: 5px;" ><b>Orbit Controllor</b>' +
					'<ul>' +
						'<li>Rotate: one finger or left mouse down</li>' +
						'<li>Move: two fingers or right mouse down</li>' +
						'<li>Zoom: scroll two fingers or mousewheel</li>' +
					'</ul>' +
				'<b>First Person Controls</b>' +
					'<ul>' +
						'<li>Look around: Scroll one finger or mouse</li>' +
						'<li>Move forward: one finger or left mouse down</li>' +
						'<li>Move back: two fingers or right mouse down</li>' +
						'<li>Speed adjust: adjust sliders or scroll mousewheel</li>' +
						'<li>Stop moving: press space bar or mouse scrollwheel or Freeze checkbox</li>' +
						'<li>Keyboard: use WASD or cursor keys</li>' +
						'<li>The FPC is still very much a work in progress...</li>' +
					'</ul>' +
				'</div>' +

				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:V3AA.openDialog(); >Close</a> ' +
				'</p>' +
			'</div>';

		chkFreeze.onchange = function() { controls.freeze=chkFreeze.checked; };

		rngLook.min = rngMove.min = 0;
		rngLook.max = 100;
		rngMove.max = 10000;
		rngLook.step = 1;
		rngMove.step = 100;
		rngLook.value = 50;
		rngMove.value = 5000;

		rngLook.onchange = function() { controls.lookSpeed = 0.001 * rngLook.value; };
		rngMove.onchange = function() { controls.movementSpeed = 2 * rngMove.value; };

	};

	V3CC.getOrbitController = function() {
		chkFreeze.disabled = true;
//		V3AA.openDialog();
		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.set( V3PL.camX, V3PL.camY, V3PL.camZ );
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.target.set( V3PL.tarX, V3PL.tarY, V3PL.tarZ );
	};

	V3CC.getFirstPersonController = function() {
		chkFreeze.disabled = chkFreeze.checked = false;

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.set( V3PL.camX, V3PL.camY, V3PL.camZ );

		controls = new THREE.FirstPersonControls( camera, renderer.domElement );
		controls.target.set( V3PL.tarX, V3PL.tarY, V3PL.tarZ );

// camera swivel speed when no buttons pressed. Scroll mousewheel to speed up and slow down
		controls.lookSpeedDefault = controls.lookSpeed = 0.025; // 0.0125;
		controls.lookSpeedMin = 0.04;
		controls.lookSpeedMax = 0.09;

// Camera travel speed when left or right mouse button is pressed. Scroll mousewheel to speed up and slow down
		controls.movementSpeedDefault = controls.movementSpeed = 5000; // 0.5;
		controls.movementSpeedMin = 0.05;
		controls.movementSpeedMax = 10000;

// Camera direction in degrees of lat and lon
		controls.lon = -133;
		controls.lat = -30;
	};

	V3AA.resetCamera = function() {
		if ( controls.heightSpeed === undefined ) {
			V3CC.getOrbitController();
		} else {
			V3CC.getFirstPersonController();
		}
	};

	V3AA.zoomExtents = function(){

		//found this method here: https://github.com/mrdoob/three.js/issues/1424
		// Compute world AABB and radius (approx: better compute BB be in camera space)
		var aabbMin = new THREE.Vector3();
		var aabbMax = new THREE.Vector3();
		var radius = 0;
		//loop over the meshes in the platypus scene
		for (var m = 0; m < scene.children.length; m++)
		{
			try {
				//if mesh,
				if( scene.children[m].hasOwnProperty("geometry"))
				{
					var geo = meshes[m].Three_Meshes.geometry;
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
					var obj = scene.children[m].children[0].geometry;
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
		var offset = radius / Math.tan(Math.PI / 180.0 * controls.object.fov * 0.5);
		//console.log(offset);

		// Compute new camera position
		var vector = new THREE.Vector3(0,0,1);
		var dir = vector.applyQuaternion(controls.object.quaternion);
		//var dir = VA3C.cameraControls.object.matrix.getColumnZ();
		dir.multiplyScalar(offset);
		var newPos = new THREE.Vector3();
		newPos.addVectors(aabbCenter, dir);

		//set camera position and target
		controls.object.position = newPos;
		controls.object.target = aabbCenter;
		alert('Probably not the view you are looking for. WIP...');
	};