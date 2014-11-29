// 2014-11-26 ~ vA3C authors ~ MIT License

	tellYouTheTime( location.hash );

	function tellYouTheTime( parameters ) {

		location.hash = '';

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
