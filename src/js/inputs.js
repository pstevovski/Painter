import { ui } from './ui';
import { theCanvas } from './canvas'

class Inputs {
    constructor() {
        this.colorInputs = document.querySelectorAll(`input[type="color"]`);
        this.widthInput = document.querySelector("#width-input");
        this.heightInput = document.querySelector("#height-input");
        this.capWidth = document.querySelector("#capWidth");
    }

    // Change the drawing cap size
    changeCapSize(e) {
        e = e || event;

        // Change cap size using the slider
        if(ui.holdingSlider) {
            theCanvas.ctx.lineWidth = e.target.value;
        }

        // If user presses [, decrease size. If user presses ], increase cap size
        if(e.keyCode === 219) {
            theCanvas.ctx.lineWidth--;
            this.capWidth.value = theCanvas.ctx.lineWidth;
        } else if (e.keyCode === 221) {
            theCanvas.ctx.lineWidth++;
            this.capWidth.value = theCanvas.ctx.lineWidth;
        }

        ui.displayChanges("capSize");
    }
}

export const inputs = new Inputs();

// Input field
inputs.capWidth.addEventListener("mousedown", () => ui.holdingSlider = true)
inputs.capWidth.addEventListener("mouseup", () => ui.holdingSlider = false)
inputs.capWidth.addEventListener("mousemove", inputs.changeCapSize.bind(inputs));
inputs.capWidth.addEventListener("click", e => {
    theCanvas.ctx.lineWidth = e.target.value;

    ui.displayChanges("capSize");
});
document.addEventListener("keydown", inputs.changeCapSize.bind(inputs));

// Choose colors for drawing and for the background fill
inputs.colorInputs.forEach(input => input.addEventListener("change", () => {
    if(input.id === 'colorPalette') {
        theCanvas.ctx.strokeStyle = input.value;

        // Display changes
        ui.displayChanges("draw-color");
    } else if (input.id === "backgroundColor") {
        theCanvas.ctx.fillStyle = input.value;
        theCanvas.ctx.fillRect(0, 0, theCanvas.canvas.width, theCanvas.canvas.height);

        // Display changes
        ui.displayChanges("fill-color", input.value);
    }
}))