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
				'X <input type=range id=rngPosX onmousemove=scene.select.position.x=this.value min=-100 max=100 step=2 value=0 /><br>' +
				'Y <input type=range id=rngPosY onmousemove=scene.select.position.y=this.value min=-100 max=100 step=2 value=0 /><br>' +
				'Z <input type=range id=rngPosZ onmousemove=scene.select.position.z=this.value min=-100 max=100 step=2 value=0 /><br>' +
			'</p>' +

			'<p style=margin:0;>Rotation<br>' +
				'X <input type=range id=rngRotX onmousemove=scene.select.rotation.x=this.value min=-3.1415 max=3.1415 step=0.01 value=0 /><br>' +
				'Y <input type=range id=rngRotY onmousemove=scene.select.rotation.y=this.value min=-3.1415 max=3.1415 step=0.01 value=0 /><br>' +
				'Z <input type=range id=rngRotZ onmousemove=scene.select.rotation.z=this.value min=-3.1415 max=3.1415 step=0.01 value=0 /><br>' +
			'</p>' +

			'<p style=margin:0;>Scale<br>' +
				'X <input type=range id=rngSclX onmousemove=scene.select.scale.x=this.value min=0.1 max=10 step=0.1 value=1 /><br>' +
				'Y <input type=range id=rngSclY onmousemove=scene.select.scale.y=this.value min=0.1 max=10 step=0.1 value=1 /><br>' +
				'Z <input type=range id=rngSclZ onmousemove=scene.select.scale.z=this.value min=0.1 max=10 step=0.1 value=1 /><br>' +
			'</p>' +
		'';

	};