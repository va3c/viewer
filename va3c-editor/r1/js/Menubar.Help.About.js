var About = function ( editor ) {

	var container = new UI.Panel();

	var text =  new UI.Panel();
	text.innerHTML =
			'<h1>vA3C Editor</h1>' +
			'<p>Features</p>' +
		'';
	container.add ( text );

	return container;

}
