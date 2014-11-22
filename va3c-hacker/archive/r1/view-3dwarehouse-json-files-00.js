
	view3dWarehouseJsonFiles ();

	function view3dWarehouseJsonFiles () {

console.log( 'view3dWarehouseJsonFiles:' );

		if ( !THREE ) { 

			VH.loadScript( 'load-file-html.js' );

		}

//		VH.loadScript( 'load-file-html.js#../templates/template-basic.html', callbackONMS() );

//		callbackIframe = function() {

console.log( 'callbackIframe 3D Warehouse:' );

//			callbackJSON();

//		}

		displayMarkdown ( 'view-3dwarehouse-json-files.md', info );

	}

	function callbackONMS () {

console.log( 'callbackONMS' );

	}

	function callbackJSON () {

console.log( 'callbackJSON' );

		displayMarkdown ( 'view-3dwarehouse-json-files.md', info );

		callbackIframe = callbackIframeDefault;

//		location.hash = '';

	}