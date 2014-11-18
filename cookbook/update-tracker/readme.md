Update Tracker
===
## Concept

Track changes in 3D to JSON files being edited locally on a computer

For the impetus for this example, see: <https://github.com/va3c/GHvA3C/issues/12>

<http://va3c.github.io/viewer/cookbook/update-tracker/r1/update-tracker-r1.html>

<http://va3c.github.io/viewer/cookbook/update-tracker/r1/update-last-modified-read-file-iframe.html>

Sample file to edit: <https://github.com/va3c/viewer/tree/gh-pages/cookbook/update-tracker/WaltHeadLo.js>

* Edit WaltHeadLo.js - for example change the scale from 100 to 200 and then change it back.
* Watch the changes auto-magically appear in Update Tacker

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

2014-11-17 ~ Theo

* R1 files and folders created
