	var JAGE = {} || JAGE;

	JAGE.addGeometryTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Move, rotate and scale';
		tab.innerHTML =
			'<a href=# id=tabGeometry ><p class=button >' +
				'<i class="fa fa-sliders"></i> Geometry...' +
			'</p></a>'; 
		tabGeometry.onclick = function() { JA.toggleTab( JAGE.geometry ); };

		JAGE.geometry = tab.appendChild( document.createElement( 'div' ) );
		JAGE.geometry.style.cssText = 'cursor: auto; display: none;' ;
		JAGE.geometry.innerHTML =
			'<p style=margin:0;>Position<br>' +
				'X <input type=range id=rngPosX onmousemove=outPosX.value=this.value;scene.select.position.x=this.value min=-100 max=100 step=2 value=0 /> ' +
					'<input id=outPosX style=width:40px; onchange=rngPosX.value=outPosX.value;scene.select.position.x=this.value; value=0 ><br>' +
				'Y <input type=range id=rngPosY onmousemove=outPosY.value=this.value;scene.select.position.y=this.value min=-100 max=100 step=2 value=0 /> ' +
					'<input id=outPosY style=width:40px; onchange=rngPosY.value=outPosY.value;scene.select.position.y=this.value; value=0 ><br>' +
				'Z <input type=range id=rngPosZ onmousemove=outPosZ.value=this.value;scene.select.position.z=this.value min=-100 max=100 step=2 value=0 /> ' +
					'<input id=outPosZ style=width:40px; onchange=rngPosZ.value=outPosZ.value;scene.select.position.z=this.value; value=0 ><br>' +
			'</p>' +

			'<p style=margin:0;>Rotation<br>' +
				'X <input type=range id=rngRotX onmousemove=outRotX.value=this.value;scene.select.rotation.x=this.value min=-3.1415 max=3.1415 step=0.01 value=0 /> ' +
					'<input id=outRotX style=width:40px; onchange=rngRotX.value=this.value;scene.select.rotation.x=this.value; value=0 ><br>' +
				'Y <input type=range id=rngRotY onmousemove=outRotY.value=this.value;scene.select.rotation.y=this.value min=-3.1415 max=3.1415 step=0.01 value=0 /> ' +
					'<input id=outRotY style=width:40px; onchange=rngRotY.value=this.value;scene.select.rotation.y=this.value; value=0 ><br>' +
				'Z <input type=range id=rngRotZ onmousemove=outRotZ.value=this.value;scene.select.rotation.z=this.value min=-3.1415 max=3.1415 step=0.01 value=0 /> ' +
					'<input id=outRotZ style=width:40px; onchange=rngRotZ.value=this.value;scene.select.rotation.z=this.value; value=0 ><br>' +
			'</p>' +

			'<p style=margin:0;>Scale<br>' +
				'X <input type=range id=rngSclX onmousemove=outSclX.value=this.value;scene.select.scale.x=this.value min=0.1 max=10 step=0.1 value=1 /> ' +
					'<input id=outSclX style=width:40px; onchange=rngSclX.value=this.value;scene.select.scale.x=this.value; value=0 ><br>' +
				'Y <input type=range id=rngSclY onmousemove=outSclY.value=this.value;scene.select.scale.y=this.value min=0.1 max=10 step=0.1 value=1 /> ' +
					'<input id=outSclY style=width:40px; onchange=rngSclY.value=this.value;scene.select.scale.y=this.value; value=0 ><br>' +
				'Z <input type=range id=rngSclZ onmousemove=outSclZ.value=this.value;scene.select.scale.z=this.value min=0.1 max=10 step=0.1 value=1 /> ' +
					'<input id=outSclZ style=width:40px; onchange=rngSclZ.value=this.value;scene.select.scale.z=this.value; value=0 ><br>' +
			'</p>' +
		'';

	};