Enable File Modified Monitor
===

[Monitor file changes]( #enable-file-modified-monitor.js#monitor )

[Disregard file changes]( #enable-file-modified-monitor.js#default )

Monitor file modifications and changes in the most recently loaded JSON 4 file using [ your file dialog]( #browse-using-file-dialog-json4.js ).
Frequency currently set at two seconds. When a change is detected, the script deletes the current object and loads the newer revision.

Tested by changing vertex coordinates in a JSON 4 file using a text editor. 

Tested by repeatedly exporting JSON 4 data from Blender 2.72 using Satori99's [blender-three-object-export]( https://github.com/satori99/blender-three-object-export ).

Feature dedicated to Ben Howes.



<!--
2014-11-23 ~ Theo Armour ~ CC license
-->