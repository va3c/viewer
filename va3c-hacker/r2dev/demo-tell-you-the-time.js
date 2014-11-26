

	tellYouTheTime( location.hash );

	function tellYouTheTime( parameters ) {

		location.hash = '';

		displayMarkdown ( 'demo-tell-you-the-time.md', info );

		parameters = location.hash.split ('#');

		source = info.innerHTML;
		var text = parameters[2] || 'The current date and time in your part of the world is ' + new Date();

		newText = source.replace( /\[text-to-speak-shows-here\]/, text );

		info.style.display = '';
		info.innerHTML = newText;

		var talk = new SpeechSynthesisUtterance( text );
		talk.onend = function( event ) { console.log('Finished in ' + event.elapsedTime + ' seconds.', event ); };
//		window.speechSynthesis.speak( talk );



	}
