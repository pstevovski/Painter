import { theCanvas } from './canvas'

class Ui {
    constructor() {
        this.menu = document.querySelector(".main-menu");
        this.aboutMenu = document.querySelector(".about-menu");
        this.drawingField = document.querySelector("#main");

        // Buttons
        this.menuBtn = document.querySelector("#draw");
        this.aboutBtn = document.querySelector("#about");
        this.save = document.querySelector("#saveDrawing");
        this.exit = document.querySelector("#exit");
        this.closeAbout = document.querySelector("#close-about");

        // Inputs
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
        theCanvas.capWidth.value = theCanvas.ctx.lineWidth;
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
            theCanvas.ctx.fillRect(0, 0, theCanvas.canvas.width, theCanvas.canvas.height);
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
        this.save.href = theCanvas.canvas.toDataURL();
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

export const ui = new Ui();

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
ui.save.addEventListener("click", ui.saveDrawing.bind(ui));
ui.checkboxes.forEach(box => box.addEventListener("click", () => {
    const id = box.id;
    const name = box.className;
    ui.filterBoxes(id, name);
}))

// Choose colors for drawing and for the background fill
ui.colorInputs.forEach(input => input.addEventListener("change", () => {
    if(input.id === 'colorPalette') {
        theCanvas.ctx.strokeStyle = input.value;

        // Display changes
        ui.displayChanges("draw-color");
    } else if (input.id === "backgroundColor") {
        let passedValue = JSON.stringify(input.value);
        theCanvas.ctx.fillStyle = input.value;
        theCanvas.ctx.fillRect(0, 0, theCanvas.canvas.width, theCanvas.canvas.height);

        // Display changes
        ui.displayChanges("fill-color", passedValue);
    }
}))