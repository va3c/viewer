// data files originally from http://www.3d-meier.de/tut3/Seite0.html

// data files used here from https://github.com/jaanga/algesurf/tree/gh-pages/parametric-equations/equation-files

	var V3MH = {} || V3MH;

	if ( window.location.origin.substr(0,7) != 'http://' ) {
		V3MH.basepath = '../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files/';
	} else {
		V3MH.basepath = 'http://va3c.github.io/algesurf/parametric-equations/equation-files/';
	}

	V3MH.addMeierHTMLTab = function() {
		var tab = V3.librariesTab.appendChild( document.createElement( 'div' ) );
		tab.title = 'Choose from a number of equations to display';
		tab.innerHTML =
			'<a id=tabJurgenMeier ><p class=buttonLibrary >' +
				'<i class="fa fa-file-image-o"></i> Jürgen Meier Gallery...' +
			'</p></a>';
		tabJurgenMeier.onclick = function() { JA.toggleDialogs( V3MH.JurgenMeier ); };

		V3MH.JurgenMeier = tab.appendChild( document.createElement( 'div' ) );
		V3MH.JurgenMeier.style.cssText = 'cursor: auto; display: none; ';

		var fileList = '';
		var file;
		for ( var i = 0, len = V3MH.files.length; i < len; i++ ) {
			fileTitle = V3MH.files[ i ][ 1 ];
			basepath = V3MH.basepath + '/' + V3MH.files[ i ][ 0 ] + '/';
			fname = V3MH.files[ i ][ 0 ];

			fileList += '<a href=JavaScript:' +
//				'V3LI.updateIframe(V3MH.files,' + i + ',"' + basepath + '","' + fname + '.html"); >' + fileTitle + '</a><br>';
				'JAFO.openUrl("' + basepath + fname + '.html"); >' + fileTitle + '</a><br>';
		}

		V3MH.JurgenMeier.innerHTML = 
			'<h3><a href="http://jaanga.github.io/algesurf/" target="_blank" >AlgeSurf</a> Parametric Equations </h3>' +
			'<p>Equations sourced from:<br><b><a href="http://www.3d-meier.de/tut3/Seite0.html" target="_blank">Parametrische Flächen und Körper</a></b></p>' +
			'<p>Always overwrites current view</p>' +
			'<p>* particularly pretty</p>' +
			'<p>After \'Egg\' only * have dynamic coefficients <br><br>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(V3MH.JurgenMeier); ); >Close</a> ' +
			'</p>' +
		'';
	};

	V3MH.files = [
		[ "apple-surface-i", "Apple Surface I", "http://www.3d-meier.de/tut3/Seite54.html", "3.50. Apple Surface" ],
		[ "apple-surface-ii", "Apple II Surface", "http://www.3d-meier.de/tut3/Seite100.html", "3.95. Apple II Surface" ],
		[ "bent-horns", "Bent Horns", "http://www.3d-meier.de/tut3/Seite49.html", "3.45. Bent Horns" ],
		[ "bell-polar", "Bell Polar", "http://www.3d-meier.de/tut3/Seite131.html", "3.124. Glocke (polar)" ],
		[ "bell", "Bell", "http://www.3d-meier.de/tut3/Seite130.html", "3.123. Glocke" ],
		[ "bell-wave", "Bell Wave", "http://www.3d-meier.de/tut3/Seite132.html", "3.125. Glockenwelle" ],
		[ "bicorn-surface", "Bicorn Surface", "http://www.3d-meier.de/tut3/Seite180.html", "3.173. Bicorn Surface" ],
		[ "borromean-rings", "Borromean Rings", "http://www.3d-meier.de/tut3/Seite160.html", "3.153. Borromean Rings" ],
		[ "bohemian-dome", "Bohemian Dome", "http://www.3d-meier.de/tut3/Seite5.html", "3.1. Bohemian Dome" ],
		[ "boy-surface", "Boy's Surface *", "http://www.3d-meier.de/tut3/Seite6.html", "3.2. Boy&#180;s Surface" ],
		[ "breather-surface", "Breather Surface *", "http://www.3d-meier.de/tut3/Seite176.html", "3.169. Breather Surface" ],
		[ "catalan-surface", "Catalan Surface *", "http://www.3d-meier.de/tut3/Seite29.html", "3.25. Catalan&#180;s Surface" ],
		[ "bullet-nose", "Bullet Nose", "http://www.3d-meier.de/tut3/Seite183.html", "3.176. Bullet Nose" ],
		[ "catenoid", "Catenoid", "http://www.3d-meier.de/tut3/Seite23.html", "3.19. Catenoid" ],
		[ "bonan-jeener-klein-surface", "Bonan Jeener Klein Surface *", "http://www.3d-meier.de/tut3/Seite109.html", "3.102. Bonan-Jeener-Klein Surface" ],
		[ "cone", "Cone", "http://www.3d-meier.de/tut3/Seite85.html", "3.81. Kegel" ],
		[ "cornucopia", "Cornucopia", "http://www.3d-meier.de/tut3/Seite7.html", "3.3. Cornucopia" ],
		[ "bow-curve", "Bow Curve", "http://www.3d-meier.de/tut3/Seite171.html", "3.164. Bow Kurve" ],
		[ "cosine-surface", "Cosine Surface", "http://www.3d-meier.de/tut3/Seite39.html", "3.35. Cosine Surface" ],
		[ "cosine-surface-ii", "Cosine Surface II", "http://www.3d-meier.de/tut3/Seite186.html", "3.179. Cosine Surface II" ],
		[ "costa-surface", "Costa Surface", "http://www.3d-meier.de/tut3/Seite80.html", "3.76. Costa Surface" ],
		[ "cosine-wave", "Cosine Wave", "http://www.3d-meier.de/tut3/Seite128.html", "3.121. Cosinuswelle" ],
		[ "cross-cap", "Cross Cap", "http://www.3d-meier.de/tut3/Seite8.html", "3.4. Cross Cup" ],
		[ "crescent", "Cresent", "http://www.3d-meier.de/tut3/Seite52.html", "3.48. Cresent" ],
		[ "cylinder", "Cylinder", "http://www.3d-meier.de/tut3/Seite103.html", "3.96. Zylinder" ],
		[ "cross-cup", "Cross Cup", "http://www.3d-meier.de/tut3/Seite8.html", "3.4. Cross Cup" ],
		[ "cylinder-epicycloid", "Epicycloid Cylinder", "http://www.3d-meier.de/tut3/Seite151.html", "3.144. Epizykloid Zylinder" ],
		[ "cylinder-cissoid", "Cylinder Cissoid", "http://www.3d-meier.de/tut3/Seite155.html", "3.148. Zissoide Zylinder" ],
		[ "cylinder-gauss", "Cylinder Gauss", "http://www.3d-meier.de/tut3/Seite157.html", "3.150. Gau&szlig; Zylinder" ],
		[ "cylinder-hypocycloid", "Cylinder Hypocycloid", "http://www.3d-meier.de/tut3/Seite152.html", "3.145. Hypozykloid Zylinder" ],
		[ "cylinder-strophoid", "Cylinder Strophoid", "http://www.3d-meier.de/tut3/Seite154.html", "3.147. Strophoide Zylinder" ],
		[ "cylinder-lemniscate", "Cylinder Lemniskate", "http://www.3d-meier.de/tut3/Seite153.html", "3.146. Lemniskate Zylinder" ],
		[ "cylinder-witch-of-agnesi", "Cylinder Witch of Agnesi", "http://www.3d-meier.de/tut3/Seite156.html", "3.149. Versiera der Agnesi Zylinder" ],
		[ "dini-surface", "Dini's Surface *", "http://www.3d-meier.de/tut3/Seite9.html", "3.5. Dini&#180;s Surface" ],
		[ "disc", "Disc", "http://www.3d-meier.de/tut3/Seite125.html", "3.118. Scheibe" ],
		[ "drop-ii", "Drop II", "http://www.3d-meier.de/tut3/Seite104.html", "3.97. Drop" ],
		[ "double-cone", "Double Cone", "http://www.3d-meier.de/tut3/Seite113.html", "3.106. Double Cone" ],
		[ "drop-i", "Drop", "http://www.3d-meier.de/tut3/Seite44.html", "3.40. Tropfen" ],
		[ "dupin-cyclide", "Dupin Cyclide", "http://www.3d-meier.de/tut3/Seite68.html", "3.64. Dupin Cyclide" ],
		[ "eight-surface", "Eight Surface", "http://www.3d-meier.de/tut3/Seite41.html", "3.37. Eight Surface" ],
		[ "egg", "Egg", "http://www.3d-meier.de/tut3/Seite87.html", "3.83. Ei" ],
		[ "enneper-surface-polar", "Enneper Surface Polar *", "http://www.3d-meier.de/tut3/Seite134.html", "3.127. Enneper Surface (polar)" ],
		[ "ellipsoid", "Ellipsoid", "http://www.3d-meier.de/tut3/Seite40.html", "3.36. Ellipsoid" ],
		[ "facing-snail", "Facing Snail", "http://www.3d-meier.de/tut3/Seite105.html", "3.98. Facing Snail" ],
		[ "fish-surface", "Fish Surface", "http://www.3d-meier.de/tut3/Seite47.html", "3.43. Fish Surface" ],
		[ "folium", "Folium", "http://www.3d-meier.de/tut3/Seite77.html", "3.73. Folium" ],
		[ "fresnel-elastic-surface", "Fresnel Elastic Surface", "http://www.3d-meier.de/tut3/Seite158.html", "3.151. Fresnelsche Elastizit&auml;tsfl&auml;che" ],
		[ "funnel", "Funnel", "http://www.3d-meier.de/tut3/Seite27.html", "3.23. Funnel" ],
		[ "guimard-surface", "Guimard Surface", "http://www.3d-meier.de/tut3/Seite70.html", "3.66. Guimard Surface" ],
		[ "handkerchief-surface", "Handkerchief Surface", "http://www.3d-meier.de/tut3/Seite11.html", "3.7. Handkerchief Surface" ],
		[ "helicoid", "Helicoid", "http://www.3d-meier.de/tut3/Seite24.html", "3.20. Helicoid" ],
		[ "horn", "Horn", "http://www.3d-meier.de/tut3/Seite48.html", "3.44. Horn" ],
		[ "henneberg-surface", "Henneberg Surface", "http://www.3d-meier.de/tut3/Seite32.html", "3.28. Henneberg&#180;s Surface" ],
		[ "hyperbolic-octahedron", "Hyperbolic Octahedron *", "http://www.3d-meier.de/tut3/Seite50.html", "3.46. Hyperbolic Octahedron" ],
		[ "hyperbolic-paraboloid", "Hyperbolic Paraboloid", "http://www.3d-meier.de/tut3/Seite99.html", "3.94. Hyperbolic Paraboloid" ],
		[ "hyperbolic-helicoid", "Hyperbolic Helicoid", "http://www.3d-meier.de/tut3/Seite26.html", "3.22. Hyperbolic Helicoid" ],
		[ "isolator", "Isolator", "http://www.3d-meier.de/tut3/Seite86.html", "3.82. Isolator" ],
		[ "hyperboloid", "Hyperboloid", "http://www.3d-meier.de/tut3/Seite30.html", "3.26. Hyperboloid" ],
		[ "jeener-klein-surface", "Jeener Klein Surface *", "http://www.3d-meier.de/tut3/Seite108.html", "3.101. Jeener-Klein Surface" ],
		[ "jet-surface", "Jet Surface", "http://www.3d-meier.de/tut3/Seite43.html", "3.39. Jet Surface" ],
		[ "kappa-surface", "Kappa Surface", "http://www.3d-meier.de/tut3/Seite182.html", "3.175. Kappa Surface" ],
		[ "kidney-surface", "Kidney Surface", "http://www.3d-meier.de/tut3/Seite42.html", "3.38. Kidney Surface" ],
		[ "klein-bottle", "Klein Bottle *", "http://www.3d-meier.de/tut3/Seite12.html", "3.8. Klein Bottle" ],
		[ "klein-cycloid", "Klein Cycloid *", "http://www.3d-meier.de/tut3/Seite111.html", "3.104. Klein Cycloid" ],
		[ "kuen-surface", "Kuen's Surface *", "http://www.3d-meier.de/tut3/Seite55.html", "3.51. Kuen&#180;s Surface" ],
		[ "lemniscape", "Lemniscape *", "http://www.3d-meier.de/tut3/Seite78.html", "3.74. Lemniscape" ],
		[ "lemon-surface", "Lemon Surface", "http://www.3d-meier.de/tut3/Seite135.html", "3.128. Lemon Surface" ],
		[ "lochdiscus", "Lochdiskus", "http://www.3d-meier.de/tut3/Seite119.html", "3.112. Lochdiskus" ],
		[ "lockdisk", "Lockdisk", "http://www.3d-meier.de/tut3/Seite114.html", "3.107. Lockdisk" ],
		[ "loop", "Loop", "http://www.3d-meier.de/tut3/Seite66.html", "3.62. Schleife" ],
		[ "maeder-owl", "Maeder's Owl *", "http://www.3d-meier.de/tut3/Seite35.html", "3.31. Maeder&#180;s Owl" ],
		[ "milk-carton", "Milk Carton", "http://www.3d-meier.de/tut3/Seite72.html", "3.68. Milcht&uuml;te" ],
		[ "mobius-band", "Moebius Strip", "http://www.3d-meier.de/tut3/Seite13.html", "3.9. M&ouml;bius Band" ],
		[ "menn-surface", "Menn Surface", "http://www.3d-meier.de/tut3/Seite71.html", "3.67. Menn&#180;s Surface" ],
		[ "monkey-saddle", "Monkey Saddle", "http://www.3d-meier.de/tut3/Seite14.html", "3.10. Monkey Saddle" ],
		[ "nautilus", "Nautilus", "http://www.3d-meier.de/tut3/Seite93.html", "3.89. Nautilus" ],
		[ "paper-bag", "Paper Bag", "http://www.3d-meier.de/tut3/Seite106.html", "3.99. Paper Bag" ],
		[ "paraboloid", "Paraboloid", "http://www.3d-meier.de/tut3/Seite25.html", "3.21. Paraboloid" ],
		[ "pillow-shape", "Pillow Shape", "http://www.3d-meier.de/tut3/Seite46.html", "3.42. Pillow Shape" ],
		[ "piriform-surface", "Piriform Surface", "http://www.3d-meier.de/tut3/Seite181.html", "3.174. Piriform Surface" ],
		[ "pisot-triaxial", "Pisot Triaxial *", "http://www.3d-meier.de/tut3/Seite115.html", "3.108. Pisot Triaxial" ],
		[ "plane", "Plane", "http://www.3d-meier.de/tut3/Seite124.html", "3.117. Ebene" ],
		[ "plucker-conoid", "Plücker's Conoid", "http://www.3d-meier.de/tut3/Seite15.html", "3.11. Pl&uuml;cker&#180;s Conoid" ],
		[ "pseudosphere", "Pseudosphere", "http://www.3d-meier.de/tut3/Seite31.html", "3.27. Pseudosphere" ],
		[ "pseudo-cross-cap", "Pseudo Cross Cap", "http://www.3d-meier.de/tut3/Seite51.html", "3.47. Pseudo Cross Cap" ],
		[ "richmond-surface", "Richmond Surface", "http://www.3d-meier.de/tut3/Seite36.html", "3.32. Richmond Surface" ],
		[ "roman-surface", "Steiner's Roman Surface *", "http://www.3d-meier.de/tut3/Seite16.html", "3.12. Roman Surface" ],
		[ "roundabout", "Roundabout", "http://www.3d-meier.de/tut3/Seite150.html", "3.143. Kreisel" ],
		[ "shoe-surface", "Shoe Surface", "http://www.3d-meier.de/tut3/Seite19.html", "3.15. Shoe Surface" ],
		[ "scherk-surface", "Scherk Surface", "http://www.3d-meier.de/tut3/Seite37.html", "3.33. Scherk Surface" ],
		[ "seashell", "Seashell", "http://www.3d-meier.de/tut3/Seite18.html", "3.14. Seashell" ],
		[ "sievert-surface", "Sievert Surface", "http://www.3d-meier.de/tut3/Seite185.html", "3.178. Sievert Surface" ],
		[ "sine-cone", "Sine Cone", "http://www.3d-meier.de/tut3/Seite136.html", "3.129. Sinuskegel" ],
		[ "sine-wave", "Sinus Wave", "http://www.3d-meier.de/tut3/Seite127.html", "3.120. Sinuswelle" ],
		[ "soucoupoid", "Soucoupoid", "http://www.3d-meier.de/tut3/Seite133.html", "3.126. Soucoupoid" ],
		[ "sine-surface", "Sine Surface", "http://www.3d-meier.de/tut3/Seite20.html", "3.16. Sine Surface" ],
		[ "snail-surface", "Snail Surface", "http://www.3d-meier.de/tut3/Seite38.html", "3.34. Snail Surface" ],
		[ "sphere-double", "Sphere Double", "http://www.3d-meier.de/tut3/Seite192.html", "3.185. Doppelkugel" ],
		[ "sphere-i", "Kugel I", "http://www.3d-meier.de/tut3/Seite120.html", "3.113. Kugel I" ],
		[ "sphere-ii", "Sphere II", "http://www.3d-meier.de/tut3/Seite121.html", "3.114. Kugel II" ],
		[ "sphere-iv", "Sphere IV", "http://www.3d-meier.de/tut3/Seite123.html", "3.116. Kugel IV" ],
		[ "sphere-iii", "Sphere III", "http://www.3d-meier.de/tut3/Seite122.html", "3.115. Kugel III" ],
		[ "spiral-archimedes", "Spiral Archimedes", "http://www.3d-meier.de/tut3/Seite187.html", "3.180. Archimedische Spirale" ],
		[ "spiral-fermat", "Spiral Fermat", "http://www.3d-meier.de/tut3/Seite189.html", "3.182. Fermat Spirale" ],
		[ "spiral-logarithmic", "Spiral Logarithmic", "http://www.3d-meier.de/tut3/Seite191.html", "3.184. Logarithmische Spirale" ],
		[ "spiral-hyperbolic", "Spiral Hyperbolic", "http://www.3d-meier.de/tut3/Seite188.html", "3.181. Hyperbolische Spirale" ],
		[ "spiral-tanh", "Spiral Tanh", "http://www.3d-meier.de/tut3/Seite190.html", "3.183. Tanh Spirale" ],
		[ "spring-i", "Feder I", "http://www.3d-meier.de/tut3/Seite82.html", "3.78. Feder I" ],
		[ "spiral-wave", "Spiral Wave", "http://www.3d-meier.de/tut3/Seite129.html", "3.122. Spiralwellen" ],
		[ "stiletto-surface", "Stiletto Surface *", "http://www.3d-meier.de/tut3/Seite53.html", "3.49. Stiletto Surface" ],
		[ "steinbach-screw", "Steinbach Screw *", "http://www.3d-meier.de/tut3/Seite21.html", "3.17. Steinbach Screw" ],
		[ "swallow-surface", "Swallow Surface", "http://www.3d-meier.de/tut3/Seite33.html", "3.29. Swallow Surface" ],
		[ "torus", "Torus", "http://www.3d-meier.de/tut3/Seite58.html", "3.54. Torus" ],
		[ "torus-8", "8 Torus", "http://www.3d-meier.de/tut3/Seite67.html", "3.63. 8-Torus" ],
		[ "torus-astroid", "Astroid Torus", "http://www.3d-meier.de/tut3/Seite139.html", "3.132. Astroid Torus" ],
		[ "torus-bicorn-i", "Bicorn Torus I", "http://www.3d-meier.de/tut3/Seite163.html", "3.156. Bicorn Torus I" ],
		[ "torus-asymmetric", "Torus Asymmetric", "http://www.3d-meier.de/tut3/Seite59.html", "3.55. Antisymmetrischer Torus" ],
		[ "torus-bicorn-ii", "Torus Bicorn II", "http://www.3d-meier.de/tut3/Seite164.html", "3.157. Bicorn Torus II" ],
		[ "torus-braided", "Torus Braided *", "http://www.3d-meier.de/tut3/Seite110.html", "3.103. Braided Torus" ],
		[ "torus-cardioid-i", "Torus Cardioid I", "http://www.3d-meier.de/tut3/Seite165.html", "3.158. Cardioid Torus I" ],
		[ "torus-cardioid-ii", "Torus Cardioid II", "http://www.3d-meier.de/tut3/Seite166.html", "3.159. Cardioid Torus II" ],
		[ "torus-cassinian-oval-i", "Torus Cassinian Oval I", "http://www.3d-meier.de/tut3/Seite167.html", "3.160. Cassinian Oval Torus I" ],
		[ "torus-cassinian-oval-ii", "Torus Cassinian Oval II *", "http://www.3d-meier.de/tut3/Seite168.html", "3.161. Cassinian Oval Torus II" ],
		[ "torus-corrugated-i", "Torus Corrugated I", "http://www.3d-meier.de/tut3/Seite172.html", "3.165. Gewellter Torus I" ],
		[ "torus-corrugated-ii", "Torus Wavy II", "http://www.3d-meier.de/tut3/Seite173.html", "3.166. Gewellter Torus II" ],
		[ "torus-epicycloid-i", "Torus Epicycloid I", "http://www.3d-meier.de/tut3/Seite146.html", "3.139. Epizykloid Torus I" ],
		[ "torus-epicycloid-ii", "Epicycloid Torus II", "http://www.3d-meier.de/tut3/Seite147.html", "3.140. Epizykloid Torus II" ],
		[ "torus-elliptic", "Torus Elliptic", "http://www.3d-meier.de/tut3/Seite69.html", "3.65. Elliptic Torus" ],
		[ "torus-gear", "Torus Gear", "http://www.3d-meier.de/tut3/Seite184.html", "3.177. Gear Torus" ],
		[ "torus-hypocycloid-ii", "Hypocycloid Torus II", "http://www.3d-meier.de/tut3/Seite149.html", "3.142. Hypozykloid-Torus II" ],
		[ "torus-hypocycloid-i", "Hypocycloid Torus I", "http://www.3d-meier.de/tut3/Seite148.html", "3.141. Hypozykloid-Torus I" ],
		[ "torus-lemniscate-i", "Lemniskate Torus I", "http://www.3d-meier.de/tut3/Seite144.html", "3.137. Lemniskate Torus I" ],
		[ "torus-lemniscate-gerono-i", "Torus Lemniscate Gerono I", "http://www.3d-meier.de/tut3/Seite169.html", "3.162. Gerono Lemniskate Torus I" ],
		[ "torus-lemniscate-gerono-ii", "Torus Lemniscate Gerono II", "http://www.3d-meier.de/tut3/Seite170.html", "3.163. Gerono Lemniskate Torus II" ],
		[ "torus-lemniscate-ii", "Lemniskate Torus II", "http://www.3d-meier.de/tut3/Seite145.html", "3.138. Lemniskate Torus II" ],
		[ "torus-knot", "Torus Knot *", "http://www.3d-meier.de/tut3/Seite175.html", "3.168. Torusknoten" ],
		[ "torus-nephroid-i", "Nephroid Torus I", "http://www.3d-meier.de/tut3/Seite142.html", "3.135. Nephroid Torus I" ],
		[ "torus-piriform-i", "Torus Piriform I", "http://www.3d-meier.de/tut3/Seite161.html", "3.154. Piriform Torus I" ],
		[ "torus-nephroid-ii", "Nephroid Torus II", "http://www.3d-meier.de/tut3/Seite143.html", "3.136. Nephroid Torus II" ],
		[ "torus-piriform-ii", "Torus Piriform II", "http://www.3d-meier.de/tut3/Seite162.html", "3.155. Piriform Torus II" ],
		[ "torus-limpet", "Limpet Torus", "http://www.3d-meier.de/tut3/Seite112.html", "3.105. Limpet Torus" ],
		[ "torus-saddle", "Saddle Torus", "http://www.3d-meier.de/tut3/Seite73.html", "3.69. Saddle Torus" ],
		[ "torus-spiral", "Torus Spiral *", "http://www.3d-meier.de/tut3/Seite174.html", "3.167. Spiraltorus" ],
		[ "torus-strangled-i", "Strangled Torus I", "http://www.3d-meier.de/tut3/Seite137.html", "3.130. Strangled Torus I" ],
		[ "torus-strangled-ii", "Strangled Torus II", "http://www.3d-meier.de/tut3/Seite138.html", "3.131. Strangled Torus II" ],
		[ "torus-tricuspoid-i", "Tricuspoid Torus I", "http://www.3d-meier.de/tut3/Seite140.html", "3.133. Tricuspoid Torus I" ],
		[ "torus-tricuspoid-ii", "Tricuspoid Torus Ii", "http://www.3d-meier.de/tut3/Seite141.html", "3.134. Tricuspoid Torus II" ],
		[ "torus-twisted-eight", "Torus Twisted Eight", "http://www.3d-meier.de/tut3/Seite60.html", "3.56. Gedrehte Acht Torus" ],
		[ "tractroid", "Tractroid", "http://www.3d-meier.de/tut3/Seite28.html", "3.24. Tractroid" ],
		[ "torus-wave", "Torus Wave", "http://www.3d-meier.de/tut3/Seite62.html", "3.58. Wellentorus" ],
		[ "torus-umbilic", "Torus Umbilical", "http://www.3d-meier.de/tut3/Seite61.html", "3.57. Umbilic Torus" ],
		[ "trash-can", "Trash Can", "http://www.3d-meier.de/tut3/Seite81.html", "3.77. Trash Can" ],
		[ "tranguloid-trefoil", "Tranguloid Trefoil *", "http://www.3d-meier.de/tut3/Seite57.html", "3.53. Tranguloid Trefoil" ],
		[ "trefoil-knot", "Trefoil Knot I *", "http://www.3d-meier.de/tut3/Seite56.html", "3.52. Trefoil Knoten" ],
		[ "trefoil-knot-ii", "Trefoil Knot II *", "http://www.3d-meier.de/tut3/Seite159.html", "3.152. Trefoil II Knoten" ],
		[ "triaxial-hexatorus", "Triaxial Hexatorus *", "http://www.3d-meier.de/tut3/Seite116.html", "3.109. Triaxial Hexatorus" ],
		[ "triaxial-teardrop", "Triaxial Teardrop", "http://www.3d-meier.de/tut3/Seite45.html", "3.41. Triaxial Teardrop" ],
		[ "triaxial-tritorus", "Triaxial Tritorus *", "http://www.3d-meier.de/tut3/Seite74.html", "3.70. Triaxial Tritorus" ],
		[ "triple-corkscrew-i", "Triple Corkscrew I", "http://www.3d-meier.de/tut3/Seite177.html", "3.170. Triple Corkscrew I" ],
		[ "triple-corkscrew-ii", "Triple Corkscrew II", "http://www.3d-meier.de/tut3/Seite178.html", "3.171. Triple Corkscrew II" ],
		[ "triple-corkscrew-iii", "Triple Corkscrew III", "http://www.3d-meier.de/tut3/Seite179.html", "3.172. Triple Corkscrew III" ],
		[ "twisted-heart", "Twisted Heart", "http://www.3d-meier.de/tut3/Seite117.html", "3.110. Twisted Heart" ],
		[ "triple-point-twist", "Triple Point Twist", "http://www.3d-meier.de/tut3/Seite79.html", "3.75. Triple Point Twist" ],
		[ "twisted-pipe-surface", "Twisted Pipe Surface *", "http://www.3d-meier.de/tut3/Seite65.html", "3.61. Twisted Pipe Surface" ],
		[ "vase-and-spearhead", "Vase and Speartip", "http://www.3d-meier.de/tut3/Seite107.html", "3.100. Vase und Spear Head" ],
		[ "twisted-sphere", "Twisted Sphere", "http://www.3d-meier.de/tut3/Seite118.html", "3.111. Twisted Sphere" ],
		[ "verrill-surface", "Verrill Surface", "http://www.3d-meier.de/tut3/Seite75.html", "3.71. Verrill Surface" ],
		[ "wallis-conical-edge", "Wallis' Conical Edge", "http://www.3d-meier.de/tut3/Seite34.html", "3.30. Wallis&#180;s Conical Edge" ],
		[ "whitney-umbrella", "Whitney Umbrella *", "http://www.3d-meier.de/tut3/Seite22.html", "3.18. Whitney Umbrella" ],
		[ "worm", "Worm", "http://www.3d-meier.de/tut3/Seite17.html", "3.13. Schnecke" ],
		[ "wreath", "Wreath *", "http://www.3d-meier.de/tut3/Seite64.html", "3.60. Kranz" ],
		[ "wave", "Waves", "http://www.3d-meier.de/tut3/Seite126.html", "3.119. Wellen" ],
		[ "wave-sphere", "Wave Sphere *", "http://www.3d-meier.de/tut3/Seite63.html", "3.59. Wellenkugel" ],
		[ "zindler-conoid", "Zindler's Conoid .", "http://www.3d-meier.de/tut3/Seite76.html", "3.72. Zindler&#180;s Conoid" ]
	].sort();
