[vA3C Hacker Cookbook]( ../../index.html )<br>> [Edit Camera Path]( ./index.html )
===

This utility helps you create and edit a 3D spline that can be used as a camera path to 'fly' around 3D models.

Select a file that requires a camera path:

<input type=file size="50" onchange=VH.getFile(this); >


<input type="button" onclick=VH.splineMakerRandomPoints(inpPoints.value); value="Generate" /> 
<input type="button" onclick=VH.splineDelete(); value="Delete" /> 

Number of control points: <input type="number" id="inpPoints"  min="4" max="1000" step="1" value="4" style="width:3em" />
<button onclick=inpPoints.value++;VH.points(1); title="Add new point" > + </button> | 
<button onclick=inpPoints.value--;VH.points(-1); title="Remove final point" > - </button> 

<input type="checkbox" onchange=VH.extend=!VH.extend;VH.points(0); title="New point projected from previous two points. Otherwise random" /> Extend ~ 
<input type="checkbox" onchange=VH.closed=!VH.closed;VH.points(0); /> Closed<br>


<input type="button" onclick=VH.exportSpline(); value="Export Spline" /> 
<input type=file size="40" onchange=VH.importSpline(this); >



<a href="JavaScript:VH.displayMarkdown('./dev-notes.md',menuLeft);" >Dev Notes</a>

<input type="checkbox" onchange=VH.follow=!VH.follow; /> Follow<br>
<button onclick=init2(); >Init</button> <button onclick=updatePosition(); >Update Position</button> 

<style>img { width: 375px; } /* ybookup, this works */</style>

<!--
<style>
.it::before {content: 'http://google.com'; }

a { text-decoration: none; } 
a::before { content: 'bbb'; }
/* yup, this works */</style>
-->