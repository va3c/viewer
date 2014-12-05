Screen Grabber
===

Usage

1. Click on 'Choose File' and select a template file to start with.  
	Then use the menus to add more files and set things just right.
2. Select the size of the image you would like to create.  
	You may select a default size or enter any width and height you require. 
3. Click 'Grab It' to capture the view.  
	You may keep editing, grabbing and saving as much as needed.
4. Click 'Save It' to call up the file dialog box and save the new image to your device.

***

The code for Sceen grabber is quite fun. It uses a combination of iframe and canvas. Also it does some pre-processing of the the template file.
Before, the template is loaded the string 'preserveDrawingBuffer: true' is added to the renderer call. This is what enables the renderer data to be converted to image data.
Since preserving the drawing buffer causes a time penalty, it is usually not included in most Three,js files. The pre-processing trick is what enables the function.
 
This dialog disappears when you open a file. You may have to move the main menu in order to click the 'Save It' button.