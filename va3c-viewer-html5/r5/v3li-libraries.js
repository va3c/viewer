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
//			'<input type=radio name=libFileOpen id=libOpenOver /> Overwrite current view<br>' +
//			'<input type=radio name=libFileOpen id=libOpenAppend /> Append to current view<br>' +
			'<p>A work in progress. Much broken. ' +
			'Nonetheless <a href="http://va3c.github.io/viewer/va3c-viewer-html5/r4/va3c-viewer-html5-r4.html#autocrapdoodle" >some aspects</a> worth exploring. More goodies on the way...</p>' +
			'<p><a href=JavaScript:JAFO.appendUrl("https://rawgit.com/tparisi/Programming3DApplications/master/models/ruins/Ruins_dae.dae"); >Ruins</a></p>' +
		'';

//		libOpenOver.checked = true;
	};

	V3LI.updateAboutTab = function() {
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
	}
