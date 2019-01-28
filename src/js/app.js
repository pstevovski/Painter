class Ui {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.menu = document.querySelector(".main-menu");
        this.aboutMenu = document.querySelector(".about-menu");
        this.drawingField = document.querySelector("#main");

        // Buttons
        this.menuBtn = document.querySelector("#draw");
        this.aboutBtn = document.querySelector("#about");
        this.save = document.querySelector("#saveDrawing");
        this.exit = document.querySelector("#exit");
        this.closeAbout = document.querySelector("#close-about");
        this.clear = document.querySelector("#clearCanvas");

        // Inputs
        this.capWidth = document.querySelector("#capWidth");
        this.holdingSlider = false;
        this.capTypes = document.querySelectorAll(".cap-type");
        this.lineTypes = document.querySelectorAll(".line-type");
        this.checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
        this.colorInputs = document.querySelectorAll(`input[type="color"]`);

        // Checkbox for toggling between straight line mode on/off
        this.strLineChecked = false;
    }

    // Reset data
    resetData() {
        // Canvas property
        theCanvas.ctx.lineCap = "round";
        theCanvas.ctx.lineJoin = "miter";
        theCanvas.ctx.lineWidth = 20;
        theCanvas.ctx.strokeStyle = "#000000";

        // Reset the values to the default ones
        this.capWidth.value = theCanvas.ctx.lineWidth;
        this.colorInputs.forEach(input => input.value = "#000000");

        // Reset the checkboxes to default ones
        const checkboxes = [...this.checkboxes];
        checkboxes.forEach(cap => cap.checked = false);
        this.lineTypes[0].checked = true;
        this.capTypes[0].checked = true;

        // Display the reseted changes in the UI (text for the inputs)
        ui.displayChanges("all");
        this.displayCanvas("hide");
    }

    // Display canvas
    displayCanvas(action) {
        if(action === "display") {
            this.drawingField.style.display = "flex";
            this.menu.style.display = "none";
            theCanvas.ctx.fillStyle = "#fff";
            theCanvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else if (action === "hide") {
            this.menu.style.display = "block";
            this.drawingField.style.display = "none";

            // If user clicked EXIT, clear the canvas
            theCanvas.clearCanvas();
        }
    }

    // About menu
    openAndCloseMenu(action) {
        if(action === "open") {
            this.aboutMenu.style.display = "block";
        } else if (action === "close") {
            this.aboutMenu.style.display = "none";
        }
    }

    // Filter the clicked checkboxes and pass their name as a line cap and line join property
    filterBoxes(id, name) {
        let boxes = null;
        if(name === "cap-type") {
            // Convert checkboxes node list to an array
            boxes = [...this.capTypes];

            // Filter the checkboxes
            boxes.filter(box => {
                if(box.id !== id) {
                    // Uncheck all the boxes that DON'T match the ID of the clicked box.
                    box.checked = false;
                } else if(box.id === id) {
                    // If user clicks on the same box that is already checked,
                    // it CAN'T be un-checked
                    box.checked = true;

                    // Use the clicked box name as a property for the cap type
                    theCanvas.ctx.lineCap = box.name;
                }
            })
        } else if (name === "line-type") {
            // Convert checkboxes node list to an array
            boxes = [...this.lineTypes];

            // Filter the checkboxes
            boxes.filter(box => {
                if(box.id !== id) {
                    // Uncheck all the boxes that DON'T match the ID of the clicked box.
                    box.checked = false;
                } else if(box.id === id) {
                    // If user clicks on the same box that is already checked,
                    // it can not be un-checked
                    box.checked = true;

                    // Use the clicked box name as a property for the line type
                    theCanvas.ctx.lineJoin = box.name;
                }
            })
        } else {
            boxes = [...this.checkboxes];

            boxes.filter(box => {
                if(box.id === "strLine") {
                    this.strLineChecked = !this.strLineChecked;
                }
            });
        }
    }

    // Save the drawing
    saveDrawing() {
        this.save.href = this.canvas.toDataURL();
        this.save.download = "mypainting.png"; 
    }

    // Display notifications
    displayNotification(notification) {
        if(notification === "decreased") {
            console.log("The cap size has been decreased")
        } else {
            console.log("The cap size has been increased");
        }
    }

    // Display changes made to the cap size, drawing color and background fill.
    displayChanges(change, value) {
        const capSizeText = document.querySelector("#current-capSize");
        const drawColorText = document.querySelector("#current-drawColor");
        const fillColorText = document.querySelector("#current-bgColor");

        if(change === "capSize") {
            // Change the text value for the cap size
            capSizeText.textContent = `${theCanvas.ctx.lineWidth}px`;
        } else if (change === "draw-color") {
            drawColorText.textContent = `${theCanvas.ctx.strokeStyle}`;
        } else if (change === "fill-color") {
            fillColorText.textContent = `${value}`;
        } else if (change === "all") {
            capSizeText.textContent = `${theCanvas.ctx.lineWidth}px`;
            drawColorText.textContent = `${theCanvas.ctx.strokeStyle}`;
            fillColorText.textContent = `none`;
        }
    }
}

// Drawing field
class Canvas {
    constructor() {
        this.lastX = 0;
        this.lastY = 0;
        this.direction = true;
        this.isDrawing = false;
        this.ctx = ui.canvas.getContext("2d");

        // Canvas property
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "miter";
        this.ctx.lineWidth = 20;
        this.ctx.strokeStyle = "#000000";

        // Drawing a straight line
        this.needFirstPoint = true;
    }

    // Draw on the canvas
    draw(e) {
        // If user is not drawing anymore, end the function
        if(!this.isDrawing) return;

        if(!ui.strLineChecked) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(e.offsetX, e.offsetY);
            this.ctx.stroke();
    
            // Re-save the position
            this.lastX = e.offsetX;
            this.lastY = e.offsetY;
        }
    }

    // Draw a straight line between two button clicks
    drawStraightLine(x, y) {
        if(ui.strLineChecked) {
            if(this.needFirstPoint) {
                console.log(ui.strLineChecked);
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.needFirstPoint = false;
            } else {
                this.ctx.lineTo(x, y)
                this.ctx.stroke();
                this.needFirstPoint = true;
            }
        }
    }

    // Change cap width
    changeCapSize(e) {
        e = e || event;

        // Change cap size using the slider
        if(ui.holdingSlider) {
            let { value } = e.target;
            this.ctx.lineWidth = value;
        }

        // If user presses [, decrease size. If user presses ], increase cap size
        if(e.keyCode === 219) {
            this.ctx.lineWidth--;
            ui.capWidth.value = this.ctx.lineWidth;

            // Display notification that cap size has been changed
            ui.displayNotification("decreased")
        } else if (e.keyCode === 221) {
            this.ctx.lineWidth++;
            ui.capWidth.value = this.ctx.lineWidth;

            // Display notification that cap size has been changed
            ui.displayNotification("increased")
        }

        ui.displayChanges("capSize");
    }

    // Clear the canvas
    clearCanvas() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

}

const ui = new Ui();
const theCanvas = new Canvas();

// About menu event listeners
ui.aboutBtn.addEventListener("click", ui.openAndCloseMenu.bind(ui, "open"));;
ui.closeAbout.addEventListener("click", ui.openAndCloseMenu.bind(ui, "close"));
document.body.addEventListener("keyup", e => {
    e = e || event;
    if (e.keyCode === 27) {
        ui.openAndCloseMenu("close");
    }
})

// Draw menu listeners
ui.menuBtn.addEventListener("click", ui.displayCanvas.bind(ui, "display"));
ui.exit.addEventListener("click", ui.resetData.bind(ui));


// Canvas (drawing) event listeners
ui.canvas.addEventListener("mousedown", e => {
    theCanvas.isDrawing = true;
    theCanvas.lastX = e.offsetX;
    theCanvas.lastY = e.offsetY;
})
ui.canvas.addEventListener("mousemove", theCanvas.draw.bind(theCanvas));
ui.canvas.addEventListener("mouseup", () => theCanvas.isDrawing = false);
ui.canvas.addEventListener("mouseout", () => theCanvas.isDrawing = false);
ui.clear.addEventListener("click", theCanvas.clearCanvas.bind(theCanvas));

ui.save.addEventListener("click", ui.saveDrawing.bind(ui));

// Input field
ui.capWidth.addEventListener("mousemove", theCanvas.changeCapSize.bind(theCanvas));
ui.capWidth.addEventListener("mousedown", () => ui.holdingSlider = true)
ui.capWidth.addEventListener("mouseup", () => ui.holdingSlider = false)
document.addEventListener("keydown", theCanvas.changeCapSize.bind(theCanvas));

// Add a click event to each checkbox and pass the clicked box id and class name to the
// filterBoxes function in the UI class.
ui.checkboxes.forEach(box => box.addEventListener("click", () => {
    const id = box.id;
    const name = box.className;
    ui.filterBoxes(id, name);
}))
ui.canvas.addEventListener("click", e => {
    let x = e.offsetX;
    let y = e.offsetY;
    theCanvas.drawStraightLine(x, y);
})

// Choose colors for drawing and for the background fill
ui.colorInputs.forEach(input => input.addEventListener("change", () => {
    if(input.id === 'colorPalette') {
        theCanvas.ctx.strokeStyle = input.value;

        // Display changes
        ui.displayChanges("draw-color");
    } else if (input.id === "backgroundColor") {
        let passedValue = JSON.stringify(input.value);
        theCanvas.ctx.fillStyle = input.value;
        theCanvas.ctx.fillRect(0, 0, ui.canvas.width, ui.canvas.height);

        // Display changes
        ui.displayChanges("fill-color", passedValue);
    }
}))


// COLOR PICKER
const colorInfo = document.querySelector("#color-info");
let pickingColor = false;

colorInfo.addEventListener("click", () => {
    pickingColor = !pickingColor;
})

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

function getEventLocation(element,event){
    const pos = getElementPosition(element);
    
    return {
        x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

ui.canvas.addEventListener("click", e => {
    if(!pickingColor) return;
	const eventLocation = getEventLocation(ui.canvas,e);
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