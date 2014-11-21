
	var animationStartTime;
	var duration;
	var requestId;
	var pt;
	var slide;
	var slideIndex;
	var startTime;
	var update = function() {};
	var updateStartTime;

	demoAeronauticalArchitectural( location.hash );

	function demoAeronauticalArchitectural( parameters ) {

		parameters = parameters.split('#');
 
		if ( parameters.indexOf( 'demo' ) < 0 ) {

			location.hash = '#load-file-html.js#../templates/template-skybox.html';

			callbackIframe = function() {

				callbackIframe = callbackIframeDefault;

				location.hash = '';

				displayMarkdown ( 'demo-aeronautical-architectural.md', info );

			}

		} else {

			resetCounters();

		}

//console.log( 'demoAeronauticalArchitectural:' , parameters );

	}

	function resetCounters() {

		frames = 0
		slideIndex = 0;
		duration = 100;
		requestId = 0;

		slide = slide1;

		animationStartTime = performance.now();
		startTime = animationStartTime;

		slidesStart();

	}

	function speak( utterance ) {

		window.speechSynthesis.cancel();
		var talk = new SpeechSynthesisUtterance( utterance );
		window.speechSynthesis.speak( talk );
		msg.innerHTML = 'Slide ' + ++slideIndex + ': ' + utterance;

	}

	function slide1() {
		duration = 8000;

		controls.autoRotateSpeed = 0.8;
		controls.autoRotate = true;

		var text = 'Hello world! ' +
			'My name is Veee, ey, three, Sea. ' +
			'I am here to take you on a tour of historical aeronautics and architecture.' +
		'';
		speak( text );

		location.hash = '#load-file-json3.js#../../../3d-warehouse-samples/robie-house/untitled/robie-house.js#px=-100#sx=200#sy=200#sz=200#na=robie' ;

		for (var i = 1; i < info.children.length; i++) {
			info.children[i].style.display = 'none';
		}

		for (var i = 1; i < menu.children.length; i++) {
			menu.children[i].style.display = 'none';
		}

		slide = slide2;

	}

	function slide2() {
		duration = 3000;

		controls.autoRotate = false;

		robieHouse = scene.getObjectByName('robie');

		text = 'You are looking at Robie House';
		speak( text );

		location.hash = '#tween-camera-and-target.js#300#80#100#0#50#0#' + duration;

		slide = slide3;
	}


	function slide3() {
		duration = 3000;

		controls.autoRotate = false;

		text ='A national historic landmark in Chicago.';
		speak( text );

		location.hash = '#load-file-json3.js#../../cookbook/samples/WrightFlyer-pb-jw.js#px=0#py=50#pz=80#sx=8#sy=8#sz=8#na=wright' ;

		slide = slide4;
	}

	function update4( timestamp ) {
		var duration = 8000;
		p = ( timestamp - updateStartTime ) / duration;
		if ( p > 1 ) {
			updateStartTime = timestamp;
			p = 1;
		}
		prevPt = pt; 
		pt = spline.getPointAt( p );
		wrightFlyer.position.set( pt.x, pt.y, pt.z );
		wrightFlyer.lookAt( prevPt );

	}

	function slide4() {
		duration = 4000;

		wrightFlyer = scene.getObjectByName('wright');

		wrightFlyer.material.materials[0].ambient = 0xff0000;
		wrightFlyer.material.materials[0].color.setRGB( 1, 0, 0 );
		wrightFlyer.material.materials[0].needsUpdate = true;

		spline = new THREE.ClosedSplineCurve3([
			v( -100, 20,  200),
			v(  100, 80,  200),
			v(  200, 20,  100),
			v(  200, 80, -50),
			v(  100, 20, -100),
			v( -100, 80, -100),
			v( -200, 20, -50),
			v( -200, 80,  100),
		]);

		pt = v( 0, 0, 0 );

		text = 'It was designed by Frank Lloyd Wright and built in 1909';
		speak( text );

		location.hash = '#tween-camera-and-target.js#-180#15#100#0#5#0#' + duration;

		update = update4;
		slide = slide5;
	}

	function slide5() {
		duration = 4000;

		text = 'Now flying over head is the Wright Flyer.';
		speak( text );

		location.hash = '#tween-camera-and-target.js#-200#35#-100#1#5#-20#' + duration;

		slide = slide6;
	}

	function slide6() {
		duration = 4000;

		text = 'First flown in 1903 by the Wright brothers';
		speak( text );

		location.hash = '#tween-camera-and-target.js#250#80#-130#-50#5#0#' + duration;

		slide = slide7;
	}

	function slide7() {

		duration = 5000;

		text = 'Was this demo not started in the Wright fashion?';
		speak( text );

		location.hash = '#tween-camera-and-target.js#150#10#30#-50#5#0#' + duration;

		slide = slide8;

	}

	function slide8() {

		duration = 3000;

		text = 'Now we are adding Schoder House';
		speak( text );

		location.hash = '#load-file-json3.js#../../../3d-warehouse-samples/schroder-house/untitled/schroder-house.js#px=0#sx=5#sy=5#sz=5@#na=schroder' ;

		slide = slide9;

	}

	function slide9() {

		duration = 3000;

		schroderHouse = scene.getObjectByName('schroder');

		location.hash = '#tween-camera-and-target.js#5#25#90#-20#5#-15#' + duration;

		text = 'And taking away Robie House.';
		speak( text );

		scene.remove( robieHouse );

		slide = slide10;

	}

	function slide10() {

		duration = 4000;

		location.hash = '#tween-camera-and-target.js#100#10#-10#-50#5#0#' + duration;

		text = 'Built in 1919 and designed by Gerhard Richter';
		speak( text );

		scene.remove( wrightFlyer );

		slide = slide11;

	}

	function slide11() {

		duration = 5000;

		location.hash = '#load-file-json3.js#../../../fgx-aircraft/data/fkdr1/dr1.js#px=0#py=50#pz=80#sx=8#sy=8#sz=8#na=fokker' ;
//		location.hash = '#load-file-json3.js#../../../../fgx-repos/fgx-aircraft/data/fkdr1/dr1.js#px=50#py=50#pz=80#sx=8#sy=8#sz=8#na=fokker' ;

		text = 'Doesn\'t it look like it was built yesterday?';
		speak( text );

		slide = slide12;

	}

	function update12( timestamp ) {
		var duration = 8000;
		p = ( timestamp - updateStartTime ) / duration;
		if ( p > 1 ) {
			updateStartTime = timestamp;
			p = 1;
		}
		prevPt = pt; 
		pt = spline.getPointAt( p );
		fokkerDR1.position.set( pt.x, pt.y, pt.z );
		fokkerDR1.lookAt( prevPt );
	}

	function slide12() {

		duration = 4000;

		spline = new THREE.ClosedSplineCurve3([
			v( -100, 20,  200),
			v(  100, 80,  200),
			v(  200, 20,  100),
			v(  200, 80, -50),
			v(  100, 20, -100),
			v( -100, 80, -100),
			v( -200, 20, -50),
			v( -200, 80,  100),
		]);

		pt = v( 0, 0, 0 );

		location.hash = '#tween-camera-and-target.js#100#10#-10#-50#5#0#' + duration;

		text = 'Now flying is the Fokker D3 from 1915';
		speak( text );

		fokkerDR1 = scene.getObjectByName('fokker');

		fokkerDR1.geometry.applyMatrix( new THREE.Matrix4().makeRotationY( -0.5 * Math.PI ) );
		fokkerDR1.material.materials[0].ambient = 0xffff00;
		fokkerDR1.material.materials[0].color.setRGB( 1, 1, 0 );
		fokkerDR1.material.materials[0].needsUpdate = true;

		update = update12;
		slide = slide13;

	}

	function slide13() {

		duration = 3000;

		location.hash = '#tween-camera-and-target.js#120#80#-10#-50#15#0#' + duration;

		text = 'Doesn\'t it look like really really old school?';
		speak( text );

		slide = slideFinal;

	}


	function slideFinal() {

		text = 'This is the end of the demo. Thank you...';

		speak( text );

//		slidesPause();
		slide = function() {};

		for (var i = 1; i < info.children.length; i++) {
			info.children[i].style.display = '';
		}

		for (var i = 1; i < menu.children.length; i++) {
			menu.children[i].style.display = '';
		}

	}

	function slidesPause() {

		if ( requestId ) {

			window.cancelAnimationFrame( requestId );

		}

		requestId = 0;

	}

	function slidesStart() {

		animationStartTime = performance.now();
		startTime = 0;
		updateStartTime  = 0;
		requestId = window.requestAnimationFrame( slidesShow );

	}

	function slidesShow( timestamp ) {

		requestId = requestAnimationFrame( slidesShow );

		update( timestamp );

		if ( timestamp - startTime >  duration ) {

			slide();

			startTime = timestamp;

		}

	}

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }


