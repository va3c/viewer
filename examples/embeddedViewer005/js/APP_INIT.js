/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application

$(document).ready(function(){


    //load our json file
    $.getJSON("./js/va3c2.json", function( data ){

        //once loaded, initialize a VA3C viewer by passing in the div to bind to, the json data, and a callback function
        //where we can enable application functionality in nice clean chunks
        var myVA3C = new VA3C_CONSTRUCTOR($("#vA3C_output"), data, function(app){

            //call the UI / functionality modules
            app.setBackgroundColor(0xFFFFFF);
            app.userInterface();
            //app.openLocalFiles();
            //app.sceneUI();
            //app.lightingUI();
            app.viewAndSelectionUI();
            app.viewsUI();
            //app.layersUI();
        });
    });

});