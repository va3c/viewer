/**
 * Created by benjamin howes on 12/31/2014.
 */

//base application object containing vA3C functions and properties
var VA3C_CONSTRUCTOR = function(divToBind, jsonFileData, callback){

    var VA3C = this;        //a local app object we can work with inside of the constructor to avoid 'this' confusion.
    VA3C.viewerDiv = divToBind;  //a reference to the div for use throughout the app

    VA3C.scene = {};          //the THREE.js scene object
    VA3C.jsonLoader = {};     //the object that will take care of loading a THREE.js scene from a json file
    VA3C.boundingSphere = undefined;      //a sphere that encompasses everything in the scene
    VA3C.lightingRig = {};    //a parent object to hold our lights.  We'll be setting properties with UI
    VA3C.orbitControls = {};  //the THREE.js orbit controls object
    VA3C.camera = {};         //the THREE.js camera object
    VA3C.renderer = {};       //the THREE.js renderer object
    VA3C.clock = {};          //the THREE.js clock
    VA3C.stats = undefined;               //the Stats object


    //*********************
    //*********************
    //*** THREE.js setup

    //function that sets up the initial THREE.js scene, renderer, camera, orbit controls, etc.
    //also creates loading and blackout divs which are shown/hidden as json files are loaded
    VA3C.initViewer = function (viewerDiv) {

        //append the blackout div and let it respond to the parent div resizing
        VA3C.viewerDiv.append("<div class='vA3C_blackout'></div>");
        //function to position and size the blackout div
        var setBlackout = function(){
            //set the position of the UI relative to the viewer div
            var targetDiv = $('.vA3C_blackout');

            //get upper left coordinates of the viewer div - we'll use these for positioning
            var x = VA3C.viewerDiv.position().left;
            var y = VA3C.viewerDiv.position().top;

            //set the position and size
            targetDiv.css('left', x.toString() + "px");
            targetDiv.css('top',  y.toString() + "px");
            targetDiv.css('width', VA3C.viewerDiv.width().toString() + "px");
            targetDiv.css('height', VA3C.viewerDiv.height().toString() + "px");
        };
        //call this the first time through
        setBlackout();
        //respond to resize of the parent div
        VA3C.viewerDiv.resize(function () {
            setBlackout();
        });


        //append the loading div and let it respond to the parent div resizing
        VA3C.viewerDiv.append("<div class='vA3C_loading'><h1>Loading vA3C JSON file...</h1></div>");
        //function to position the loading div
        var setLoading = function(){

            //set the position of the UI relative to the viewer div
            var targetDiv = $('.vA3C_loading');

            //get upper left coordinates of the viewer div - we'll use these for positioning
            var x = (VA3C.viewerDiv.position().left + VA3C.viewerDiv.width()) / 2;
            var y = (VA3C.viewerDiv.position().top + VA3C.viewerDiv.height()) / 2;

            //set the position and size
            targetDiv.css('left', x.toString() + "px");
            targetDiv.css('top',  y.toString() + "px");
        };
        //call this the first time through
        setLoading();
        //respond to resize of the parent div
        VA3C.viewerDiv.resize(function () {
            setLoading();
        });

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
        VA3C.renderer.setSize(viewerDiv.innerWidth(), viewerDiv.innerHeight());
        VA3C.renderer.shadowMapEnabled = true;
        //VA3C.renderer.shadowMapSoft = true;
        //VA3C.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        VA3C.container.append(VA3C.renderer.domElement);

        //set up the camera and orbit controls
        VA3C.camera = new THREE.PerspectiveCamera(45, viewerDiv.innerWidth() / viewerDiv.innerHeight(), 1, 1000000);
        VA3C.camera.position.set(1000, 1000, 1000);
        VA3C.orbitControls = new THREE.OrbitControls(VA3C.camera, VA3C.renderer.domElement);
        VA3C.orbitControls.target.set(0, 100, 0);

        //a clock.  the camera uses this
        VA3C.clock = new THREE.Clock();

        //respond to resize
        viewerDiv.resize(function () {
            var WIDTH = viewerDiv.innerWidth(),
                HEIGHT = viewerDiv.innerHeight();
            VA3C.renderer.setSize(WIDTH, HEIGHT);
            VA3C.orbitControls.object.aspect = WIDTH / HEIGHT;
            VA3C.orbitControls.object.updateProjectionMatrix();
        });

        //respond to window resize.  when the window resizes, sometimes it moves our parent div ... and all of our
        //children need to be repositioned (maybe I'm just horrible with CSS?).  On a resize, trigger the resize
        //event on our parent DIV, which should reposition all of the children.
        window.addEventListener('resize', function () {
           VA3C.viewerDiv.resize();
        });

        //call the render function - this starts the webgl render loop
        VA3C.render();
    };

    //function that starts the THREE.js renderer
    VA3C.render = function () {
        if (VA3C.stats !== undefined) {
            VA3C.stats.update();
        }
        var delta = VA3C.clock.getDelta();
        VA3C.orbitControls.update(delta); //getting a warning here - look into it

        requestAnimationFrame(VA3C.render); // same here - look into this warning
        VA3C.renderer.render(VA3C.scene, VA3C.orbitControls.object);
    };

    //*********************
    //*********************
    //*** TOP LEVEL FUNCTION CALLS
    //these are called from outside and enable / disable chunks of application functionality and UI

    //**********************TOP LEVEL METHOD!!!**********************************
    //this is the method that is called to initialize the dat.GUI user interface.
    VA3C.userInterface = function(){

        //append a child div to our parent and use the child to host the dat.GUI contoller
        $('body').append("<div class=vA3C_uiTarget></div>");

        //function to position the target div relative to the parent
        var positionGuiDiv = function(){
            //set the position of the UI relative to the viwer div
            var targetDiv = $('.vA3C_uiTarget');

            //get upper right coordinates of the viewer div - we'll use these for positioning
            var x = VA3C.viewerDiv.position().left + VA3C.viewerDiv.width();
            var y = VA3C.viewerDiv.position().top;

            //set the position
            targetDiv.css('left', (x - 300).toString() + "px");
            targetDiv.css('top',  y.toString() + "px");
        }
        positionGuiDiv();

        //respond to resize of Parent div
        VA3C.viewerDiv.resize(function () {
            positionGuiDiv();
        });

        //initialize the Dat.GUI object, and bind it to our target div
        VA3C.uiVariables = new VA3C.UiConstructor();
        VA3C.datGui = new dat.GUI({ autoPlace: false });
        VA3C.datGui.width = 300;
        $('.vA3C_uiTarget').append(VA3C.datGui.domElement);



        //hide the dat.gui close controls button
        //$(".close-button").css('visibility', 'hidden');


        //Jquery UI stuff - make divs draggable, resizable, etc.

        //make the attributes div draggable and resizeable
        $('.vA3C_attributeList').draggable( {containment: "parent"});
        //$('.attributeList').resizable();

    };

    //**********************TOP LEVEL METHOD!!!**********************************
    //call this method to enable the file open UI.
    VA3C.openLocalFiles = function(){

        //append the file open interface to our parent div --- couldn't get this to work!  it has something to do with appending the file input with jquery...
        //VA3C.viewerDiv.append("<div id='OpenLocalFile' class='vA3C_openFile'><h2>Open a local vA3C .json file</h2><input type='file' onclick='myVA3C.jsonLoader.clearFile(event);' onchange='myVA3C.jsonLoader.openLocalFile(event);' class='vA3C_openButton'></div>");
        //VA3C.viewerDiv.append("<div id='OpenLocalFile' class='vA3C_openFile'><h2>Open a local vA3C .json file</h2><input type='file' class='vA3C_openButton'></div>");
        //$('.vA3C_openButton').click(function(event){
        //VA3C.jsonLoader.openLocalFile(event);
        //});

        //function to position the loading div
        var setFileOpen = function(){

            //set the position of the UI relative to the viewer div
            var targetDiv = $('.vA3C_openFile');

            //get upper left coordinates of the viewer div - we'll use these for positioning
            var x = (VA3C.viewerDiv.position().left + VA3C.viewerDiv.width()) / 2;
            var y = (VA3C.viewerDiv.position().top + VA3C.viewerDiv.height()) / 2;

            //set the position and size
            targetDiv.css('left', x.toString() + "px");
            targetDiv.css('top',  y.toString() + "px");
        };
        //call this the first time through
        setFileOpen();
        //respond to resize of the parent div
        VA3C.viewerDiv.resize(function () {
            setFileOpen();
        });

        //add a file folder containing the file open button
        var fileFolder = VA3C.datGui.addFolder('File');
        VA3C.UIfolders.File = fileFolder;
        fileFolder.add(VA3C.uiVariables, 'openLocalFile');
        //fileFolder.add(VA3C.uiVariables, 'openUrl'); //not working yet - commenting out for now

        //make the file open divs draggable
        $(".vA3C_openFile").draggable( {containment: "parent"});
    };

    //**********************TOP LEVEL METHOD!!!**********************************
    //call this method to enable the Scene UI
    VA3C.sceneUI = function(){
        //add scene folder
        var sceneFolder = VA3C.datGui.addFolder('Scene');
        VA3C.UIfolders.Scene = sceneFolder;
        //background color control
        sceneFolder.addColor(VA3C.uiVariables, 'backgroundColor').onChange(function(e){
            //set background color
            VA3C.renderer.setClearColor(e);
        });
        //scene fog
        //sceneFolder.add(VA3C.uiVariables, 'fog').onChange(function(e){
        //        VA3C.lightingRig.setFog(e);
        //    });

        //append a new div to the parent to use for stats visualization
        VA3C.viewerDiv.append("<div id='vA3C_stats' style= 'position: fixed;'></div>");

        //set up the stats window
        VA3C.stats = new Stats();
        VA3C.stats.domElement.style.cssText = 'opacity: 0.5; position: fixed; ';
        $('#vA3C_stats').append(VA3C.stats.domElement);

        //position the stats relative to the parent
        var positionStats = function(){
            //set the position of the UI relative to the viewer div
            var targetDiv = $('#vA3C_stats');

            //get lower right coordinates of the viewer div - we'll use these for positioning
            var x = VA3C.viewerDiv.position().left + VA3C.viewerDiv.width();
            var y = VA3C.viewerDiv.position().top + VA3C.viewerDiv.height();

            //set the position
            targetDiv.css('left', (x - 77).toString() + "px");
            targetDiv.css('top',  (y - 48).toString() + "px");
        };
        positionStats();

        //hide the stats the first time through.
        $('#vA3C_stats').hide();


        //respond to resize
        VA3C.viewerDiv.resize(function () {
            positionStats();
        });

        //create the controller in the UI
        VA3C.UIfolders.Scene.add(VA3C.uiVariables, 'showStats').onChange(function(e){
            if(e){
                $('#vA3C_stats').show();
            }
            else{
                $('#vA3C_stats').hide();
            }
        });
    };

    //**********************TOP LEVEL METHOD!!!**********************************
    //call this method to enable the Lighting UI
    VA3C.lightingUI = function(){
        //add a lighting folder
        var lightsFolder = VA3C.datGui.addFolder('Lighting');
        VA3C.UIfolders.Lighting = lightsFolder;
        //light colors
        lightsFolder.addColor(VA3C.uiVariables, 'ambientLightColor').onChange(function(e){
            VA3C.lightingRig.setAmbientLightColor(e);
        });
        lightsFolder.addColor(VA3C.uiVariables, 'pointLightsColor').onChange(function(e){
            VA3C.lightingRig.setPointLightsColor(e);
        });
        lightsFolder.add(VA3C.uiVariables, 'shadows').onChange(function(e){
            VA3C.lightingRig.shadowsOnOff(e);
        });
        /*//solar az and alt
         lightsFolder.add(VA3C.uiVariables, 'solarAzimuth')
         .min(0)
         .max(359)
         .step(1);
         lightsFolder.add(VA3C.uiVariables, 'solarAltitude')
         .min(0)
         .max(90)
         .step(0.1);*/
    };

    //**********************TOP LEVEL METHOD!!!**********************************
    //call this method to enable view and selection UI
    VA3C.viewAndSelectionUI = function(){
        //add view folder
        var viewFolder = VA3C.datGui.addFolder('View_and_Selection');
        VA3C.UIfolders.View_and_Selection = viewFolder;
        //zoom extents and selected
        viewFolder.add(VA3C.uiVariables, 'zoomExtents');
        viewFolder.add(VA3C.uiVariables, 'zoomSelected');
        //change color of selected object's material
        viewFolder.addColor(VA3C.uiVariables, 'selectedObjectColor').onChange(function(e){
            VA3C.attributes.setSelectedObjectColor(e);
        });

        //initialize object selection and attributes display
        VA3C.attributes.init();
    };

    //**********************TOP LEVEL METHOD!!!**********************************
    //call this method to enable the view dropdown UI
    VA3C.viewsUI = function(){
        VA3C.views.viewsEnabled = true;
        if(VA3C.views.viewList.length !== 0){
            VA3C.views.purge();
        }
        VA3C.views.getViews();
        VA3C.views.CreateViewUI();
    };

    //**********************TOP LEVEL METHOD!!!**********************************
    //call this method to enable the view dropdown UI
    VA3C.layersUI = function(){
        VA3C.layers.layersEnabled = true;
        if(VA3C.layers.layerList.length !== 0){
            VA3C.layers.purge();
        }
        VA3C.layers.getLayers();
        VA3C.layers.CreateLayerUI();
    };




    //*********************
    //*********************
    //*** JSON Model Loader

    //a function to open a file from disk
    //found this method here: http://www.javascripture.com/FileReader
    VA3C.jsonLoader.openLocalFile = function (event) {

        //the input object
        var input = event.target;

        //a new filereader object and onload callback
        var reader = new FileReader();
        reader.onload = function () {

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

                if (data !== null) {
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
        $("#OpenLocalFile").css("visibility", "hidden");
        $(".vA3C_loading").show();
    };

    VA3C.jsonLoader.clearFile = function (event) {
        //the input object
        var input = event.target;
        input.value = "";

    };

    //function to open a file from url
    VA3C.jsonLoader.openUrl = function (url) {

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
            success: function (res) {
                console.log(res);
            }
        });

    };

    //function to hide the 'open file' dialogs.
    VA3C.jsonLoader.hideOpenDialog = function () {
        //hide the input form
        $(".vA3C_openFile").css("visibility", "hidden");
    };

    //a function to populate our scene object from a json file
    VA3C.jsonLoader.loadSceneFromJson = function (jsonToLoad) {

        //restore the initial state of the top level application objects
        if (VA3C.attributes.elementList.length > 0) {
            VA3C.attributes.purge();
        }
        if (VA3C.lightingRig.pointLights.length > 0) {
            VA3C.lightingRig.purge();
        }
        if(VA3C.views.viewList.length > 0){
            VA3C.views.purge();
        }
        if(VA3C.layers.layerList.length > 0){
            VA3C.layers.purge();
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
        VA3C.zoomExtents();

        //set up the lighting rig
        VA3C.lightingRig.createLights();//note - i think we should check to see if there is an active lighting UI and use those colors to init lights if so...

        //if those chunks have been enabled by the outside caller, call getViews and getLayers on the scene.
        if(VA3C.views.viewsEnabled){
            //TO DO --- if a view with the same name as the open view exists in the incoming file, set that view
            VA3C.views.getViews();
            VA3C.views.CreateViewUI();
        }
        if(VA3C.layers.layersEnabled){
            VA3C.layers.getLayers();
            VA3C.layers.CreateLayerUI();
        }

        //hide the blackout
        $(".vA3C_blackout").hide();
        $(".vA3C_loading").hide();

    };

    //call this function to set a geometry's face material index to the same index as the face number
    //this lets meshfacematerials work - the json loader only gets us part of the way there (I think we are missing something when we create mesh faces...)
    VA3C.jsonLoader.makeFaceMaterialsWork = function () {

        for (var i = 0, iLen = VA3C.scene.children.length, items; i < iLen; i++) {
            items = VA3C.scene.children;
            if (items[i].hasOwnProperty("geometry")) {

                //the object to revise
                var geo = items[i].geometry;
                var currentMat = items[i].material;
                var userData = items[i].userData;

                //if this is a face materials object, make all of the mesh faces point to the correct material
                if (currentMat.hasOwnProperty("materials") && userData.hasOwnProperty("VA3C_FaceColorIndexes")) {

                    //get the 'VA3C_FaceColorIndexes' string out of the mesh's user data object,
                    //and break it into an array of face material indexes
                    var faceColors = userData.VA3C_FaceColorIndexes.split(",");

                    //loop over the faces in the geometry and make the face.materialIndex reference the face's index
                    for (var j in geo.faces) {
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
    VA3C.jsonLoader.processSceneGeometry = function () {

        //get all of the items in the scene
        items = VA3C.scene.children;

        //loop over all of the elements and process any geometry objects
        for (var i = 0, iLen = VA3C.scene.children.length, items; i < iLen; i++) {

            //if this is a single mesh (like ones that come from grasshopper), process the geometry and add the
            //element to the attributes elements list so selection works.
            if (items[i].hasOwnProperty("geometry")) {
                //three.js stuff
                items[i].geometry.mergeVertices();
                items[i].geometry.computeFaceNormals();
                items[i].geometry.computeVertexNormals();
                items[i].castShadow = true;
                items[i].receiveShadow = true;
                //add element to our list of elements that can be selected
                //items[i].material.transparent = true;
                //items[i].material.opacity = 1.0;
                VA3C.attributes.elementList.push(items[i]);


            }
                //if this is an object that contains multiple meshes (like the objects that come from Revit), process the
                //children meshes so they render correctly, and add the child to the attributes.elementList
            else if (items[i].children.length > 0) {
                //let the objects cast and receive shadows
                items[i].castShadow = true;
                items[i].receiveShadow = true;
                //the children to loop over
                var itemsChildren = items[i].children;
                for (var k = 0, kLen = itemsChildren.length; k < kLen; k++) {
                    if (itemsChildren[k].hasOwnProperty("geometry")) {
                        itemsChildren[k].geometry.mergeVertices();
                        itemsChildren[k].geometry.computeFaceNormals();
                        itemsChildren[k].geometry.computeVertexNormals();
                        itemsChildren[k].material.side = 2;
                        itemsChildren[k].castShadow = true;
                        itemsChildren[k].receiveShadow = true;
                        //itemsChildren[k].material.transparent = true;
                        //itemsChildren[k].material.opacity = 1.0;
                        VA3C.attributes.elementList.push(itemsChildren[k]);

                    }
                }
            }
        }
    };

    //function to compute the bounding sphere of the model
    //we use this for the zoomExtents function and in the createLights function below
    VA3C.jsonLoader.computeBoundingSphere = function () {
        //loop over the children of the THREE scene, merge them into a mesh,
        //and compute a bounding sphere for the scene
        var geo = new THREE.Geometry();
        VA3C.scene.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                geo.merge(child.geometry);
            }
        });
        geo.computeBoundingSphere();

        //expand the scope of the bounding sphere
        VA3C.boundingSphere = geo.boundingSphere;

        //for debugging - show the sphere in the scene
        //var sphereGeo = new THREE.SphereGeometry(geo.boundingSphere.radius);
        //var sphereMesh = new THREE.Mesh(sphereGeo, new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0.25}));
        //sphereMesh.position.set(geo.boundingSphere.center.x,geo.boundingSphere.center.y,geo.boundingSphere.center.z);
        //VA3C.scene.add(sphereMesh);
    };

    //zoom extents function.  we call this when we load a file (and from the UI), so it shouldn't be in the UI constructor
    VA3C.zoomExtents = function(){

        if(VA3C.boundingSphere === undefined) VA3C.computeBoundingSphere();

        //get the radius of the sphere and use it to compute an offset.  This is a mashup of theo's method
        //and the one we use in platypus
        var r = VA3C.boundingSphere.radius;
        var offset = r / Math.tan(Math.PI / 180.0 * VA3C.orbitControls.object.fov * 0.5);
        var vector = new THREE.Vector3(0, 0, 1);
        var dir = vector.applyQuaternion(VA3C.orbitControls.object.quaternion);
        var newPos = new THREE.Vector3();
        dir.multiplyScalar(offset * 1.25);
        newPos.addVectors(VA3C.boundingSphere.center, dir);
        VA3C.orbitControls.object.position.set(newPos.x, newPos.y, newPos.z);
        VA3C.orbitControls.target = new THREE.Vector3(VA3C.boundingSphere.center.x, VA3C.boundingSphere.center.y, VA3C.boundingSphere.center.z);
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
    VA3C.lightingRig.createLights = function () {

        // create ambient light
        VA3C.lightingRig.ambientLight = new THREE.AmbientLight(0x696969);
        VA3C.scene.add(VA3C.lightingRig.ambientLight);


        //using the bounding sphere calculated above, get a numeric value to position the lights away from the center
        var offset = VA3C.boundingSphere.radius * 2;

        //get the center of the bounding sphere.  we'll use this to center the rig
        var center = VA3C.boundingSphere.center;


        //create a series of pointlights

        //directly above
        var pointA = new THREE.PointLight(0x666666, 1, 0);
        pointA.position.set(center.x, center.y + offset, center.z);
        pointA.castShadow = false;
        VA3C.scene.add(pointA);
        VA3C.lightingRig.pointLights.push(pointA);

        //directly below
        var pointB = new THREE.PointLight(0x666666, 0.66, 0);
        pointB.position.set(center.x, center.y - offset, center.z);
        pointB.castShadow = false;
        VA3C.scene.add(pointB);
        VA3C.lightingRig.pointLights.push(pointB);


        //4 from the cardinal directions, at roughly 45deg
        var pointC = new THREE.PointLight(0x666666, 0.33, 0);
        pointC.position.set(center.x + offset, center.y, center.z);
        pointC.castShadow = false;
        VA3C.scene.add(pointC);
        VA3C.lightingRig.pointLights.push(pointC);

        var pointD = new THREE.PointLight(0x666666, 0.33, 0);
        pointD.position.set(center.x, center.y, center.z + offset);
        pointD.castShadow = false;
        VA3C.scene.add(pointD);
        VA3C.lightingRig.pointLights.push(pointD);

        var pointE = new THREE.PointLight(0x666666, 0.33, 0);
        pointE.position.set(center.x - offset, center.y, center.z);
        pointE.castShadow = false;
        VA3C.scene.add(pointE);
        VA3C.lightingRig.pointLights.push(pointE);

        var pointF = new THREE.PointLight(0x666666, 0.33, 0);
        pointF.position.set(center.x, center.y, center.z - offset);
        pointF.castShadow = false;
        VA3C.scene.add(pointF);
        VA3C.lightingRig.pointLights.push(pointF);



        //directional light - the sun
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(center.x + offset, center.y + offset, center.z + offset);
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
        light.shadowMapHeight = VA3C.viewerDiv.innerHeight();
        light.shadowMapWidth = VA3C.viewerDiv.innerWidth();
        light.shadowDarkness = 0.65;
        //light.shadowCameraVisible = true;

        //add the light to our scene and to our app object
        VA3C.lightingRig.sunLight = light;
        VA3C.scene.add(light);

    };

    //function that adjusts the point lights' color
    //this is a handler for a UI variable
    VA3C.lightingRig.setPointLightsColor = function (col) {

        for (var i in VA3C.lightingRig.pointLights) {

            VA3C.lightingRig.pointLights[i].color = new THREE.Color(col);
        }
    };

    //function that adjusts the ambient light color
    //another handler for a UI element
    VA3C.lightingRig.setAmbientLightColor = function (col) {
        //console.log(col);

        //remove the old ambient light
        VA3C.scene.remove(VA3C.lightingRig.ambientLight);

        //replace the ambient light with a new one, and add it to the scene
        VA3C.lightingRig.ambientLight = new THREE.AmbientLight(new THREE.Color(col));
        VA3C.scene.add(VA3C.lightingRig.ambientLight);


    };

    //function that sets the position of the directional light (the sun)
    VA3C.lightingRig.setSunPosition = function (az, alt) {

    };

    //function to turn the sun on and off
    VA3C.lightingRig.shadowsOnOff = function (shad) {
        if (shad) {
            VA3C.lightingRig.sunLight.castShadow = true;
            VA3C.lightingRig.sunLight.intensity = 1;
            VA3C.lightingRig.updateSceneMaterials();
        }
        else {
            VA3C.lightingRig.sunLight.castShadow = false;
            VA3C.lightingRig.sunLight.intensity = 0;
            VA3C.lightingRig.updateSceneMaterials();
        }
    };

    //function that sets the fog amount in the scene
    //doesn't seem like this should live in the lighting rig ... if we get more scene variables we may need a sceneFunctions
    //object or something.
    VA3C.lightingRig.setFog = function (n) {

        //if false, set fog to null and return
        if (!n) {
            VA3C.scene.fog = null;
        }

            //if true, set up some fog in the scene using the backgound color and the bounding sphere's radius
        else {
            VA3C.scene.fog = new THREE.FogExp2(new THREE.Color(VA3C.uiVariables.backgroundColor), 0.00025);
        }

    };

    //function to traverse materials in the scene when deep updates are needed - fog on off/ shadows on / off, etc
    VA3C.lightingRig.updateSceneMaterials = function () {
        VA3C.scene.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material.needsUpdate = true;
            }
            else if (child.type === 'Object3D') {
                try {
                    for (var i = 0; i < child.children.length; i++) {
                        for (var j = 0; j < child.children[i].children.length; j++) {
                            child.children[i].children[j].material.needsUpdate = true;
                        }
                    }
                } catch (e) { }
            }
        });
    };

    //function to purge lighting variables.  called when we load a new scene
    VA3C.lightingRig.purge = function () {
        this.ambientLight = {};
        this.sunLight = {};
        this.pointLights = [];
    };





    //*********************
    //*********************
    //*** User Interface.

    //dat.gui Constructor object
    // an instance of this is class created to store UI variables and functions
    VA3C.UiConstructor = function () {

        //OPEN FILE
        this.openLocalFile = function () {

            //show the openLocalFile Div
            $("#OpenLocalFile").css("visibility", "visible");
            $(".vA3C_blackout").show();

            //this should show a form that lets a user open a file

            $(document).keyup(function (e) {
                //if the escape key  is pressed
                if (e.keyCode == 27)
                {
                    $("#OpenLocalFile").css("visibility", "hidden");
                    $(".vA3C_blackout").hide();
                }
            });

        };

        //SCENE VARIABLES

        //background color
        this.backgroundColor = "#000000";

        //ambient light color
        this.ambientLightColor = '#666666';

        //fog
        this.fog = true;

        this.view = "v";

        this.layers = "layers";

        //VIEW AND SELECTION VARIABLES

        //zoom extents
        this.zoomExtents = function () {
            VA3C.zoomExtents();
        };

        //zoom selected
        this.zoomSelected = function () {

            //return if no selection
            if (VA3C.attributes.previousClickedElement.id === -1) return;

            //get selected item and it's bounding sphere
            var bndSphere;
            var sel = VA3C.attributes.previousClickedElement.object;

            //if the object is a mesh, grab the sphere
            if (sel.hasOwnProperty('geometry')) {
                //sel.computeBoundingSphere();
                bndSphere = sel.geometry.boundingSphere;
            }

                //if the object is object3d, merge all of it's geometries and compute the sphere of the merge
            else {
                var geo = new THREE.Geometry();
                for (var i in sel.children) {
                    geo.merge(sel.children[i].geometry);
                }
                geo.computeBoundingSphere();
                bndSphere = geo.boundingSphere;
            }


            //get the radius of the sphere and use it to compute an offset.  This is a mashup of theo's method and ours from platypus
            var r = bndSphere.radius;
            var offset = r / Math.tan(Math.PI / 180.0 * VA3C.orbitControls.object.fov * 0.5);
            var vector = new THREE.Vector3(0, 0, 1);
            var dir = vector.applyQuaternion(VA3C.orbitControls.object.quaternion);
            var newPos = new THREE.Vector3();
            dir.multiplyScalar(offset * 1.1);
            newPos.addVectors(bndSphere.center, dir);
            VA3C.orbitControls.object.position.set(newPos.x, newPos.y, newPos.z);
            VA3C.orbitControls.target = new THREE.Vector3(bndSphere.center.x, bndSphere.center.y, bndSphere.center.z);

        };




        //selected object color
        this.selectedObjectColor = "#FF00FF";

        //show stats?
        this.showStats = false;


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

    //an object to hold all of our GUI folders, which will be keyed by name.  We need these from other places in the app
    //now that we are dynamically adding and subtracting UI elements.
    VA3C.UIfolders = {};




    //*********************
    //*********************
    //*** Element Selection and attribute (user data) display.

    //attributes object.  Contains logic for element selection and attribute list population
    VA3C.attributes = {};

    //element list.  This gets populated after a json file is loaded, and is used to check for intersections
    VA3C.attributes.elementList = [];

    //attributes list div - the div that we populate with attributes when an item is selected
    VA3C.attributes.attributeListDiv = {};

    //initialize attribtes function.  Call this once when initializing VA3C to set up all of the
    //event handlers and application logic.
    VA3C.attributes.init = function () {

        //attribute properties used throughout attribute / selection code


        //the three projector object used for turning a mouse click into a selection
        VA3C.attributes.projector = new THREE.Projector();

        //a material used to represent a clicked object
        VA3C.attributes.clickedMaterial = new THREE.MeshBasicMaterial({ color: "rgb(255,0,255)", opacity: 1, side: 2 }); //red semi-transparent, double-sided

        //an object used to store the state of a selected element.
        VA3C.attributes.previousClickedElement = new VA3C.attributes.SelectedElement();

        //Append a div to the parent for us to populate with attributes.  handle any jquery.ui initialization here too
        VA3C.viewerDiv.append("<div class='vA3C_attributeList'></div>");
        //function to position and size the blackout div
        var setAttributeList = function(){
            //set the position of the UI relative to the viewer div
            var targetDiv = $('.vA3C_attributeList');

            //get upper left coordinates of the viewer div - we'll use these for positioning
            var x = VA3C.viewerDiv.position().left;
            var y = VA3C.viewerDiv.position().top;

            //set the position and size
            targetDiv.css('left', x.toString() + "px");
            targetDiv.css('top',  y.toString() + "px");
            targetDiv.css('width', VA3C.viewerDiv.width().toString() + "px");
            targetDiv.css('height', VA3C.viewerDiv.height().toString() + "px");
        };
        //call this the first time through
        setAttributeList();

        //set our local variable to the div we just created
        VA3C.attributes.attributeListDiv = $('.vA3C_attributeList');
        //make the attributes div draggable and resizeable
        VA3C.attributes.attributeListDiv.draggable( {containment: "parent"});

        //set up mouse event
        VA3C.viewerDiv.click(VA3C.attributes.onMouseClick);
    };

    //Constructor that creates an object to represent a selected element.
    //Used to store state of a previously selected element
    VA3C.attributes.SelectedElement = function () {
        this.materials = [];    //array of materials.  Holds one mat for each Mesh that the selected object contains
        this.id = -1;           //the ID of the element.  We use this to test whether something was already selected on a click
        this.object = {};       //the actual object that was selected.  This has been painted with our 'selected' material
        //and needs to be painted back with the materials in the materials array
    };

    //Mouse Click event handler for selection.  When a user clicks on the viewer, this gets called
    VA3C.attributes.onMouseClick = function (event) {

        //prevent the default event from triggering ... BH question - what is that event?  Test me.
        //event.preventDefault();

        //call our checkIfSelected function
        VA3C.attributes.checkIfSelected(event);
    };

    //Function that checks whether the click should select an element, de-select an element, or do nothing.
    //This is called on a mouse click from the handler function directly above
    VA3C.attributes.checkIfSelected = function (event) {

        //get a vector representing the mouse position in 3D
        //NEW - from here: https://stackoverflow.com/questions/11036106/three-js-projector-and-ray-objects/23492823#23492823
        var mouse3D = new THREE.Vector3(((event.clientX) / window.innerWidth) * 2 - 1, -((event.clientY) / window.innerHeight) * 2 + 1, 0.5);    //OFFSET THE MOUSE CURSOR BY -7PX!!!!
        mouse3D.unproject(VA3C.camera);
        mouse3D.sub(VA3C.camera.position);
        mouse3D.normalize();

        //Get a list of objects that intersect with the selection vector.  We'll take the first one (the closest)
        //the VA3C element list is populated in the VA3C.jsonLoader.processSceneGeometry function
        //which is called every time a scene is loaded
        var raycaster = new THREE.Raycaster(VA3C.camera.position, mouse3D);
        var intersects = raycaster.intersectObjects(VA3C.attributes.elementList);

        //are there any intersections?
        if (intersects.length > 0) {

            //get the closest intesected object
            var myIntersect = intersects[0].object;

            //was this element already selected?  if so, do nothing.
            if (myIntersect.id === VA3C.attributes.previousClickedElement.id) return;

            //was another element already selected?
            if (VA3C.attributes.previousClickedElement.id !== -1) {
                //restore previously selected object's state
                VA3C.attributes.restorePreviouslySelectedObject();
            }


            //var to track whether the intersect is an object3d or a mesh
            var isObject3D = false;

            //did we intersect a mesh that belongs to an Object3D or a Geometry?  The former comes from Revit, the latter from GH
            if (myIntersect.parent.type === "Object3D") {
                isObject3D = true;
            }


            //store the selected object
            VA3C.attributes.storeSelectedObject(myIntersect, isObject3D);

            //paint the selected object[s] with the application's 'selected' material
            if (isObject3D) {
                //loop over the children and paint each one
                for (var i = 0; i < myIntersect.parent.children.length; i++) {
                    VA3C.attributes.paintElement(myIntersect.parent.children[i], VA3C.attributes.clickedMaterial);
                }
            }
            else {
                //paint the mesh with the clicked material
                VA3C.attributes.paintElement(myIntersect, VA3C.attributes.clickedMaterial);
            }


            //populate the attribute list with the object's user data
            if (isObject3D) {
                VA3C.attributes.populateAttributeList(myIntersect.parent.userData);
            }
            else {
                VA3C.attributes.populateAttributeList(myIntersect.userData);
            }
        }

            //no selection.  Repaint previously selected item if required
        else {

            //if an item was already selected
            if (VA3C.attributes.previousClickedElement.id !== -1) {
                //restore the previously selected object
                VA3C.attributes.restorePreviouslySelectedObject();

                //hide the attributes
                VA3C.attributes.attributeListDiv.hide("slow");
            }
        }
    };

    //Function to restore the state of a previously selected object.
    VA3C.attributes.restorePreviouslySelectedObject = function () {

        //if nothing was selected, return
        if (VA3C.attributes.previousClickedElement.id === -1) return;

        //apply the stored materials to the meshes in the object.

        //are we working with an object3d?  if so we need to reset all of the children materials
        if (VA3C.attributes.previousClickedElement.object.type === "Object3D") {

            //loop over the children and repaint each one
            for (var i = 0; i < VA3C.attributes.previousClickedElement.materials.length; i++) {
                VA3C.attributes.paintElement(
                    VA3C.attributes.previousClickedElement.object.children[i],
                    VA3C.attributes.previousClickedElement.materials[i]
                );
            }


        }
        else { // we have a mesh

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
    VA3C.attributes.storeSelectedObject = function (selected, isObject3D) {

        if (isObject3D) {
            //store the ID of the parent object.
            VA3C.attributes.previousClickedElement.id = selected.parent.id;

            //store the material of each child
            for (var i = 0; i < selected.parent.children.length; i++) {
                VA3C.attributes.previousClickedElement.materials.push(selected.parent.children[i].material);
            }

            //store the entire parent object
            VA3C.attributes.previousClickedElement.object = selected.parent;
        }
        else {
            //store the ID of the parent object.
            VA3C.attributes.previousClickedElement.id = selected.id;

            //store the material of the selection
            VA3C.attributes.previousClickedElement.materials.push(selected.material);

            //store the entire object
            VA3C.attributes.previousClickedElement.object = selected;
        }

    };

    //function to paint an element with a material.  Called when an element is selected or de-selected
    VA3C.attributes.paintElement = function (elementToPaint, material) {

        elementToPaint.material = material;

    };

    //function to populate the attribute list ( the user-facing html element ) with the selected element's attributes
    VA3C.attributes.populateAttributeList = function (jsonData) {

        //empty the contents of the html element
        VA3C.attributes.attributeListDiv.empty();

        //create a header
        VA3C.attributes.attributeListDiv.append('<div class="vA3C_attributeListHeader">Element Attributes</div>');

        //add an empty item for some breathing room
        VA3C.attributes.attributeListDiv.append('<div class="item">-------</div>');

        //loop through json object attributes and create a new line for each property
        var rowCounter = 1;
        var longestString = 0;
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {

                //add the key value pair
                if (jsonData[key].substr(0, 4) !== 'http') {
                    VA3C.attributes.attributeListDiv.append('<div class="item">' + key + "  :  " + jsonData[key] + '</div>');
                } else {
                    var link = '<a href=' + jsonData[key] + ' target=_blank>' + jsonData[key] + '</a>';
                    VA3C.attributes.attributeListDiv.append('<div class="item">' + key + "  :  " + link + '</div>');
                }

                //compute the length of the key value pair
                var len = (key + "  :  " + jsonData[key]).length;
                if (len > longestString) longestString = len;
            }

            //increment the counter
            rowCounter++;
        }

        //change height based on # rows
        VA3C.attributes.attributeListDiv.height(rowCounter * 12 + 43);

        //set the width
        if (longestString > 50) {
            VA3C.attributes.attributeListDiv.width(longestString * 5 + 43);
        }
        else {
            VA3C.attributes.attributeListDiv.width(360);
        }

        //Show the html element
        VA3C.attributes.attributeListDiv.show("slow");
    };

    //function to handle changing the color of a selected element
    VA3C.attributes.setSelectedObjectColor = function (col) {
        VA3C.attributes.clickedMaterial.color = new THREE.Color(col);
    };

    //function to purge local variables within this object.  When a user loads a new scene, we have to clear out the old stuff
    VA3C.attributes.purge = function () {
        this.restorePreviouslySelectedObject();
        this.elementList = [];
    };


    //*********************
    //*********************
    //*** Views - camera positions can be stored in the .json file, and we provide UI to switch between views.
    VA3C.views = {};

    //the active array of views
    VA3C.views.viewList = [];

    //a bool to track whether or not views have been enabled by the user
    VA3C.viewsEnabled = false;

    //function to get views from the active scene and populate our list of views
    VA3C.views.getViews = function () {
        try {
            if (VA3C.scene.userData.views.length > 0) {
                //create a default view
                var defView = {};
                defView.name = "DefaultView";
                //defView.eye =new THREE.Vector3(-1000, 1000, 1000);
                //defView.target = new THREE.Vector3(0, -100, 0);
                VA3C.views.viewList.push(defView);
                //add the views in the json file
                for (var k = 0, kLen = VA3C.scene.userData.views.length; k < kLen; k++) {
                    var itemView = VA3C.scene.userData.views[k];
                    VA3C.views.viewList.push(itemView);
                }
            }
        }
        catch (err) { }
    };

    //funciton to create the user interface for view selection
    VA3C.views.CreateViewUI = function(){

        //if there are saved views, get their names and create a dat.GUI controller
        if (VA3C.views.viewList.length > 0) {

            //get an array of all of the view names
            viewStrings = [];
            for (var i = 0; i < VA3C.views.viewList.length; i++) {
                viewStrings.push(VA3C.views.viewList[i].name);
            }
            viewStrings.sort();

            //set the first view to be the current view
            this.setView(viewStrings[0]);

            //make sure the view and selection folder exists - if it doesn't, throw an error
            if(VA3C.UIfolders.View_and_Selection === undefined) throw "View and selection folder must be initialized";

            //add the view dropdown, and call our reset view function on a change
            VA3C.UIfolders.View_and_Selection.add(VA3C.uiVariables, 'view', viewStrings).onFinishChange(function (e) {
                VA3C.views.resetView();
            });

            //call reset view the first time through the loop
            this.resetView();
        }
    };

    //function to set the current view
    VA3C.views.setView = function(v){
        if (this.viewList.length > 0) {
            VA3C.uiVariables.view = v;
        }
    };

    //function to reset the view ... not sure why we need both - AGP?
    VA3C.views.resetView = function(){
        var vector = new THREE.Vector3(0, 0, 1);
        var up = vector.applyQuaternion(VA3C.orbitControls.object.quaternion);

        //get the current camera by name
        var view;
        for (var i = 0; i < this.viewList.length; i++) {
            var v = this.viewList[i];
            if (v.name === VA3C.uiVariables.view) {
                view = v;
                break;
            }
        }

        //if we found a view, activate it.  otherwise, set the camera to our default view
        if (view) {
            //get the eyePos from the current camera
            //change vector from Revit  (-x,z,y)
            if (view.name !="DefaultView") {
                var eyePos = new THREE.Vector3(-view.eye.X, view.eye.Z, view.eye.Y);

                //get the targetPos from the current camera
                //change direction of vector from revit (-x,-z,-y)
                var dir = new THREE.Vector3(-view.target.X, -view.target.Z, -view.target.Y);

                VA3C.orbitControls.target.set(dir.x, dir.y, dir.z);
                VA3C.orbitControls.object.position.set(eyePos.x, eyePos.y, eyePos.z);
            }

            else {
                VA3C.camera.position.set(1000, 1000, 1000);
                VA3C.orbitControls = new THREE.OrbitControls(VA3C.camera, VA3C.renderer.domElement);
                VA3C.orbitControls.target.set(0, 100, 0);

                VA3C.zoomExtents();

            }
        }
    };

    //function to purge the list of views
    VA3C.views.purge = function(){
        //reset the list
        if(this.viewList.length>0) this.viewList = [];

        try { //purge view controller
            var viewFolder = VA3C.datGui.__folders.View_and_Selection;

            for (var i = 0; i < viewFolder.__controllers.length; i++) {
                if (viewFolder.__controllers[i].property == "view") {
                    viewFolder.__controllers[i].remove();
                    break;
                }
            }
        } catch (e) {
        }
    };





    //*********************
    //*********************
    //*** Layers - [exported] objects can contain a user data attribute called 'layer' which we use to provide a layers interface.
    VA3C.layers = {};

    //the active array of layers
    VA3C.layers.layerList = [];

    //a bool to track whether or not layers have been enabled by the user
    VA3C.layersEnabled = false;

    //function to get layers from the active scene and populate our list
    VA3C.layers.getLayers = function(){
        try {
            if (VA3C.scene.userData.layers.length > 0) {
                for (var k = 0, kLen = VA3C.scene.userData.layers.length; k < kLen; k++) {
                    var itemLayer = VA3C.scene.userData.layers[k];
                    VA3C.layers.layerList.push(itemLayer);
                }
            }
        }
        catch (err) { }
    };

    //function to create the user interface for view selection
    VA3C.layers.CreateLayerUI = function(){
        //if there are saved layers, create a checkbox for each of them
        if ((VA3C.layers.layerList.length == 1 && VA3C.layers.layerList[0].name!="Default") || VA3C.layers.layerList.length>1){
            layerStrings = [];
            for (var i = 0; i < VA3C.layers.layerList.length; i++) {
                layerStrings.push(VA3C.layers.layerList[i].name);
            }
            //sort layers by name
            layerStrings.sort();
            try {
                var layerFolder = VA3C.datGui.addFolder('Layers');
            }
            catch (err) {
                //the layer folder already exists
                var layerFolder = VA3C.datGui.__folders.Layers;
            }
            for (var i = 0; i < layerStrings.length; i++) {

                //create an layer object that has a boolean property with its name
                var layer = {};
                layer[layerStrings[i]] = true;

                //add a checkbox per layer
                layerFolder.add(layer, layerStrings[i]).onChange(function (e) {

                    // get the name of the controller that fired the event -- there must be a different way of doing this...
                    var layerName = this.domElement.parentElement.firstChild.innerText;

                    for (var i = 0; i < VA3C.attributes.elementList.length; i++) {
                        var element = VA3C.attributes.elementList[i];
                        if (element.userData.layer == layerName) {
                            //if unchecked, make it invisible
                            if (element.visible == true) element.visible = false;
                            //otherwise, show it
                            else element.visible = true;
                        }
                    }
                });
            }
        }
    };

    //function to purge the list of views
    VA3C.layers.purge = function(){
        //reset our list
        if(this.layerList.length>0) this.layerList = [];

        //purge layer folder
        try {
            var layerFolder = VA3C.datGui.__folders.Layers;
            var layerCount = layerFolder.__controllers.length;
            for (var i = 0; i < layerCount; i++) {
                layerFolder.__controllers[0].remove();
            }

            //remove the Layers folder -- this is not working
            VA3C.datGui.removeFolder('Layers');

        }

        catch (err) { }
    };





    //now all functions have been initialized.  Call init viewer to start the application
    VA3C.initViewer(VA3C.viewerDiv);

    //if the user passed in a json file, load it.
    if(jsonFileData !== undefined){
        VA3C.jsonLoader.loadSceneFromJson(jsonFileData);
    }

    //if the user supplied a callback function, call it and pass our application object (this)
    if(callback !== undefined){
        try {
            callback(VA3C);
        } catch (e) {
        }
    }

};






