	var JALI = [] || JALI;

	JALI.defaultAmbient = '#333333';
	JALI.defaultCamera = '#555555';
	JALI.defaultPosition = '#333333';

	JALI.addLightsTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabLight title="Add some sunshine to your work..." ><p class=button >' +
				'<i class="fa fa-lightbulb-o"></i> Lights...' +
			'</p></a>'; 
		tabLight.style.cssText = 'cursor: pointer; ' ;
		tabLight.onclick = function() { JALI.updateLightsTab(); JA.toggleTab( JALI.lightsTab ); }; 

		JALI.lightsTab = tab.appendChild( document.createElement( 'div' ) );
		JALI.lightsTab.style.cssText = 'cursor: auto; display: none; ' ;

	};

	JALI.updateLightsTab = function () {

		JALI.lightsTab.innerHTML =
			'<p>' +
				'<input type=checkbox id=chkLightAmbient onclick=JALI.toggleLightAmbient(); /> Ambient Light ' +
				'<input type=color id=colLightAmbient value=' + JALI.defaultAmbient + ' /> <output id=outLightAmbient >' + JALI.defaultAmbient + '</output><br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=chkLightCamera onclick=JALI.toggleLightCamera(); /> Light at camera position<br>' +
				'<input type=color id=colLightCamera value=' + JALI.defaultCamera + ' /> <output id=outLightCamera >' + JALI.defaultCamera + '</output> ' +
				'Intensity <input type=number id=numLightCameraIntensity min=0 step=0.1 value=0.5 style=width:40px; /><br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=chkLightPosition onclick=JALI.toggleLightPosition(110); /> Directional Light<br>' +
				'<input type=color id=colLightPosition value=' + JALI.defaultPosition + ' /> <output id=outLightPosition >' + JALI.defaultPosition + '</output> ' +
				'Intensity <input type=number id=numLightPositionIntensity min=0 step=0.1 value=0.5 style=width:40px; /><br>' +

			'</p>' +
			'<p>' +
				'Directional light latitude<br><input type=range id=rngLightLat min=-90 max=90 step=1 value=60 /> ' +
				'<output id=outpLightLat >60</output><br>' +
			'</p>' +
			'<p>' +
				'Directional light longitude<br><input type=range id=rngLightLon min=-180 max=180 step=1 value=90 /> ' +
				'<output id=outpLightLon >90</output><br>' +
			'</p>' +
				'<p>' +
				'<input type=checkbox id=chkLightPositionHelper /> Display light helper ' +
			'</p>' +
		'';

		chkLightAmbient.checked = true;
		chkLightAmbient.onchange = JALI.toggleLightAmbient;

		colLightAmbient.onchange = function() { JALI.lightAmbient.color.setHex( this.value.replace("#", "0x") ); outLightAmbient.value=this.value; };

		chkLightCamera.checked = true;
		chkLightCamera.onchange = JALI.toggleLightCamera;

		colLightCamera.onchange = function() { JALI.lightCamera.color.setHex( this.value.replace("#", "0x") ); outLightCamera.value=this.value; };
		numLightCameraIntensity.onclick = function() { JALI.lightCamera.intensity = this.value; };

		chkLightPosition.checked = true;
		chkLightPosition.onchange = JALI.toggleLightPosition;

		colLightPosition.onchange = function() { JALI.lightPosition.color.setHex( this.value.replace("#", "0x") ); outLightPosition.value=this.value; };
		numLightPositionIntensity.onclick = function() { JALI.lightPosition.intensity = this.value; };

		rngLightLat.onmousemove = function() { outpLightLat.value=this.value; JALI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };
		rngLightLon.onmousemove = function() { outpLightLon.value=this.value;  JALI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };

		chkLightPositionHelper.onchange = function() { JALI.lightPosition.shadowCameraVisible = chkLightPositionHelper.checked === true ? true : false; };

	};

// Called by JAFO.updateIframe

	JALI.initLights = function () {
//console.log( 'checkLights count', scene.__lights, scene.__lights.length );

/*
		chkLightAmbient.checked = true;

		if ( !JALI.lightAmbient ) {
		//scene.remove( JALI.lightAmbient );
		//JALI.lightAmbient = '';

			JALI.toggleLightAmbient();
		}

		chkLightCamera.checked = true;
		if ( !JALI.lightCamera ) {
		//camera.remove( JALI.lightCamera );
		//scene.remove( JALI.lightCamera );
		//JALI.lightCamera = '';

			JALI.toggleLightCamera();
		}
		chkLightPosition.checked = true;

		if ( ! JALI.lightPosition ) {
		//scene.remove( JALI.lightPosition );
		//JALI.lightPosition = '';

		JALI.toggleLightPosition();
		}
*/

		JALI.updateLightsTab();

		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		scene.add( camera );

		JALI.checkLights();

console.log( 'initLights count', scene.__lights.length );

	};

	JALI.checkLights = function () {
//console.log( 'checkLights count', scene.__lights, scene.__lights.length );

//JALI.updateLightsTab();

		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();

		chkLightCamera.checked = true;
		JALI.toggleLightCamera();

		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

/*
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		scene.add( camera );
*/

	}

	JALI.toggleLightAmbient = function () {

		if ( chkLightAmbient.checked === true ) {
			if ( !JALI.lightAmbient ) {
				JALI.lightAmbient = new THREE.AmbientLight( JALI.defaultAmbient );
				JALI.lightAmbient.name = 'lightAmbient';
				scene.add( JALI.lightAmbient );
			}
			JALI.updateMaterials( scene.children );
		} else {

			scene.remove( JALI.lightAmbient );

			JALI.lightAmbient = '';

//				scene.add( JALI.lightAmbient );
		}

console.log( 'toggleLightAmbient', JALI.lightAmbient, chkLightAmbient.checked );
	};


	JALI.toggleLightCamera = function() {

		if ( chkLightCamera.checked === true ) {

			if ( !JALI.lightCamera ) {

				JALI.lightCamera = new THREE.PointLight( JALI.defaultCamera, 0.5 );
				JALI.lightCamera.name = 'lightCamera';
				JALI.lightCamera.position = camera.position;
				camera.add( JALI.lightCamera );
	// to track light
				scene.add( camera );
//console.log( 'toggleLightCamera', JALI.lightCamera );

			}
			


		} else {

			camera.remove( JALI.lightCamera );
			scene.remove( JALI.lightCamera );

//				camera.add( JALI.lightCamera );
	// to track light
//				scene.add( camera );
			JALI.lightCamera = '';

		}
			JALI.updateMaterials( scene.children );
	};

	JALI.toggleLightPosition = function( d ) {
		if ( chkLightPosition.checked === true  ) {
			if ( !JALI.lightPosition ) {

				JALI.lightPosition = new THREE.DirectionalLight( JALI.defaultPosition, 0.25 );  // 0xffffff 1.0
				JALI.lightPosition.name = 'lightPosition';

				JALI.updateLightPosition( rngLightLat.value, rngLightLon.value );

				JALI.lightPosition.castShadow = true;
				d = d ? d : 100;
				JALI.lightPosition.shadowCameraLeft = -d;
				JALI.lightPosition.shadowCameraRight = d;
				JALI.lightPosition.shadowCameraTop = d;
				JALI.lightPosition.shadowCameraBottom = -d;

				JALI.lightPosition.shadowCameraNear = 100;
				JALI.lightPosition.shadowCameraFar = 400;

	// can help stop appearance of gridlines in objects with opacity < 1
				JALI.lightPosition.shadowBias = -0.002; // default 0 ~ distance fron corners?
				JALI.lightPosition.shadowDarkness = 0.3; // default 0.5
				JALI.lightPosition.shadowMapWidth = 2048;  // default 512
				JALI.lightPosition.shadowMapHeight = 2048;

				if ( chkPrefsZoom.checked ) { JALI.lightPosition.shadowCameraVisible = true; }

				scene.add( JALI.lightPosition );
			}
//			JALI.updateMaterials( scene.children );
		} else {
			scene.remove( JALI.lightPosition );
			JALI.lightPosition = '';

//			scene.add( JALI.lightPosition );
// leaving behind zombie object and camera. need to figure out how to deal with these...

		}
		JALI.updateMaterials( scene.children );
	};


	JALI.updateMaterials = function( children ) {
		for (var i = 0, len = children.length; i < len; i++) {
			if ( children[i].material ) {
				children[i].material.needsUpdate = true;
			}
		}
	};

	JALI.updateLightPosition = function ( lat, lon ) {

		var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
		var d2r = pi / 180, r2d = 180 / pi;  // degrees / radians
		function cos(a) { return Math.cos(a); }
		function sin(a) { return Math.sin(a); }
		var theta = lat * d2r; 
		var phi = lon * d2r;
		var radius = 300;
		JALI.lightPosition.position.x = radius * cos( theta ) * sin( phi );
		JALI.lightPosition.position.y = radius * sin( theta );
		JALI.lightPosition.position.z = radius * cos( theta ) * cos( phi );

	};
