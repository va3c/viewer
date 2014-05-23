	var container, menu, stats, renderer, scene, camera, controls;

	var fname = '../../json/Hex_01.js';

	init();
	animate();

	function init() {
		var geometry, material, mesh;

		container = document.body.appendChild( document.createElement( 'div' ) );

		addCSS();
		addMenu();
		addInfo();
		addFileOpen();

		stats = new Stats();
		stats.domElement.style.cssText = 'bottom: 0; position: absolute; left: 0; ';
		document.body.appendChild( stats.domElement );

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.set( 15000, 15000, 15000 );
		controls = new THREE.OrbitControls( camera, renderer.domElement );

		loadFile( fname );
	}

	function addCSS() {

		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML = 'body { font: 600 12pt monospace; margin: 0; overflow: hidden; }' +
			'a {text-decoration: none; }' +
			'#menu { right: 20px; overflow: auto; padding: 10px; position: absolute; top: 20px; }' +
			'.button { background-color: #eee; outline: 1px #aaa solid; padding: 5px; }' +
		'';
	}

	function addMenuxxx() {
		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.style.cssText = 'right: 20px; position: absolute; top: 20px; ';
		menu.innerHTML = '<h1>' + document.title + '<h1>' +
			'<div id=msg></div>';
	}

	function addMenu() {
		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';
		menu.style.cssText = ' background-color: #ccc; opacity: 0.8; ';
//		menu.addEventListener( 'mousedown', mouseMove, false );
		menu.innerHTML = 
			'<h1>' +
				'<a href="" >' + document.title + '</a> ' +
				'<a href=# id=infoIcon onclick=info.style.display="block"; >&#x24D8;</a>' +
			'</h1>' +
			'<p>' +
				'Zoom: &nbsp;  &nbsp;<input id=setZoom title="0 to 18: OK" type=number min=0 max=18 step=1 ><br>' +
				'Pretty colors: <input id=inpPretty type=checkbox ><br>' +
				'Overlay: <select id=selList title="Select the 2D overlay" >select option<select><br>' +
				'<input type=button onclick=saveIt(); value="Save as PNG" >' +
			'</p>' +
			'<hr><br>' +
			'<p class=button >' +
				'<a href=# id=fileOpen onclick=fileOpen.style.display="block" >File Open...</a>' +
			'</p>' +
			'<div id=messages></div>' +
		'';

//		var data = requestFile( sourceDir + fileList );
//		files = data.split(/\r\n|\n/);
		var list = [ 'aaa','bbb','ccc','ddd','eee' ];
		for (var option, i = 0; i < list.length; i++) {
			option = document.createElement( 'option' );
			option.innerText = list[i];
			selList.appendChild( option );
		}

		selList.onchange = function() { requestHGTFile( sourceDir + files[ selHGT.selectedIndex ] ); };
		selList.selectedIndex = 1;

//		window.addEventListener('mouseup', mouseUp, false);
	}

	function addInfo() {
		info = document.body.appendChild( document.createElement( 'div' ) );
		info.style.cssText = 'display: none; background-color: #ccc; left: 50px; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; left: 0; height: 370px; margin: auto; position: absolute; right: 0; top: 0; width: 500px; zIndex:10; ';
		info.innerHTML =
			'<div onclick=info.style.display="none"; >' +
				'<h3>' + document.title + '</h3>' +
				'<h4>Features include the following:</h4>' +
				'<ul>' +
					'<li>xxx</li>' +
					'<li>xxx</li>' +
				'</ul>' +
				'<a href="https://github.com/va3c/" target="_blank">Source code</a><br>' +
				'<small>' +
					'credits: <a href="http://threejs.org" target="_blank">three.js</a> - ' +
					'<a href="http://khronos.org/webgl/" target="_blank">webgl</a> - ' +
					'<a href="http://va3c.github.io" target="_blank">vA3C</a><br>' +
					'copyright &copy; 2014 vA3C authors ~ MIT license' +
				'</small><br><br>' +
				'<i>Click anywhere in this message to hide...</i>' +
		'</div>';
		infoIcon.style.cssText += 'text-decoration: none; ';
		infoIcon.title = 'Get some helpful information';
		//infoIcon.onclick = 'info.style.display="block";';  // not work
	}

	function addFileOpen() {
		fileOpen = document.body.appendChild( document.createElement( 'div' ) );
		fileOpen.style.cssText = 'display: none; background-color: #ccc; left: 50px; opacity: 0.9; padding: 20px; ' +
			'bottom: 0; left: 0; height: 370px; margin: auto; position: absolute; right: 0; top: 0; width: 500px; zIndex:10; ';
		fileOpen.innerHTML =
			'<div onclick=fileOpen.style.display="none"; >' +
				'<h3>File Open</h3>' +
				'<p>Select a sample file</p>' +
// remember: no spaces in the JS below or add quotes 
					'<p><select id=selSample onchange=loadJS("../../json/"+samples[this.selectedIndex]) ></select><p>' +

				'<p>Select a local file</p>' +
				'<p><input type=file onchange=readFile(this);></input></p>' +
				'<p>Paste a JSON URL</p>' +
				'<p><input type=text onchange=loadURL(this.value); ></input></p>' +
//				'<p>Sample <a href=JavaScript:loadURL("http://va3c.github.io/json/revit/Project2.rvt.js"); );>Revit Project 2</a></p>' +
				'<p>Sample <a href=JavaScript:loadURL("../../json/revit/Project2.rvt.js"); );>Revit Project 2</a></p>' +

				'<br>' +
				'<p><i>Click anywhere in this message to cancel...</i></p>' +
		'</div>';
//		infoIcon.style.cssText += 'text-decoration: none; ';
		fileOpen.title = 'Open a different file';

		samples = [ 'revit/Project2.rvt.js','revit/rac_basic_sample_project.rvt.js','Hex_01.js', 'json/TypTower.json',
			'json/TTX.json','json/3dsmax/TransamericaPyramid2.js','Vase_01.js',


//'DrCyanKlein.json', '05_15.bvh', '07_03.bvh', '07_06.bvh', '08_08.bvh', '10_02.bvh', '13_14.bvh', '13_20.bvh', '13_29.bvh',
//			'13_32.bvh', '14_10.bvh', '14_24.bvh', '16_15.bvh', '16_31.bvh', '16_36.bvh', '17_07.bvh'
		];
		for (var len = samples.length, option, i = 0; i < len; i++) {
			option = document.createElement( 'option' );
			option.innerText = samples[i];
			selSample.appendChild( option );

		}

	}

	function loadFile (fname) {
		var loader = new THREE.ObjectLoader();
        loader.load( fname, function( result ){;
			scene = result;
			addAssets();
        });
	}

	function readFile( that ){
		var loader = new THREE.ObjectLoader();
		if ( that.files && that.files[0]){
			var reader = new FileReader();
			reader.onload = function ( event ) {  
				var data = JSON.parse( event.target.result );
				scene = loader.parse( data );
				addAssets();
// console.log( scene );
			};
			reader.readAsText(that.files[0]);
		}
	}



	function loadURL ( url ) {
		var loader = new THREE.ObjectLoader();
		script = document.body.appendChild( document.createElement('script') );
		script.src = url;

		var result = requestFile( url );
		var data = JSON.parse( result );
		scene = loader.parse( data );
		addAssets();
	}

	function requestFile( fname ) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.crossOrigin = "Anonymous"; 
		xmlHttp.open( 'GET', fname, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}

	function addAssets() {
					targetList = [];
// lights
			scene.add( new THREE.AmbientLight( 0x444444 ) );

			var light = new THREE.PointLight( 0xffffff, 1 );
			light.position = camera.position;
			scene.add( light );

// axes
			scene.add( new THREE.ArrowHelper( v(1, 0, 0), v(0, 0, 0), 30, 0xcc0000) );
			scene.add( new THREE.ArrowHelper( v(0, 1, 0), v(0, 0, 0), 30, 0x00cc00) );
			scene.add( new THREE.ArrowHelper( v(0, 0, 1), v(0, 0, 0), 30, 0x0000cc) );

// ground box
			geometry = new THREE.BoxGeometry( 20000, 100, 20000 );
			material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0, -10, 0 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );

//			computeNormalsAndFaces();
	}

	function computeNormalsAndFaces() {
		for ( var i = 0, iLen = scene.children.length, items; i < iLen; i++ ) {
			items = scene.children;
			if ( items[i].hasOwnProperty("geometry") ) {
				items[i].geometry.mergeVertices();
				items[i].castShadow = true;
				items[i].geometry.computeFaceNormals();
                targetList.push( items[i] );
			}
            if ( items[i].children.length > 0 ){
                for ( var k = 0, itemsChildren = items[i], kLen = itemsChildren.length ; k < kLen; k++ ) {
                    if ( itemsChildren[k].hasOwnProperty("geometry") ) {
                        targetList.push( itemsChildren[k] );
                    }
                }
            }
		}
	}

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		controls.update();
		stats.update();
	}