Sidebar.Attributes = function ( editor ) {

	var signals = editor.signals;

	var container = new UI.CollapsiblePanel();
	container.setDisplay( 'none' );

	container.addStatic( new UI.Text().setValue( 'ATTRIBUTES' ) );
	container.add( new UI.Break() );

	return container;

};