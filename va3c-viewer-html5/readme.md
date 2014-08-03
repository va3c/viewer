vA3C Viewer HTML5 Read Me
===

### Live Demo

<iframe src="http://va3c.github.io/viewer/va3c-viewer-html5/latest/index.html" width=100% height=500px class='overview' >
There is an `iframe` here. It is not visible when viewed on github.com/va3c/viewer. To view, please see 'Project Links' below.
</iframe>
_vA3C Viewer HTML5 - latest revision_ / [Full Screen]( http://va3c.github.io/viewer/va3c-viewer-html5/latest/index.html )

The scripts here are updates to the competition entry and winner of the second prize at the <a href="https://www.hackerleague.org/hackathons/aec-technology-hackathon-2014" target="_blank">AEC Technology Hackathon 2014</a>.

### Blog Posts
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
* Perhaps a 'turntable' or mixing studio for 3D DJs


## Features
<!-- and benefits -->



### File Management

* AutoCrapdoodle feature
	* An experiment in playing with files in the cloud
* Provides fast, simple access to 3D models, objects and HTML files
* Uses the DOM to provide very deep editing and control access to the imported models.
* Opens for editing and manipulation
	* Any Three.js HTML files
	* Files of these types: .js, .json, .obj, .stl, .dae, .wrl and .vtk files. Coming soon: .gltf
	* Open files via a link and an xmlHttpRequest
	* Open files via the perating system File Open dialog
* Load a new drawing or insert new objects into current drawing
* Save the current state to a new JSON file

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
* Libraries presented via online access to user files in their original GitHub home gh-pages folders 
	* No need to download/upload. 
	* No need to send your data to closed source walled-garden
	* Process could be replicated on private CORS-compliant servers
* Libraries can have dedicated plugins

### Editing and Updating
* Select any mesh for editing by clicking it on screen.
* Geometry Tab
	* Update position, scale and rotation any geometry in any of the above
	* Delete currently selected object
	* Guided by real-time sliders or via text data input
* Material Select Tab
	* Apply any of several dozen pre-defined materials to any mesh
	* Includes texture, reelections and refractions
* Material Editor Tab 
	* Enables editing every available parameter of any material on any selected mesh
	* Includes shading type, smoothness, sides, wireframe, opacity and shininess
	* Ambient, color, emissive and specular
* Lights Tab
	* Add lights to drawings
	* Point light follows the camera
	* Directional light position controlled br real-time slders


* Toggle the display wireframe and normals helpers
* Add lights, shading and shadows to any model

### UI Features
* Display enables pan, rotate and zoom with pointing device
* Full-screen display with translucent menu
* Menu is iconizable and draggable
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
	* Names beginninh with 'v3' belong to vA3C, are intendeed to be very specific and targeted to the particular app
	* During the initial development process the distinctions become blurred
* Code is highly-risk taking
	* Example: Double quotes only used when absolutely necessary
		* The world: <html lang="en">
		* Us: <html lang=en>
* Code is designed to be load or render on demand
* Code style
	* Generally follows 'MDCS' 
	* As generous horizonatally but much more greedy veritically
	* Also passes jsHint
* Code is designed to be seriously easy
	* Encourages engineers, architects and designers and non-professional programmers to add features
	* No need to know jQuery, Backbone, Angular. Get going if you only kow a tiny bit of JavaScript
	* And do feel free to build a jQuery version...
* Content, appearance and behavior that are related are kept togther
	* Every .js files contains all its associated CSS, HTML data - as well as the JavaScript
	* No need to keep three files open. It's all in one file just in front of you
	* This part of techniques that help you become more accustomed too the DOM

## Road Map

* Divide menu into multiple, scrollable panels
* Add UI themes including fixed position side bar menus
* Bring in all append files as 3DObjects
* Add boilerplate/default file choices to preferences tab
* Add default light, shading settings to lights tab
* Add 3D project management tab
* Add people dancing in the streets tab
* Add Jaanga Terrain Viewer tab
* Open files via URL
* Open files via Drag and Drop
* Add zoom extents
* Add rotate view after a period of inactivity
* Add choice of camera controllers 
* Add tree view of meshes, materials and attributes
* Fix any model texture display issues
* Add ability to toggle visibility of any mesh. Layers?
* Add ability to add texture to material of selected objects
* Add standard Three.js geometry tab
* Add physics and booleans tabs
* Add galleries of images of data files
* Add the models from here: https://github.com/sparkfun/3D_Models/
* Add sky boxes

## Issues /Bugs

* R2: Difficult to know which controller you are using currently


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
  


