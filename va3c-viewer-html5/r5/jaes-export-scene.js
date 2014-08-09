	var JAES = {} || JAES;

	JAES.count = 0;
	JAES.callback = function () {};

	JAES.addExportersTab = function () {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Export current view to a data file';
		tab.innerHTML =
			'<a href=# id=tabExporters ><p class=button >' +
				'<i class="fa fa-paw"></i> Exporters...' +
			'</p></a>'; 
		tabExporters.onclick = function() { JA.toggleTab( JAES.exporters ); };

		JAES.exporters = JA.menu.appendChild( document.createElement( 'div' ) );
		JAES.exporters.style.cssText = 'cursor: auto; display: none; ' ;
		JAES.exporters.innerHTML =
			'<p>Save what you have created...</p>' +
			'<p><a href=# onclick=JAES.exportGeometry(); title="Faces and vertices only. No materials." >Export Geometry</a></p>' +
			'<p><a href=# onclick=JAES.exportObject(); title="Geometry & materials of currently selected objct" >Export Object</a></p>' +
			'<p><a href=# onclick=JAES.exportScene(); title="Everything including lights and cameras" >Export Scene</a></p>' +
		'';

	};

	JAES.loadScripts = function () {
		var p = 'http://mrdoob.github.io/three.js/examples/js/';

		var scripts = [
			'utils/GeometryUtils.js',
			'exporters/BufferGeometryExporter.js',
			'exporters/TypedGeometryExporter.js',
			'exporters/GeometryExporter.js',
			'exporters/MaterialExporter.js',
			'exporters/ObjectExporter.js',
			'exporters/SceneExporter.js'
		];

		for (var i = 0; i < 7; i++) {
			JAES.loadScript( p + scripts[i] );
		}
	};

	JAES.loadScript = function ( source ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = source;
		script.onload = function () { 
			if ( JAES.count >= 6 ) { JAES.callback(); }
			JAES.count++;
		};
	};

	JAES.exportGeometry = function () {
		if ( !THREE.ObjectExporter ) { 
			JAES.callback = JAES.exportGeometry; 
			JAES.loadScripts( ); 
			return;
		}

		var object = scene.select;
		var exporter = new THREE.ObjectExporter();

		var output = exporter.parse( object.geometry );

		if ( exporter instanceof THREE.BufferGeometryExporter ||
			exporter instanceof THREE.GeometryExporter ) {

			output = JSON.stringify( output, null, '\t' );
			output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		}

		var blob = new Blob( [ output ], { type: 'text/plain' } );
//		var objectURL = URL.createObjectURL( blob );

//		window.open( objectURL, '_blank' );
//		window.focus();

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = scene.select.name + '.json';
		a.click();
		delete a;

	};

	JAES.exportObject = function () {
		if ( !THREE.ObjectExporter ) { 
			JAES.callback = JAES.exportObject; 
			JAES.loadScripts( ); 
			return;
		}

		var object = scene.select;
		var exporter = new THREE.ObjectExporter();

		var output = JSON.stringify( exporter.parse( object ), null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );
//		var objectURL = URL.createObjectURL( blob );

//		window.open( objectURL, '_blank' );
//		window.focus();

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = scene.select.name + '.json';
		a.click();
		delete a;
	};

	JAES.exportScene = function() {
		if ( !THREE.ObjectExporter ) { 
			JAES.callback = JAES.exportScene; 
			JAES.loadScripts( ); 
			return;
		}

		var exporter = new THREE.ObjectExporter();
		var output = exporter.parse( scene );
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = scene.select + '.json';
		a.click();
		delete a;

	};
