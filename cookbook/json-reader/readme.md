Basic JSON Reader Demos
===

* Basic introduction to reading in JSON data into an HTML web page


### Reading Data using Three.js and displaying it in HTML

The following is a very simple HTML file that loads Three.js, creates some geometry and displays it. 
You can use this file as a starting point for embedding Three.js into your content. 
You will see that all you need to do is provide a `div` element for Three.js to insert itself into. 

[Render to a Div Basic]( http://va3c.github.io/viewer/cookbook/json-reader/threejs-div-basic.html )  
[Source code]( https://github.com/va3c/viewer/blob/gh-pages/cookbook/json-reader/threejs-div-basic.html )


The following file adds a bit of fun. With your pointing device you can pan, rotate and zoom the geometry.

[Render to a Div Interactive]( http://va3c.github.io/viewer/cookbook/json-reader/threejs-div-interactive.html )  
[Source code]( https://github.com/va3c/viewer/blob/gh-pages/cookbook/json-reader/threejs-div-interactive.html )

You probably don't want to create your own geometry. 
You'd rather use geometry that's already been created. 
The following file loads a simple JSON data file and displays it in a `div`. 
It also includes the animate function, so you can pan, rotate and zoom. 


[Load JSON & Render to a Div]( http://va3c.github.io/viewer/cookbook/json-reader/threejs-div-json-interactive.html )  
[Source code](  )

***

An alternative to loading Three.s into a `div` is the use of an `iframe`.

There are several benefits to using a iframe.

* The Three.js library is only loaded as and when its needed.
* Issues with global variables and name spaces conventions are avoided.
* Use of iframes solves cross-origin issues
* Easy to update files without reloading the page
* See also: <http://www.dwuser.com/education/content/the-magical-iframe-tag-an-introduction/>

And there's an extra bonus: an example of a script in the calling page causing the embedded page to update in real-time. 

[Test Threejs in an Iframe](  http://va3c.github.io/viewer/cookbook/json-reader/threejs-iframe.html )  
[Source code]( https://github.com/va3c/viewer/blob/gh-pages/cookbook/json-reader/threejs-iframe.html )


## Change Log

2014-08-12 ~ Theo

* Read Me added
 