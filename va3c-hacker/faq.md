Frequently Asked Questions
===

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

HTML, JSON, JS, OBJ, STL.

_What are some of the issues?_
The 'Choose file' option allows you to select files anywhere on your computer or available on your network.
Opening files this way is a new feature and there are security issues.
One such issue is that access to texture files is prohibited. Thus the models with textures appear as black blobs.

When a model has such problems, a work-around is to use the more clumsy 'Paste link' option.

