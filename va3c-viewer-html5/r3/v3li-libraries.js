	var V3LI = {} || V3LI;

	V3LI.boilerplate = 'boilerplate-simple.html';

	V3LI.addLibrariesTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'View available libraries';
		tab.innerHTML =
			'<a href=# onclick=JA.toggleTab(V3LI.libraries); ><p class=button >' +
				'<i class="fa fa-paw"></i> Introduction' +
			'</p></a>'; 

		V3LI.libraries = JA.menu.appendChild( document.createElement( 'div' ) );
		V3LI.libraries.style.cssText = 'cursor: auto; display: ; ' ;
		V3LI.libraries.innerHTML =
			'<input type=radio name=libFileOpen id=libOpenOver /> Overwrite current view<br>' +
			'<input type=radio name=libFileOpen id=libOpenAppend /> Append to current view<br>' +
			'<p>A work in progress. Much broken. Nonetheless lots worth exploring. More goodies on the way...</p>' +
		'';

		libOpenOver.checked = true;
	};

	V3LI.init = function() {

		JA.about.style.height = '450px';
		JA.about.innerHTML =
			'<h3>' + document.title + ' ' + JA.titleIcon + '</h3>' +
				'<p>View Revit, Rhino/Grasshopper 3DS Max and other model types models in 3D with any web browser using Three.js and data rendered as JSON files.</p>' +
				'<p>This script is an update to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a></p>' +
				'<p>Team Members: Benjamin Howes, Jonatan Schumacher, Jeremy Tammik, Matt Mason, Kevin Vandecar, Charlie Portelli, Josh Wentz, Femi King, Zach Flanders & Theo Armour</p>' +
				'<p>Supporters include: Mostapha Roudsari, Ashley Reed, Anne Waelkens, Jim Quanci, Elcin Ertugrul, Amir Tasbihi and many more. Others?</p>' +
			'<small>' +
				'<a href="http://va3c.github.io/viewer/va3c-viewer-html5/readme-reader.html" target="_blank">Read Me ~</a> ' +
				'<a href="https://github.com/va3c/viewer/tree/gh-pages/va3c-viewer-html5" target="_blank">Source Code ~ </a> ' +
				'Credits: <a href="http://threejs.org" target="_blank">three.js</a> - ' +
				'<a href="http://khronos.org/webgl/" target="_blank">webgl</a> - ' +
				'<a href="http://jaanga.github.io" target="_blank">jaanga</a><br>' +
				'copyright &copy; 2014 vA3C authors ~ MIT license' +
			'</small><br><br>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleDialogs(JA.about); >Close</a> ' +
			'</p>' +
		'';

		var items = [ 1, 11, 12, 14, 33, 42, 54, 58, 62, 131, 151, 155 ];
		index = items[ Math.floor( items.length * Math.random() ) ];
		fileTitle = V3MH.files[ index ][ 1 ];
		basepath = V3MH.basepath + '/' + V3MH.files[ index ][ 0 ] + '/';
		fname = V3MH.files[ index ][ 0 ] + '.html';
		V3LI.updateIframe( V3MH.files, index, basepath, fname, '' );

	}


// the following will soon be replaced by the similar function in JAFO

	V3LI.updateIframe = function( fileList, index, basepath, filename, boilerplate ) {

// used by meier controls
		V3LI.fileList = fileList;
		V3LI.index = index;
		V3LI.basepath = basepath;
		V3LI.filename = filename;
		V3LI.boilerplate = boilerplate;

		if ( !JAFO.ifr ) {
			JAFO.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
			JAFO.ifr.height = window.innerHeight;
			JAFO.ifr.width = window.innerWidth;
			JAFO.ifr.style.cssText = 'border-width: 0; position: absolute; ';
		}

		var extension = filename.split( '.' ).pop().toLowerCase();
		if ( libOpenOver.checked === true ) {
			JAFO.ifr.onload = function() {
				JATH.attributes.innerHTML = '';

				app = JAFO.ifr.contentWindow;

				THREE = app.THREE;
				renderer = app.renderer;
				scene = app.scene;
				scene.select = app.mesh;
				camera = app.camera;
				controls = app.controls;

//				material = scene.select.material;

				V3LI.loadFile( basepath, filename );

//console.log( 'lib - update', filename  );
				detectSceneInScene( scene );

				divCon.innerHTML = ''; // why is this duplicate needed?

				V3MC.updateControlsTab();
//				V3CO.updateMesh();

				renderer.shadowMapEnabled = true;
				renderer.shadowMapSoft = true;

				chkLightAmbient.checked = true;
				JALI.toggleLightAmbient();

				chkLightCamera.checked = true;
				JALI.toggleLightCamera();

				chkLightPosition.checked = true;
				JALI.toggleLightPosition();

				JAPR.setRandomGradient();

				projector = new THREE.Projector();
				app.window.addEventListener( 'click', JATH.onDocumentMouseClick, false );

				divMsg1.innerHTML = 'Overwrite ' + index + ' ' + fileList[ index ][0];

				JAFO.updateTargetList( filename );

			};

			if ( extension === 'html' ) {
				JAFO.ifr.src = basepath + filename;
			} else {

				JAFO.ifr.src = ( boilerplate != '' ) ? boilerplate : 'boilerplate-simple.html';
			}
		} else {  // append
//			V3LI.loadFile( basepath, filename );
			JAFO.appendFile( basepath + filename )
			V3MC.updateControlsTab();

		}

	};

	V3LI.loadFile = function ( basepath, filename ) {

		var fname = basepath + filename;
		var contents = JAFO.requestFile( fname );

		JAFO.switchType( filename, contents, 1 );
//console.log( 'lib - load',filename );
	}

