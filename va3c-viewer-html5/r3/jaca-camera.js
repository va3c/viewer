	var JACA = {} || JACA;

	JACA.addCameraTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Move, rotate and scale';
		tab.innerHTML =
			'<a href=# id=tabCamera ><p class=button >' +
				'<i class="fa fa-camera"></i> Camera...' +
			'</p></a>'; 
		tabCamera.onclick = function() { JA.toggleTab( JACA.camera ); JACA.updateCameraTab(); };

		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML = '.xyz { width: 50px; text-align: right; }';

		JACA.camera = tab.appendChild( document.createElement( 'div' ) );
		JACA.camera.style.cssText = 'cursor: auto; display: none;' ;
		JACA.camera.innerHTML = '<div id=divCamera ></div>';

	};

	JACA.updateCameraTab = function() {
		var c = camera.position;
		var t = controls.target;
//console.log( 'cam', c );
//console.log( 'tar', t );
		var txt = 
		'<p style=margin:0;>Camera Position<br>' +
			'X <input type=range id=rngCamPosX onmousemove=outCamPosX.value=camera.position.x=parseInt(this.value,10); min=-100 max=200 step=1 value=' + c.x.toFixed(0) + ' /> ' +
				'<input type=number id=outCamPosX class=xyz onchange=rngCamPosX.value=camera.position.x=parseInt(this.value,10); value=' + c.x.toFixed(0) + ' /><br>' +
			'Y <input type=range id=rngCamPosY onmousemove=outCamPosY.value=camera.position.y=parseInt(this.value,10); min=-100 max=200 step=1 value=' + c.y.toFixed(0) + ' /> ' +
				'<input type=number id=outCamPosY class=xyz onchange=rngCamPosY.value=camera.position.y=parseInt(this.value,10); value=' + c.y.toFixed(0) + ' /><br>' +
			'Z <input type=range id=rngCamPosZ onmousemove=outCamPosZ.value=camera.position.z=parseInt(this.value,10); min=-100 max=200 step=1 value=' + c.z.toFixed(0) + ' /> ' +
				'<input type=number id=outCamPosZ class=xyz onchange=rngCamPosZ.value=camera.position.z=parseInt(this.value,10); value=' + c.z.toFixed(0) + ' /><br>' +
		'</p>' +

		'<p style=margin:0;>Camera Target<br>' +
			'X <input type=range id=rngCamRotX onmousemove=outCamRotX.value=controls.target.x=parseInt(this.value,10); min=-100 max=100 step=1 value=' + t.x.toFixed(0) + ' /> ' +
				'<input type=number id=outCamRotX class=xyz onchange=rngCamRotX.value=controls.target.x=parseInt(this.value,10); value=' + t.x.toFixed(0) + ' /><br>' +
			'Y <input type=range id=rngCamRotY onmousemove=outCamRotY.value=controls.target.y=parseInt(this.value,10); min=-100 max=100 step=1 value=' + t.y.toFixed(0) + ' /> ' +
				'<input type=number id=outCamRotY class=xyz onchange=rngCamRotY.value=controls.target.y=parseInt(this.value,10); value=' + t.y.toFixed(0) + ' /><br>' +
			'Z <input type=range id=rngCamRotZ onmousemove=outCamRotZ.value=controls.target.z=parseInt(this.value,10); min=-100 max=100 step=1 value=' + t.z.toFixed(0) + ' /> ' +
				'<input type=number id=outCamRotZ class=xyz onchange=rngCamRotZ.value=controls.target.z=parseInt(this.value,10); value=' + t.z.toFixed(0) + ' /><br>' +

		'</p>' +
		'<button onclick=JACA.updateCameraTab(); >Update</button>';
		'';
		divCamera.innerHTML = txt;

//camera.onchange = function(){ console.log( camera.position ); };
camera.addEventListener("onmousemove", function(){ console.log( camera.position ); }, false);
	};