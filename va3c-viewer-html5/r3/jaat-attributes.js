	var JAAT = {};

	JAAT.addAttributes = function() {
		JAAT.updateAttributes = true;
		JAAT.projector = new THREE.Projector();

/*
		var attributesButton = V3AA.menu.appendChild( document.createElement( 'div' ) );
		attributesButton.innerHTML =
			'<a href=# onclick=V3AA.openDialog(JAAT.attributes); ><p class=button >' +
				'<i class="fa fa-database"></i> Attributes display...' +
			'</p></a>'; 


		JAAT.attributes = container.appendChild( document.createElement( 'div' ) );
		JAAT.attributes.style.cssText = 'display: none; background-color: #ccc; left: 10px; opacity: 0.9; padding: 0 20px 20px; ' +
			'height: 550px; position: absolute; top: 10px; width: 300px; ';
		JAAT.attributes.class = 'movable';
		JAAT.attributes.addEventListener( 'mousedown', mouseMove, false );
		JAAT.attributes.innerHTML =
			'<div>' +
				'<h2><i class="fa fa-database"></i> Attributes</h2>' +
				'<p id=attributeMessage >Click to toggle attribute updates.</p>' +
				'<div id=attributeDisplay style=height:400px;overflow:scroll; ></div>' +
				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:V3AA.openDialog(); >Close</a> ' +
				'</p>' +
			'</div>';

		JAAT.headsUp = JA.container.appendChild( document.createElement( 'div' ) );
		JAAT.headsUp.style.cssText = 'background-color: #ddd; border-radius: 8px; display: none; opacity: 0.85; padding: 5px; position: absolute; ';
*/

		divMsg1.innerHTML = 'Nothing selected';
		divMsg3.innerHTML = '<input type=checkbox checked /> Click to stop attribute updates.';
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'click', onDocumentMouseClick, false );
	};

	function onDocumentMouseClick( event ) {
		if ( JAAT.updateAttributes === true ) {
			JAAT.updateAttributes = false;
			divMsg3.innerHTML = '<input type=checkbox /> Toggle attribute updates.';
		} else {
			JAAT.updateAttributes = true;
			divMsg3.innerHTML = '<input type=checkbox checked /> Toggle attribute updates.';
		}
	}

	function onDocumentMouseMove( event ) {
		var mouse3D = new THREE.Vector3( 0, 0, 0 );
		mouse3D.x = 2 * event.clientX / window.innerWidth - 1;
		mouse3D.y = -2 * event.clientY / window.innerHeight + 1;
		mouse3D.z = 0.5;
		var raycaster = JAAT.projector.pickingRay( mouse3D.clone(), JATH.camera );
		var intersects = raycaster.intersectObjects( JATH.assets.children );
		if ( intersects && intersects.length > 0 ) {
			displayAttributes( intersects[ 0 ] );
//console.log( intersects[ 0 ] );
		} else {
//			JAAT.headsUp.style.display = 'none';
			if ( !JAAT.updateAttributes ) { divMsg1.innerHTML = ''; }
		}
//		chkFreeze.checked = controls.freeze === true ? true : false;
	}

	function displayAttributes( obj ) {
		if ( !JAAT.updateAttributes ) { return; }
		var txt = 'Nothing selected';
		if ( obj.object.name ) { txt = 'Name: ' + obj.object.name + ' ID: ' + obj.object.id + '<br>'; }
		divMsg1.innerHTML = txt;
		if ( obj.faceIndex) { txt = 'Face Index: ' + obj.faceIndex + '<br>'; }
		divMsg2.innerHTML = txt;

		JATH.selectedObject = obj.object;
		if ( outlineMesh ) JATH.scene.remove( outlineMesh );
		var outlineMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide } );
		outlineMesh = new THREE.Mesh( JATH.selectedObject.geometry, outlineMaterial );
		outlineMesh.position = JATH.selectedObject.position;
		outlineMesh.rotation = JATH.selectedObject.rotation;
		outlineMesh.scale = JATH.selectedObject.scale
		outlineMesh.scale.multiplyScalar(1.05);
		outlineMesh.geometry.verticesNeedUpdate = true;
		JATH.scene.add( outlineMesh );
	}