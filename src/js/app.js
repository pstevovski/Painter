class Ui {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.menu = document.querySelector(".main-menu");
        this.aboutMenu = document.querySelector(".about-menu");
        this.drawingField = document.querySelector("#main");

        // Buttons
        this.menuBtn = document.querySelector("#draw");
        this.aboutBtn = document.querySelector("#about");
        this.exit = document.querySelector("#exit");
        this.closeAbout = document.querySelector("#close-about");

        // Canvas property
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 50;
    }

    // Display canvas
    displayCanvas(action) {
        if(action === "display") {
            this.drawingField.style.display = "flex";
            this.menu.style.display = "none";
        } else if (action === "hide") {
            this.menu.style.display = "block";
            this.drawingField.style.display = "none";
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
}

// Drawing field
class Canvas {
    constructor() {
        this.lastX = 0;
        this.lastY = 0;
        this.direction = true;
        this.isDrawing = false;
    }

    // Draw on the canvas
    draw(e) {
        // If user is not drawing anymore, end the function
        if(!this.isDrawing) return;

        ui.ctx.beginPath();
        ui.ctx.moveTo(this.lastX, this.lastY);
        ui.ctx.lineTo(e.offsetX, e.offsetY);
        ui.ctx.stroke();

        // Re-save the position
        this.lastX = e.offsetX;
        this.lastY = e.offsetY;

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
ui.exit.addEventListener("click", ui.displayCanvas.bind(ui, "hide"));


// Canvas (drawing) event listeners
ui.canvas.addEventListener("mousedown", e => {
    theCanvas.isDrawing = true;
    theCanvas.lastX = e.offsetX;
    theCanvas.lastY = e.offsetY;
})
ui.canvas.addEventListener("mousemove", theCanvas.draw.bind(theCanvas));
ui.canvas.addEventListener("mouseup", () => theCanvas.isDrawing = false);
ui.canvas.addEventListener("mouseout", () => theCanvas.isDrawing = false);