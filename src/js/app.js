// Import modules
import { ui }  from './ui';
import { theCanvas }  from './canvas'

// Import SCSS
import '../scss/main';

// COLOR PICKER
const colorInfo = document.querySelector("#color-info");
let pickingColor = false;
colorInfo.addEventListener("click", () => {
    pickingColor = !pickingColor;
})

// Get the mouse position in the canvas
function getElementPosition(obj) {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

// Get the canvas position
function getEventLocation(element,event){
    const pos = getElementPosition(element);
    
    return {
        x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

// Transform the RGB color to HEX color
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

// Get the color(image) data from the canvas from the clicked location
theCanvas.canvas.addEventListener("click", e => {
    if(!pickingColor) return;
	const eventLocation = getEventLocation(theCanvas.canvas,e);
    // Get the data of the pixel according to the location generate by the getEventLocation function
    const pixelData = theCanvas.ctx.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 
    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
        coord += " (Transparent color detected, cannot be converted to HEX)";
    }
    let hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    document.querySelector("#colorPalette").value = hex;
    theCanvas.ctx.strokeStyle = hex;
    // Set the color picker to false after user gets the HEX value for the color
    pickingColor = false;
},false);