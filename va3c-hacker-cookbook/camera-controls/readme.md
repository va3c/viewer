[Camera Controls Read Me]( readme.html )
===

##  Camera Controls Source Code
<a href=https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js target=_top >
Three.js First Person Controls Source Code on GitHub</a>  

<a href=https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FlyControls.js target=_top >
Three.js Fly Controls Source Code on GitHub</a>

<a href=https://github.com/va3c/viewer/blob/gh-pages/va3c-hacker-cookbook/camera-controls/r1/first-person-controls-hacker.js target=_top>
Modified First Person Controls Source Code</a>  
* vA3C Hacker CookBook example

## Code Examples

### Three.js First Person

[Three.JS First Person Controls Basic]( threejs-controls/threejs-first-person-controls-basic.html )  
* Simple example of the Three.js First Person Controls

[Three.JS First Person Controls Basic Update Status]( threejs-controls/threejs-first-person-controls-basic-update-status.html )   
* Adds real-time status read out of all the settings

[Three.JS First Person Controls Basic Update Status]( threejs-controls/threejs-first-person-controls-basic-update-status-settings.html )  
* Adds function that sets the settings  
* Modifies two settings  
* Still not very useful

Keys you can use with Three.js First Person Controls (copied from source code):

	case 38: /*up*/
	case 87: /*W*/ this.moveForward = true; break;

	case 37: /*left*/
	case 65: /*A*/ this.moveLeft = true; break;

	case 40: /*down*/
	case 83: /*S*/ this.moveBackward = true; break;

	case 39: /*right*/
	case 68: /*D*/ this.moveRight = true; break;

	case 82: /*R*/ this.moveUp = true; break;
	case 70: /*F*/ this.moveDown = true; break;



### Three.js Fly Controls

[Three.JS Fly Controls Basic]( threejs-controls/threejs-fly-controls-basic.html )  
* Simple example of the Three.js Fly Controls

Keys you can use with Fly Controls

	case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

	case 87: /*W*/ this.moveState.forward = 1; break;
	case 83: /*S*/ this.moveState.back = 1; break;

	case 65: /*A*/ this.moveState.left = 1; break;
	case 68: /*D*/ this.moveState.right = 1; break;

	case 82: /*R*/ this.moveState.up = 1; break;
	case 70: /*F*/ this.moveState.down = 1; break;

	case 38: /*up*/ this.moveState.pitchUp = 1; break;
	case 40: /*down*/ this.moveState.pitchDown = 1; break;

	case 37: /*left*/ this.moveState.yawLeft = 1; break;
	case 39: /*right*/ this.moveState.yawRight = 1; break;

	case 81: /*Q*/ this.moveState.rollLeft = 1; break;
	case 69: /*E*/ this.moveState.rollRight = 1; break;
			


## vA3C Hacker Modified First Person Controls

The vA3C Hacker Cookbook modified First Person Controls add a number of features.

You can freeze or stop all motion at any time by:

* Clicking your mousewheel or pressing the space bar or typing the letter Q
* Stopping motion means 
	* the screen is not distracting when yu are doing something else
	* Its easier to take screen shots
	
You can vary the speed with the mousewheel:

* When either the left or right mouse button is down, scrolling the wheel forward accelerates the direction movement. 
Scrolling back slows movement. 
* When no button are pressed, scrolling the mousewheel controls the lookaround or rotation speed

Everything you can do with the buttons and wheel you can do with the keyboard and _vice versa_.

In order use the modified file, simply add the modified first person control to your Three.js script 
- as shown in the default script that runs to the right when land here.

[Camera Toggle Orbit/First Person Controls Demo]( hacker-controls/camera-toggle-orbit-first-person.html )

[Iframe loads Three.js files adds First Person]( hacker-controls/iframe-parent-first-person-control.html )  
Pick an existing Three.js file you wish to view from the menu. The file - written with Orbit controls - is loaded in an iframe. 
The camera controls are overridden and reset to the First Person Hacker controls.

<a href=hacker-controls/camera-controls-hackette.html target=_top >Camera Controls Hackette</a>

A Hackette-style menu system that allows you to load models from a variety of locations and select the camera controls you wish to enable.

Camera controls include

* Orbit controls
* First Person Controls - Three.js version
* Fly controls
* First Person Hacker controls

Keys you can use with modified First Person Controls include the standard keys:

	case 38: /*up*/
	case 87: /*W*/ this.moveForward = true; break;

	case 37: /*left*/
	case 65: /*A*/ this.moveLeft = true; break;

	case 40: /*down*/
	case 83: /*S*/ this.moveBackward = true; break;

	case 39: /*right*/
	case 68: /*D*/ this.moveRight = true; break;

	case 82: /*R*/ this.moveUp = true; break;
	case 70: /*F*/ this.moveDown = true; break;

	case 81: /*Q*/ this.freeze = !this.freeze; break;

Plus seven new keyboard commands

	case 32: /*spacebar*/ this.freeze = !this.freeze; break;

	case 33: /*page up*/ this.moveUp = true; break;
	case 34: /*page down*/ this.moveDown = true; break;

	case 36: /*home*/ this.lookSpeed = 0; this.lat += 1.0; break;
	case 35: /*end*/ this.lookSpeed = 0; this.lat -= 1.0; break;

	case 188: /*< or ,*/ this.lookSpeed = 0; this.lon -= 0.5; break;
	case 190: /*> or .*/ this.lookSpeed = 0; this.lon += 0.5; break;


