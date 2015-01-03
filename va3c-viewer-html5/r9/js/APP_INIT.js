/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application

$(document).ready(function(){

    //set up and initialize dat.gui controls
    VA3C.uiVariables = new VA3C.UiConstructor();
    VA3C.datGui = new dat.GUI();

    //add a view folder
    var viewFolder = VA3C.datGui.addFolder('View Controls');
    //zoom extents and selected
    viewFolder.add(VA3C.uiVariables, 'zoomExtents');
    //gradient background controls
    viewFolder.addColor(VA3C.uiVariables, 'topColor').onChange(function(e){
        var dummyString = "linear-gradient(" + e + " , " + VA3C.uiVariables.bottomColor +")";
        $('body').css("background", dummyString);
    });
    viewFolder.addColor(VA3C.uiVariables, 'bottomColor').onChange(function(e){
        var dummerString = "linear-gradient(" + VA3C.uiVariables.topColor  + " , " + e +")";
        $('body').css( "background", dummerString);
    });



    //set background colors on load
    var bgStr = "linear-gradient(" + VA3C.uiVariables.topColor + " , " + VA3C.uiVariables.bottomColor +")";
    $('body').css( "background", bgStr);

    //hide the dat.gui close controls button
    $(".close-button").css('visibility', 'hidden');


    //load our sample JSON file - for development of the colored meshes from GH
    $.getJSON("./js/rst_basic_sample_project.json", function( data ){
    //$.getJSON("./js/va3c.json", function( data ){
        VA3C.jsonLoader.loadSceneFromJson(data);
    });

});