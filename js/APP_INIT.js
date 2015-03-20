/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application
var myVA3C;

$(document).ready(function(){


    //after the EMBED refactoring effort, the entry point for a viewer should look like this:
    myVA3C = new VA3C_CONSTRUCTOR($("#vA3C_output"),$("#Stats_output"));
    myVA3C.userInterface();
    myVA3C.openLocalFiles();
    myVA3C.sceneUI();
    myVA3C.lightingUI();
    myVA3C.viewAndSelectionUI();


    //load our sample JSON file - for development of the colored meshes from GH
    //$.getJSON("./js/rvtenergy.json", function( data ){
    $.getJSON("./js/va3c.json", function( data ){
        myVA3C.jsonLoader.loadSceneFromJson(data);
    });








});