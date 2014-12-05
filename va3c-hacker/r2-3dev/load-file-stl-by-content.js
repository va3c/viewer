
 
	function loadFileSTLByContents ( data, fileName, parameters  ) { 

		geometry = new THREE.STLLoader().parse( data );
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xffffff * Math.random(), shading: THREE.SmoothShading, shininess: 200, specular: 0x111111 } );

		mesh = new THREE.Mesh( geometry, material );

		scene.add( mesh );

		msg1.innerHTML += fileName + '<br>';

	}
