Dev Notes
===

2014-12-10 ~ The

* Several installs seem to be working well
* Single HTML file drop-in seems to be fine

Hackett is

A very light weight document browser that enables you to view 3D model interactively

Content is king

The user interface is built using a text editor. 
Ths content of the interface is as importand as the buttons
The user experience should tell you the story of what you are seeing 

Modern interfaces are spreading gadgets along a horizontal 'ribbon'. 
This is nice but with today's wide screens, perhaps the ribbons should move vertically.
This follows the swiping on a phone, the established pattern of vertical scrollbars

3D should be separate from 2D graphics = text and images.
In two separate but connected windows.
The current tactic is to have a semi-transparent 2D page float over the 3D page
The 2D page is tall and narrow - like a newspaper column - for fast reading and skimming and scrolling
The 2D window has block of text and blocks of images. 
The images are generally links with 2D screen shots of what you would see in the 3D window.

Unlike the horizontal ribbon - fill of icons and widgets, the vertical ribbon is full of text.

The text informs you of tasks that may be accomplished, 
of possible issues, of things that may happen in the next release and lots of other useful stuff.
The user interface is also tutorial, FAQ and documentation at the same time.

The user interface is built with a content creation tool: markdown
Markdown is the content creation tool used by Reddit, GitHub and many other sites.
It's learned easily, readily available - a nice thing to add to your skill set

There are just two Hackette 'commands' to learn. Both are special links that add using the standard Markedown method of:

[text]( http://link )

* #dispatch.js cause an HTML or model file to be dispayed
* #read-markdown.js replace to page you are reading with the requested page

Both working by updating location.hash.
Hackette listens for changes to location.has and acts instantly upon any changes.

The the whole interface is RESTful and anything created in a Hackette menu can be shared and used anywhere elso on the net.





2014-12-05 ~ Theo

* Now at R2
* Add to the read me.

Most of the Hackette work has been going on in actual olders. 
For example see the [NASA 3D Models]( http://va3c.github.io/nasa-samples/browse-nasa-stl-models.html 'Thank you NASA' )

2014-12-02 ~ Theo

* First pass

Yet another strange day. Started all over again. Even simpler than before.

vA3C Hackette

* An index.html for GitHub repository gh-pages
* Converts markdown to HTML
* Provides a very simple technique for displaying Three.js HTML files as well as JSON, STL, OBJ and other file types

You can write and update a single read me doc that will appear nicely both as GitHUb source code and as HTMKL in gh-pages
The readme doc can serve as a browser or gallery for viewing files and 3D models

Hackette provides only limited viewing functionality. But with a bit of luck, vA3C Hacker will serve as the mother-ship, 
providing extra capabilities and serving as a resource locator for multiple Hackettes
 