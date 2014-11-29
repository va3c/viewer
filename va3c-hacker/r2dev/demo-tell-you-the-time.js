// 2014-11-26 ~ vA3C authors ~ MIT License

	tellYouTheTime( location.hash );

	function tellYouTheTime( parameters ) {

//		location.hash = '';
		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/clock-r1.html#displayInfo';


		}
		displayMarkdown ( 'demo-tell-you-the-time.md', info );

		var parameters = parameters.split ('#');

		var source = info.innerHTML;

		var text = parameters[2] || 'The current date and time in your part of the world is ' + new Date();

		var newText = source.replace( /\[text-to-speak-shows-here\]/, text );

		info.innerHTML = newText;
		info.style.display = '';

		var talk = new SpeechSynthesisUtterance( text );

		talk.onend = function( event ) { console.log('Finished in ' + event.elapsedTime + ' seconds.', event ); };

		window.speechSynthesis.speak( talk );



	}

	function buildClock() {

		geometry = new THREE.CylinderGeometry( 50, 50, 10, 50 );
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff * Math.random(), 
			ambient: 0xffffff * Math.random(),
			specular: 0xffffff * Math.random()
//			shading: THREE.FlatShading,
//			shininess: 0.001
		} );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, 10, 0 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );

// Cubes
		geometry = new THREE.BoxGeometry( 2, 1, 10  );
		var angle = Math.PI / 6;
		for (var i = 0; i < 12; i++) {
			material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(), 
				ambient: 0xffffff * Math.random(),
				opacity: Math.random(),
				specular: 0xffffff * Math.random(),
				shading: THREE.FlatShading,
				shininess: 10,
				transparent: true
			} );

			mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 40 * Math.cos( angle * i ), 16, 40 * Math.sin( angle * i ) );
			mesh.rotation.y = ( Math.PI / 2 ) - angle * i;
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
			cubes.push( mesh );

			helper = new THREE.BoxHelper( mesh );
			helper.material.color.setRGB( 1, 0, 0 );
			scene.add( helper );

		}

// Seconds
		geometry = new THREE.BoxGeometry( 2, 1, 40  );
		angle = time.getSeconds() * Math.PI / 30;
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff * Math.random(), 
			ambient: 0xffffff * Math.random(),
			opacity: Math.random(),
			specular: 0xffffff * Math.random(),
			shading: THREE.FlatShading,
			shininess: 10,
			transparent: true
		} );

		handSeconds = new THREE.Mesh( geometry, material );
		handSeconds.position.set( 25 * Math.cos( angle ), 19, 25 * Math.sin( angle ) );
		handSeconds.rotation.y = ( Math.PI / 2 ) - angle;
		handSeconds.castShadow = true;
		handSeconds.receiveShadow = true;
		scene.add( handSeconds );

// Minutes
		geometry = new THREE.BoxGeometry( 2, 1, 30  );
		angle = time.getMinutes() * Math.PI / 30;
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff * Math.random(), 
			ambient: 0xffffff * Math.random(),
			opacity: Math.random(),
			specular: 0xffffff * Math.random(),
			shading: THREE.FlatShading,
			shininess: 10,
			transparent: true
		} );

		handMinutes = new THREE.Mesh( geometry, material );
		handMinutes.position.set( 15 * Math.cos( angle ), 19, 15 * Math.sin( angle ) );
		handMinutes.rotation.y = ( Math.PI / 2 ) - angle;
		handMinutes.castShadow = true;
		handMinutes.receiveShadow = true;
		scene.add( handMinutes );


// Hours

// Minutes
		geometry = new THREE.BoxGeometry( 2, 1, 20  );
		angle = time.getHours() * Math.PI / 30;
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff * Math.random(), 
			ambient: 0xffffff * Math.random(),
			opacity: Math.random(),
			specular: 0xffffff * Math.random(),
//			shading: THREE.FlatShading,
			shininess: 10,
			transparent: true
		} );

		handHours = new THREE.Mesh( geometry, material );
//		handHours.position.set( 10 * Math.cos( angle ), 18, 10 * Math.sin( angle ) );
//		handHours.rotation.y = ( Math.PI / 2 ) - angle;
		handHours.castShadow = true;
		handHours.receiveShadow = true;
		scene.add( handHours );

	}
	function updateHands() {
		var time = new Date();
		angle = time.getSeconds() * Math.PI / 30;
		handSeconds.position.set( -25 * Math.cos( angle ), 19, -25 * Math.sin( angle ) );
		handSeconds.rotation.y = ( Math.PI / 2 ) - angle;

		angle = time.getMinutes() * Math.PI / 30;
		handMinutes.position.set( -25 * Math.cos( angle ), 18, -25 * Math.sin( angle ) );
		handMinutes.rotation.y = ( Math.PI / 2 ) + Math.PI - angle;

		angle = time.getHours() * Math.PI / 30;
		handHours.position.set( -15 * Math.cos( angle), 17, 15 * Math.sin( angle ) );
		handHours.rotation.y =  angle -  Math.PI / 2 ;

	}

	function animate( timestamp ) {
		updateHands();
		renderer.render( scene, camera );
		controls.update();
		stats.update();
		requestAnimationFrame( animate );

	}