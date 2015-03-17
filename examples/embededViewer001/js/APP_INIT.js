/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application

$(document).ready(function(){

    //set up and initialize dat.gui controls --- we need this because zoom extents lives here.
    VA3C.uiVariables = new VA3C.UiConstructor();

    //load our sample JSON file - for development of the colored meshes from GH
    //$.getJSON("./js/rvtenergy.json", function( data ){
    $.getJSON("./js/va3c.json", function( data ){
        VA3C.jsonLoader.loadSceneFromJson(data);
    });

});