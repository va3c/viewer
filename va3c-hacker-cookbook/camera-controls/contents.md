<a href=../../va3c-hacker/index.html target="_top" >vA3C Hacker</a> &raquo;<br>
<a href=../index.html# target="_top" >Hacker Cookbook</a> &raquo;<br>
[Camera Controls]( index.html )
===

<details open>
<summary><h2>Introduction</h2></summary>
2015-02-16

When looking at complex 3D models, the Three.js Trackball and Orbit controls do not always satisfy. 
It may be difficult to go 'inside' a particular space and 'look around' - swivel the camera freely.

The usual method is to use a [first person]( http://en.wikipedia.org/wiki/First_person_(video_games) ) controls.

Three.js offers the First Person controls. The controller has issues and is not particularly well documented or accompanied by useful examples.

This Hacker Cookbook section covers a modified version of the Three.js First Person control, provides examples and supplies some instructions.

[Camera Controls Read Me]( #readme.html# )  
&raquo; [First Person Control Hacker Source Code]( https://github.com/va3c/viewer/blob/gh-pages/va3c-hacker-cookbook/camera-controls/hacker-controls/first-person-controls-hacker.js )

Code examples showing the usage of the controls:  
</details>
<details open>
<summary><h2>Easy-Peasy Effort</h2></summary>
[[O]]( hacker-controls/camera-toggle-orbit-first-person.html )
[Camera Toggle Orbit/First Person Controls Demo]( #hacker-controls/camera-toggle-orbit-first-person.html# )

Simply add the First Person Hacker controls to your Three.js script -
as shown in the default script that runs to the right when you land here.


</details>
<details>
<summary><h2>Good Effort</h2></summary>

[[O]]( hacker-controls/iframe-parent-first-person-control.html )
[Iframe Parent First Person Hacker Controls]( #hacker-controls/iframe-parent-first-person-control.html# )

Pick an existing Three.js file you wish to view from the menu. The file - written with Orbit controls - is loaded in an iframe. 
The camera controls are overridden and reset to the First Person Hacker controls. 

</details>
<details>
<summary><h2>Hacker++ Effort</h2></summary>
[Camera Controls Hackette]( hacker-controls/camera-controls-hackette.html )

A Hackette-style menu system that allows you to load models from a variety of locations and select the camera controls you wish to enable.

Camera controls include

* Orbit controls
* First Person Controls - Three.js version
* Fly controls
* First Person Hacker controls

</details>
<details>
<summary><h2>Elderly Efforts</h2></summary>

The following scripts use the modified first person control. They were written in 2013 and are both mouse and [Leap Motion]( http://leapmotion.com) device enabled.

Click on the 'First Person Control' link to switch controls.

[FGx Plane Spotter R1.2]( #http://jaanga.github.io/gestification/projects/flying-leap-3d/fgx-plane-spotter-leap/r1/index.html# )

[Barfolina Pavillion]( #http://jaanga.github.io/gestification/projects/flying-leap-3d/barfolina-pavillion/r3/barfolina-pavillion.html# )

See [Flying Leap 3D Read Me]( #http://jaanga.github.io/gestification/projects/flying-leap-3d/index.html# ) for even more details and more demos. Happy landings!
</details>