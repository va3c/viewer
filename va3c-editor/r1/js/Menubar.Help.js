Menubar.Help = function ( editor ) {

	// event handlers

	function onSourcecodeOptionClick () {

		window.open( 'https://github.com/mrdoob/three.js/tree/master/editor', '_blank' )

	}

	function onAboutOptionClick () {

		// window.open( 'http://threejs.org', '_blank' );

// Hack: This should be in Menubar.Help.About.js but cannot seem to get to innerHTML there
		about.dom.innerHTML = 
				'<h3>' + document.title + '</h3>' +
				'<div>' +
				'<p>View Revit, Rhino/Grasshopper and 3DS Max models in 3D with any web browser using Three.js and data rendered as JSON files.</p>' +
				'<p>Features include:</p>' +
				'<ul>' +
					'<li>Export by saving directly to file</li>' +
					'<li>Permalink supprt to open files. See <a href="va3c.github.io/viewer/va3c-editor/va3c-samples/" target="_blank">vA3C Samples</a></li>' +
					'<li>Toggle disply of UI</li>' +
					'<li>Move meshes to new Object 3D a parent</li>' +
					'<li>Transparent theme</li>' +
					'<li>This About box</li>' +
					'<li>Support for Revit attributes in parent object</li>' +
				'</ul>' +				

				'<p>This script is an update to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a></p>' +
				'<p>Team Members: Benjamin Howes, Jonatan Schumacher, Jeremy Tammik, Matt Mason, Kevin Vandecar, Charlie Portelli, Josh Wentz, Femi King, Zach Flanders & Theo Armour</p>' +
				'<p>Supporters include: Mostapha Roudsari, Ashley Reed, Anne Waelkens, Jim Quanci, Elcin Ertugrul, Amir Tasbihi and many more. Others?</p>' +

				'<small>' +
					'<a href="https://github.com/va3c/" target="_blank">Source code on GitHub</a> ' +
					'Credits: <a href="http://threejs.org" target="_blank">Three.js</a> - ' +
					'<a href="http://khronos.org/webgl/" target="_blank">WebGL</a> - ' +
					'<a href="http://va3c.github.io" target="_blank">vA3C</a><br>' +
					'copyright &copy; 2014 the vA3C team ~ MIT license' +
				'</small>' +
				'</div>'  +
				'<p style=text-align:right; >' +
					'<a class=Button onclick=about.dom.style.display="none"; style="border:solid #333 1px;cursor:pointer; padding: 3px;" >Close</a> ' +
				'</p>' +
			'';
		about.dom.style.display = about.dom.style.display === 'none' ? '' : 'none';

		console.log( about );
	}

	// configure menu contents

	var createOption = UI.MenubarHelper.createOption;
	var createDivider = UI.MenubarHelper.createDivider;

	var menuConfig = [
		createOption( 'Source code', onSourcecodeOptionClick ),
		createOption( 'About', onAboutOptionClick )
	];

	var optionsPanel = UI.MenubarHelper.createOptionsPanel( menuConfig );

	return UI.MenubarHelper.createMenuContainer( 'Help', optionsPanel );

}
