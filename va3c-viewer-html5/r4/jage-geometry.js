	var JAGE = {} || JAGE;

	JAGE.addGeometryTab = function() {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Move, rotate and scale';
		tab.innerHTML =
			'<a href=# id=tabGeometry ><p class=button >' +
				'<i class="fa fa-sliders"></i> Geometry...' +
			'</p></a>'; 
		tabGeometry.onclick = function() { JA.toggleTab( JAGE.geometry ); JAGE.updateGeometryTab( scene.select ) };

		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML = '.xyz { width: 50px; text-align: right; }';

		JAGE.geometry = tab.appendChild( document.createElement( 'div' ) );
		JAGE.geometry.style.cssText = 'cursor: auto; display: none;' ;
		JAGE.geometry.innerHTML =
			'<p id=geoMsg></p>' +
			'<p style=margin:0;>Position<br>' +
				'X <input type=range id=rngPosX onmousemove=outPosX.value=scene.select.position.x=this.value; min=-100 max=100 step=2 value=0 /> ' +
					'<input type=number id=outPosX class=xyz onchange=rngPosX.value=scene.select.position.x=this.value; value=0 /><br>' +
				'Y <input type=range id=rngPosY onmousemove=outPosY.value=scene.select.position.y=this.value; min=-100 max=100 step=2 value=0 /> ' +
					'<input type=number id=outPosY class=xyz onchange=rngPosY.value=scene.select.position.y=this.value; value=0 /><br>' +
				'Z <input type=range id=rngPosZ onmousemove=outPosZ.value=scene.select.position.z=this.value; min=-100 max=100 step=2 value=0 /> ' +
					'<input type=number id=outPosZ class=xyz onchange=rngPosZ.value=scene.select.position.z=this.value; value=0 /><br>' +
			'</p>' +

			'<p style=margin:0;>Rotation<br>' +
				'X <input type=range id=rngRotX onmousemove=outRotX.value=scene.select.rotation.x=this.value; min=-3.1415 max=3.1415 step=0.01 value=0 /> ' +
					'<input type=number id=outRotX class=xyz onchange=rngRotX.value=scene.select.rotation.x=this.value; value=0 /><br>' +
				'Y <input type=range id=rngRotY onmousemove=outRotY.value=scene.select.rotation.y=this.value; min=-3.1415 max=3.1415 step=0.01 value=0 /> ' +
					'<input type=number id=outRotY class=xyz onchange=rngRotY.value=scene.select.rotation.y=this.value; value=0 /><br>' +
				'Z <input type=range id=rngRotZ onmousemove=outRotZ.value=scene.select.rotation.z=this.value; min=-3.1415 max=3.1415 step=0.01 value=0 /> ' +
					'<input type=number id=outRotZ class=xyz onchange=rngRotZ.value=scene.select.rotation.z=this.value; value=0 /><br>' +
			'</p>' +

			'<p style=margin:0;>Scale<br>' +
				'X <input type=range id=rngSclX onmousemove=outSclX.value=this.value;scene.select.scale.x=this.value min=0.1 max=10 step=0.1 value=1 /> ' +
					'<input type=number id=outSclX class=xyz onchange=rngSclX.value=this.value;scene.select.scale.x=this.value; value=1 /><br>' +
				'Y <input type=range id=rngSclY onmousemove=outSclY.value=this.value;scene.select.scale.y=this.value min=0.1 max=10 step=0.1 value=1 /> ' +
					'<input type=number id=outSclY class=xyz onchange=rngSclY.value=this.value;scene.select.scale.y=this.value; value=1 /><br>' +
				'Z <input type=range id=rngSclZ onmousemove=outSclZ.value=this.value;scene.select.scale.z=this.value min=0.1 max=10 step=0.1 value=1 /> ' +
					'<input type=number id=outSclZ class=xyz onchange=rngSclZ.value=this.value;scene.select.scale.z=this.value; value=1 /><br>' +
			'</p>' +
			'<p><button onclick=scene.remove(scene.select); >Delete</button></p>' +
		'';

	};

	 JAGE.updateGeometryTab = function ( obj ) {

		rngPosX.value = outPosX.value = obj.position.x;
		rngPosY.value = outPosY.value = obj.position.y;
		rngPosZ.value = outPosZ.value = obj.position.z;

		rngRotX.value = outRotX.value = obj.rotation.x;
		rngRotY.value = outRotY.value = obj.rotation.y;
		rngRotZ.value = outRotZ.value = obj.rotation.z;

		rngSclX.value = outSclX.value = obj.scale.x;
		rngSclY.value = outSclY.value = obj.scale.y;
		rngSclZ.value = outSclZ.value = obj.scale.z;

	}