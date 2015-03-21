/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application
var myVA3C;

$(document).ready(function(){

    //load our sample JSON file from disk
    $.getJSON("./js/va3c2.json", function( data ){

        //once loaded, initialize a VA3C viewer by passing in the div to bind to, the json data, and a callback function
        //where we can enable application functionality in nice clean chunks
        myVA3C = new VA3C_CONSTRUCTOR($("#vA3C_output"), data, function(app){

            //call the UI / functionality modules
            app.userInterface();
            app.openLocalFiles();
            app.sceneUI();
            app.lightingUI();
            app.viewAndSelectionUI();
            app.viewsUI();
        });
    });
});