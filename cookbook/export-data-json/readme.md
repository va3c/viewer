Export Data JSON Read Me
===
[web page version]( http://va3c.github.io/viewer/cookbook/export-data-json )
[Source code version]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/ )

<!--
### Live Demo

<iframe src="http://va3c.github.io/viewer/cookbook/json-reader/threejs-iframe.html" width=100% height=500px class='overview' >
There is an `iframe` here. It is not visible when viewed on github.com. To view, please see 'Project Links' below.
</iframe>
_[Test Threejs in an Iframe]( http://va3c.github.io/viewer/cookbook/json-reader/threejs-iframe.html )_
-->


_**Important** Most of the following demos use THREE.GeometryExporter.js. This file is no longer included in recent builds of Three.js, 
therefore the demos are broken. Please investigate:_

		var geometry = object.geometry;

		if ( geometry === undefined ) {

			alert( 'The selected object doesn\'t have geometry.' );
			return;

		}

		var output = geometry.toJSON();
		output = JSON.stringify( output, null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		exportString( output, 'geometry.json' );

_For more details see <http://mrdoob.github.io/three.js/editor/>_



### Creating Data in Three.js and Exporting it in JSON Format

A useful starting point to observing how Three.js creates data and then exports this data to a JSON file.

Live demo: [JSON Build - Export Geometry]( http://va3c.github.io/viewer/cookbook/export-data-json/json-build-export-geometry.html )  
Source code: [JSON Build - Export Geometry](  https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/json-build-export-geometry.html )

This file creates a Three.js mesh that represents a 50 m by 30 m by 12 stories at 3 M each.

The mesh is rendered in wireframe mode so that you can see all the triangle faces that are generated.

You can zoom, pan and rotate the model using your pointing device.

There is a single command: 'Export geometry', Clicking the button brings up the 'File Save" dialog 
and allows you to export the data to an ASCII JSON file. A default file name is provided, but you can use any name you wish.

Once the file is exported, you may open the file with any text editor and observe how Three.js structures the geometry.
The script exports geometry only. Materials and other scene data is ignored. 

Since the data is just a box, Three.js exports just the command to create a box and not all the vertices and faces.

Most variables are globals so you can easily inspect their data at any time. 
Most aspects are hard-wired - just because the script is designed to be as simple as possible so as to provide a quick glimpse into structure of the data.

Now that the data has been exported, let's see if you can import the data and view it in 3D.

Further down this page is a link to 'JSON Import - View Basic' a very JSON file viewer 

Now that you have viewed the export and import process, it is time to add a bit more complexity.

Live demo: [JSON Build - Export Object]( http://va3c.github.io/viewer/cookbook/export-data-json/json-build-export-object.html )  
Source code: [JSON Build - Export Object](  https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/json-build-export-object.html )

This script extrudes a shape and therefore the geometry is more complicated than the first example. 
Therefore Three.js exports all the vertices0 and faces.

This script also exports more meta information - including any materials that have been assigned to the geometry.

Live demo: [JSON Build - Export Multiple Objects]( http://va3c.github.io/viewer/cookbook/export-data-json/json-build-export-multiple-objects.html )  
Source code: [JSON Build - Export Multiple Objects]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/json-build-export-multiple-objects.html )

Builds and exports cubes with random position, rotation, scale and color.

Live demo: [JSON Build - Export Pentagon as Planes]( http://va3c.github.io/viewer/cookbook/export-data-json/json-build-export-pentagon-as-planes.html )  
Source code: [JSON Build - Export Pentagon as Planes]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/json-build-export-pentagon-as-planes.html )

Builds and exports Three.js planes

Live demo: [JSON Build - Export Multiple Shapes]( http://va3c.github.io/viewer/cookbook/export-data-json/json-build-export-multiple-shapes.html )  
Source code: [JSON Build - Export Pentagon as Planes]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/json-build-export-multiple-shapes.html ) 

Builds and exports three shapes that have been extruded. Because Three.js must export all the vertices and faces for an extrusion, the JSON file
that is produced is likely to be most similar to a file produced by other apps. Observing files produced by this script may be a good place to start.

Note that the current revision is having issues with materials not appearing correctly. 


Live demo: [JSON Import - View Basic R2]( http://va3c.github.io/viewer/cookbook/export-data-json/json-import-view-basic-r2.html )   
Source code: [JSON Import - View Basic R2]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/json-import-view-basic-r2.html )


2014-07-24 ~ R2 added

This file has a single command: "Select File' brings up your operating system's file dialog. You can select any file,
but a good place to start is with the file you just exported.

Once loaded, the file allows you to zoom, pan and rotate. Attribute values - assigned to the entire mesh - may also appear just under the File select button.

An ambient light and a direction light that follows the camera position are built in.

Again, this script is designed to be simple and basic in order to give you the quickest feeling of how things work.

Live Demo: [Revit JSON Import R1]( http://va3c.github.io/viewer/cookbook/export-data-json/revit-json-import.html )   
Source code: [Revit JSON Import R1]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/revit-json-import.html )


Live Demo: [Revit JSON Import via XMLHttpRequest]( http://va3c.github.io/viewer/cookbook/export-data-json/revit-json-import-ajax.html )   
Source code: [Revit JSON Import via XMLHttpRequest]( https://github.com/va3c/viewer/tree/gh-pages/cookbook/export-data-json/revit-json-import-ajax.html )


Remember: the JavaScript console is your friend...

### Mission  
<!-- a statement of a rationale, applicable now as well as in the future -->



### Vision  
<!--  a descriptive picture of a desired future state -->
When possible, I try to provide code that an engineer or designer could play with  

## Features
<!-- and benefits -->


## Road Map


## Issues / Bugs


## Project Links
vA3C is a [GitHub]( http://github.com) [organization account]( https://help.github.com/articles/what-s-the-difference-between-user-and-organization-accounts ) and has multiple owners and admins. 
All vA3EC scripts are [FOSS]( https://en.wikipedia.org/wiki/Free_and_open-source_software ).
Scripts are hosted on GitHub and are viewable as web pages, as described in the 'Read Me' files and as source code.

The three ways of looking at the vA3C scripts:

1. [Live Demo]( http://va3c.github.io/viewer/cookbook/export-data-json/json-build-export-object.html )  
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

2014-08-12 ~ Theo

* Files and folders all moved about in all manner of ways

2014-08-09 ~ Theo

* Added Revit JSON Import via XMLHttpRequest

2014-08-07 ~ 

* Revit JSON Import added

2014-07-24 ~ Theo

* Added R2 json import
* added webgl detection throughout  


2014-06-28 ~ Theo

* Add more demos

2014-06-26 ~ Theo

* Add folders and files 


