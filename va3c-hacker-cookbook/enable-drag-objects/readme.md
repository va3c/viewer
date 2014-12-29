[vA3C Hacker Cookbook]( ../index.html )<br>> [Enable Drag Objects]( ./index.html )
===

This utility enables the dragging of objects to update their positions in 3D. There are issues with some of the Revit models that have been scaled.

<input type=button onclick=VH.loadScript('../../va3c-hacker-cookbook/enable-drag-objects/r1/enable-drag-objects.js',VH.enableDragObjects); value="Enable Drag objects" />

[Load the draggable objects demo?]( #dispatch.js#../../va3c-hacker-cookbook/enable-drag-objects/index.html#noGround#noGrid#add=true )

After an object has been selected, it may be exported to a file.

<input type=button onclick=VH.loadScript(hackerPrefix+'export-geometry-to-json.js'); value="Export object - geometry only" />

<!-- 
[Export object - geometry only ]( #export-geometry-to-json.js#  )

[Export object - geometry + material]( #export-object-to-json.js# )
-->
<a href="JavaScript:VH.displayMarkdown('dev-notes.md',menuLeft);" >Dev Notes</a>

