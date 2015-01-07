Frequently Asked Questions
===

## Overall Concept / Mission and Values

* Everything FOSS
	* Source and data hosted on free servers such as GitHub

* User interface is a narrative
	* Tells you stories about things and possibilities and issues
	* Created using a Markdown and a text editor
	* Displayed in vertical ribbons - same as fast-reading newspaper columns

* Cornucopia of content
	* You can be a content DJ - remixing content from many free online services
	* View anything, discipline independent
		* Maps, math equations, Revit drawings, 3D printer files etc. Anything goes

* Coded for dummies
	* Follows Mr.doobs' manifesto: 'to create a lightweight 3D library with a very low level of complexity — in other words, for dummies'
	* If you know beginner JavaScript you should be able to understand most of the vA3C functions fairly quickly and easily
	* if/then, for loops and = are all you need to know
	* Small files that are easy to copy into your own scripts

* Coded to help non-programmers do some programming
	* if you need to worry about compiling, callbacks and consoles whatever then you are a programmer
	* vA3C Hacker is about you enhancing your science, engineering and design with some aspects of coding
 
* Very JavaScript-oriented
	* If you like jQuery you might consider working with ThreeX
	* If you like working with WordPress,
	* If you like visual programming, please use Grasshopper
	* If you like style sheets and HTML, have a look at Glam

* Little emphasis on end-user user interface
	* Past efforts made great effort to build interfaces for non-technical end-users
	* Current efforts seek relations with other people's effort. See Three.js Inspector, AMUI, Three.js Editor
	* May come back to this in the future
	* Current efforts prioritize helping part-time developers/designers

* Everything is load on demand
	* Tiny core
	* A theory: Large number of small files easier to manage than a few large files
	* The idea is to build an app that is huge, does many things, covers all possibilities.
	* Big apps have issues. They can take a long time to load, they are difficult to code, maintain and debug.
	* An alternative is to have a tiny app that loads what it needs to load as and when it is needed.
	* Unloading is less important. Very often an app is opened just for a particular task.
	* In the event that multiple tasks that require lots pf resources in a session, the easy thing may be simply to reload the app. 
	* An issue with this procedure with JavaScript being a dynamic language is that you may have issues with having to create callbacks to load modules in a specific order/
	* Modules should be small and numerous rather than vice versa.
	* Modules should callable and usable when called by a small simple standalone HTML cookbook or demo file.


See also ReadMe to [vA3C Viewer]( https://github.com/va3c/viewer/tree/gh-pages/va3c-viewer-html5 "The old-school viewer ;-)" )

## Technical Issues

### _Why are some objects appearing black even though their material has colors?_

Objects appear black when they a have a Lambert or Phong material and there are no lights in the scene,

Solution: You can either add some lights or change the type of material
  
### _Why do things always seem just a bit 'off' or unfinished in vA3C Hacker?_

Issues: the light helpers are left on. Materials are could be prettier. Objects appear outside the view when loaded.

Solution: Fix it yourself! A fundamental aspect of vA3C Hacker is that that it should be fast, easy and fun to make it work the way you want it to work.

The other aspect is that vA3C Hacker is a work-in-progress. Again, you could help add the code that could make the issue you see go away forever.

### _The names of files seem to follow a pattern. What is the pattern?_

Issue: With the JavaScript Console it is really easy to find almost anything in the script. 
But often it is not easy to find the source code for the thing you are looking for.

Solution: vA3C Hacker tries to make the location of a variable, object or function as obvious as possible. 
One method it to put just about every function in its own file and have the file name match the function name.
Another method is give each function a name that cleary describes what it does
Another thing is to add categories at the fron to the names.

So far we have

* Browse - Display a list of links - often with images - so that you may select objects to bring into the current view
* Demo - sit back and watch and listen to what happens
* Enable - turn on a technical aspect or feature
* Load - read a file - that you probably have selected when browsing - and bring it into the display
* Read - display read me documents and other text files. Usually these display in the 'info' panel
* View - bring files that are somewhere on the Internet into view
* Templates - files you can build upon.
Because of cross-origin issues, there is usually not much possible interaction with the files beyond simple viewing

### _Screen Grabber_

_What files types are currently supported?_

HTML, JSON, JS, OBJ, STL

_What are some of the issues?_
The 'Choose file' option allows you to select files anywhere on your computer or available on your network.
Opening files this way is a new feature and there are security issues.
One such issue is that access to texture files is prohibited. Thus the models with textures appear as black blobs.

When a model has such problems, a work-around is to use the more clumsy 'Paste link' option.

### Load On Demand

