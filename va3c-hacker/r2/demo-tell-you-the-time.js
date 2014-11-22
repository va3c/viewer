

	tellYouTheTime( location.hash );

	function tellYouTheTime( parameters ) {

		parameters = location.hash.split ('#');
		var text = parameters[2] || 'The current date and time in your part of the world is ' + new Date();

		info.style.display = '';
		info.innerHTML = info.header + text;

		var talk = new SpeechSynthesisUtterance( text );
		talk.onend = function( event ) { console.log('Finished in ' + event.elapsedTime + ' seconds.', event ); };
		window.speechSynthesis.speak( talk );

		location.hash = '';

	}
