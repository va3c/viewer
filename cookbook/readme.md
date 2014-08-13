vA3C Cookbook Read Me
===
[Web page version]( http://va3c.github.io/viewer/cookbook/readme-reader.html )
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook )

<!--
### Live Demo

<iframe src="http://va3c.github.io/viewer/cookbook/json-reader/threejs-iframe.html" width=100% height=500px class='overview' >
There is an `iframe` here. It is not visible when viewed on github.com. To view, please see 'Project Links' below.
</iframe>
_[Test Threejs in an Iframe]( http://va3c.github.io/viewer/cookbook/json-reader/threejs-iframe.html )_
-->

## Concept

2014-07-24 ~ WebGL detection added throughout

The files here are to help you get started with, for example, building apps that work with [Open Studio]( https://openstudio.nrel.gov/ ) 
or with [WordPress]( http://wordpress.org ).

All the files here may be downloaded and run locally without any cross-origin security issues.

The goal is to help you develop apps that can help you export data from a heavy-duty design app and make that data readily available on 
the web or locally for easy viewing and collaboration in your browser - all using the Three.js library.

Folders include:

[JSON Reader]( http://va3c.github.io/viewer/cookbook/json-reader/ )   
[Source code]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json )

* Basic introduction to reading in JSON data into an HTML web page

[Export Data JSON](  http://va3c.github.io/viewer/cookbook/export-data-json )  
[Source code]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/json-reader )

* Basic introduction to exporting data from a Three.js file


## Load Collada Load

[Web page version]( http://va3c.github.io/viewer/cookbook/load-collada-load/ ) - 
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/load-collada-load/ )

* Loads Collada .dae file using:
	* colladLoader.js
	* loader.load
* Geometry, materials and textures all load as expected
* Currently the best way to load Collada files

## Load Collada Parse

[Web page version]( http://va3c.github.io/viewer/cookbook/load-collada-parse/ ) - 
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/load-collada-parse/ )

* Loads Collada .dae file using:
	* colladLoader.js
	* loader.parse
* Geometry, materials load as expected. Textures are a fail/
* There seems to be no current work-around


##Load JSON Object - Load

[Web page version]( http://va3c.github.io/viewer/cookbook/load-json-object/ ) - 
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/load-json-object/ )

* Loads a JSON file using ObjectLoader and loader.load
* Only load Three.js JSON 4.0+ files

## Load JSON Load Read Me

[Web page version]( http://va3c.github.io/viewer/cookbook/load-json-load/ ) - 
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/load-json-load/ )

* Loads a JSON file using JSONLoader and loader.load
* Only loads Three.js JSON 3.0+ files and lower

## Load JSON Parse Read Me

[Web page version]( http://va3c.github.io/viewer/cookbook/load-json-parse/ ) - 
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/load-json-parse/ )

* Loads Three.js JSON files using following technique:  
	* Open file and read contents
	* Run tests to determine version
	* Use loader.parse file using JSONLoader or ObjectLoader as appropriate
*  Loads geometry, materials and textures correctly 
* This suggests: loader.<b><i>parse</i></b> is best current solution   

## Drag and Drop Demo

[Web page version]( http://va3c.github.io/viewer/cookbook/drag-and-drop/r1/drag-and-drop-r1.html ) - 
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/drag-and-drop/ )

* JSON only for the moment



## Project Links
vA3C is a [GitHub]( http://github.com) [organization account]( https://help.github.com/articles/what-s-the-difference-between-user-and-organization-accounts ) and has multiple owners and admins. 
All vA3EC scripts are [FOSS]( https://en.wikipedia.org/wiki/Free_and_open-source_software ).
Scripts are hosted on GitHub and are viewable as web pages, as described in the 'Read Me' files and as source code.

The three ways of looking at the vA3C scripts:

1. [Live Demo]( http://va3c.github.io/viewer/cookbook/r1/json-build-export-object.html )  
2. [Read Me]( http://va3c.github.io/viewer/cookbook "view the files as apps." ) <input value="<< You are now probably here." size=28 style="font:bold 12pt monospace;border-width:0;" >   
3. [Source Code]( https://github.com/va3c/viewer/tree/gh-pages/cookbook "View the files as source code." ) <scan style=display:none ><< You are now probably here.</scan>  


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

2014-08-09 ~ Added Revit JSON Import via XMLHttpRequest

2014-08-07 ~ Revit JSON Import added

2014-07-24 ~ Theo

* Added R2 json import
* added webgl detection throughout  


2014-06-28 ~ Theo

* Add more demos

2014-06-26 ~ Theo

* Add folders and files 


