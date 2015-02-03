	var JAMA = JAMA || {};

	if ( window.location.origin.substr( 0, 7 ) !== 'http://' ) {
		JAMA.texturePath = 'file:///C:/Users/Theo/Dropbox/Public/git-repos/va3c.github.io/viewer/va3c-viewer-html5/';
	} else {
		JAMA.texturePath = 'http://va3c.github.io/viewer/va3c-viewer-html5/';
	}


	JAMA.addMaterialSelectTab = function() {

//JAMA.initMaterials();

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Choose from a number of materials to apply to the surface';
		tab.innerHTML =
			'<a href=# id=tabMaterialSelect ><p class=button >' +
				'<i class="fa fa-cubes"></i> Material Select...' +
			'</p></a>';

		tabMaterialSelect.onclick = function() { JA.toggleTab( JAMA.MaterialSelectTab ); } ;

		JAMA.MaterialSelectTab = tab.appendChild( document.createElement( 'div' ) );
		JAMA.MaterialSelectTab.style.cssText = 'cursor: auto; display: none; ';

		var basic = '';
		var texture = ''
		var envMap = '';
		var title, category, txt;
		for ( var key in JAMA.materials ) {
			title = JAMA.materials[key].title;
			category = JAMA.materials[key].category;
			txt = '<a href=# onclick="JAMA.updateMaterial( \'' + key + '\' );" >' + title + '</a><br>';
			if ( category === "Basic" ) {
				basic += txt;
			} else if ( category === "Texture" ){
				texture += txt;
			} else {
				envMap +=  txt;
			}
		}

		JAMA.MaterialSelectTab.innerHTML =
			'<input type=checkbox id=chkMaterial > Use default material' +
			'<h3 style=margin:0; >Basic</h3>' +
			basic +
			'<h3 style=margin:0; >Texture</h3>' +
			texture +
			'<h3 style=margin:0; >Evironment Map</h3>' +
			envMap +
		'';

	};

	JAMA.updateMaterial = function( key ) {

		chkMaterial.checked = false;

		var mat = JAMA.materials[ key ].set;
console.log( 'set', mat );
		scene.select.material = new JAMA.materials[ key ].set();

//		app.mesh.material = new JAMA.materials[ key ].set();
//scene.select.material = new THREE.MeshBasicMaterial( { color: 0xff0000, shading: THREE.FlatShading, side: 2 });
		divMsg3.innerHTML = 'Material: <b>' + JAMA.materials[ key ].title + '</b>';
		scene.select.materialKey = key;

	};

	JAMA.addMaterialEditorTab = function() {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Edit the parameters of the current material';
		tab.innerHTML =
			'<a href=# id=tabMaterialEditor ><p class=button >' +
				'<i class="fa fa-cube"></i> Material Editor...' +
			'</p></a>';
		tabMaterialEditor.onclick = function() { JA.toggleTab( JAMA.MaterialEditorTab ); JAMA.updateMaterialEditorTab(); } ;

		JAMA.MaterialEditorTab = tab.appendChild( document.createElement( 'div' ) );
		JAMA.MaterialEditorTab.style.cssText = 'cursor: auto; display: none; ' ;

	};

	JAMA.updateMaterialEditorTab = function() {

		var m = scene.select.material;
		var txt =
			'<p>Selected id: ' + scene.select.id + '</p>' +
			'<p>' +
				'Material: <select id=selMaterial title="Select type" >' +
					'<option>Normal</option>' +
					'<option>Basic</option>' +
					'<option>Lambert</option>' +
					'<option>Phong</option>' +
				'<select><br>' +
				'Shading: &nbsp;<select id=selShading title="Select type" >' +
					'<option>None</option>' +
					'<option>Flat</option>' +
					'<option selected>Smooth</option>' +
				'<select><br>' +
				'Side: &nbsp; &nbsp;&nbsp;<select id=selSide title="Select sides" >' +
					'<option>Front</option>' +
					'<option>Back</option>' +
					'<option selected>Both</option>' +
				'<select><br>';

				if ( m.ambient ) txt += 'Ambient: &nbsp;<input type=color id=inpAmbient value=#' + m.ambient.getHexString() + ' > <output id=outAmbient >#' + m.ambient.getHexString() + '</output><br>';
				if ( m.color ) txt += 'Color: &nbsp; &nbsp;<input type=color id=inpColor value=#' + m.color.getHexString() + '> <output id=outColor >#' + m.color.getHexString() + '</output><br>';
				if ( m.emissive ) txt += 'Emissive: <input type=color id=inpEmissive value=#' + m.emissive.getHexString() + '> <output id=outEmissive >#' + m.emissive.getHexString() + '</output><br>';
				if ( m.specular ) txt += 'Specular: <input type=color id=inpSpecular value=#' + m.specular.getHexString() + '> <output id=outSpecular >#' + m.specular.getHexString() + '</output><br>';

				txt +=
				'Metal: &nbsp; &nbsp;<input type=checkbox id=inpMetal ><br>' +
				'Wireframe:<input type=checkbox id=inpWireframe value=' + m.wireframe + ' ><br>' +

				'Opacity: &nbsp;<input type=range id=inpOpacity title="0 to 1" min=0 max=1 step=0.01 value=' + m.opacity + ' >' +
					'<output id=outOpacity >' + m.opacity + '</output><br>' +
				'Shininess:<input type=range id=inpShininess title="0 to 300" min=0 max=300 step=5 value=' + m.shininess + ' >' +
					'<output id=outShininess >' + m.shininess + '</output><br>' +
			'</p>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(JAMA.MaterialEditorTab); >Close</a> ' +
			'</p>' +
		'';
		JAMA.MaterialEditorTab.innerHTML = txt;

		selMaterial.selectedIndex = m.type;
		selMaterial.onchange = function() {
			if ( selMaterial.selectedIndex === 0 ) {
				scene.select.material = new THREE.MeshNormalMaterial();
				scene.select.material.type = 0;
			} else if ( selMaterial.selectedIndex === 1 ) {
				scene.select.material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
				scene.select.material.type = 1;
			} else if ( selMaterial.selectedIndex === 2 ) {
				scene.select.material = new THREE.MeshLambertMaterial( { color: 0x000000 } );
				scene.select.material.type = 2;
			} else {
				scene.select.material = new THREE.MeshPhongMaterial( { color: 0x000000 } );
				scene.select.material.type = 3;
			}
			JAMA.updateMaterialEditorTab();
		};

		selShading.selectedIndex = m.shading;
		selShading.onchange = function() { m.shading = selShading.selectedIndex; JAMA.updateMaterialEditorTab(); };

		selSide.selectedIndex = m.side;
		selSide.onchange = function() { m.side = selSide.selectedIndex; JAMA.updateMaterialEditorTab(); };

		if ( m.ambient ) inpAmbient.onchange = function() { m.ambient.setHex( this.value.replace("#", "0x") ); JAMA.updateMaterialEditorTab(); };
		if ( m.color ) inpColor.onchange = function() { m.color.setHex( this.value.replace("#", "0x") ); JAMA.updateMaterialEditorTab(); };
		if ( m.emissive ) inpEmissive.onchange = function() { m.emissive.setHex( this.value.replace("#", "0x") ); JAMA.updateMaterialEditorTab(); };
		if ( m.specular ) inpSpecular.onchange = function() { m.specular.setHex( this.value.replace("#", "0x") ); JAMA.updateMaterialEditorTab(); };

		inpMetal.checked = m.metal;
		inpMetal.onchange = function() { m.metal = this.checked; JAMA.updateMaterialEditorTab(); };
		inpWireframe.checked = m.wireframe;
		inpWireframe.onchange = function() { m.wireframe = inpWireframe.checked; JAMA.updateMaterialEditorTab(); };

		inpOpacity.onchange = function() { m.opacity = parseFloat( this.value ); m.transparent = true; JAMA.updateMaterialEditorTab(); };
		inpShininess.onchange = function() { m.shininess = this.value; JAMA.updateMaterialEditorTab(); };

	};
