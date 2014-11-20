
	viewMarkdownFile();

	function viewMarkdownFile () {

		var fileName = location.hash.replace( '#view-markdown-file#', '' );

		displayMarkdown( fileName, info );

	}
