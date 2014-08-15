	JAPR = {} || JAPR;

	JAPR.addPreferencesTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Change the ways things are viewed';
		tab.innerHTML =
			'<a href=# id=tabPreferences ><p class=button >' +
				'<i class="fa fa-wrench"></i> Preferences...' +
			'</p></a>';
		tabPreferences.onclick = function() {JA.toggleTab( JAPR.Preferences ); };

		JAPR.Preferences = tab.appendChild( document.createElement( 'div' ) );
		JAPR.Preferences.style.cssText = 'cursor: auto; display: none; ' ;
		JAPR.Preferences.innerHTML =
			'<h3 >Helpers</h3>' +
			'<p>' +
				'<input type=checkbox id=chkWires /> Wireframe<br>' +

				'<input type=checkbox id=chkFaceNormals /> Face Normals<br>' +
				'<input type=checkbox id=chkVertexNormals /> Vertex Normals<br>' +
//				'<input type=checkbox id=chkVertexTangents /> Vertex Tangents<br>' +
				'Vertical scale<br><input type=range id=rngVerticalScale min=1 max=100 step=1 value=50 >' +

			'</p>' +
			'<h3 >Background</h3>' +
			'<p>' +
				'<input type=radio name=background id=randomGradient /> Random gradient<br>' +
				'<input type=radio name=background id=randomColor /> Random color<br>' +
				'<input type=radio name=background id=selectColor /> Select color ' +
					'<input type=color id=selColor value=#aaaaaa />' +
					'<output id=outBackColor >#aaaaaa</output>' +
			'</p>' +
			'<h3 >Zoom Extents</h3>' +
			'<p>' +
			'<input type=checkbox id=chkPrefsZoom /> Display zoom extents boundary sphere, axis & shadow camera  ' +
			'</p>'
		'';

		randomGradient.onchange = function() { JAPR.updateBackground( this.id ); };
		randomColor.onchange = function() { JAPR.updateBackground( this.id ); };
		selectColor.onchange = function() { JAPR.updateBackground( this.id ); };
		selColor.onchange = function() { outBackColor.value = this.value; };
		chkPrefsZoom.onchange = function() { JATH.zoomExtents( 1 ); }

		chkWires.checked = false;
		chkWires.onchange = function() {
			if ( chkWires.checked === true ) {
				JAPR.wires = new THREE.WireframeHelper( scene.select );
				scene.add( JAPR.wires );
			} else {
				scene.remove( JAPR.wires );
			}
		}

		chkFaceNormals.checked = false;
		chkFaceNormals.onchange = function() {
			if ( chkFaceNormals.checked === true ) {
				JAPR.FaceNormals = new THREE.Object3D();
				JAPR.FaceNormals.add( new THREE.FaceNormalsHelper( scene.select, 5 ) );
				JAPR.FaceNormals.add( new THREE.FaceNormalsHelper( scene.select, -5 ) );
				scene.add( JAPR.FaceNormals );
			} else {
				scene.remove( JAPR.FaceNormals );
			}
		}

		chkVertexNormals.checked = false;
		chkVertexNormals.onchange = function() {
			if ( chkVertexNormals.checked === true ) {
				JAPR.VertexNormals = new THREE.Object3D();
				JAPR.VertexNormals.add( new THREE.VertexNormalsHelper( scene.select, 5, 'magenta' ) );
				JAPR.VertexNormals.add( new THREE.VertexNormalsHelper( scene.select, -5, 'magenta' ) );
				scene.add( JAPR.VertexNormals );
			} else {
				scene.remove( JAPR.VertexNormals );
			}
		}

/* broken?
		chkVertexTangents.checked = false;
		chkVertexTangents.onchange = function() {
			if ( chkVertexTangents.checked === true ) {
				JAPR.VertexTangents = new THREE.Object3D();
				JAPR.VertexTangents.add( new THREE.VertexTangentsHelper( JAPR.selectedObject, 50, 'red' ) );
//				JAPR.VertexTangents.add( new THREE.VertexTangentsHelper( JAPR.selectedObject, -5, 'red' ) );
				JAPR.scene.add( JAPR.VertexTangents );
			} else {
				JAPR.scene.remove( JAPR.VertexTangents );
			}
		}
*/

/*
		rngVerticalScale.onchange = function() {
			JAPR.selectedObject.scale.y = rngVerticalScale.value * 0.02 * JAPR.selectedObject.scale.y; 
			if ( wires ) { wires.scale.y = JAPR.selectedObject.scale.y ; }
		};
*/

	};



//		scene.add( new THREE.FaceNormalsHelper( mesh, -50, col ) );

	JAPR.updateBackground = function( id ) {
		if ( JAPR.cssBackround ) { JAFO.ifr.contentDocument.body.removeChild( JAPR.cssBackround ); }
		if ( id === 'randomGradient' ) {
			JAPR.setRandomGradient();
		} else if ( id === 'randomColor' ) {
			JAPR.randomColor();
		} else {
			JAPR.selectColor();;
		}
	};

	JAPR.setRandomGradient = function() {

		JAPR.cssBackround = JAFO.ifr.contentDocument.body.appendChild( document.createElement('style') );
		var col1 = "#" + Math.random().toString(16).slice(2, 8);
		var col2 = "#" + Math.random().toString(16).slice(2, 8);
		var col3 = "#" + Math.random().toString(16).slice(2, 8);
		var X = ( Math.random() * window.innerWidth ).toFixed(0);
		var Y = ( Math.random() * window.innerHeight ).toFixed(0);
		var center =  20 + ( Math.random() * 60 ).toFixed(0);

		JAPR.cssBackround.innerText = 'body { ' +
			'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
			'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
		'';
// console.log( JAPR.cssBackround );
	};

	JAPR.randomColor = function() {
		JAPR.cssBackround = JAFO.ifr.contentDocument.body.appendChild( document.createElement('style') );
		JAPR.cssBackround.innerText = 'body { background-color: #' + Math.random().toString(16).slice(2, 8) + '; }';
	};

	JAPR.selectColor = function() {
		JAPR.cssBackround = JAFO.ifr.contentDocument.body.appendChild( document.createElement('style') );
		JAPR.cssBackround.innerText = 'body { background-color: ' + selColor.value + '; }';
	}
