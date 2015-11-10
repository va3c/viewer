Dev Notes
===

2015-03-05 ~ Theo

* Geometry Shapes added
* Hacker R4 #3 published
* See also much work on vA3C Projects

2015-02-19 ~ Theo

* Working on capture screen and save

2015-02-18 ~ Theo

* Second post ready to go
* Camera controls examples too longer than wanted but ended up with many more examples the anticipated.

2015-02-16 ~ Theo

* Working on the second post
* Big oops - set dev version as landing page fr a day or two. Sorry!


2015-02-12 ~ Theo

* R4: All change. Big pivot.


2015-01-18 ~ Theo

Lots of interesting learning experiences today. Much do to lots of my apps crashing with Three.js R70

The first thing is a simpler and easier way of creating and maintaining materials libraries.

The other thing is that file-dispatch.js is far too complicated. So I explored i=using iframes and srcdoc to load JavaScript.
All looks very promising. And can help with loading files synchronously.


2014-12-29 ~ Theo

Started the Hacker Cookbook and moved three scripts into it:

* Enable drag objects
* Edit spline
* Enable camera follow

The idea is that each script:

* may be loaded on demand from VA3C Hacker
* has its own stand alone demo
* may be loaded on demand by any other app from anywhere

Started adding each of the scripts to the Hacker Readme - each has its own issues.


2014-12-27 ~ Theo

Edit Spline function progressing with delightful alacrity.
 

2014-12-06 ~ Theo

* Loading STL files well-streamlined
* Exploring the issues of the iframe within an iframe. There are many.

Seem mostly to be able to open HTML, JSON, OBJ and STL files w=either by URL or by content from GitHub, Hacker or Hackette.
It took too long to get here. And there's more simplification to be done.
   

2014-12-05 ~ Theo

* Many techie fixes over the last few days. Bringing Hacker up to the level of Viewer.
* The screen grabber is now beginning to work with JSON and STL files not just HTML files


2014-12-01 ~ Theo

* Clock hour hand displays correctly
* NASA STL files loading more 'generically'
* Ditto JSON files - but still issues 

13:15 ~  Had an issue with updating the leftMenu with clock text. 
It turns out that using displayMarkdown first then modifying the texr works better than _vice versa_.


2014-11-30 ~ Theo

* working on 2.2dev
* Now all namespaced
* Building 3D Warehouse Hacker
* Browse for STL or JSON 3 or 4 files

This thing of building a new hacker for each GitHub folder of 3D models is teaching me a lot.

2.3dev working well. Faster, smaller, simpler. The main is that you can load stl or json3 or json4 files from a single call.
A 'dispatcher' looks at the file type and sends the file to the appropriate place.

All moving well. Probably time for a code clean-up and taking some screen shots.


2014-11-29 ~ Theo

* Add clock to tell you the time
* Many updates to NASA files

Things got very complicated and very broken for a while. Many callback and RESTfull issues. Then they just seemed to go away.

This was caused by the NASA files. 
The read me file should work well inside vA3C viewer and also to look great as the read me for its GitHub repository.
This is all part of the 'You don't go to it. It comes to you.' idea.
In the end, there was a bit of a 'doh', just treat it as another app - the same as vA3C Viewer is handled.
This means build it and test things completely separately and bring it in as an independent iframe.

2014-11-26 ~ Theo

* Edit light setting in the three templates
* Add text to the tell you the time demo
* Add FAQ 
* Add link to source and other fixes to read me.
* Rename files to follow the current naming convention. See FAQ
* Lots of fixes and notes to Screen Grabber. Ready for using?
* Add VH.updateObjectGometryByHashParameters( mesh, parameters );
* Add VH.addShadowsToMeshesInScene( scene );
* Add export scene to JSON file
* JSON import distinguishes between objects and scenes
* Exported scenes make the round trip 

Working on this thing is enthralling. Adding features, content and abilities is all just so easy that it becomes a lot of fun.
And you can move from, say, adding content to editing code so easily. It's like a [parkour]( http://en.wikipedia.org/wiki/Parkour ) or [freerunning]( http://en.wikipedia.org/wiki/Freerunning ) for coding
Or perhaps that German word I never remember which describes a run where sometimes you jog and sometimes you sprint just depending on how you feel at the moment. 

21:32 ~  Exported data makes the round trip. Was extremely lucky. JSON data was coming in but controls did not work / display was not updating/frozen. 
Happened to click 'Enable file modified monitor' and display awoke. Turns out that you need to create a new animate function. 
Would not have found that by myself.  ;-) 

2014-11-26 ~ The current trend for apps is to do one thing well. Hacker seems to be different. Hacker does many things badly. Is that its motto? 
"If it's worth doing, it's worth doing badly."

I hope that vA3C Hacker has

* As much content as a store or wiki or library
* Many thousands of lines of useful, usable code
* An appearance for every need and desire

 



2014-11-25 ~ Theo

* Add browse templates page
* Add open HTML file by content
* Add browse templates with your file dialog box.
* Add Callum Prentice's AMUI editor & link to his template builder
* Add Screen Grabber template - and it works on first try. But still much to do.

All going very well. Spent quite a bit of time on the file saving part of the screnn grabber. Hoped to use the simple anchoe download trick, but no go. 
So still with Eli Grey's FileSaver.js.

Yesterday spent a lot of time on what I am calling the pre-processor. This is when you can get the content of a file and modify it using regex before adding it as an iframe.

Using this capability, makes it possible to add 'preserveDrawingBuffer: true' to the renderer before it loads

Hacker is shaping up to be some short of content delivery mechanism. Willgive you access to, say, maps, aircraft, stl files, equations and more
The user interface will guide you as to what is possible because text is so easy to add and edit.
Because the app is just a simple messaging system, code seems to be very easy to add. 
It will be fun to see if the code can grow to many thousands of like and still be so easy to augment


2014-11-23 ~ Theo

* Add open JSON 4 files using file dialog
* Add monitor file modifications 

The monitor part took longer than expected, but produced the file open by file dialog function as well as a nice start to 
hack the request animation frame functionality. And the monitoring seems to work a treat.

Looked at [ThreeFab]( http://blackjk3.github.io/threefab/ ) and [ThreeNode]( http://idflood.github.io/ThreeNodes.js/public/index.html ).
Both nice and would be great geometry editors but both appear to be currently broken.

<http://va3c.github.io/viewer/va3c-hacker/r2dev/va3c-hacker-r2dev.html#enable-file-modified-monitor.js>

2014-11-22 ~ Theo

It would be great to be able to add geometry. But do we really want to build a full geometry editor?
Especially when there are some great editors out there already?
Why not just read their JSON output in near-real-time?

Stand on the shoulders of giants: or at least: use their apps.
 
* Add R2 dev
* Add JSON drag and drop capability
* Working on draggable objects with limited success

2014-11-21 ~ Theo

* Preparing to publish R1
	* Arching files
* rename some items from 'view' to 'browse' - where 'browse indicates you can use the file, whereas 'view' is more read only
* Add read Readme
* Code clean-up
* Add Three.js Inspector
* Add JSON 4 loader


2014-11-20 ~ Theo

* Continue building AA Adventure
* Looking into adding Three.js Inspector

2014-11-18 ~ Theo

* Fiddling with location hash and parameters
* Cleaning up callback issues. using more location.hash
* Building AA demo
* Added more templates

2014-11-16 ~ Theo

* code clean-up. renaming files. put files in archive
* battling with location.hash and callbacks but three load files turned into one file


## 2014-11-15 ~ Theo
21:59 ~ Code clean-up
22:30 ~ Menus beginning to toggle nicely
00:03 ~  Still working on animation callbacks 

## 2014-11-12 ~ Theo
11:39 ~  Started these notes and adding to menu
11:56 ~  read-dev-notes.js now working.
Coding going well - but only after a usual bout of callback insanities. What would the fun of coding be if it did not drive you around the bend from time to time?

Some of the notions behind this project are:

vA3C viewer is becoming more and more complicated. Even I can't understand it. Something very simple is needed. Very 'Hello, world!'-like. 
So lots of tiny, cookbook examples that you can assemble as if they were Lego blocks. Every function in its own file.
Every file name highly descriptive of the function inside.

My old friend Henrik Bennetsen taught me a nice lesson when he said: You don't have to go to 'it]. 'It' should come to you." 
So, for example, instead of just providing a link to the Glam files, the Hacker brings them into your screen. Now you have something you can play with. 

The code to build a user interface can become complicated very easily.
User interface content co-mingled with code becomes in-editable after a while.
People who use GitHub know Markdown. People who post on Reddit use Markdown. 
So write the content for the user interface using Markdown. And put the code somewhere else.
An interesting mechanism for connecting user interface content with user interface code is via the use of location.hash.
 
13:58 ~  Added more nasa objects. Load-file-stl now removes previously loaded stl files when asked to do so with 'open#' in the hash.



15:09 ~  Fixed up more of Tony's <glam> demo and example files. 

17:44 ~  Bringing in JSON 3 files. Added 'View files from 3D Warehouse' - which has a scale feature. Alse we are speaking with an English accent

## 2014-11-10 ~ Theo

Project was started. Could not face another session of parsing the complexity of the vA3C viewer.