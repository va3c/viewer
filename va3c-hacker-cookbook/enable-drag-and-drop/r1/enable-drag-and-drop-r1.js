
	function addDADEvents() {

/*		app = VH.ifr.contentWindow ;
		THREE = app.THREE;
		scene = app.scene;
		renderer = app.renderer;

*/

//		VH.updateSceneElements( '', '' );

		renderer.domElement.addEventListener( 'dragover', function ( event ) {

			event.preventDefault();

			event.dataTransfer.dropEffect = 'copy';

		}, false );


		renderer.domElement.addEventListener( 'drop', function ( event ) {

//console.log( 'event' );

			event.preventDefault();

			readFile( event.dataTransfer );

		}, false );

	}


	function readFile( that ) {

		name = that.files[0].name;

		var reader = new FileReader();

		reader.addEventListener( 'load', function ( event ) {

			contents = reader.result;

			app.callback = function(){ console.log( 'drag and drop complete' ); };

			VH.dispatchFileByContents( contents, name, '#add=true' )

		}, false );

//		reader.readAsText( that.files[0] );


		if ( reader.readAsBinaryString !== undefined ) {

			reader.readAsBinaryString( that.files[0] );

		} else {

			reader.readAsArrayBuffer( that.files[0] );

		}

	}
