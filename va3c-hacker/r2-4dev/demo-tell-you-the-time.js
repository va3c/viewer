// 2014-12-01 ~ vA3C authors ~ MIT License

	tellYouTheTime( location.hash );

	function tellYouTheTime( parameters ) {

//		VH.loadFileHTMLByURL( '../templates/clock-r1.html#displayInfo' );

		parameters = parameters.split ('#');

		parameters = parameters.length > 2 ? parameters : [ '', '../templates/clock-r1.html','displayInfo' ];

		VH.dispatchFileByURL ( parameters );

		VH.displayMarkdown ( 'demo-tell-you-the-time.md', menuLeft );

		var source = menuLeft.innerHTML;

		var text = parameters[3] || 'The current date and time in your part of the world is ' + new Date();

		var newText = source.replace( /\[text-to-speak-shows-here\]/, text );

		menuLeft.innerHTML = newText;

		var talk = new SpeechSynthesisUtterance( text );

		talk.onend = function( event ) { console.log('Finished in ' + event.elapsedTime + ' seconds.', event ); };

		window.speechSynthesis.speak( talk );

	}
