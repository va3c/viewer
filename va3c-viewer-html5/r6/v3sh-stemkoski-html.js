
	var V3SH = {} || V3SH;

	V3SH.basepath = 'http://va3c.github.io/stemkoski.github.com/Three.js/';

	V3SH.addStemkoskiHTMLTab = function() {
		var tab = V3.librariesTab.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabStemkoskiHTML ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> Stemkoski HTML...' +
			'</p></a>';
		tabStemkoskiHTML.onclick = function() { JA.toggleDialogs( V3SH.StemkoskiHTMLTab ); };

		V3SH.StemkoskiHTMLTab = tab.appendChild( document.createElement( 'div' ) );
		V3SH.StemkoskiHTMLTab.style.cssText = 'cursor: auto; display: none; ' ;

		var fileList = '<br>';
		var file, fname;
		for ( var i = 0, len = V3SH.files.length; i < len; i++ ) {
			file = V3SH.files[ i ][0];
			fileList += '<a href=JavaScript:' +
//				'V3LI.updateIframe(V3SH.files,' + i + ',V3SH.basepath,"' + file + '",""); >' + file + '</a><br>';
				'JAFO.openUrl("' + V3SH.basepath + file + '"); >' + file + '</a><br>';
		}

		V3SH.StemkoskiHTMLTab.innerHTML =
			'<p>' +
				'Sourced from <a href="http://stemkoski.github.io/Three.js/" target="_blank"></a>Three.js Examples<br><br>' +
				'Professor Lee Stemkoski\'s 83 files: <br>' +
			'</p>' +
			'<p><small>The goal of this collection is to provide a set of basic and instructive examples that introduce the various features in Three.js. The source code for each page contains detailed comments.</small></p>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3SH.StemkoskiHTMLTab); ); >Close</a> ' +
			'</p>' +
		'';

	};

	V3SH.files = [
		['HelloWorld.html',''],
		['Template.html',''],
		['Infobox.html',''],
		['Materials-Solid.html',''],
		['Color-Explorer.html',''],
		['Wireframe.html',''],
		['Dashed-Lines.html',''],
		['Helpers.html',''],
		['Outline.html',''],
		['Vertex-Colors.html',''],
		['Shapes.html',''],
		['Extrusion.html',''],
		['Text3D.html',''],
		['Textures.html',''],
		['Texture-Repeat.html',''],
		['Text3D-Textures.html',''],
		['Translucence.html',''],
		['Shadow.html',''],
		['Subdivision-Cube.html',''],
		['Skybox.html',''],
		['Reflection.html',''],
		['Refraction.html',''],
		['Bubble.html',''],
		['Texture-From-Canvas.html',''],
		['Texture-Animation.html',''],
		['Sprites.html',''],
		['Sprite-Text-Labels.html',''],
		['Labeled-Geometry.html',''],
		['Mouse-Sprite.html',''],
		['Mouse-Click.html',''],
		['Mouse-Over.html',''],
		['Mouse-Tooltip.html',''],
		['Keyboard.html',''],
		['Mesh-Movement.html',''],
		['Chase-Camera.html',''],
		['Multiple-Cameras.html',''],
		['Camera-Texture.html',''],
		['Viewports-Dual.html',''],
		['Viewports-Quad.html',''],
		['CSS3D.html',''],
		['Anaglyph.html',''],
		['Shader-Simple.html',''],
		['Shader-Explorer.html',''],
		['Sphere-Unwrapping.html',''],
		['Shader-Attributes.html',''],
		['Shader-Animate.html',''],
		['Shader-Fireball.html',''],
		['Shader-Glow.html',''],
		['Simple-Glow.html',''],
		['Selective-Glow.html',''],
		['Atmosphere.html',''],
		['Particles.html',''],
		['ParticleSystem-Static.html',''],
		['ParticleSystem-Shader.html',''],
		['ParticleSystem-Attributes.html',''],
		['ParticleSystem-Dynamic.html',''],
		['ParticleSystem-PathMovement.html',''],
		['Particle-Engine.html',''],
		['Video.html',''],
		['Webcam-Test.html',''],
		['Webcam-Texture.html',''],
		['Many-Cameras.html',''],
		['Webcam-Motion-Detection.html',''],
		['Webcam-Motion-Detection-Texture.html',''],
		['GUI.html',''],
		['GUI-Controller.html',''],
		['Gamepad-Test.html',''],
		['Mesh-Movement-Gamepad.html',''],
		['LeapMotion.html',''],
		['Model.html',''],
		['Model-Animation.html',''],
		['Model-Animation-Control.html',''],
		['Collision-Detection.html',''],
		['Marching-Cubes.html',''],
		['Metaballs.html',''],
		['Metabubbles.html',''],
		['CSG.html',''],
		['Sphere-Project.html',''],
		['Topology-Data.html',''],
		['Topology-Data-2.html',''],
		['Polyhedra.html',''],
		['Graphulus-Function.html',''],
		['Graphulus-Surface.html',''],
		['Graphulus-Curve.html',''],
		['Voxel-Painter.html','']

	]