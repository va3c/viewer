
	browseRevitJson4Files ( location.hash );

	function browseRevitJson4Files ( parameters ) {

		if ( !scene || parameters.indexOf( '#new=true' ) > -1 ) {

			loadFileHTMLByURL( '#load-file-html-by-url.js#../templates/template-lights-shadows.html#displayInfo#' );

			callbackIframe = function() {

				callbackBrowseRevitJson4Files ( parameters );

			};

		} else {

			callbackBrowseRevitJson4Files ( parameters );

		}

	}

	callbackBrowseRevitJson4Files = function( parameters ) {

		loadFileJSON4ByURL( parameters );

		VH.displayMarkdown ( 'browse-revit-json4-files.md', menuLeft );

		callbackIframe = callbackIframeDefault;

	}