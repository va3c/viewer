/**
 * Created by benjamin howes on 12/30/2014.
 */

//contains the jquery document.ready callback, which starts the application
var myVA3C;

$(document).ready(function(){


    //after the EMBED refactoring effort, the entry point for a viewer should look like this:
    myVA3C = new VA3C_CONSTRUCTOR($("#vA3C_output"),$("#Stats_output"));
    myVA3C.userInterface();
//    v.stats();
//    v.openFiles();
//    v.selection();
//    v.views();
//    v.layers();
//    v.shadows();
//    v.etc();








});