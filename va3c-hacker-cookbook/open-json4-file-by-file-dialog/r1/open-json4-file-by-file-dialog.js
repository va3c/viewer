
	var OFBFD = {};

	OFBFD.init = function() {

		var info = document.body.appendChild( document.createElement( 'div' ) );
		info.style.cssText = 'left: 20px; position: absolute; ';
		info.innerHTML = '<a href="" ><h1>' + document.title + '</h1></a>' +
			'<input type=file onchange=OFBFD.openFileByFileDialog(this) />' +
			'<p id=msg ></p>' +
		'';

	}

	OFBFD.openFileByFileDialog = function( fileObject ) {

		var file = fileObject.files[ 0 ];

		var reader = new FileReader();

		reader.onload = function ( event ) {

			data = reader.result;

			msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + 
				' type: ' + file.type + ' modified: ' + file.lastModifiedDate +
			'';

//console.log( data );

			data = JSON.parse( data );

// Three.js JSON 4+ only

			var loader = new THREE.ObjectLoader();

			data = loader.parse( data );

			scene.add( data );

		};

		if ( reader.readAsBinaryString !== undefined ) {

			reader.readAsBinaryString( file );

		} else {

			reader.readAsArrayBuffer( file );

		}

	}

	OFBFD.init();
