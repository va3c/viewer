

	showYouOldSchoolViewer();

	function showYouOldSchoolViewer() {

		info.style.display = 'none';

		var iframes = document.getElementsByTagName( 'iframe' ) ;

		for ( var i = 0, len = iframes.length; i < len; i++ ) {
			iframes[0].parentNode.removeChild( iframes[ 0 ] );
		}



		content.innerHTML = '<iframe src="../../va3c-viewer-html5/r8dev/va3c-viewer-r8dev.html#autocrapdoodle" ' +
			'width=' + window.innerWidth + ' height=' + window.innerHeight + ' ></iframe>';

		location.hash = '';

	}