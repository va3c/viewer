	var V3AT = {};

	V3AT.addAttributes = function() {
		V3AT.halfWidth = 0.5 * window.innerWidth;
		V3AT.halfHeight = 0.5 * window.innerHeight;
		V3AT.updateAttributes = true;
		V3AT.projector = new THREE.Projector();

		var attributesButton = V3AA.menu.appendChild( document.createElement( 'div' ) );
		attributesButton.innerHTML =
			'<a href=# onclick=V3AA.openDialog(V3AT.attributes); ><p class=button >' +
				'<i class="fa fa-database"></i> Attributes display...' +
			'</p></a>'; 

		V3AT.attributes = container.appendChild( document.createElement( 'div' ) );
		V3AT.attributes.style.cssText = 'display: none; background-color: #ccc; left: 10px; opacity: 0.9; padding: 0 20px 20px; ' +
			'height: 550px; position: absolute; top: 10px; width: 300px; ';
		V3AT.attributes.class = 'movable';
		V3AT.attributes.addEventListener( 'mousedown', mouseMove, false );
		V3AT.attributes.innerHTML =
			'<div>' +
				'<h2><i class="fa fa-database"></i> Attributes</h2>' +
				'<p id=attributeMessage >Click to toggle attribute updates.</p>' +
				'<div id=attributeDisplay style=height:400px;overflow:scroll; ></div>' +
				'<p style=text-align:right; >' +
					'<a class=button href=JavaScript:V3AA.openDialog(); >Close</a> ' +
				'</p>' +
			'</div>';

		V3AT.headsUp = document.body.appendChild( document.createElement( 'div' ) );
		V3AT.headsUp.style.cssText = 'background-color: #ddd; border-radius: 8px; display: none; opacity: 0.85; padding: 5px; position: absolute; ';

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'click', onDocumentMouseClick, false );
	};

	function onDocumentMouseClick( event ) {
		if ( V3AT.updateAttributes === true ) {
			V3AT.updateAttributes = false;
			attributeMessage.innerHTML = 'Click to re-start attribute updates.';
		} else {
			V3AT.updateAttributes = true;
			attributeMessage.innerHTML = 'Click to stop attribute updates.';
		}
	}
	function onDocumentMouseMove( event ) {
		var mouse3D = new THREE.Vector3( 0, 0, 0 );
		mouse3D.x = 2 * event.clientX / window.innerWidth - 1;
		mouse3D.y = -2 * event.clientY / window.innerHeight + 1;
		mouse3D.z = 0.5;
		var raycaster = V3AT.projector.pickingRay( mouse3D.clone(), camera );
		var intersects = raycaster.intersectObjects( V3FO.targetList );
		if ( intersects && intersects.length > 0 ) {
			V3AT.headsUp.style.left = 10 + V3AT.halfWidth + mouse3D.x * V3AT.halfWidth + 'px';
			V3AT.headsUp.style.bottom = 10 + V3AT.halfHeight + mouse3D.y * V3AT.halfHeight + 'px';
			displayAttributes( intersects[ 0 ] );
		} else {
			V3AT.headsUp.style.display = 'none';
		}

		chkFreeze.checked = controls.freeze === true ? true : false;
	}

	function displayAttributes( obj ) {
		var txt1 = '';
		if ( obj.object.name ) txt1 += 'Name: ' + obj.object.name + ' ID: ' + obj.object.id + '<br>';
		if ( obj.faceIndex) txt1 += 'Face Index: ' + obj.faceIndex + '<br>';
		V3AT.headsUp.innerHTML = txt1;
		V3AT.headsUp.style.display = '';

		if ( !V3AT.updateAttributes ) return;

		var txt2 = '';

		if ( obj.object.userData ) { 
			arr = Object.keys( obj.object.userData );
			data = obj.object.userData;
		}
		if ( V3FO.attributes === 'revit-style' && obj.object.parent.userData ) {
			arr = Object.keys( obj.object.parent.userData );
			data = obj.object.parent.userData;
		}
		for (var i = 0, len = arr.length; i < len; i++) {
			if ( data[arr[i]].indexOf('http') > -1 ) {
				txt2 += arr[i] + ' <a href="'+ data[ arr[i] ]+'" style=color:red; target="_blank" ><b>Click here</b></a><br>';
			} else {
				txt2 += arr[i] + ': ' + data[ arr[i] ] + '<br>';
			}
		}
		attributeDisplay.innerHTML = txt2;
	}