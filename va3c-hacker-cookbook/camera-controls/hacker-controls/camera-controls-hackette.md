
[Camera Controls]( ../index.html ) &raquo;
[Camera Controls Hackette]( camera-controls-hackette.html )
===
1. Select the model you wish to view.

2. Select the camera controls you wish to use.

### Grasshopper to JSON Models

[Hex 01]( #../../../../json/Hex_01.js#sx=0.01#sy=0.01#sz=0.01#axis#gradient#grid#ground# )  
[TTX]( #../../../../json/TTX.json#sx=0.1#sy=0.1#sz=0.1#axis#gradient#grid#ground# )  
[Vase 01]( #../../../../json/Vase_01.js#sx=0.03#sy=0.03#sz=0.03#axis#gradient#grid#ground# )

### Revit to JSON Models
[Little House]( #../../../../RvtVa3c/models/little_house.rvt.js#py=5#ry=3#sx=0.01#sy=0.01#sz=0.01#axis#gradient#grid#ground# )  
[Project 1]( #../../../../RvtVa3c/models/Project1.rvt.js#py=5#ry=3#sx=0.01#sy=0.01#sz=0.01#axis#gradient#grid#ground# )  
[Jeremy's House]( #../../../../RvtVa3c/models/rac_basic_sample_project.rvt.js#py=5#ry=3#sx=0.01#sy=0.01#sz=0.01#axis#gradient# )

### STL Models
[Cassini]( #../../../../nasa-samples/stl/cassini.stl#60# )  
[Stardust 35]( #../../../../nasa-samples/stl/Stardust_35.stl#60# )  
[Dawn 19]( #../../../../nasa-samples/stl/Dawn_19.stl#60# )

<button onclick=ifr.contentWindow.selectOrbitControls(); >Three.js Orbit Controls</button>  
<button onclick=ifr.contentWindow.selectFirstPersonControls(); >Three.js First Person Controls</button>  
<button onclick=ifr.contentWindow.selectFlyControls(); >Three.js Fly Controls</button>  

<button onclick=ifr.contentWindow.selectFirstPersonControlsHacker(); >vA3C Hacker Cookbook First Person Controls</button>

* WASD/cursor keys: four directions
* RF/Page Up PageDn: move up / down
* Mouse wheel only: speed up/slow down
* Spacebar/mousewheel click: pause
* Mouse/trackpad: update heading

There are issues when you return to the Orbit controls after having enabled one of the other controls.