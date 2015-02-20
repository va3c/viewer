[vA3C Hacker Cookbook]( ../index.html )<br>> [Edit Camera Path]( ./index.html )
===

This utility helps you create and edit a 3D spline that can be used as a camera path to 'fly' around 3D models.

1 - Select a file that requires a camera path:

<input type=file onchange=VH.getFile(this); >  

or

<input type=button onclick=VH.dispatchFileByURL(['','../../cookbook/samples/drag-objects.html','noGrid','noAxis','noGround']); value="Load the draggable objects demo" />
<input type=button onclick=VH.dispatchFileByURL(['','../../cookbook/samples/wave-sphere.html','noGrid','noAxis','noGround']); value="Load the wave sphere demo" />

<hr>
2 - Generate a spline:

Spline <input type="button" onclick=VH.splineMakerRandomPoints(inpPoints.value); value="Generate" /> 
<input type="button" onclick=VH.splineDelete(); value="Delete" /> 

Number of control points: <input type="number" id="inpPoints"  min="4" max="1000" step="1" value="4" style="width:3em" />
<button onclick=inpPoints.value++;VH.points(1); title="Add new point" > + </button> | 
<button onclick=inpPoints.value--;VH.points(-1); title="Remove final point" > - </button> 

<input type="checkbox" onchange=VH.extend=!VH.extend;VH.points(0); title="New point projected from previous two points. Otherwise random" /> Extend ~ 
<input type="checkbox" onchange=VH.closed=!VH.closed;VH.points(0); /> Closed<br>

<input type="button" onclick=VH.exportSpline(); value="Export Spline" /> 
Import <input type=file onchange="VH.importSpline(this);" />

<hr>
3 - Click 'Update path' then click 'Follow'

<input type="checkbox" onchange=actionCamera=actionCamera===camera?splineCamera:camera; /> Follow 
<input type="checkbox" onchange=updates=updates===true?false:true; checked /> Updates<br>

<input type=button onclick=initCameraFollow(); value="Update path" />

<hr>

<a href="JavaScript:VH.displayMarkdown('./dev-notes.md',menuLeft);" >Dev Notes</a>
