var Menubar = function ( editor ) {

	var container = new UI.Panel();

	var toggle = new UI.Button( '\u2630' ).onClick( function () {

		sidebar.dom.style.display = sidebar.dom.style.display === 'none' ? '' : 'none' ;
		toolbar.dom.style.display = toolbar.dom.style.display === 'none' ? '' : 'none' ;
		menubar.dom.style.width = toolbar.dom.style.display === 'none' ? '40px' : '400px' ;
		menubar.dom.style.overflow = toolbar.dom.style.display === 'none' ? 'hidden' : '' ;

	} );

	container.add( toggle );

	container.add( new Menubar.File( editor ) );
	container.add( new Menubar.Edit( editor ) );
	container.add( new Menubar.Add( editor ) );
	container.add( new Menubar.View( editor ) );
	container.add( new Menubar.Help( editor ) );

	return container;

}
