/**
 * Created by benjamin howes on 12/31/2014.
 */

//base application object containing vA3C functions and properties
var VA3C = {
    scene: {},          //the THREE.js scene object
    jsonLoader: {},     //the object that will take care of loading a THREE.js scene from a json file
    boundingSphere: {}, //a sphere that encompasses everything in the scene
    lightingRig: {},    //a parent object to hold our lights.  We'll be setting properties with UI
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
    //VA3C.scene.fog = new THREE.FogExp2(0x000000, 0.0025);

    //set up the THREE.js div and renderer
    VA3C.container = viewerDiv;
    VA3C.renderer = new THREE.WebGLRenderer(
        {
            maxLights: 10,
            antialias: true
        }
    );
    VA3C.renderer.setClearColor(0x000000, 1.0);
    VA3C.renderer.setSize( window.innerWidth, window.innerHeight );
    VA3C.renderer.shadowMapEnabled = true;
    //VA3C.renderer.shadowMapSoft = true;
    //VA3C.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    VA3C.container.append( VA3C.renderer.domElement );

    //set up the stats window
    VA3C.stats = new Stats();
    VA3C.stats.domElement.style.cssText = 'bottom: 0px; opacity: 0.5; position: absolute; right: 15px; ';
    statsDiv.append( VA3C.stats.domElement );

    //set up the camera and orbit controls
    VA3C.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000000 );
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

//a function to open a file from disk
//found this method here: http://www.javascripture.com/FileReader
VA3C.jsonLoader.openLocalFile = function(event){

    //the input object
    var input = event.target;

    //a new filereader object and onload callback
    var reader = new FileReader();
    reader.onload = function(){

        //data variable to populate
        var data = null;

        try { //get the json data
            data = $.parseJSON(reader.result);
        } catch (e) {
            console.log("something went wrong while trying to parse the json data.");
            console.log(e);
            return;
        }

        try { //load the json data into the scene

            if(data !== null){
                VA3C.jsonLoader.loadSceneFromJson(data);
            }


        } catch (e) {
            console.log("something went wrong while trying to load the json data.");
            console.log(e);
        }
    };

    //read the file as text - this will fire the onload function above when a user selects a file
    reader.readAsText(input.files[0]);

    //hide the input form and blackout
    $("#OpenLocalFile").css("visibility","hidden");
    $(".loading").show();
};

//function to open a file from url
VA3C.jsonLoader.openUrl = function(url){

    //hide the openUrl div
    this.hideOpenDialog();

    /*//try to parse the json and load the scene
    $.getJSON(url, function( data){
        //call our load scene function
        VA3C.jsonLoader.loadSceneFromJson(data);
    });*/

    //yep that didn't work - No 'Access-Control-Allow-Origin error.
    //this seemed like it might do the trick: http://www.html5rocks.com/en/tutorials/cors/   but did not
    //giving up for now...
    //it is possible though
    //
    //these guys do it: https://www.jsoneditoronline.org/

    $.ajax({
        url: url,
        type: 'GET',
        success: function(res) {
            console.log(res);
        }
    });

};

//function to hide the 'open file' dialogs.
VA3C.jsonLoader.hideOpenDialog = function(){
    //hide the input form
    $(".openFile").css("visibility","hidden");
};

//a function to populate our scene object from a json file
VA3C.jsonLoader.loadSceneFromJson = function(jsonToLoad){

    //restore the initial state of the attributes object
    if (VA3C.attributes.elementList.length > 0) {
        VA3C.attributes.purge();
    }

    //parse the JSON into a THREE scene
    var loader = new THREE.ObjectLoader();
    VA3C.scene = new THREE.Scene();
    VA3C.scene = loader.parse(jsonToLoad);
    //VA3C.scene.fog = new THREE.FogExp2(0x000000, 0.025);

    //call helper functions
    VA3C.jsonLoader.makeFaceMaterialsWork();
    VA3C.jsonLoader.processSceneGeometry();
    VA3C.jsonLoader.computeBoundingSphere();
    //set up the lighting rig
    VA3C.lightingRig.createLights();
    //call zoom extents
    VA3C.uiVariables.zoomExtents();

    //hide the blackout
    $(".blackout").hide();
    $(".loading").hide();

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

    //get all of the items in the scene
    items = VA3C.scene.children;

    //loop over all of the elements and process any geometry objects
    for ( var i = 0, iLen = VA3C.scene.children.length, items; i < iLen; i++ ) {

        //if this is a single mesh (like ones that come from grasshopper), process the geometry and add the
        //element to the attributes elements list so selection works.
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
        //if this is an object that contains multiple meshes (like the objects that come from Revit), process the
        //children meshes so they render correctly, and add the child to the attributes.elementList
        else if ( items[i].children.length > 0 ){
            //let the objects cast and receive shadows
            items[i].castShadow = true;
            items[i].receiveShadow = true;
            //the children to loop over
            var itemsChildren = items[i].children;
            for ( var k = 0, kLen = itemsChildren.length; k < kLen; k++ ) {
                if ( itemsChildren[k].hasOwnProperty("geometry") ) {
                    itemsChildren[k].geometry.mergeVertices();
                    itemsChildren[k].geometry.computeFaceNormals();
                    itemsChildren[k].geometry.computeVertexNormals();
                    itemsChildren[k].material.side = 2;
                    itemsChildren[k].castShadow = true;
                    itemsChildren[k].receiveShadow = true;
                    VA3C.attributes.elementList.push(itemsChildren[k]);
                }
            }

        }
    }
};

//function to compute the bounding sphere of the model
//we use this for the zoomExtents function and in the createLights function below
VA3C.jsonLoader.computeBoundingSphere = function(){
    //loop over the children of the THREE scene, merge them into a mesh,
    //and compute a bounding sphere for the scene
    var geo = new THREE.Geometry();
    VA3C.scene.traverse( function(child){
        if(child instanceof THREE.Mesh){
            geo.merge( child.geometry );
        }
        else if(child.type === 'Object3D' ){
            try {
                for (var i=0; i<child.children.length; i++) {
                    for (var j=0; j<child.children[i].children.length; j++){
                        geo.merge(child.children[i].children[j].geometry);
                    }
                }
            } catch (e) {}
        }
    });
    geo.computeBoundingSphere();

    //expand the scope of the bounding sphere
    VA3C.boundingSphere = geo.boundingSphere;

    //for debugging - show the sphere in the scene
    //var sphereGeo = new THREE.SphereGeometry(geo.boundingSphere.radius);
    //var sphereMesh = new THREE.Mesh(sphereGeo, new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0.85}));
    //sphereMesh.position.set(geo.boundingSphere.center.x,geo.boundingSphere.center.y,geo.boundingSphere.center.z);
    //VA3C.scene.add(sphereMesh);
};




//*********************
//*********************
//*** Lighting

//ambient light for the scene
VA3C.lightingRig.ambientLight = {};

//a spotlight representing the sun
VA3C.lightingRig.sunLight = {};

//an array of point lights to provide even coverage of the scene
VA3C.lightingRig.pointLights = [];


//function that creates lights in the scene
VA3C.lightingRig.createLights = function() {

    // create ambient light
    VA3C.lightingRig.ambientLight = new THREE.AmbientLight( 0x696969 );
    VA3C.scene.add( VA3C.lightingRig.ambientLight );


    //using the bounding sphere calculated above, get a numeric value to position the lights away from the center
    var offset = VA3C.boundingSphere.radius * 2;

    //get the center of the bounding sphere.  we'll use this to center the rig
    var center = VA3C.boundingSphere.center;


    //create a series of pointlights

    //directly above
    var pointA = new THREE.PointLight( 0x666666, 1, 0 );
    pointA.position.set(center.x, center.y + offset, center.z);
    pointA.castShadow = false;
    VA3C.scene.add( pointA );
    VA3C.lightingRig.pointLights.push(pointA);

    //directly below
    var pointB = new THREE.PointLight( 0x666666, 0.66, 0 );
    pointB.position.set(center.x, center.y - offset, center.z);
    pointB.castShadow = false;
    VA3C.scene.add( pointB );
    VA3C.lightingRig.pointLights.push(pointB);


    //4 from the cardinal directions, at roughly 45deg
    var pointC = new THREE.PointLight( 0x666666, 0.33, 0 );
    pointC.position.set(center.x + offset, center.y , center.z);
    pointC.castShadow = false;
    VA3C.scene.add( pointC );
    VA3C.lightingRig.pointLights.push( pointC );

    var pointD = new THREE.PointLight( 0x666666, 0.33, 0 );
    pointD.position.set(center.x, center.y , center.z + offset);
    pointD.castShadow = false;
    VA3C.scene.add( pointD );
    VA3C.lightingRig.pointLights.push( pointD );

    var pointE = new THREE.PointLight( 0x666666, 0.33, 0 );
    pointE.position.set(center.x - offset, center.y , center.z);
    pointE.castShadow = false;
    VA3C.scene.add( pointE );
    VA3C.lightingRig.pointLights.push( pointE );

    var pointF = new THREE.PointLight( 0x666666, 0.33, 0 );
    pointF.position.set(center.x, center.y , center.z - offset);
    pointF.castShadow = false;
    VA3C.scene.add( pointF );
    VA3C.lightingRig.pointLights.push( pointF );



    //directional light - the sun
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( center.x + offset, center.y + offset, center.z + offset );
    light.target.position.set(center.x, center.y, center.z);
    //light.castShadow = true;
    light.shadowCameraNear = 1;
    light.shadowCameraFar = offset * 2.5;
    light.shadowCameraTop = offset * 1.2;
    light.shadowCameraRight = offset * 1.2;
    light.shadowCameraBottom = offset * -1.2;
    light.shadowCameraLeft = offset * -1.2;
    light.distance = 0;
    light.intensity = 0;
    light.shadowBias = 0.001;
    light.shadowMapHeight = 1000;
    light.shadowMapWidth = 1000;
    light.shadowDarkness = 0.65;
    //light.shadowCameraVisible = true;

    //add the light to our scene and to our app object
    VA3C.lightingRig.sunLight = light;
    VA3C.scene.add( light );

};

//function that adjusts the point lights' color
//this is a handler for a UI variable
VA3C.lightingRig.setPointLightsColor = function( col ){

    for(var i in VA3C.lightingRig.pointLights){

        VA3C.lightingRig.pointLights[i].color = new THREE.Color(col);
    }
};

//function that adjusts the ambient light color
//another handler for a UI element
VA3C.lightingRig.setAmbientLightColor = function ( col ){
    //console.log(col);

    //remove the old ambient light
    VA3C.scene.remove(VA3C.lightingRig.ambientLight);

    //replace the ambient light with a new one, and add it to the scene
    VA3C.lightingRig.ambientLight = new THREE.AmbientLight( new THREE.Color(col) );
    VA3C.scene.add(VA3C.lightingRig.ambientLight);


};

//function that sets the position of the directional light (the sun)
VA3C.lightingRig.setSunPosition = function(az, alt){

};

//function to turn the sun on and off
VA3C.lightingRig.shadowsOnOff = function( shad ){
    if(shad) {
        VA3C.lightingRig.sunLight.castShadow = true;
        VA3C.lightingRig.sunLight.intensity = 1;
        VA3C.lightingRig.updateSceneMaterials();
    }
    else{
        VA3C.lightingRig.sunLight.castShadow = false;
        VA3C.lightingRig.sunLight.intensity = 0;
        VA3C.lightingRig.updateSceneMaterials();
    }
};

//function that sets the fog amount in the scene
//doesn't seem like this should live in the lighting rig ... if we get more scene variables we may need a sceneFunctions
//object or something.
VA3C.lightingRig.setFog = function( n ){

    //if false, set fog to null and return
    if(!n){
        VA3C.scene.fog = null;
    }

    //if true, set up some fog in the scene using the backgound color and the bounding sphere's radius
    else{
        VA3C.scene.fog = new THREE.FogExp2(new THREE.Color(VA3C.uiVariables.backgroundColor), 0.00025);
    }

};


//function to traverse materials in the scene when deep updates are needed - fog on off/ shadows on / off, etc
VA3C.lightingRig.updateSceneMaterials = function(){
    VA3C.scene.traverse( function(child){
        if(child instanceof THREE.Mesh){
            child.material.needsUpdate = true;
        }
        else if(child.type === 'Object3D' ){
            try {
                for (var i=0; i<child.children.length; i++) {
                    for (var j=0; j<child.children[i].children.length; j++){
                        child.children[i].children[j].material.needsUpdate = true;
                    }
                }
            } catch (e) {}
        }
    });
};




//*********************
//*********************
//*** User Interface.

//dat.gui Constructor object
// an instance of this is class created to store UI variables and functions
VA3C.UiConstructor = function(){

    //OPEN FILE
    this.openLocalFile = function(){

        //show the openLocalFile Div
        $("#OpenLocalFile").css("visibility","visible");
        $(".blackout").show();

        //this should show a form that lets a user open a file

    };

    this.openUrl = function(){

        //show the openUrl Div
        $("#OpenUrl").css("visibility","visible");


    };

    //SCENE VARIABLES

    //background color
    this.backgroundColor = "#000000";

    //ambient light color
    this.ambientLightColor = '#666666';

    //fog
    this.fog = true;




    //VIEW AND SELECTION VARIABLES

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
        VA3C.orbitControls.object.position.set(newPos.x, newPos.y, newPos.z);
        VA3C.orbitControls.target = new THREE.Vector3(geo.boundingSphere.center.x, geo.boundingSphere.center.y, geo.boundingSphere.center.z);
    };

    //zoom selected
    this.zoomSelected = function(){

        //return if no selection
        if(VA3C.attributes.previousClickedElement.id === -1) return;

        //get selected item and it's bounding sphere
        var bndSphere;
        var sel = VA3C.attributes.previousClickedElement.object;

        //if the object is a mesh, grab the sphere
        if(sel.hasOwnProperty('geometry')){
            //sel.computeBoundingSphere();
            bndSphere = sel.geometry.boundingSphere;
        }

        //if the object is object3d, merge all of it's geometries and compute the sphere of the merge
        else{
            var geo = new THREE.Geometry();
            for(var i in sel.children){
                geo.merge(sel.children[i].geometry);
            }
            geo.computeBoundingSphere();
            bndSphere = geo.boundingSphere;
        }

        //get the radius of the sphere and use it to compute an offset.  This is a mashup of theo's method and ours from platypus
        var r = bndSphere.radius;
        var offset = r / Math.tan(Math.PI / 180.0 * VA3C.orbitControls.object.fov * 0.5);
        var vector = new THREE.Vector3(0,0,1);
        var dir = vector.applyQuaternion(VA3C.orbitControls.object.quaternion);
        var newPos = new THREE.Vector3();
        dir.multiplyScalar(offset * 1.1);
        newPos.addVectors(bndSphere.center, dir);
        VA3C.orbitControls.object.position.set(newPos.x, newPos.y, newPos.z);
        VA3C.orbitControls.target = new THREE.Vector3(bndSphere.center.x, bndSphere.center.y, bndSphere.center.z);

    };

    //selected object color
    this.selectedObjectColor = "#FF00FF";


    //LIGHTING VARIABLES

    //point lights color
    this.pointLightsColor = '#666666';

    //sun light on / off
    this.shadows = false;

    //sun azimuth and altitude
    this.solarAzimuth = 180;
    this.solarAltitude = 45;

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
    VA3C.attributes.clickedMaterial = new THREE.MeshBasicMaterial({ color : "rgb(255,0,255)", opacity : 1, side : 2 }); //red semi-transparent, double-sided

    //an object used to store the state of a selected element.
    VA3C.attributes.previousClickedElement = new VA3C.attributes.SelectedElement();

    //Get a handle on the attribute list div as a jquery object.
    VA3C.attributes.list = $('.attributeList');

    //set up mouse events - BH question - why do we need both?  Test me.
    document.getElementById('vA3C_output').addEventListener('click', VA3C.attributes.onMouseClick, false);
    //document.getElementById('vA3C_output').addEventListener('mousedown', VA3C.attributes.onMouseClick, false);
};

//Constructor that creates an object to represent a selected element.
//Used to store state of a previously selected element
VA3C.attributes.SelectedElement = function(){
    this.materials = [];    //array of materials.  Holds one mat for each Mesh that the selected object contains
    this.id = -1;           //the ID of the element.  We use this to test whether something was already selected on a click
    this.object = {};       //the actual object that was selected.  This has been painted with our 'selected' material
                            //and needs to be painted back with the materials in the materials array
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

        //get the closest intesected object
        var myIntersect = intersects[0].object;

        //was this element already selected?  if so, do nothing.
        if(myIntersect.id === VA3C.attributes.previousClickedElement.id) return;

        //was another element already selected?
        if(VA3C.attributes.previousClickedElement.id !== -1){
            //restore previously selected object's state
            VA3C.attributes.restorePreviouslySelectedObject();
        }


        //var to track whether the intersect is an object3d or a mesh
        var isObject3D = false;

        //did we intersect a mesh that belongs to an Object3D or a Geometry?  The former comes from Revit, the latter from GH
        if(myIntersect.parent.type === "Object3D"){
            isObject3D = true;
        }


        //store the selected object
        VA3C.attributes.storeSelectedObject(myIntersect, isObject3D);

        //paint the selected object[s] with the application's 'selected' material
        if(isObject3D){
            //loop over the children and paint each one
            for(var i=0; i<myIntersect.parent.children.length; i++){
                VA3C.attributes.paintElement(myIntersect.parent.children[i], VA3C.attributes.clickedMaterial);
            }
        }
        else{
            //paint the mesh with the clicked material
            VA3C.attributes.paintElement(myIntersect, VA3C.attributes.clickedMaterial);
        }


        //populate the attribute list with the object's user data
        if(isObject3D){
            VA3C.attributes.populateAttributeList(myIntersect.parent.userData);
        }
        else{
            VA3C.attributes.populateAttributeList(myIntersect.userData);
        }
    }

    //no selection.  Repaint previously selected item if required
    else{

        //if an item was already selected
        if (VA3C.attributes.previousClickedElement.id !== -1)
        {
            //restore the previously selected object
            VA3C.attributes.restorePreviouslySelectedObject();

            //hide the attributes
            VA3C.attributes.list.hide("slow");
        }
    }
};

//Function to restore the state of a previously selected object.
VA3C.attributes.restorePreviouslySelectedObject = function(){

    //if nothing was selected, return
    if(VA3C.attributes.previousClickedElement.id === -1) return;

    //apply the stored materials to the meshes in the object.

    //are we working with an object3d?  if so we need to reset all of the children materials
    if(VA3C.attributes.previousClickedElement.object.parent.type === "Object3D"){

        //loop over the children and repaint each one
        for(var i=0; i<VA3C.attributes.previousClickedElement.materials.length; i++){
            VA3C.attributes.paintElement(
                VA3C.attributes.previousClickedElement.object.children[i],
                VA3C.attributes.previousClickedElement.materials[i]
            );
        }


    }
    else{ // we have a mesh

        //paint the mesh with it's original material
        VA3C.attributes.paintElement(
            VA3C.attributes.previousClickedElement.object,
            VA3C.attributes.previousClickedElement.materials[0]
        );
    }


    //set id to -1 and clear the other vars so they can be populated during hte next selection
    VA3C.attributes.previousClickedElement.id = -1;
    VA3C.attributes.previousClickedElement.materials = [];
    VA3C.attributes.previousClickedElement.object = {};

};

//Function to store a selected object in our attributes.PreviouslySelectedObject property.  Essentially a property setter
//selected arg is the selected object
//isObject3D arg is a bool describing whether  the selected object is of typeObject3D.  If so, we need to store it's children
VA3C.attributes.storeSelectedObject = function( selected, isObject3D ){

    if(isObject3D){
        //store the ID of the parent object.
        VA3C.attributes.previousClickedElement.id = selected.parent.id;

        //store the material of each child
        for(var i=0; i<selected.parent.children.length; i++){
            VA3C.attributes.previousClickedElement.materials.push(selected.parent.children[i].material);
        }

        //store the entire parent object
        VA3C.attributes.previousClickedElement.object = selected.parent;
    }
    else{
        //store the ID of the parent object.
        VA3C.attributes.previousClickedElement.id = selected.id;

        //store the material of the selection
        VA3C.attributes.previousClickedElement.materials.push(selected.material);

        //store the entire object
        VA3C.attributes.previousClickedElement.object = selected;
    }

};

//function to paint an element with a material.  Called when an element is selected or de-selected
VA3C.attributes.paintElement = function(elementToPaint, material){

        elementToPaint.material = material;

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
    var longestString = 0;
    for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {

            //add the key value pair
            if (jsonData[key].substr(0,4) !== 'http') {
                VA3C.attributes.list.append('<div class="item">' + key + "  :  " + jsonData[key] + '</div>');
            } else {
                var link = '<a href=' + jsonData[key] + ' target=_blank>' + jsonData[key] + '</a>';
                VA3C.attributes.list.append('<div class="item">' + key + "  :  " + link + '</div>');
            }

            //compute the length of the key value pair
            var len = (key + "  :  " + jsonData[key]).length;
            if(len > longestString) longestString = len;
        }

        //increment the counter
        rowCounter++;
    }

    //change height based on # rows
    VA3C.attributes.list.height(rowCounter * 12 + 43);

    //set the width
    if(longestString > 50){
        VA3C.attributes.list.width(longestString * 5 + 43);
    }
    else{
        VA3C.attributes.list.width(360);
    }

    //Show the html element
    VA3C.attributes.list.show("slow");
};

//function to purge local variables within this object.  When a user loads a new scene, we have to clear out the old stuff
VA3C.attributes.purge = function(){
    this.restorePreviouslySelectedObject();
    this.elementList = [];
};

//function to handle changing the color of a selected element
VA3C.attributes.setSelectedObjectColor = function(col){
    VA3C.attributes.clickedMaterial.color = new THREE.Color(col);
};








