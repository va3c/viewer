	var V3LI = {} || V3LI;

	V3LI.addLibrariesTab = function() {

		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'View available libraries';
		tab.innerHTML =
			'<a JA.toggleTab(V3LI.libraries); id=librariesTab ><p class=buttonLibrary >' +
				'<span id=libOpen ><i class="fa fa-chevron-down"></i></span> ' +
				'<span id=libClose style=display:none; ><i class="fa fa-chevron-right"></i></span> ' +
				'<i class="fa fa-thumbs-up"></i> Introduction' +
			'</p></a>'; 
		librariesTab.onclick = function() { JA.toggleTab( libOpen ); JA.toggleTab( libClose ); JA.toggleDialogs( V3LI.libraries ); };

		V3LI.libraries = JA.menu.appendChild( document.createElement( 'div' ) );
		V3LI.libraries.style.cssText = 'cursor: auto; display: ; ' ;
		V3LI.libraries.innerHTML =
//			'<input type=radio name=libFileOpen id=libOpenOver /> Overwrite current view<br>' +
//			'<input type=radio name=libFileOpen id=libOpenAppend /> Append to current view<br>' +
			'<p>A work in progress. Much broken. ' +
			'Nonetheless <a href="http://va3c.github.io/viewer/va3c-viewer-html5/r4/va3c-viewer-html5-r4.html#autocrapdoodle" >some aspects</a> worth exploring. More goodies on the way...</p>' +
//			'<p><a href=JavaScript:JAFO.appendUrl("../../../../Programming3DApplications/models/Cottus_Elec/cottus_elec.DAE"); >Ruins</a></p>' +
//			'<p><a href=JavaScript:JAFO.appendUrl("../../../dae/Robie-House/models/model.dae"); >Robie House</a></p>' +
//			'<p><a href=JavaScript:JAFO.appendUrl("http://nasa3d.arc.nasa.gov/shared_assets/models/jpl-vtad-dawn/Dawn_19.stl"); >Dawn</a></p>' +
		'';

	};

	V3LI.updateAboutTab = function() {

		JA.aboutDialog.style.height = '450px';
		JA.aboutDialog.innerHTML =
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
				'<a class=button href=JavaScript:JA.toggleDialogs(JA.aboutDialog); >Close</a> ' +
			'</p>' +
		'';

	};
