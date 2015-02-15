/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */

THREE.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.movementSpeed = 0.5;

// 2 new parameters
	this.movementSpeedMin = 0.05;
	this.movementSpeedMax = 10.0;

// new parameter
	this.actualMoveSpeed = 0.0;

	this.lookSpeed = 0.005;

// 2 new parameters
	this.lookSpeedMin = 0.002;
	this.lookSpeedMax = 0.009;

	this.lookVertical = true;
	this.autoForward = false;
//	this.invertVertical = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 0.5;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;
//	this.autoSpeedFactor = 1000.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.freeze = false;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', -1 );

	}

	//

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = true; break;
				case 1: this.freeze = !this.freeze; break;
				case 2: this.moveBackward = true; break;

			}

		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}

		this.mouseDragOn = false;

	};

	this.onMouseMove = function ( event ) {

		if ( this.domElement === document ) {

			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;

		} else {

			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

		}

	};

// new mouse wheel function
	this.onDocumentMouseWheel = function( event ) {

// WebKit

		if ( event.wheelDeltaY ) {

			if ( this.mouseDragOn ) {

				this.movementSpeed += event.wheelDelta * 0.025;
				this.movementSpeed = THREE.Math.clamp( this.movementSpeed, this.movementSpeedMin, this.movementSpeedMax );

			} else  {

				this.lookSpeed += event.wheelDelta * 0.0001;
				this.lookSpeed = THREE.Math.clamp( this.lookSpeed, this.lookSpeedMin, this.lookSpeedMax );

			}

// Opera / Explorer 9

		} else if ( event.wheelDelta ) {

			if ( this.mouseDragOn ) {

				this.movementSpeed = event.wheelDelta * 0.5;
				this.movementSpeed = THREE.Math.clamp( this.movementSpeed, this.movementSpeedMin, this.movementSpeedMax );

			} else  {

				this.lookSpeed = event.wheelDelta * 0.0001;
				this.lookSpeed = THREE.Math.clamp( this.lookSpeed, this.lookSpeedMin, this.lookSpeedMax );

			}

// Firefox

		} else if ( event.detail ) {


			if ( this.mouseDragOn ) {

				this.movementSpeed -= event.detail * 0.5;
				this.movementSpeed = THREE.Math.clamp( this.movementSpeed, this.movementSpeedMin, this.movementSpeedMax );

			} else  {

				this.lookSpeed -= event.detail * 0.0005;
				this.lookSpeed = THREE.Math.clamp( this.lookSpeed, this.lookSpeedMin, this.lookSpeedMax );

			}

		}

		camera.updateProjectionMatrix();

	}

	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

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

// Seven new keyboard commends
			case 32: /*spacebar*/ this.freeze = !this.freeze; break;

			case 33: /*page up*/ this.moveUp = true; break;
			case 34: /*page down*/ this.moveDown = true; break;

			case 36: /*home*/ this.lookSpeed = 0; this.lat += 1.0; break;
			case 35: /*end*/ this.lookSpeed = 0; this.lat -= 1.0; break;

			case 188: /*< or ,*/ this.lookSpeed = 0; this.lon -= 0.5; break;
			case 190: /*> or .*/ this.lookSpeed = 0; this.lon += 0.5; break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = false; break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = false; break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = false; break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = false; break;

			case 82: /*R*/ this.moveUp = false; break;
			case 70: /*F*/ this.moveDown = false; break;

			case 33: /*page up*/ this.moveUp = false; break;
			case 34: /*page down*/ this.moveDown = false; break;

		}

	};

	this.update = function( delta ) {

		if ( this.freeze ) {

			return;

		}

		if ( this.heightSpeed ) {

			// var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
// Let's clamp the camera as well
			var y = this.object.position.y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );

// these should be variables...
			this.object.position.x = THREE.Math.clamp( this.object.position.x, -10, 60 );
			this.object.position.z = THREE.Math.clamp( this.object.position.z, -30, 20 );

// this.autoSpeedFactor: the higher you are the faster you go
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );
// console.log ( this.object.position.y, this.autoSpeedFactor   );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		//var actualMoveSpeed = delta * this.movementSpeed;
		actualMoveSpeed = this.actualMoveSpeed = delta * this.movementSpeed;

		if ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		if ( this.moveBackward ) this.object.translateZ( 0.5 * ( actualMoveSpeed + this.autoSpeedFactor ) );

		if ( this.moveLeft ) this.object.translateX( -0.7 * actualMoveSpeed );
		if ( this.moveRight ) this.object.translateX( 0.7 * actualMoveSpeed );

		if ( this.moveUp ) this.object.translateY( 0.4 * actualMoveSpeed + 0.01 * this.autoSpeedFactor );
		if ( this.moveDown ) this.object.translateY( - ( 0.4 * actualMoveSpeed + 0.01 * this.autoSpeedFactor) );

		var actualLookSpeed = delta * this.lookSpeed;

		if ( !this.activeLook ) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}

		this.lon += this.mouseX * actualLookSpeed;
		if( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}

		var targetPosition = this.target,
			position = this.object.position;

		targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + 100 * Math.cos( this.phi );
		targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

		this.object.lookAt( targetPosition );

	};

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );
	this.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );
	this.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );

// 2 new event listeners
	this.domElement.addEventListener( 'mousewheel', bind( this, this.onDocumentMouseWheel ), false );
	this.domElement.addEventListener( 'DOMMouseScroll', bind( this, this.onDocumentMouseWheel ), false);

	this.domElement.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	this.domElement.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.handleResize();

};
