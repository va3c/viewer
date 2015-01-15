[vA3C Hacker Cookbook]( ../../va3c-hacker-cookbook/index.html )<br>> [Edit Spline]( ../../va3c-hacker-cookbook/edit-spline/index.html )
===

This utility enables the creation, opening, editing and saving of splines in 3D.


<input type="button" onclick=VH.splineMakerRandomPoints(inpPoints.value); value="Generate new spline" /> 
<input type="button" onclick=VH.splineDelete(); value="Delete spline" /> 

Number of control points: <input type="number" id="inpPoints"  min="4" max="1000" step="1" value="4" style="width:3em" />
<input type=button onclick=inpPoints.value++;VH.points(1); value="+" title="Add new point" /> | 
<input type=button onclick=inpPoints.value--;VH.points(-1); value="-" title="Remove final point" />

<input type="checkbox" onchange=VH.extend=!VH.extend;VH.points(0); title="New point projected from previous two points. Otherwise random" /> Extend ~ 
<input type="checkbox" onchange=VH.closed=!VH.closed;VH.points(0); /> Closed<br>


<input type="button" onclick=VH.exportSpline(); value="Export Spline" /> 
<input type=file size="40" onchange=VH.importSpline(this); >


<a href="JavaScript:VH.displayMarkdown('../dev-notes.md',menuLeft);" >Dev Notes</a>
