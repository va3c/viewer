	var V3SU = {};

	V3SU.addSunlight = function() {
		var sunlightButton = V3AA.menu.appendChild( document.createElement( 'div' ) );
		sunlightButton.innerHTML =
			'<p class=button >' +
				'<a href=# onclick=V3AA.openDialog(V3SU.sunlight); ><i class="fa fa-sun-o"></i> Sunlight...</a>' +
			'</p>'; 

		V3SU.sunlight = container.appendChild( document.createElement( 'div' ) );
		V3SU.sunlight.style.cssText = 'display: none; background-color: #ccc; left: 10px; opacity: 0.9; padding: 0 20px 20px; ' +
			'height: 500px; position: absolute; top: 10px; width: 300px; ';
		V3SU.sunlight.class = 'movable';
		V3SU.sunlight.addEventListener( 'mousedown', mouseMove, false );

		V3SU.sunlight.innerHTML =
			'<div>' +
				'<h2><i class="fa fa-sun-o"></i> Sunlight</h2>' +
				'<p>' +
					'Light latitude <input type=range id=rngSunLat min=-90 max=90 step=1 value=60 /> ' +
					'<output id=outpSunLat >60</output><br>' +
				'</p>' +
				'<p>' +
					'Light longitude <input type=range id=rngSunLon min=-180 max=180 step=1 value=90 /> ' +
					'<output id=outpSunLon >90</output><br>' +
				'</p>' +
				'<p>' +
					'Show light helper <input type=checkbox id=chkLightHelper />' +
				'</p>' +

				'<h3>Sun Position Calculator</h3>' +

				'<p>' +
					'<select id=selSunCity onchange=V3SU.calculatePosition(); >' +
						'<option value=55.75,37.6167 >Moscow</option>' +
						'<option value=47,6.9333 >Neuchâtel</option>' +
						'<option value=42.3482,-75.189 selected=true >New York</option>' +
						'<option value=48.8567,2.3508 >Paris</option>' +
						'<option value=-23.55,-46.633 >Sao Paulo</option>' +
						'<option value=37.796,-122.398 >San Francisco</option>' +
						'<option value=35.6895,139.6917 >Tokyo</option>' +
					'</select>' +
				'</p>' +
				'<p>' +
					'Month 1-12 <input type=range id=inpSunMonth min=1 max=12 step=1 value=5 > ' +
					'<output id=outSunMonth >5</output><br>' +
					'Day 1-31 <input type=range id=inpSunDay min=1 max=31 step=1 value=18 /> ' + 
					'<output id=outSunDay >18</output><br>' +
					'Hour 0-24 <input type=range id=inpSunHour min=1 max=24 step=1 value=24 /> ' +
					'<output id=outSunHour >24</output>' +
				'</p>' +
				'<div id=v3suMsg>Sun Position<br></div>' +
				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:V3AA.openDialog(); >Close</a> ' +
				'</p>' +
			'</div>';

		rngSunLat.onmousemove = function() { outpSunLat.value=this.value; V3SU.updateLightPosition( rngSunLat.value, rngSunLon.value ); };
		rngSunLon.onmousemove = function() { outpSunLon.value=this.value;  V3SU.updateLightPosition( rngSunLat.value, rngSunLon.value ); };

		chkLightHelper.onchange = function() { V3SU.light.shadowCameraVisible = chkLightHelper.checked === true ? true : false; };

		inpSunMonth.onchange = function() { outSunMonth.value = this.value; V3SU.calculatePosition(); };
		inpSunDay.onchange = function() { outSunDay.value = this.value; V3SU.calculatePosition(); };
		inpSunHour.onchange = function() { outSunHour.value = this.value; V3SU.calculatePosition(); };

		V3SU.addLights();
//		V3SU.updateLightPosition( 3, 90 );
	};

	V3SU.addLights = function() {
// lights
		scene.add( new THREE.AmbientLight( 0x444444 ) );

		V3SU.light = new THREE.DirectionalLight( 0xffffff, 1 );
//		V3SU.light.position.set( 10000, 10000, 10000 );
		V3SU.light.castShadow = true;
		V3SU.light.shadowMapWidth = 2048;
		V3SU.light.shadowMapHeight = 2048;
		var d = 12000;
		V3SU.light.shadowCameraLeft = -d;
		V3SU.light.shadowCameraRight = d;
		V3SU.light.shadowCameraTop = d;
		V3SU.light.shadowCameraBottom = -d;

		V3SU.light.shadowCameraNear = 1000;
		V3SU.light.shadowCameraFar = 30000;

		scene.add( V3SU.light );

		V3SU.updateLightPosition( rngSunLat.value, rngSunLon.value );
	};

	V3SU.calculatePosition = function() {
//		console.log( selSunCity.value, inpSunMonth.value, inpSunDay.value, inpSunHour.value );
		var arr = selSunCity.value.split( ',' );
//		console.log( arr );
		var pos = sunPosition ( 2014, parseInt( inpSunMonth.value, 10 ), parseInt( inpSunDay.value, 10 ), parseInt(inpSunHour.value, 10 ), 
			0, 0, parseFloat( arr[0] ), parseFloat( arr[1] ) );
		v3suMsg.innerHTML = 'Sun Position: WIP/Not correct<br>latitude: ' + pos[0].toFixed(3) + '<br>longitude: ' + pos[1].toFixed(3) ;

		V3SU.updateLightPosition( pos[0], pos[1] );
	};

	V3SU.updateLightPosition = function ( lat, lon ) {
		function cos(a) {return Math.cos(a);}
		function sin(a) {return Math.sin(a);}
		var theta = lat * d2r;
		var phi = lon * d2r;
		V3SU.light.position.x = 15000 * cos( theta ) * sin( phi );
		V3SU.light.position.y = 15000 * sin( theta );
		V3SU.light.position.z = 15000 * cos( theta ) * cos( phi );
	};


