Catmull-Rom Spline Maker
===

<button onclick=splineMakerRandomPoints() >Make Spline</button>

Number of Points: <input type=number id=inpPoints style="width:4em" />

<input type="button" onclick="points(1);" value="+" /> | 
<input type="button" onclick="points(-1);" value="-" />
   
<input type="checkbox" id=inpClosed onchange=splineMakerRandomPoints() /> Closed

<input type="button" onclick="exportSpline();" value="Export" /> ~   


Thanks to zz85
