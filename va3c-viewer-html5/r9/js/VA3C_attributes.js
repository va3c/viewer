/**
 * Created by JSchumacher on 7/3/14.
 * Modified by Benjamin Howes on 12/30/14
 * 7/3/14.
 *
 * class to handle element selection and attribute display
 *
 * This currently works for meshes only. Not implemented fro Object3D, since we don't deal with those yet.
 */

//object to store info about previous hovered and previous clicked elements:
function SelectedElement() {
    this.material = -1;
    this.id = -1;
    this.object = {};
}

VA3C.attributes  = {};

VA3C.attributes.init = function(){
    //describe variables
    VA3C.attributes.halfWidth = 0.5 * window.innerWidth;
    VA3C.attributes.halfHeight = 0.5 * window.innerHeight;

    VA3C.attributes.projector = new THREE.Projector();
    VA3C.attributes.clickedMaterial = new THREE.MeshPhongMaterial({ color : "rgb(255,0,255)", opacity : 1, side : 2 }); //red semi-transparent, double-sided
    VA3C.attributes.hoverMaterial = new THREE.MeshPhongMaterial({ color : "rgb(0,255,0)", opacity : 0.8, side : 2 }); //red semi-transparent, double-sided

    VA3C.attributes.previousClickedElement = new SelectedElement();
    VA3C.attributes.previousHoveredElement = new SelectedElement();

    //initialize divs and forms (as JQuery objects)
    VA3C.attributes.list = $('.attributeList');
    VA3C.attributes.hoverPopup = $('.HoverPopupMenu');
    VA3C.attributes.list.dropDown = $("#dropdownSelector");

    VA3C.attributes.list.selectedAttribute = "";

    VA3C.attributes.list.click(function(){
        /*$(this).animate({
            height: '-=10px'
        });
        */
        VA3C.attributes.listClicked = true;
    });

    VA3C.attributes.list.mouseout(function(){
        VA3C.attributes.listClicked = false;
    });

    //set up mouse events
    document.getElementById('vA3C_output').addEventListener('click', onMouseClick, false);
    document.getElementById('vA3C_output').addEventListener('mousedown', onMouseClick, false);
};

//click
function onMouseClick( event )
{
    //console.log('click!');
    event.preventDefault();
    checkIfSelected(true, event);
}

function checkIfSelected(isClicked, event)
{

    var mouseX = event.pageX;        // needed for display of popup box
    var mouseY = event.pageY;

    //NEW - from here: https://stackoverflow.com/questions/11036106/three-js-projector-and-ray-objects/23492823#23492823
    var mouse3D = new THREE.Vector3( ( (event.clientX -7) / window.innerWidth ) * 2 - 1, -( (event.clientY - 7)/ window.innerHeight ) * 2 + 1,  0.5 );    //OFFSET THE MOUSE CURSOR BY -7PX!!!!
    //var projector = new THREE.Projector();

    //projector.unprojectVector( mouse3D, VA3C.camera ); //this line throwing errors in three r69
    mouse3D.unproject(VA3C.camera);
    mouse3D.sub( VA3C.camera.position );
    mouse3D.normalize();
    var raycaster = new THREE.Raycaster( VA3C.camera.position, mouse3D );
    var intersects = raycaster.intersectObjects( VA3C.elementList );

    if (intersects.length > 0)
    {
        if (isClicked)
        {
            //if the currently clicked element does not have click material, then paint it:
            if (intersects[0].object.material!= VA3C.attributes.clickedMaterial)
            {
                //reset paint of previously painted element
                if (VA3C.attributes.previousClickedElement.id!= -1) paintElement(VA3C.attributes.previousClickedElement.object, VA3C.attributes.previousClickedElement.material, true);

                //COMMENT THIS OUT WHEN HOVERING WORKS:
                //store the clicked object ID and color. There is a 99.9999% chance that it was hovered before clicked. So we have to assign the prev hovered material to it instead of the current material
                VA3C.attributes.previousClickedElement.id = intersects[0].object.id;
                VA3C.attributes.previousClickedElement.material = intersects[0].object.material;
                VA3C.attributes.previousClickedElement.object = intersects[0].object;

                //USE THIS WHEN HOVERING WORKS:
                //store the clicked object ID and color. There is a 99.9999% chance that it was hovered before clicked. So we have to assign the prev hovered material to it instead of the current material
                //VA3C.attributes.previousClickedElement.id = VA3C.attributes.previousHoveredElement.id;
                //VA3C.attributes.previousClickedElement.material = VA3C.attributes.previousHoveredElement.material;
                //VA3C.attributes.previousClickedElement.object = VA3C.attributes.previousHoveredElement.object;

                //reset previous HOVERED element:
                VA3C.attributes.previousHoveredElement.id = -1;
                VA3C.attributes.previousHoveredElement.material = -1;
                VA3C.attributes.previousHoveredElement.object = null;

                //paint current element with click-material
                paintElement(intersects[0].object, VA3C.attributes.clickedMaterial, true);
                populateAttributeList(intersects[0].object.userData);
                VA3C.attributes.hoverPopup.hide(500);       //just added this to hide the small popup
            }
        }
        else
        {
            //Only apply HOVER-MATERIAL if element does not have click-material applied.
            if (intersects[0].object.material!= VA3C.attributes.clickedMaterial)
            {
                //reset paint of previously HOVERED element
                if (VA3C.attributes.previousHoveredElement.id!= -1) paintElement(VA3C.attributes.previousHoveredElement.object, VA3C.attributes.previousHoveredElement.material, false);

                if (intersects[0].object.material!=VA3C.attributes.hoverMaterial)
                {
                    //store the clicked object ID and color
                    VA3C.attributes.previousHoveredElement.id = intersects[0].object.id;
                    VA3C.attributes.previousHoveredElement.material = intersects[0].object.material;
                    VA3C.attributes.previousHoveredElement.object = intersects[0].object;
                }

                paintElement(intersects[0].object, VA3C.attributes.hoverMaterial, false);

                //update hoverPopupMenu
                populateHoverPopupList(intersects[0].object.userData);

                //show hoverPopup at mouse coords
                VA3C.attributes.hoverPopup.css({'top':mouseY,'left':mouseX}).fadeIn(0);
            }
        }
    }
    else    //no selection. Reset paint
    {
        //check whether there is an element to be reset:
        if (isClicked)
        {
            if (VA3C.attributes.previousClickedElement.id!=-1)
            {
                //check if cursor is not on div
                //hide list:
                if (VA3C.attributes.listClicked == false)
                {
                    paintElement(VA3C.attributes.previousClickedElement.object, VA3C.attributes.previousClickedElement.material, true);
                    VA3C.attributes.list.hide("slow");
                    VA3C.attributes.previousClickedElement.object = null;
                    VA3C.attributes.previousClickedElement.id = -1;
                    VA3C.attributes.previousClickedElement.material = -1;
                    VA3C.attributes.hoverPopup.hide(0);       //just added this
                }
            }
        }
        else
        {
            if (VA3C.attributes.previousHoveredElement.id != -1 && VA3C.scene.getObjectById(VA3C.attributes.previousHoveredElement.id).material!= VA3C.attributes.clickedMaterial)
            {
                paintElement(VA3C.attributes.previousHoveredElement.object, VA3C.attributes.previousHoveredElement.material, false);
                VA3C.attributes.hoverPopup.hide(0);
                VA3C.attributes.previousHoveredElement.object = null;
                VA3C.attributes.previousHoveredElement.id = -1;
                VA3C.attributes.previousHoveredElement.material = -1;
            }
        }
    }
}

function paintElement(elementToPaint, material, isClicked)
{
    if (isClicked)
    {
        //console.log("resetting color of prev selected element ID:  " + elementToPaint.id);
    }

    //DID I SELECT A MESH OR OBJECT3D?
   // if(!$.isEmptyObject(elementToPaint.object.userData))
    if (elementToPaint.hasOwnProperty("userData"))
    {
        //mesh has been selected
        elementToPaint.material = material;
        //console.log(elementToPaint.userData);
    }

    else    //something else was selected that we dont care/ know about
    {
        console.log("Object3D has not been implemented for the viewer");
    }
}

function populateAttributeList(jsonData)
{
    VA3C.attributes.list.empty();
    VA3C.attributes.list.dropDown.empty();

    VA3C.attributes.list.append('<div class="attributeListHeader">Element Attributes</div>');

    if (VA3C.attributes.list.selectedAttribute =="")  //set default dropdown value if unset
    {
        for (var k in jsonData) break;
        VA3C.attributes.list.selectedAttribute = k;
    }

    //add an empty item for some breathing room
    VA3C.attributes.list.append('<div class="item">-------</div>');

    var rowCounter = 1;
    //loop through json object attributes:
    for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            VA3C.attributes.list.append('<div class="item">' + key + "  :  " + jsonData[key] + '</div>');
            if (key == VA3C.attributes.list.selectedAttribute)
            {
                //mark as selected:
                VA3C.attributes.list.dropDown.append("<option selected>" + key + "</option>");
            }
            else
            {
                VA3C.attributes.list.dropDown.append("<option>" + key + "</option>");
            }
        }
        rowCounter++;
    }

    //VA3C.attributes.list.draggable({ cursor: "move", cursorAt: { top: (rowCounter * 30 + 40 )/2, left: 50 } });
    VA3C.attributes.list.draggable( {containment: "parent"});
    //VA3C.attributes.list.resizable();

    //change height based on # rows
    //VA3C.attributes.list.height(rowCounter * 25 + 70) ; //USED WITH QUICK-VIEW SELECTOR
    VA3C.attributes.list.height(rowCounter * 11 + 43) ;
    VA3C.attributes.listClicked = false;   //need for click detection


    //UNCOMMENTED THE OPTION TO SELECT QUICKVIEW ATTRIBUTE FOR NOW
    //VA3C.attributes.list.append('<h5>Set quick preview attribute: </h5>');
    //VA3C.attributes.list.append(VA3C.attributes.list.dropDown);

    VA3C.attributes.list.dropDown.change(function()
    {
        VA3C.attributes.list.selectedAttribute = VA3C.attributes.list.dropDown.val();
    });

    /*
    VA3C.attributes.list.onchange=function(){
        //http://stackoverflow.com/questions/1085801/how-to-get-the-selected-value-of-dropdownlist-using-javascript
        //get selected text value
    }
    */

    VA3C.attributes.list.show("slow");
}

function populateHoverPopupList(jsonData)
{
    VA3C.attributes.hoverPopup.empty();

    if (VA3C.attributes.list.selectedAttribute != "")
    {
        //test if selected attribute exists
        if (jsonData.hasOwnProperty(VA3C.attributes.list.selectedAttribute))
        {
            VA3C.attributes.hoverPopup.append(VA3C.attributes.list.selectedAttribute + " : " + jsonData[VA3C.attributes.list.selectedAttribute]);
        }
        else
        {
            VA3C.attributes.hoverPopup.append(VA3C.attributes.list.selectedAttribute + " : N/A" );

            /*
             //otherwise select first possible attribute
             for (var key in jsonData) break;
             VA3C.attributes.hoverPopup.append(key + " : " + jsonData[key] );
             */
        }
    }
    else    //use first JSON attribute:
    {
        for (var k in jsonData) break;
        VA3C.attributes.list.selectedAttribute = k;
        VA3C.attributes.hoverPopup.append(k + " : " + jsonData[k] );
    }
    VA3C.attributes.hoverPopup.width(VA3C.attributes.hoverPopup[0].childNodes[0].length * 8);  //change width of display box
    //console.log("number of characters: " + VA3C.attributes.hoverPopup[0].childNodes[0].length );
}