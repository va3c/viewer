vA3C Viewer HTML5 Read Me
===
[Web page version]( http://va3c.github.io/viewer/va3c-viewer-html5/ )
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/va3c-viewer-html5 )

### Live Demo

<iframe src="http://va3c.github.io/viewer/va3c-viewer-html5/latest/index.html" width=100% height=500px class='overview' >
There is an `iframe` here. It is not visible when viewed on github.com/va3c/viewer. To view, please see 'Project Links' below.
</iframe>
_vA3C Viewer HTML5 - latest revision_ / [Full Screen]( http://va3c.github.io/viewer/va3c-viewer-html5/latest/index.html )

The scripts here are updates to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a>.

### Blog Posts

2014-08-22 ~ [Three.js AEC Viewer Progress on Two Fronts]( http://thebuildingcoder.typepad.com/blog/2014/08/threejs-aec-viewer-progress-on-two-fronts.html )
2014-08-03 ~ [vAEC Viewer R4: Permalinks Provide Fast Easy Free Ways To Source and Save Data Online]( http://www.jaanga.com/2014/08/vaec-viewer-r4-permalinks-provide-fast.html )  
2014-07-27 ~ [vA3C Viewer R3 Update ~ 2014-07-27 ~ No More Russian Dolls ( scenes inside scenes inside scenes )]( http://www.jaanga.com/2014/07/va3c-viewer-r3-update-2014-07-27-no.html )  
2014-07-25 ~ <http://www.jaanga.com/2014/07/va3c-viewer-r3-update-now-with-save-and.html>  
<http://www.jaanga.com/2014/07/va3c-viewer-work-in-progress-update.html>  
<http://www.jaanga.com/2014/07/va3c-viewer-r3-processes-data-from.html>  
<http://www.jaanga.com/2014/07/algesurf-parametric-equations-math-in.html>  

## Concept

### Mission  
<!-- a statement of a rationale, applicable now as well as in the future -->
* View, mash-up edit and save 3D data files with any web browser.


### Vision  
<!--  a descriptive picture of a desired future state -->
* No clear goals for the moment
* Perhaps to enable and to attract more people into thinking about and acting on the designed ( as opposed to the merely 'constructed' ) environment 
	* Works - eventually - on devices normally used by general populaations - ie tablets and phones
	* FOSS benefits
* Perhaps to help design professionals communicate their specialist skills to a broader population 
	* No attempt to compete with the tools professionals use to tackle sophisticated and complex designs
	* Very much attempting to bring engineering and design _savoire faire_ - both high end levels and plain old common sense levels - to a broader swathe of humanity 
* Perhaps a 'turntable' or mixing studio for 3D DJs
* Follow Mr.doobs' maxim: 'to create a lightweight 3D library with a very low level of complexity — in other words, for dummies'
	* Code is designed to be very fast to read
		* Encourages engineers, architects and designers and non-professional programmers to add features
		* Allows designers to concentrate on improving the design rather than fixing the code
		* No need to know jQuery, Backbone, Angular. Get going if you only know a tiny bit of JavaScript


## Viewer Features
<!-- and benefits -->


### File Management: File Open

* Provides fast, simple access to 3D models, objects and HTML files
* Uses the DOM to provide very deep editing and control access to the imported models.
* Opens for editing and manipulation
	* Open files via a link and an xmlHttpRequest
		* Any Three.js HTML files
		* Files of these types: .js, .json (ASCII and binary), .obj, .stl (ASCII and binary), .dae, .wrl and .vtk files. Coming soon: .gltf

	* Open files via the operating system File Open dialog
		* Opens Three.js HTML files that only have absolute links
		* Opens .js, .json, .obj, .stl ascii, .vtk, 
		* Opens .wrl files but have issues with materials
		* Fails to open .dae files. See lines 342... of jafo-file-open.js for temporary partial fix
	* Open files via the text in the address bar using location.hash
		* Often called permalinks
		* See below
	* Open files via drag and drop
		* Starting with r6
* Load a new drawing or append (insert) new objects into current drawing  << which word is better: 'append 'or 'insert'??

### File Management: Save as File  
* Export the current state to a new JSON file as geometry, object or scene

### File Management: Save as Permalink
* Create permalink
	* Generates a permalink based on all the objects with geometry in the current scene
* Parse permalink
	* Lets you see what a permalink creates
* Clear permalink
	* Resets the address bar to the base URL 
* AutoCrapdoodle feature
	* An experiment in playing with files in the cloud
* Link to goo.gl
	* Provides speedy acces to a popular URL Shortener
* Permalinks are an effective very lightweight method of saving data

### Sample File Libraries
* CORS-compliant access to 1025+ sample data files hosted on GitHub
* Sample files include the following
	* 27 vA3C JSON files translated from Grasshopper, Revit & 3DS
	* 227 Three.js HTML code example files
	* 113 Three.js models
	* 37 Three.js objects
	* 83 Stemkoski HTML code example files
	* 420+ FGx Aircraft JSON files
	* 170 Jaanga AlgeSurf PE Jurgen Meier Equation in Three.js HTML files
	* Files from 3D Warehouse, Clara.io, NASA files, _Programming 3D Applications_ in the pipeline
* Libraries presented to you via online access to user files in their original GitHub home gh-pages folders 
	* No need to download/upload. 
	* No need to send your data to closed source walled-garden
	* Process could be replicated on private CORS-compliant servers
* Libraries can have dedicated plugins

### Editing and Updating
* Select any mesh for editing by clicking it on screen.
* Geometry Tab
	* Update position, scale and rotation any geometry in any of the above
	* Guided by real-time sliders or via text data input
	* Delete currently selected object
		* Remove mesh from current view
		* Remove mesh from scene.children
		* Remove mesh-associated geometry, material, texture
* Material Select Tab
	* Apply any of several dozen pre-defined materials to any mesh
	* Includes texture, reflections and refractions
* Material Editor Tab 
	* Enables editing every available parameter of any material on any selected mesh
	* Includes shading type, smoothness, sides, wireframe, opacity and shininess
	* Ambient, color, emissive and specular
* Lights Tab
	* Add lights, shading and shadows to any model
	* Point light follows the camera
	* Directional light position controlled by real-time sliders

### Viewing
* Reset camera position
* Zoom extents
	* Nice simple, fast, easy-to-understand algorithm
	* WIP regarding scaled objects 
	* Updates the dimensions of the directional light shadow box
	* Updates camera near and far settings
	* Toggle display of bounding sphere and axis

### Preferences
* Toggle the display of wireframe and normals helpers


### UI Features
* Display enables pan, rotate and zoom with pointing device
* Full-screen display with translucent menu
* Menu is iconizable and dragable
* Menu has accordion feature
* Set background to random gradient or random color or selected color


### Coding Style
* Every tab has its own .js script file
* Tab titles, script file names and namespace titles are all tied together
	* The namespace prefix of any variable or function tells you what tab and script file it relates to
	* Examples
		* Tab name: 'Lights...'
		* Namespace ID: 'JALI.'
		* JavaScript file name: 'jali-lights.js'
* Two file names groups
	* Names beginning with 'ja' belong to jaanga, are intended to be generic and can be used with any app
	* Names beginning with 'v3' belong to vA3C, are intended to be very specific and targeted to the particular app
	* During the initial development process the distinctions become blurred
* Separation of 3D in-world code and 2D user interface code
	* All interaction with the Three.js code for 3D interaction is via emdedded iframes
	* Allows parent window to use any of the many popular JavaScript libraries
	* Makes no attempt to turn Three.js code into, say, jQuery and ditto _vice versa_
* Takes as much advantage of the HTML 5 [Document Object Model (DOM)]( http://en.wikipedia.org/wiki/Document_Object_Model ) as possible
	* Example: `<tag id=thing >stuff</tag>`
		* 'thing' is taken as a global variable directly and immediately
			* `document.getElemenById` is never invoked
	* Implies no support for elderly browsers
		* OK since WebGL canot run in elderly browsers
		* Follows the Mr.doob ethos of no nostalgia, remain calm and progress into the future ASAP
* Code is highly-risk taking
	* Example: Double quotes only used when absolutely necessary
		* The world: <html lang="en">
		* Us: <html lang=en >
	* Example: plays happily, willfully with untyped variables 
	* Example: see above / no support for elderly browsers
* Code is designed to be load or render on demand
	* In other words to load and display something ASAP
	* 'Just-in-time' library and data loading
* Code style
	* Generally follows ['MDCS']( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 ) 
	* As generous horizontally but much more greedy vertically
	* Also passes jsHint
* Code is designed to be seriously easy
	* Encourages engineers, architects and designers and non-professional programmers to add features
	* No need to know jQuery, Backbone, Angular. Get going if you only know a tiny bit of JavaScript
	* And do feel free to build a jQuery version...
* Content, appearance and behavior that are related are kept together
	* Every .js files contains all its associated CSS, HTML data - as well as the JavaScript
	* No need to keep three files open. It's all in one file just in front of you
	* This os part of techniques that help you become more accustomed to the DOM

## Road Map

* Google Cardboard support
* Divide menu into multiple, scrollable panels
* Add UI themes including fixed position side bar menus
* Bring in all append files as 3DObjects
* Add boilerplate/default file choices to preferences tab - bring in Callum Prentice's template maker
* Add default light, shading settings to lights tab
* Add 3D project management tab
* Add people dancing in the streets tab
* Add Jaanga Terrain Viewer tab
* Open files via URL
* Open files via Drag and Drop

* Add rotate view after a period of inactivity
* Add choice of camera controllers 
* Add tree view of meshes, materials and attributes
* Add ability to toggle visibility of any mesh. Layers?
* Add ability to add texture to material of selected objects
* Add standard Three.js geometry tab
* Add physics and booleans tabs
* Add galleries of images of data files
* Add the models from here: https://github.com/sparkfun/3D_Models/
* Add sky boxes

## Issues /Bugs

* R6 ~ 2014-08-21 ~ 3DS JSON. Not successfully loading, using the File Open dialog, JSON files created using the vA3C 3D3 exporter.
This is because using loader.parse fails. Loader.load works just fine. So does loading by URL.
A fix should not be difficult ad can be done as and when needed
  
* R6 ~ 2014-08-21 ~ zoom extents 
	* Not taking into account the global scale of an appended object at insert time, yet doing so when called manually
	* Not handliing THREE.TypedGeometry - as found in imported .stl files


* R2: Difficult to know which controller you are using currently

## Questions to ask your local matrixian

What'd the simplest most understandable way to offer opening or appending a file?

When a file to be appended contains a scene to you add it to the current scene or replace the current scene?

### Collada / .dae

Accessing Collada file via URL

* Use ColladaLoader.js and loader.load
* loads geometry, materials and textures as expected

Accessing Collada file via OS file open dialog or Drag and Drop

* ColladaLoader.js has no ability to 
* OS file reader only returns only file contents and name
	* for security reasons, reader does not pass identify the directory path
	* therefore cannot use loader.load which requires the full path
	* must use loader.parse( doc, callback, url )
	* can supply url manually'




##Team Members

Benjamin Howes, Jonatan Schumacher, Jeremy Tammik, Matt Mason, Kevin Vandecar, Charlie Portelli, Josh Wentz, Femi King, Zach Flanders & Theo Armour

### Supporters 

Mostapha Roudsari, Ashley Reed, Anne Waelkens, Jim Quanci, Elcin Ertugrul, Amir Tasbihi and many more. Others?


## Project Links
vA3C is a [GitHub]( http://github.com) [organization account]( https://help.github.com/articles/what-s-the-difference-between-user-and-organization-accounts ) and has multiple owners and admins. 
All vA3EC scripts are [FOSS]( https://en.wikipedia.org/wiki/Free_and_open-source_software ).
Scripts are hosted on GitHub and are viewable as web pages, as described in the 'Read Me' files and as source code.

The three ways of looking at the vA3C scripts:

1. [Live Demo]( http://va3c.github.io/viewer/va3c-viewer-html5/latest/index.html )  
2. [Read Me]( http://va3c.github.io/viewer/va3c-viewer-html5 "view the files as apps." ) <input value="<< You are now probably here." size=28 style="font:bold 12pt monospace;border-width:0;" >   
3. [Source Code]( https://github.com/va3c/viewer/tree/gh-pages/va3c-viewer-html5 "View the files as source code." ) <scan style=display:none ><< You are now probably here.</scan>  


## System Requirements

In order to run the script you will need a device and browser that provides good support for [WebGL](http://get.webgl.org/)
WebGL is the JavaScript API for rendering interactive 3D graphics and 2D graphics within any compatible web browser without the use of plug-ins. 

Generally this means a computer with an Intel Core i5 processor or better with an external GPU such as one made by Nvidia. 
Successful use of the script on a phone or tablet is highly unlikely. 
A mouse or other pointing device with a scroll wheel is also highly recommended so that you can zoom, pant and rotate in 3D.
 
The script is currently being built and tested with the Google Chrome browser. 
Bugs on browsers other than Chrome need not be reported until such time as the work settles down and an effort to support more browsers is initiated.


## Copyright and License

copyright &copy; 2014 vA3C authors ~ 
All work herein is under the [MIT License]( http://jaanga.github.io/libs/jaanga-copyright-and-mit-license.md )

This repository contains files that are at an early and volatile stage. Not all licensing requirements may have been fully met let alone identified. It is the intension of the authors to play fair and all such requirements will either be met or the feature in question will turned off.


## Change Log

2014-08-26 ~ 

* Revise source and basepath links
* Add links to source and tool tips to parametric equations
* Continue closing bogs on opening files and creating permalinks
 
2014-08-24 ~ Theo

* Add open or append binary JSON files via URL
* Add open links to FGX aircraft
* More tootips, file scales and file info
* Add open * append URL Three.js JSON 4+ links to test samples
* loding Collada files with textures - not perfect - but much improved

2014-08-23 ~ Theo

* Continue tweaking opening files ~ especially STL files
* See <https://docs.google.com/spreadsheets/d/1pGRTFDm0RPjWJTilqxk9NgnezEsaxKmMRtsG_IdbBAY/edit#gid=0>
* Add [O] = = open file to all the suitable samples
 

2014-08-21 ~ Theo

* File open minor fixes and adding issues to read me.


2014-08-13 ~ Theo

* Add zoom extents

2014-08-08 ~ Theo

* R5 now opening vy file dialog or URL most supported file types
* * Fix any model texture display issues << mostly fixed - especially .dea issues

2014-08-02 ~ Theo

* Add permalink read and create capability
* Add delete capability to Geometry tab

2014-07-27 ~ Theo

* Display attributes
* Much tightening of file open code

2014-07-25 ~ Theo

* Add save to file capability
* Added to read me

2014-07-22 ~

* Update Cook book - add samples for displaying Three.js as content.
* Editing Read me
* Update home page

2014-07-21 ~ Theo

* Models can target particular boilerplate files - so as to adjust for different scales
* Many minor fixes 

2014-07-20 ~ Theo

* Added Three.js files in obj/ folder tab
* Added FGx Aircraft
* Added Stemkoski HTML
* Added input boxes to geometry
* Fixed Reset button

2014-07-19 ~ Theo

* R3 - a WIP is up
* Reads files in a number of formats / 
* Add ability to open older JSON files << wishlist item done

2014-05-27 ~ Theo

* Add the readme and other support files
* Completed R2 and committed
  


