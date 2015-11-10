

<details>
<summary><h2>Preferences</h2></summary>
Auto Rotate after two seconds inactivity <input type=checkbox id=chkRotate  checked />  

Axis <input type=checkbox id=chkAxis onchange=toggleAxis(); />  
Gradient <input type=checkbox id=chkGradient onchange=toggleGradient(); checked />  
Ground <input type=checkbox id=chkGround onchange=toggleGround(); />
</details>


	function toggleAxis( length ) {

		var length = length ? length : 50;

		chkAxis = document.getElementById( 'chkAxis' );

		if ( chkAxis.checked ) {

			axisHelper = new THREE.AxisHelper( length );
			scene.add( axisHelper );

		} else {

			scene.remove( axisHelper );

		}

	}

	function toggleGradient () {

		gradient = document.getElementById( 'chkGradient' );

		if ( gradient.checked ) { 

			cssBackround = renderer.domElement.appendChild( document.createElement('style') );

			var col1 = "#" + Math.random().toString(16).slice(2, 8);
			var col2 = "#" + Math.random().toString(16).slice(2, 8);
			var col3 = "#" + Math.random().toString(16).slice(2, 8);
			var X = ( Math.random() * window.innerWidth ).toFixed(0);
			var Y = ( Math.random() * window.innerHeight ).toFixed(0);
			var center =  20 + ( Math.random() * 60 ).toFixed(0);

			cssBackround.innerText = 'body { ' +
				'background: -webkit-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
				'background: -moz-radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); ' +
				'background: radial-gradient(' + X + 'px ' + Y + 'px, farthest-corner, ' + col1 + ' 0%, ' + col2 + ' 50%, ' + col3 + ' 100%); }' +
			'';

		} else {

			cssBackround.innerText = 'body { background: #fff; }';

		}

	};

	function toggleGrid() {

		chkGrid = document.getElementById( 'chkGrid' );

		if ( chkGrid.checked ) { 

			gridHelper = new THREE.GridHelper( 50, 10 );
			scene.add( gridHelper );

		} else {

			scene.remove( gridHelper );

		}

	}

	function toggleGround() {

		chkGround = document.getElementById( 'chkGround' );

		if ( chkGround.checked ) { 

			var geometry = new THREE.BoxGeometry( 300, 2, 300 );
			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(),
				ambient: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 5
			} );

			ground = new THREE.Mesh( geometry, material );
			ground.position.set( 0, -50, 0 );
			ground.castShadow = true;
			ground.receiveShadow = true;
			scene.add( ground );

			helper = new THREE.BoxHelper( ground );
			helper.material.color.setRGB( 1, 0, 1 );
			scene.add( helper );

		} else {

			scene.remove( ground );
			scene.remove( helper );

		}

	}

// @@@@@@@@@@@@@@@@@@@

	var startTime = performance.now();
	var delayTime = 2000;

	function toggleRotate() {

		rotate = document.getElementById( 'chkRotate' );

		renderer.domElement.addEventListener( 'mousemove', onMouseMove, false ); // or mousedown?

		app.animate = animate;

	}

	function onMouseMove() {

		startTime = rotate.checked ? performance.now() : 1000000 ;

	}

	function animate( timestamp ) {

		if ( timestamp - startTime > delayTime ) {

			mesh.rotation.y +=0.001;

		}

		renderer.render( scene, camera );
		controls.update();
		requestAnimationFrame( animate);

	}

