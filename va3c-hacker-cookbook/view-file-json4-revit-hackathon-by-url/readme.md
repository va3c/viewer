[View the NY AEC Hackathon Files]( ./view-file-json4-revit-hackathon-by-url.html "files from back near the beginning of time itself...")
===

[Three.js JSON 4]( https://github.com/mrdoob/three.js/wiki ) files created from Revit, Grasshopper and 3DS source files.

These files were generated while the hackathon was in progress.
They are the fruition of [Ben Howes' Dream]( https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014/hacks/three-dot-js-aec-viewer-model-exporters "without the jQuery" )
You have two ways to consider these efforts:

1. You may giggle at the curiously inventive data structures.
2. You may say "Wow, what brilliant test cases!"

[Developer Notes]( #dev-notes.md# )  
[GitHub  web page]( http://va3c.github.io/viewer/va3c-hacker-cookbook/view-file-json4-revit-hackathon-by-url/ "view the files as apps." ) <input value="<< You are here" size=15 style="font:bold 11pt monospace;border-width:0;" >  
&raquo; [GitHub source code]( https://github.com/va3c/va3c.github.io/tree/master/nasa-samples "View files with GitHub" ) <scan style=display:none ><< You are here</scan>  
&raquo; [vA3C Hacker Home]( http://va3c.github.io/viewer/va3c-hacker/ )  
[vA3C GitHub Home Page]( #../../../index.html# )   
[vA3C Viewer R1]( #../../index.html# )  

<small>
<u>[0]</u> = Open in new tab/window  
<u>links</u> = Open inside this viewer
</small>
<details open>
<summary><h2>Revit Files</h2></summary>
Many thanks to Jeremy and Matt for these models converted from Revit to Three.js JSON 4.

Stay up to date on progress at Jeremy's web site:  
[The Building Coder]( http://thebuildingcoder.typepad.com/ ) 


![]( https://raw.githubusercontent.com/va3c/viewer/gh-pages/va3c-hacker/content/revit/little_house.rvt-640x480.png )
[[O]]( #../../../RvtVa3c/models/little_house.rvt.js#py=-10#ry=3#sx=0.01#sy=0.01#sz=0.01# ) 
[Little House]( #../../../RvtVa3c/models/little_house.rvt.js#py=0#ry=3#sx=0.01#sy=0.01#sz=0.01#add=true#grid# )  
[[O]]( #../../../json/DrCyanKlein.json#sx=0.005#sy=0.005#sz=0.005# )
[DrCyanKlein.json]( #../../../json/DrCyanKlein.json#sx=0.005#sy=0.005#sz=0.005#add=true# )  
[[O]]( #../../../RvtVa3c/models/Project1.rvt.js#px=-50#py=-10#ry=-1.5#sx=0.01#sy=0.01#sz=0.01# )
[Project 1]( #../../../RvtVa3c/models/Project1.rvt.js#px=-50#py=-10#ry=-1.5#sx=0.01#sy=0.01#sz=0.01#add=true# )  
[[O]]( #../../../RvtVa3c/models/Project2.rvt.js#px=120#py=-10#pz=120#ry=1.6#sx=0.01#sy=0.01#sz=0.01# )
[Project 2]( #../../../RvtVa3c/models/Project2.rvt.js#px=120#py=-10#pz=120#ry=1.6#sx=0.01#sy=0.01#sz=0.01#add=true# )  
[[O]]( #../../../RvtVa3c/models/Wall.rvt.js#px=20#py=-10#sx=0.01#sy=0.01#sz=0.01# )
[Wall]( #../../../RvtVa3c/models/Wall.rvt.js#px=20#py=-10#sx=0.01#sy=0.01#sz=0.01#add=true# )  
[[O]]( #../../../RvtVa3c/models/Wall_2015.rvt.js#px=50#py=-10#pz=30#ry=0.1#sx=0.01#sy=0.01#sz=0.01# )
[Wall 2015]( #../../../RvtVa3c/models/Wall_2015.rvt.js#px=50#py=-10#pz=30#ry=0.1#sx=0.01#sy=0.01#sz=0.01#add=true# )  
[[O]]( #../../../RvtVa3c/models/Wall_brick.rvt.js#px=50#py=-10#pz=50#ry=-0.03#sx=0.01#sy=0.01#sz=0.01# )
[Wall brick]( #../../../RvtVa3c/models/Wall_brick.rvt.js#px=50#py=-10#pz=50#ry=-0.03#sx=0.01#sy=0.01#sz=0.01#add=true# )  
[[O]]( #../../../RvtVa3c/models/WallWindow.rvt.js#px=50#py=-10#pz=80#ry=0.08#sx=0.01#sy=0.01#sz=0.01# )
[Wall Window]( #../../../RvtVa3c/models/WallWindow.rvt.js#px=50#py=-10#pz=80#ry=0.08#sx=0.01#sy=0.01#sz=0.01#add=true# )  
[[O]]( #../../../RvtVa3c/models/rac_basic_sample_project_scene.rvt.js#sx=0.01#sy=0.01#sz=0.01#noGround#noGrid# ) 
[RAC Basic Sample Project Site]( #../../../RvtVa3c/models/rac_basic_sample_project_scene.rvt.js#sx=0.01#sy=0.01#sz=0.01#add=true#noGround# ) - Takes a while to load but worth the wait!  

</details>
<details open>

<summary><h2>Grasshopper Files</h2></summary>

Grasshopper plugin to export three.json files that can be loaded by the vA3C viewer. 
Implemented by Benjamin Howes, Charlie Portelli and Jonatan Schumacher at the AEC Technology Hackathon in NYC in May 2014.

[[O]]( #../../../json/Hex_01.js#sx=0.01#sy=0.01#sz=0.01#axis#gradient#grid#ground# )
[Hex 01.js]( #../../../json/Hex_01.js#sx=0.01#sy=0.01#sz=0.01#axis#gradient#grid#ground#add=true# )  
[[O]]( #../../../json/MissSpacyEyes.json#sx=0.1#sy=0.1#sz=0.1#axis#gradient#grid#ground# )
[MissSpacyEyes.json]( #../../../json/MissSpacyEyes.json#sx=0.1#sy=0.1#sz=0.1#axis#gradient#grid#ground#add=true# )  
[[O]]( #../../../json/TTX.json#sx=0.1#sy=0.1#sz=0.1#axis#gradient#grid#ground# )
[TTX.json]( #../../../json/TTX.json#sx=0.1#sy=0.1#sz=0.1#axis#gradient#grid#ground#add=true# )  
[[O]]( #../../../json/TypTower.json#sx=0.025#sy=0.025#sz=0.025#axis#gradient#grid#ground# )
[TypTower.json]( #../../../json/TypTower.json#sx=0.025#sy=0.025#sz=0.025#axis#gradient#grid#ground#add=true# )  
[[O]]( #../../../json/Vase_01.js#sx=0.1#sy=0.1#sz=0.1#axis#gradient#grid#ground# )
[Vase 01.js]( #../../../json/Vase_01.js#sx=0.1#sy=0.1#sz=0.1#add=true#axis#gradient#grid#ground# )  

</details>
<details open>
<summary><h2>3DS Files</h2></summary>

These files were produced maxscriptVa3c,
a hacked modification to v4 json format from original v3 exporter found here:  
<https://github.com/mrdoob/three.js/tree/master/utils/exporters/max>

[[O]]( #../../../json/3dsmax/test_3dsmax.js#py=8#sx=0.3#sy=0.3#sz=0.3#axis#gradient#grid#ground# )
[Test_3DSMax]( #../../../json/3dsmax/test_3dsmax.js#py=8#sx=0.3#sy=0.3#sz=0.3#axis#gradient#grid#ground#add=true# )  
[[O]]( #../../../json/3dsmax/TransamericaPyramid2.js#sx=0.03#sy=0.03#sz=0.03#axis#gradient#grid#ground#  )
[Transamerica Pyramid]( #../../../json/3dsmax/TransamericaPyramid2.js#sx=0.03#sy=0.03#sz=0.03#axis#gradient#grid#ground#add=true# )  
</details>

<details>
<summary><h2>About</h2></summary>
View Revit, Rhino/Grasshopper 3DS Max and other model types models in 3D with any web browser using Three.js and data rendered as JSON files.

This script is an update to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a>

Team Members: Benjamin Howes, Jonatan Schumacher, Jeremy Tammik, Matt Mason, Kevin Vandecar, Charlie Portelli, Josh Wentz, Femi King, Zach Flanders & Theo Armour

Supporters include: Mostapha Roudsari, Ashley Reed, Anne Waelkens, Jim Quanci, Elcin Ertugrul, Amir Tasbihi and many more. Others?

<a href="http://va3c.github.io/viewer/va3c-viewer-html5/readme-reader.html" target="_blank">Read Me</a> ~ 
<a href="https://github.com/va3c/viewer/tree/gh-pages/va3c-hacker-cookbook" target="_blank">Source Code</a>  

Credits: <a href="http://threejs.org" target="_blank">three.js</a> - 
<a href="http://khronos.org/webgl/" target="_blank">webgl</a> - 
<a href="http://jaanga.github.io" target="_blank">jaanga</a>  
copyright © 2014 & 2015 vA3C authors ~ MIT license
</details>

<style>#hh { color: #f00; display:inline; }</style>
<style>img { width: 375px; } </style>