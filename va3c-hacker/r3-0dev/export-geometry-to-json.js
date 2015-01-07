	exportGeometry();

	function exportGeometry() {

		if ( !VH.lastSelected && app.VH.lastSelected ) {

			VH.lastSelected = app.VH.lastSelected;

		}

		if ( !VH.lastSelected && !app.VH.lastSelected ) {

			alert( 'Nothing selected...' );

			return;

		}

		var geometry = VH.lastSelected.geometry;

		var output = geometry.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );

		var a = document.createElement( 'a' );
		a.href = window.URL.createObjectURL( blob );
		a.download = 'spline-geometry.json';
		a.click();
		delete a;

	}