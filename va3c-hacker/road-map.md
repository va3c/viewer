vA3C Hacker Road Map
===

The following was for Hacker R3 and prior. Much of it no longer makes sense after the R4 pivot...

## Core

* 2014-12-27 ~ Clearer, more intuitive file and function naming
 
* 2014-11-26 ~ Continue name spacing


## File Handling

* 2014-11-26 ~ Open Three.js files that are inside ZIP files

* 2014-11-26 ~ Open 3D Warehouse / Collada ZIP files directly

* 2014-11-23 ~ function to clear all objects out of a scene leaving just lights and camera and/or just reloading current template file
	* 2014-11-26 << may not be best way to go. Looks like better to load a fresh iframe each time

* 2014-11-23 ~ homogenize all the ways of loading json files
	* 2014-12-09 << looking good

* 2014-11-23 ~ Load JSON 4 files using the file open dialog box 
	* 2014-11-26 << added

* 2014-11-23 ~ Save scene, object, geometry, material to JSON file
	* 2014-11-26 ~ Save scene first pass: working

* 2014-11-23 ~ Interpret multiple permalink calls separated by an &

### Screen Grabber

* 2014-11-23 ~ Screen Grabber - 'Picture taker' - open any file, compose the effect, save size-selected screen shot to file << 2014-11-26 ~ working ( with issues )
	* 2014-11-26 ~ << First pass complete
	* 2014-11-26 ~ << adds 'preserveDrawingBuffer: true' to renderer using 'pre-processor
	* 2014-12-09 ~ search and replace broken calls to three.min.js etc


### Display Markdown

* 2014-12-09 ~ Accept parameters instead of file name

* 2014-12-09 ~ Scroll text to position indicated by a parameter

* 2014-12-09 ~ special parameters allow for pre-processing the file, regex operations or interpreting embedded code
	* Based on idea that this is a xmlhttprequest operation, so we can do what we want with the data


## Location.hash / Permalinks

* 2014-11-27 ~ build parse-permalinks.js

* 2014-11-26 ~ Read permalinks from a Google Docs spreadsheets


## Animating  / Feedback Monitoring / Runtime

* 2014-12-27 ~ Camera follow spline

* 2014-11-23 ~ RAF updates function that can be used to direct/trigger multiple update events << 2014-11-26 ~ first version in file modified monitor

* 2014-11-23 ~ Monitor modifications to a file and display  << 2014-11-23 See 'Enable File Modified Monitor'
	* 2014-11-26 ~ Add ability for app to be notified of changes using window.postMessage
	* 2014-11-23 ~ Add ability to monitor JSON 3, STL and other file types
	* 2014-11-23 ~ Add ability to monitor assemblies with multiple objects
	* 2014-11-23 ~ Add ability to view revision changes - perhaps by showing previous revisions with increasing opacity


## Marketing

* 2014-11-26 ~ AirDoodle

* 2014-11-26 ~ Add a fly through of Jeremy's house

* 2014-11-26 ~ Tell you the time
	* 2014-11-26 ~ Cancel button
	* 2014-11-26 ~ 3D watch ~ working grand complication
	* 2014-11-26 ~ tick tock sound

* 2014-11-23 ~ Add a jQuery UI sample user interface


## Meta Data

* 2014-11-26 ~ Update Read Me

* 2014-11-23 ~ Features page



## Editors / Tools

* 2014-12-27 ~ NURBS editor

* 2014-11-26 ~ working 3D spline editor
	* 2014-12-27 ~ Looking good

* 2014-11-23 ~ Select a controller

* 2014-11-23 ~ Select a Renderer

* 2014-11-23 ~ Lights editor

* 2014-11-23 ~ Materials selector and editor


## Contents

* 2014-11-26 ~ Start to add some character animations


### NASA STL Files

* 2014-11-26 ~ Add all links to MD files << 2014-12-27 ~ done
* 2014-11-26 ~ Add links to NASA images << 2014-12-27 ~ done
* 2014-11-26 ~ Add links to source NASA page for each file << 2014-12-27 ~ done
* 2014-11-26 ~ Find away of assembling the several multi-part NASA files - will need multiple permalinks
* 2014-11-26 ~ Build handsome GitHub presence and inform NASA/GitHub

### Revit Files

* 2014-11-26 ~ Read and display BIM data

## FGX Aircraft

* 2014-11-26 ~ File with links and images
  

### AlgeSurf

* 2014-11-26 ~ Images of the equations

