/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application

$(document).ready(function(){

    //set up and initialize dat.gui controls
    VA3C.uiVariables = new VA3C.UiConstructor();
    VA3C.datGui = new dat.GUI();
    VA3C.datGui.width = 300;

    //add a file folder containing the file open button
    var fileFolder = VA3C.datGui.addFolder('File');
    fileFolder.add(VA3C.uiVariables, 'openLocalFile');
    //fileFolder.add(VA3C.uiVariables, 'openUrl'); //not working yet - commenting out for now

    //add a view folder
    var viewFolder = VA3C.datGui.addFolder('View and Scene');
    //zoom extents and selected
    viewFolder.add(VA3C.uiVariables, 'zoomExtents');
    viewFolder.add(VA3C.uiVariables, 'zoomSelected');
    //gradient background controls
    viewFolder.addColor(VA3C.uiVariables, 'topColor').onChange(function(e){
        var dummyString = "linear-gradient(" + e + " , " + VA3C.uiVariables.bottomColor +")";
        $('body').css("background", dummyString);
    });
    viewFolder.addColor(VA3C.uiVariables, 'bottomColor').onChange(function(e){
        var dummerString = "linear-gradient(" + VA3C.uiVariables.topColor  + " , " + e +")";
        $('body').css( "background", dummerString);
    });

    //add a lighting folder
    var lightsFolder = VA3C.datGui.addFolder('Lighting');
    //solar az and alt
    lightsFolder.add(VA3C.uiVariables, 'solarAzimuth')
        .min(0)
        .max(359)
        .step(1);
    lightsFolder.add(VA3C.uiVariables, 'solarAltitude')
        .min(0)
        .max(90)
        .step(0.1);
    //light colors
    lightsFolder.addColor(VA3C.uiVariables, 'ambientLightColor').onChange(function(e){
        VA3C.lightingRig.setAmbientLightColor(e);
    });
    lightsFolder.addColor(VA3C.uiVariables, 'spotlightsColor').onChange(function(e){
        VA3C.lightingRig.setSpotlightsColor(e);
    });



    //set background colors on load
    var bgStr = "linear-gradient(" + VA3C.uiVariables.topColor + " , " + VA3C.uiVariables.bottomColor +")";
    $('body').css( "background", bgStr);

    //hide the dat.gui close controls button
    $(".close-button").css('visibility', 'hidden');


    //Jquery UI stuff - make divs draggable, resizable, etc.

    //make the file open divs draggable
    $(".openFile").draggable( {containment: "parent"});

    //make the attributes div draggable and resizeable
    $('.attributeList').draggable( {containment: "parent"});
    //$('.attributeList').resizable();


    //load our sample JSON file - for development of the colored meshes from GH
    //$.getJSON("./js/rvtenergy.json", function( data ){
    $.getJSON("./js/va3c.json", function( data ){
        VA3C.jsonLoader.loadSceneFromJson(data);
    });

});