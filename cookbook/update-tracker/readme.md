Update Tracker 
===
## Concept

Track changes in 3D to JSON files being edited locally on a computer

For the impetus for this example, see: <https://github.com/va3c/GHvA3C/issues/12>

## Client Side

<http://va3c.github.io/viewer/cookbook/update-tracker/client-side-r1/update-tracker-r1.html>

Sample file to edit: <https://github.com/va3c/viewer/tree/gh-pages/cookbook/update-tracker/WaltHeadLo.js>

* Edit WaltHeadLo.js using a text editor - for example change the scale on line 5 from 100 to 200, save the file.
* Watch the changes auto-magically appear in Update Tacker.
* Change the scale back to 100, save, repeat.
* Requires localhost. For suggestions see: <https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally>

This app works using a brute force method out of necessity.
It actually loads the entire JSON file into memory every few seconds and see if it is equal to the previous version.
There should be meta-information, but because JavaScript loads client-side files quite quickly the meta-data is quickly discarded because the file is already in memory.
With an interval set at ten seconds or so, a file of ninety megabytes has been seen to update as anticipated. 

## Server Side

The following is a work-in-progress server-side version:

<http://va3c.github.io/viewer/cookbook/update-tracker/server-side-r1/update-last-modified-read-file-iframe.html>

* An attemp to make something that overcomes Three.js Loader.load caching when running from a server
* Not yet successful


## Notes

XMLHttpRequest has a 'Last-Modified' feature.
See <https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Get_last_modified_date>
Unfortunately when dealing with local files, JavaScript being dynamic and the process happens so fast, it is difficult to obtain the header date.
The tracker script provided here just reads the entire file and compares with the previously read file.
If there is a difference, the updated JSON file is loaded into 3D.
The script has been seen to work on a file of over 90 MB.

Of course there can be far more sophisticated solutions based for example on node.js and socket.io, 
but the brute force solution offered here is a very simple few-line hack - useful in some circumstances.

 


## Change Log

2014-11-18 ~ Theo

* split files into two directories
* update read me


2014-11-17 ~ Theo

* R1 files and folders created
