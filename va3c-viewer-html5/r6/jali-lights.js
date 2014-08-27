	var JALI = [] || JALI;

	JALI.addLightsTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabLight title="Add some sunshine to your work..." ><p class=button >' +
				'<i class="fa fa-lightbulb-o"></i> Lights...' +
			'</p></a>'; 
		tabLight.onclick = function() { JA.toggleTab( JALI.lightsTab ); }; 
		tabLight.style.cssText = 'cursor: pointer; ' ;

		JALI.lightsTab = tab.appendChild( document.createElement( 'div' ) );
		JALI.lightsTab.style.cssText = 'cursor: auto; display: none; ' ;
		JALI.lightsTab.innerHTML =
			'<p>' +
				'<input type=checkbox id=chkLightAmbient onclick=JALI.toggleLightAmbient(); /> Ambient Light ' +
				'<input type=color id=colLightAmbient value=#333333 > <output id=outLightAmbient >#33333</output><br>' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=chkLightCamera onclick=JALI.toggleLightCamera(); /> Light at camera position<br>' +
				'<input type=color id=colLightCamera value=#333333 /> <output id=outLightCamera >#33333</output> ' +
				'Intensity <input type=number id=numLightCameraIntensity min=0 step=0.1 value=0.5 style=width:40px; /><br>' +
				'<input type=checkbox id=chkLightCameraHelper /> Display light helper ' +
			'</p>' +
			'<p>' +
				'<input type=checkbox id=chkLightPosition onclick=JALI.toggleLightPosition(110); /> Directional Light<br>' +
				'<input type=color id=colLightPosition value=#333333 /> <output id=outLightPosition >#33333</output> ' +
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

		colLightAmbient.onchange = function() { JALI.lightAmbient.color.setHex( this.value.replace("#", "0x") ); outLightAmbient.value=this.value; };

		colLightCamera.onchange = function() { JALI.lightCamera.color.setHex( this.value.replace("#", "0x") ); outLightCamera.value=this.value; };
		numLightCameraIntensity.onclick = function() { JALI.lightCamera.intensity = this.value; };
		chkLightCameraHelper.onchange = function() { JALI.lightCamera.shadowCameraVisible = chkLightCameraHelper.checked === true ? true : false; };

		colLightPosition.onchange = function() { JALI.lightPosition.color.setHex( this.value.replace("#", "0x") ); outLightPosition.value=this.value; };
		numLightPositionIntensity.onclick = function() { JALI.lightPosition.intensity = this.value; };

		rngLightLat.onmousemove = function() { outpLightLat.value=this.value; JALI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };
		rngLightLon.onmousemove = function() { outpLightLon.value=this.value;  JALI.updateLightPosition( rngLightLat.value, rngLightLon.value ); };

		chkLightPositionHelper.onchange = function() { JALI.lightPosition.shadowCameraVisible = chkLightPositionHelper.checked === true ? true : false; };
	};

	JALI.initLights = function () {
//console.log( 'checkLights count', scene.__lights, scene.__lights.length );

		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();

		chkLightCamera.checked = true;
		JALI.toggleLightCamera();

		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		scene.add( camera );

//console.log( 'initLights count', scene.__lights.length );
	};

	JALI.checkLights = function () {
//console.log( 'checkLights count', scene.__lights, scene.__lights.length );

		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();

		chkLightCamera.checked = true;
		JALI.toggleLightCamera();

		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		scene.add( camera );
	}

	JALI.toggleLightAmbient = function () {

		if ( chkLightAmbient.checked === true ) {
			JALI.lightAmbient = new THREE.AmbientLight( 0x333333 );
			JALI.lightAmbient.name = 'lightAmbient';
			scene.add( JALI.lightAmbient );
			JALI.updateMaterials( scene.children );
		} else {
//			scene.remove( JALI.lightAmbient );
		}
	};
// 
	JALI.toggleLightCamera = function( d ) {
		if ( chkLightCamera.checked === true ) {
//console.log( 'toggleLightCamera' );

// to track light
			JALI.lightCamera = new THREE.PointLight( 0xffffff, 0.5 );
			JALI.lightCamera.name = 'lightCamera';
			JALI.lightCamera.position = camera.position;
			camera.add( JALI.lightCamera );
			scene.add( camera );
			JALI.updateMaterials( scene.children );

		} else {
//			camera.remove( JALI.lightCamera );
//			scene.remove( JALI.lightCamera );
		}
	};

/*
http://mrdoob.github.io/three.js/docs/#Reference/Lights/DirectionalLight

*/

	JALI.toggleLightPosition = function( d ) {
		if ( chkLightPosition.checked === true  ) {
			JALI.lightPosition = new THREE.DirectionalLight( 0xffffff, 0.25 );  // 0xffffff 1.0
			JALI.lightPosition.name = 'lightPosition';
//			JALI.lightDirectional = new THREE.SpotLight( 0xffffff, 1 );

			JALI.updateLightPosition( rngLightLat.value, rngLightLon.value );

			JALI.lightPosition.castShadow = true;
			d = d ? d : 100;
			JALI.lightPosition.shadowCameraLeft = -d;
			JALI.lightPosition.shadowCameraRight = d;
			JALI.lightPosition.shadowCameraTop = d;
			JALI.lightPosition.shadowCameraBottom = -d;

			JALI.lightPosition.shadowCameraNear = 100;
			JALI.lightPosition.shadowCameraFar = 400;

//			JALI.lightPosition.angle = 1; // spotlight only

// can help stop appearance of gridlines in objects with opacity < 1
			JALI.lightPosition.shadowBias = -0.002; // default 0 ~ distance fron corners?
			JALI.lightPosition.shadowDarkness = 0.2; // default 0.5
			JALI.lightPosition.shadowMapWidth = 2048;  // default 512
			JALI.lightPosition.shadowMapHeight = 2048;
//			JALI.lightPosition.shadowCameraVisible;
	
			if ( chkPrefsZoom.checked ) { JALI.lightPosition.shadowCameraVisible = true; }

			scene.add( JALI.lightPosition );
			JALI.updateMaterials( scene.children );
		} else {
//			scene.remove( JALI.lightPosition );
		}
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