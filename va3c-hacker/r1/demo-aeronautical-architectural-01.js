
	var animationStartTime;
	var frames;
	var interval;

	var requestId;
	var slide;
	var slideIndex;
	var startTime;
	var txt;
	var update;
	var updateStartTime;

/*
	var callbackTweenDefault = function () { 
		toggleMenu( menu );
		toggleMenu( info );
		location.hash = ''; 
		console.log( 'callbackTweenDefault' ); 
	};
	var callbackTween = callbackTweenDefault;



	var talk = new SpeechSynthesisUtterance();

	var watch = setInterval( function() {
// Load all voices available
		var voices = speechSynthesis.getVoices();
		if ( voices.length !== 0 ) {
talk.default = false;
			talk.voice = voices[ 2 ]; // Note: some voices don't support altering params
//			talk.volume = 0.5; // 0 to 1
			talk.rate = 1.2; // 0.1 to 10
//			talk.pitch = 0.1; //0 to 2
			talk.lang = 'en-GB';

			clearInterval( watch );
//			speechSynthesis.speak( talk );
		}
	}, 1 );

*/


	demoAeronauticalArchitectural( location.hash );

	function demoAeronauticalArchitectural( parameters ) {

		parameters = parameters.split('#');
 
		if ( parameters.indexOf( 'demo' ) < 0 ) {

			location.hash = '#load-file-html.js#../templates/template-lights-shadows.html';

			callbackIframe = function() {

				callbackIframe = callbackIframeDefault;

				location.hash = '';

				displayMarkdown ( 'demo-aeronautical-architectural.md', info );

			}

		} else {

			resetCounters();

			slidesStart();

		}

//console.log( 'demoAeronauticalArchitectural:' , parameters );

	}

	function resetCounters() {
		frames = 0
		slideIndex = 0;
		interval = 10000000;
		requestId = 0;
		txt = 'starting';

		slide = slide1;

		animationStartTime = performance.now();
		startTime = animationStartTime;

		slide();
	}

	function speak( utterance ) {
		window.speechSynthesis.cancel();
		var talk = new SpeechSynthesisUtterance( utterance );
		window.speechSynthesis.speak( talk );
	}

	function slide1() {
		interval = 5000;

		for (var i = 1; i < menu.children.length; i++) {
			menu.children[i].style.display = 'none';
		}

		for (var i = 1; i < info.children.length; i++) {
			info.children[i].style.display = 'none';
		}

		controls.autoRotateSpeed = 0.5;
		controls.autoRotate = true;

		var text = 'Hello world! ' +
			'My name is Veee, ey, three, Sea. ' +
			'I am here to take you on a tour of historical aeronautics and architecture.' +

		'';
		speak( text );
		msg.innerHTML = text;

		location.hash = '#load-file-json3.js#../../../3d-warehouse-samples/robie-house/untitled/robie-house.js#px=-100#sx=200#sy=200#sz=200' ;

		slide = slide2;

	}

	function slide2() {
		interval = 5000;

		controls.autoRotate = false;

		text = 'You are looking at Robie House';
		speak( text );
		msg.innerHTML = 'slide 1: ' + text;

		location.hash = '#tween-camera-and-target.js#300#80#100#0#50#0#' + interval;

		slide = slide3;
	}

	function slide3() {
		interval = 8000;

		text = 'A national historic landmark in Chicago. It was designed by Frank Lloyd Wright and built in 1909';
		speak( text );
		msg.innerHTML = 'slide 3: ' + text;

		location.hash = '#tween-camera-and-target.js#-180#15#100#0#5#0#' + interval;

		slide = slide4;
	}

	function slide4() {
		interval = 5000;

		text = 'It is renowned as the greatest example of Wight\'s Prairie School style';
		speak( text );
		msg.innerHTML = 'slide 4: ' + text;

		location.hash = '#tween-camera-and-target.js#-200#35#-100#1#5#-20#' + interval;

		slide = slide5;
	}

	function slide5() {
		interval = 5000;

		text = 'Without this house, much of modern architecture as we know it today, might not exist';
		speak( text );
		msg.innerHTML = 'slide 5: ' + text;

		location.hash = '#tween-camera-and-target.js#250#80#-130#-50#5#0#' + interval;

		slide = slide6;
	}

	function slide6() {
		interval = 5000;
		text = 'now another thing';
		speak( text );
		msg.innerHTML = 'slide 5: ' + text;

		location.hash = '#tween-camera-and-target.js#250#10#30#-50#5#0#' + interval;

		slide = slideFinal;
	}


/*
	function slide1 () {

		for (var i = 1; i < menu.children.length; i++) {
			menu.children[i].style.display = 'none';

		}

		for (var i = 1; i < info.children.length; i++) {
			info.children[i].style.display = 'none';

		}

		controls.autoRotate = false;

		txt = 'slide 1 - You are looking at Robie House';

		speakText( txt );

		callbackTween = slide2;

		location.hash = '#tween-camera-and-target.js#300#80#100#0#50#0#5000#s1';

		msg.innerHTML = 'slide 1: ' + txt;

console.log( 'slide1' );

	};


	slide2 = function() {

		txt = 'A national historic landmark in Chicago. It was designed by Frank Lloyd Wright and built in 1909';

		speakText( txt );

		callbackTween = slide2a;

		location.hash = '#tween-camera-and-target.js#-180#15#100#0#5#0#8000#s2';

		msg.innerHTML = 'slide 2: ' + txt;

console.log( 'slide2' );

	}

	slide2a = function() {

//		txt = '2a'; //It is renowned as the greatest example of Wight\'s Prairie School style';

		msg.innerHTML = 'slide 2a';

//		callbackTween = slide3;

		callbackLoadFileJSON = slide3;

		location.hash = '#load-file-json3.js#../../../3d-warehouse-samples/schroder-house/untitled/schroder-house.js#sx=5#sy=5#sz=5 ';

console.log( 'slide2a' );
	}

	slide3 = function() {

		callbackLoadFileJSON = function() {};

		txt = 'It is renowned as the greatest example of Wight\'s Prairie School style';

		speakText( txt, slide4 );

		callbackTween = slide4;

		location.hash = '#tween-camera-and-target.js#-200#35#-100#1#5#-20#8000#s3';

		msg.innerHTML = 'slide 3: ' + txt;
console.log( 'slide3' );
	}



	slide4 = function() {

		txt = 'Without this house, much of modern architecture as we know it today, might not exist';

		speakText( txt );

		callbackTween = slide5;

		location.hash = '#tween-camera-and-target.js#250#80#-130#-50#5#0#8000#s4';

		msg.innerHTML = 'slide 4: ' + txt;
console.log( 'slide4' );
	}

	slide5 = function() {

		txt = 'now we have another house';

		speakText( txt );

		callbackTween = lastSlide;

		location.hash = '#tween-camera-and-target.js#250#10#30#-50#5#0#8000#s5';

		msg.innerHTML = 'lastSlide: ' + txt;
console.log( 'slide5' );
	}

	lastSlide = function() {

		txt = 'Thank you';

		speakText( txt );

		callbackTween = callbackTweenDefault;

		location.hash = '#tween-camera-and-target.js#100#100#100#0#0#0#5000#last';

		msg.innerHTML = 'The End: ' + txt;

console.log( 'slidelast' );

	}

*/

	function slideFinal() {

		text = 'The End.';
		speak( text );

		slidesPause();

	}

	function slidesPause() {
		if ( requestId ) {
			window.cancelAnimationFrame( requestId );
		}
		requestId = 0;
	}

	function slidesStart() {
		updateStartTime = animationStartTime = performance.now();
		requestId = window.requestAnimationFrame( slidesShow );
	}

	function slidesShow( timestamp ) {

//		update( timestamp );
//		msg1.innerHTML = 'Frames:' + ++frames + ' animation time:' + Math.floor( timestamp - animationStartTime ) + 
			' % complete:' + Math.floor( 100 * ( timestamp - updateStartTime ) / interval );
//		msg3.innerHTML = 'left:' + box.style.left + ' top:' + box.style.top;
		requestId = requestAnimationFrame( slidesShow );
		if ( timestamp - startTime >  interval ) {
			slide();
//			msg2.innerHTML = 'interval:' + interval + ' slideIndex: ' + ++slideIndex;
			startTime = timestamp;
		}
	}
