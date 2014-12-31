/**
 * Created by benjamin howes on 12/31/2014.
 */

//base application object containing vA3C functions and properties
var VA3C = {
    scene: {},          //the THREE.js scene object
    orbitControls: {},  //the THREE.js orbit controls object
    camera: {},         //the THREE.js camera object
    renderer: {},       //the THREE.js renderer object
    clock: {},          //the THREE.js clock
    stats: {}           //the Stats object
};

//*********************
//*********************
//*** THREE.js setup

//function that sets up the initial THREE.js scene, renderer, camera, orbit controls, etc.
VA3C.initViewer = function(viewerDiv, statsDiv){

    //empty scene
    VA3C.scene = new THREE.Scene();

    //set up the THREE.js div and renderer
    VA3C.container = viewerDiv;
    VA3C.renderer = new THREE.WebGLRenderer( { alpha: true } );
    VA3C.renderer.setClearColor(0x000000, 0.0);
    VA3C.renderer.setSize( window.innerWidth, window.innerHeight );
    VA3C.renderer.shadowMapEnabled = true;
    VA3C.container.append( VA3C.renderer.domElement );

    //set up the stats window
    VA3C.stats = new Stats();
    VA3C.stats.domElement.style.cssText = 'bottom: 0px; opacity: 0.5; position: absolute; right: 15px; ';
    statsDiv.append( VA3C.stats.domElement );

    //set up the camera and orbit controls
    VA3C.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000000 );
    VA3C.camera.position.set( 1000, 1000, 1000 );
    VA3C.orbitControls = new THREE.OrbitControls( VA3C.camera, VA3C.renderer.domElement );
    VA3C.orbitControls.target.set( 0, 100, 0 );

    //a clock.  the camera uses this
    VA3C.clock = new THREE.Clock();

    //respond to resize
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        VA3C.renderer.setSize(WIDTH, HEIGHT);
        VA3C.orbitControls.object.aspect = WIDTH / HEIGHT;
        VA3C.orbitControls.object.updateProjectionMatrix();
    });

    //call the attributes init function
    VA3C.attributes.init();

    //call the render function - this starts the webgl render loop
    VA3C.render();
};

//function that starts the THREE.js renderer
VA3C.render = function(){
    VA3C.stats.update();
    var delta = VA3C.clock.getDelta();
    VA3C.orbitControls.update(delta); //getting a warning here - look into it

    requestAnimationFrame(VA3C.render); // same here - look into this warning
    VA3C.renderer.render(VA3C.scene, VA3C.orbitControls.object);
};



//*********************
//*********************
//*** JSON Model Loader

//the object that will take care of loading a THREE.js scene from a json file
VA3C.jsonLoader = {};

//a function to populate our scene object from a json file
VA3C.jsonLoader.loadSceneFromJson = function(jsonToLoad, callback){

    //parse the JSON into a THREE scene
    var loader = new THREE.ObjectLoader();
    VA3C.scene = new THREE.Scene();
    VA3C.scene = loader.parse(jsonToLoad);

    //call helper functions
    VA3C.jsonLoader.makeFaceMaterialsWork();
    VA3C.jsonLoader.processSceneGeometry();
    VA3C.jsonLoader.createLights();
    //call zoom extents
    VA3C.uiVariables.zoomExtents();

};

//call this function to set a geometry's face material index to the same index as the face number
//this lets meshfacematerials work - the json loader only gets us part of the way there (I think we are missing something when we create mesh faces...)
VA3C.jsonLoader.makeFaceMaterialsWork = function(){

    for ( var i = 0, iLen = VA3C.scene.children.length, items; i < iLen; i++ ) {
        items = VA3C.scene.children;
        if ( items[i].hasOwnProperty("geometry") ) {

            //the object to revise
            var geo = items[i].geometry;
            var currentMat = items[i].material;
            var userData = items[i].userData;

            //if this is a face materials object, make all of the mesh faces point to the correct material
            if(currentMat.hasOwnProperty("materials") && userData.hasOwnProperty("VA3C_FaceColorIndexes")){

                //get the 'VA3C_FaceColorIndexes' string out of the mesh's user data object,
                //and break it into an array of face material indexes
                var faceColors = userData.VA3C_FaceColorIndexes.split(",");

                //loop over the faces in the geometry and make the face.materialIndex reference the face's index
                for(var j in geo.faces){
                    geo.faces[j].materialIndex = faceColors[j];
                }
                //tell three.js to update the element in the render loop
                geo.elementsNeedUpdate = true;

                //remove the VA3C_FaceColorIndexes property from the userdata object
                delete userData['VA3C_FaceColorIndexes'];
            }
        }
    }
};

//function that loops over the geometry in the scene and makes sure everything
//renders correctly and can be selected
VA3C.jsonLoader.processSceneGeometry = function(){
    for ( var i = 0, iLen = VA3C.scene.children.length, items; i < iLen; i++ ) {
        items = VA3C.scene.children;
        if ( items[i].hasOwnProperty("geometry") ) {
            //three.js stuff
            items[i].geometry.mergeVertices();
            items[i].geometry.computeFaceNormals();
            items[i].geometry.computeVertexNormals();
            items[i].castShadow = true;
            items[i].receiveShadow = true;
            //add element to our list of elements that can be selected
            VA3C.attributes.elementList.push(items[i]);

        }
        //populate elementList with elements that can be selected
        if ( items[i].children.length > 0 ){
            var itemsChildren = items[i].children;
            for ( var k = 0, kLen = itemsChildren.length; k < kLen; k++ ) {
                if ( itemsChildren[k].hasOwnProperty("geometry") ) {
                    //set properties here
                    VA3C.attributes.elementList.push(itemsChildren[k]);

                }
            }
        }
    }
};

//function that creates lights in the scene
VA3C.jsonLoader.createLights = function() {
    // ambient light
    VA3C.scene.add( new THREE.AmbientLight( 0x696969 ) );

    //directional light
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 10000, 10000, 10000 );
    light.castShadow = true;
    VA3C.scene.add( light );
};




//*********************
//*********************
//*** User Interface.

//dat.gui Constructor object
// an instance of this is class created to store UI variables and functions
VA3C.UiConstructor = function(){
    //zoom extents
    this.zoomExtents = function(){
        //loop over the children of the THREE scene, merge them into a mesh,
        //and compute a bounding sphere for the scene
        var geo = new THREE.Geometry();
        VA3C.scene.traverse( function(child){
            if(child instanceof THREE.Mesh){
                geo.merge( child.geometry );
            }
        });
        geo.computeBoundingSphere();

        //point the camera at the center of the sphere
        var c = geo.boundingSphere.center;
        VA3C.orbitControls.target.set(c.x, c.y, c.z);

        //set the camera position - we essentially want to zoom the camera in / out from it's current position

        //get the radius of the sphere and use it to compute an offset.  This is a mashup of theo's method
        //and the one we use in platypus
        var r = geo.boundingSphere.radius;
        var offset = r / Math.tan(Math.PI / 180.0 * VA3C.orbitControls.object.fov * 0.5);
        var vector = new THREE.Vector3(0,0,1);
        var dir = vector.applyQuaternion(VA3C.orbitControls.object.quaternion);
        var newPos = new THREE.Vector3();
        dir.multiplyScalar(offset * 1.25);
        newPos.addVectors(c, dir);
        VA3C.camera.position.set(newPos.x, newPos.y, newPos.z);
    };

    //top and bottom color
    this.topColor = "#B9C6D4";
    this.bottomColor = "#0D0D1B";
};

//an object to store the live application variables and functions controlled by the UI
//this is instantiated in the APP_INIT document.ready function
VA3C.uiVariables = {};

//this is the actual dat.gui object.  We'll add folders and UI objects in the APP_INIT document.ready function
VA3C.datGui = {};




//*********************
//*********************
//*** Element Selection and attribute (user data) display.

//attributes object.  Contains logic for element selection and attribute list population
VA3C.attributes  = {};

//element list.  This gets populated after a json file is loaded, and is used to check for intersections
VA3C.attributes.elementList = [];

//initialize attribtes function.  Call this once when initializing VA3C to set up all of the
//event handlers and application logic.
VA3C.attributes.init = function(){

    //attribute properties used throughout attribute / selection code


    //the three projector object used for turning a mouse click into a selection
    VA3C.attributes.projector = new THREE.Projector();

    //a material used to represent a clicked object
    VA3C.attributes.clickedMaterial = new THREE.MeshPhongMaterial({ color : "rgb(255,0,255)", opacity : 1, side : 2 }); //red semi-transparent, double-sided

    //an object used to store the state of a selected element.
    VA3C.attributes.previousClickedElement = new VA3C.attributes.SelectedElement();

    //Get a handle on the attribute list div as a jquery object.
    VA3C.attributes.list = $('.attributeList');

    //Set up the jquery UI interactions on the object.
    VA3C.attributes.list.draggable( {containment: "parent"});

    //set up mouse events - BH question - why do we need both?  Test me.
    document.getElementById('vA3C_output').addEventListener('click', VA3C.attributes.onMouseClick, false);
    //document.getElementById('vA3C_output').addEventListener('mousedown', VA3C.attributes.onMouseClick, false);
};

//Constructor that creates an object to represent a selected element.
//Used to store state of a previously selected element
VA3C.attributes.SelectedElement = function(){
    this.material = -1;
    this.id = -1;
    this.object = {};
};

//Mouse Click event handler for selection.  When a user clicks on the viewer, this gets called
VA3C.attributes.onMouseClick = function( event ){

    //prevent the default event from triggering ... BH question - what is that event?  Test me.
    event.preventDefault();

    //call our checkIfSelected function
    VA3C.attributes.checkIfSelected(event);
};

//Function that checks whether the click should select an element, de-select an element, or do nothing.
//This is called on a mouse click from the handler function directly above
VA3C.attributes.checkIfSelected = function( event ){

    //get a vector representing the mouse position in 3D
    //NEW - from here: https://stackoverflow.com/questions/11036106/three-js-projector-and-ray-objects/23492823#23492823
    var mouse3D = new THREE.Vector3( ( (event.clientX -7) / window.innerWidth ) * 2 - 1, -( (event.clientY - 7)/ window.innerHeight ) * 2 + 1,  0.5 );    //OFFSET THE MOUSE CURSOR BY -7PX!!!!
    mouse3D.unproject(VA3C.camera);
    mouse3D.sub( VA3C.camera.position );
    mouse3D.normalize();

    //Get a list of objects that intersect with the selection vector.  We'll take the first one (the closest)
    //the VA3C element list is populated in the VA3C.jsonLoader.processSceneGeometry function
    //which is called every time a scene is loaded
    var raycaster = new THREE.Raycaster( VA3C.camera.position, mouse3D );
    var intersects = raycaster.intersectObjects( VA3C.attributes.elementList );

    //are there any intersections?
    if(intersects.length > 0){

        //if the current selection wasn't already selected, paint the element and display it's attributes
        if (intersects[0].object.material !== VA3C.attributes.clickedMaterial)
        {
            //reset material of previously selected element
            if (VA3C.attributes.previousClickedElement.id!= -1) {
                VA3C.attributes.paintElement(VA3C.attributes.previousClickedElement.object, VA3C.attributes.previousClickedElement.material);
            }

            //store the clicked object ID, color and the object itself
            VA3C.attributes.previousClickedElement.id = intersects[0].object.id;
            VA3C.attributes.previousClickedElement.material = intersects[0].object.material;
            VA3C.attributes.previousClickedElement.object = intersects[0].object;


            //paint current element with click-material
            VA3C.attributes.paintElement(intersects[0].object, VA3C.attributes.clickedMaterial);

            //populate the attribute list with the element's user data
            VA3C.attributes.populateAttributeList(intersects[0].object.userData);

        }
    }

    //no selection.  Repaint previously selected item if required
    else{

        //if an item was already selected
        if (VA3C.attributes.previousClickedElement.id !== -1)
        {
            VA3C.attributes.paintElement(VA3C.attributes.previousClickedElement.object, VA3C.attributes.previousClickedElement.material);
            VA3C.attributes.list.hide("slow");
            VA3C.attributes.previousClickedElement.object = null;
            VA3C.attributes.previousClickedElement.id = -1;
            VA3C.attributes.previousClickedElement.material = -1;
        }
    }
};

//function to paint an element with a material.  Called when an element is selected or de-selected
VA3C.attributes.paintElement = function(elementToPaint, material){

    //DID I SELECT A MESH OR OBJECT3D?
    if (elementToPaint.hasOwnProperty("userData"))
    {
        //mesh has been selected
        elementToPaint.material = material;
    }
    else    //something else was selected that we dont care/ know about
    {
        console.log("Object3D has not been implemented for the viewer");
    }
};

//function to populate the attribute list ( the user-facing html element ) with the selected element's attributes
VA3C.attributes.populateAttributeList = function( jsonData ){

    //empty the contents of the html element
    VA3C.attributes.list.empty();

    //create a header
    VA3C.attributes.list.append('<div class="attributeListHeader">Element Attributes</div>');

    //add an empty item for some breathing room
    VA3C.attributes.list.append('<div class="item">-------</div>');

    //loop through json object attributes and create a new line for each property
    var rowCounter = 1;
    for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            VA3C.attributes.list.append('<div class="item">' + key + "  :  " + jsonData[key] + '</div>');
        }
        rowCounter++;
    }

    //change height based on # rows
    VA3C.attributes.list.height(rowCounter * 11 + 43);

    //Show the html element
    VA3C.attributes.list.show("slow");
};








