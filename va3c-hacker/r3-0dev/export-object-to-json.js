	exportObject();

	function exportObject() {

		if ( !lastSelected ) {

			alert( 'Nothing selected...' );

			return;

		}

		var output = lastSelected.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'object.json';
		a.click();
		delete a;

	}