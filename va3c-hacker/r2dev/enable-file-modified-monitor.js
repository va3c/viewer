// 2014-11-23 ~ Theo Armour ~ MIT License

	var updateStartTime = 0;

	enableFileModifiedMonitor( location.hash );


	function enableFileModifiedMonitor( parameters ) {

		location.hash = '';

		parameters = parameters || 'nothing';

		parameters = parameters.split('#');

		displayMarkdown( 'enable-file-modified-monitor.md', info );

		if ( !THREE ) { 

			location.hash = '#load-file-html.js#../templates/template-basic.html#displayInfo';

		}

		if ( parameters.indexOf( 'monitor' ) > -1 ) {

			animate = monitorRAF;
			animate();

		}

		if ( parameters.indexOf( 'default' ) > -1 ) {

			animate = defaultRAF;
			animate();

		}

// console.log( parameters );

	}

	function updates( timestamp ) {

		var duration = 3000;

		p = ( timestamp - updateStartTime ) / duration;

		if ( p > 1 ) {

			updateStartTime = timestamp;

			p = 1;

			var reader = new FileReader();

			reader.onload = function ( event ) {

				if ( file.lastModified != timeLastModified ) {

					obj = scene.getObjectByName( 'objectToMonitor' );

					scene.remove( obj );

					output = reader.result;

					msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + ' ' +
						'type: ' + file.type + ' modified: ' + file.lastModifiedDate +
					'';

					timeLastModified = file.lastModified;

					loadFileJSON4Contents( output, '#na=objectToMonitor' );

console.log( 'bingo', Date.now(), file.lastModified, timeLastModified );

				}

			}

			reader.readAsText( file );

		}

	}

	function monitorRAF( timestamp ) {

		renderer.render( scene, camera );
		controls.update();
		updates( timestamp );
		requestAnimationFrame( animate );

	}

	function defaultRAF() {

		renderer.render( scene, camera );
		controls.update();
		requestAnimationFrame( animate );

	}
