
console.log( 'enable camera follow' )

	var templateFile = 'http://fgx.github.io/fgx-aircraft-overview/r8/aircraft-overview.html';

		function callback() {

			VH.updateSceneVariables ();

			VH.updateSceneElements();

//			VH.displayMarkdown ( 'demo-aeronautical-architectural.md', menuLeft );

		}

	VH.loadFileHTMLByURL( templateFile, [''], callback );

//	VH.displayMarkdown( '../content/fgx-aircraft/fgx-aircraft.md', menuLeft );