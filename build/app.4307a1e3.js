parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"JyuG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.theCanvas=void 0;var t=require("./ui");function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var s=function(){function i(){e(this,i),this.lastX=0,this.lastY=0,this.direction=!0,this.isDrawing=!1,this.canvas=document.querySelector("#canvas"),this.ctx=this.canvas.getContext("2d"),this.clear=document.querySelector("#clearCanvas"),this.ctx.lineCap="round",this.ctx.lineJoin="miter",this.ctx.lineWidth=20,this.ctx.strokeStyle="#000000",this.needFirstPoint=!0}return n(i,[{key:"draw",value:function(e){this.isDrawing&&(t.ui.strLineChecked||(this.ctx.beginPath(),this.ctx.moveTo(this.lastX,this.lastY),this.ctx.lineTo(e.offsetX,e.offsetY),this.ctx.stroke(),this.lastX=e.offsetX,this.lastY=e.offsetY))}},{key:"drawStraightLine",value:function(e,i){t.ui.strLineChecked&&(this.needFirstPoint?(this.ctx.beginPath(),this.ctx.moveTo(e,i),this.needFirstPoint=!1):(this.ctx.lineTo(e,i),this.ctx.stroke(),this.needFirstPoint=!0))}},{key:"clearCanvas",value:function(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)}}]),i}(),a=new s;exports.theCanvas=a,a.canvas.addEventListener("mousedown",function(t){a.isDrawing=!0,a.lastX=t.offsetX,a.lastY=t.offsetY}),a.canvas.addEventListener("mousemove",a.draw.bind(a)),a.canvas.addEventListener("mouseup",function(){return a.isDrawing=!1}),a.canvas.addEventListener("mouseout",function(){return a.isDrawing=!1}),a.clear.addEventListener("click",a.clearCanvas.bind(a)),a.canvas.addEventListener("click",function(t){var e=t.offsetX,i=t.offsetY;a.drawStraightLine(e,i)});
},{"./ui":"DrAD"}],"Iryg":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.inputs=void 0;var e=require("./ui"),t=require("./canvas");function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}var r=function(){function i(){n(this,i),this.colorInputs=document.querySelectorAll('input[type="color"]'),this.widthInput=document.querySelector("#width-input"),this.heightInput=document.querySelector("#height-input"),this.capWidth=document.querySelector("#capWidth")}return a(i,[{key:"changeCapSize",value:function(n){n=n||event,e.ui.holdingSlider&&(t.theCanvas.ctx.lineWidth=n.target.value),219===n.keyCode?(t.theCanvas.ctx.lineWidth--,this.capWidth.value=t.theCanvas.ctx.lineWidth):221===n.keyCode&&(t.theCanvas.ctx.lineWidth++,this.capWidth.value=t.theCanvas.ctx.lineWidth),e.ui.displayChanges("capSize")}}]),i}(),c=new r;exports.inputs=c,c.capWidth.addEventListener("mousedown",function(){return e.ui.holdingSlider=!0}),c.capWidth.addEventListener("mouseup",function(){return e.ui.holdingSlider=!1}),c.capWidth.addEventListener("mousemove",c.changeCapSize.bind(c)),c.capWidth.addEventListener("click",function(n){t.theCanvas.ctx.lineWidth=n.target.value,e.ui.displayChanges("capSize")}),document.addEventListener("keydown",c.changeCapSize.bind(c)),c.colorInputs.forEach(function(n){return n.addEventListener("change",function(){"colorPalette"===n.id?(t.theCanvas.ctx.strokeStyle=n.value,e.ui.displayChanges("draw-color")):"backgroundColor"===n.id&&(t.theCanvas.ctx.fillStyle=n.value,t.theCanvas.ctx.fillRect(0,0,t.theCanvas.canvas.width,t.theCanvas.canvas.height),e.ui.displayChanges("fill-color",n.value))})});
},{"./ui":"DrAD","./canvas":"JyuG"}],"DrAD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ui=void 0;var e=require("./canvas"),t=require("./inputs");function n(e){return s(e)||a(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function s(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}var l=function(){function i(){c(this,i),this.menu=document.querySelector(".main-menu"),this.newProjectWindow=document.querySelector(".new-project_window"),this.aboutMenu=document.querySelector(".about-menu"),this.drawingField=document.querySelector("#main"),this.isCanvasCreated=!1,this.newProjectBtn=document.querySelector("#new-project"),this.startDrawingBtn=document.querySelector("#draw"),this.goBackBtn=document.querySelector("#goBack"),this.aboutBtn=document.querySelector("#about"),this.save=document.querySelector("#saveDrawing"),this.exit=document.querySelector("#exit"),this.closeAbout=document.querySelector("#close-about"),this.holdingSlider=!1,this.capTypes=document.querySelectorAll(".cap-type"),this.lineTypes=document.querySelectorAll(".line-type"),this.checkboxes=document.querySelectorAll('input[type="checkbox"]'),this.strLineChecked=!1}return r(i,[{key:"resetData",value:function(){this.setCanvasProperties(),e.theCanvas.canvas.width=800,e.theCanvas.canvas.height=500,t.inputs.widthInput.value=800,t.inputs.heightInput.value=500,this.isCanvasCreated=!1,document.querySelector("#show-warning").style.display="none",d.displayChanges("all"),this.displayCanvas("hide")}},{key:"displayNewProject",value:function(e){"display"===e?(this.newProjectWindow.style.display="block",this.menu.style.display="none",this.isCanvasCreated&&(document.querySelector("#show-warning").style.display="block",this.newProjectWindow.classList.add("active"))):"hide"===e&&(this.newProjectWindow.style.display="none",this.isCanvasCreated||(this.menu.style.display="block"))}},{key:"displayCanvas",value:function(t){"display"===t?(this.drawingField.style.display="grid",this.newProjectWindow.style.display="none",this.setCanvasProperties(),e.theCanvas.ctx.fillStyle="#fff",e.theCanvas.ctx.fillRect(0,0,e.theCanvas.canvas.width,e.theCanvas.canvas.height),this.isCanvasCreated=!0):"hide"===t&&(this.menu.style.display="block",this.drawingField.style.display="none",this.newProjectWindow.classList.remove("active"),e.theCanvas.clearCanvas())}},{key:"setCanvasProperties",value:function(){e.theCanvas.canvas.width=t.inputs.widthInput.value,e.theCanvas.canvas.height=t.inputs.heightInput.value,e.theCanvas.ctx.lineCap="round",e.theCanvas.ctx.lineJoin="miter",e.theCanvas.ctx.lineWidth=20,t.inputs.capWidth.value=e.theCanvas.ctx.lineWidth,document.querySelector("#current-capSize").textContent="".concat(e.theCanvas.ctx.lineWidth,"px"),t.inputs.capWidth.value=e.theCanvas.ctx.lineWidth,t.inputs.colorInputs.forEach(function(e){return e.value="#000000"}),n(this.checkboxes).forEach(function(e){return e.checked=!1}),this.lineTypes[0].checked=!0,this.capTypes[0].checked=!0,this.displayChanges("all")}},{key:"openAndCloseMenu",value:function(e){"open"===e?this.aboutMenu.style.display="block":"close"===e&&(this.aboutMenu.style.display="none")}},{key:"filterBoxes",value:function(t,i){var a=this;"cap-type"===i?n(this.capTypes).filter(function(n){n.id!==t?n.checked=!1:n.id===t&&(n.checked=!0,e.theCanvas.ctx.lineCap=n.name)}):"line-type"===i?n(this.lineTypes).filter(function(n){n.id!==t?n.checked=!1:n.id===t&&(n.checked=!0,e.theCanvas.ctx.lineJoin=n.name)}):n(this.checkboxes).filter(function(e){"strLine"===e.id&&(a.strLineChecked=!a.strLineChecked)})}},{key:"saveDrawing",value:function(){this.save.href=e.theCanvas.canvas.toDataURL(),this.save.download="mypainting.png"}},{key:"displayChanges",value:function(t,n){var i=document.querySelector("#current-capSize"),a=document.querySelector("#current-drawColor"),s=document.querySelector("#current-bgColor");"capSize"===t?i.textContent="".concat(e.theCanvas.ctx.lineWidth,"px"):"draw-color"===t?a.textContent="".concat(e.theCanvas.ctx.strokeStyle):"fill-color"===t?s.textContent="".concat(n):"all"===t&&(i.textContent="".concat(e.theCanvas.ctx.lineWidth,"px"),a.textContent="".concat(e.theCanvas.ctx.strokeStyle),s.textContent="none")}}]),i}(),d=new l;exports.ui=d,d.aboutBtn.addEventListener("click",d.openAndCloseMenu.bind(d,"open")),d.closeAbout.addEventListener("click",d.openAndCloseMenu.bind(d,"close")),document.body.addEventListener("keyup",function(e){27===(e=e||event).keyCode&&d.openAndCloseMenu("close")}),d.startDrawingBtn.addEventListener("click",d.displayCanvas.bind(d,"display")),d.exit.addEventListener("click",d.resetData.bind(d)),d.save.addEventListener("click",d.saveDrawing.bind(d)),d.checkboxes.forEach(function(e){return e.addEventListener("click",function(){var t=e.id,n=e.className;d.filterBoxes(t,n)})}),d.newProjectBtn.addEventListener("click",d.displayNewProject.bind(d,"display")),d.goBackBtn.addEventListener("click",d.displayNewProject.bind(d,"hide")),document.querySelector("#canvas-size").addEventListener("click",d.displayNewProject.bind(d,"display"));
},{"./canvas":"JyuG","./inputs":"Iryg"}],"zACl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.history=void 0;var e=require("./canvas");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function o(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}var r=function(){function e(){t(this,e),this.redo_list=[],this.undo_list=[],this.undoBtn=document.querySelector("#undo"),this.redoBtn=document.querySelector("#redo")}return o(e,[{key:"saveState",value:function(e,t,n){(n=n||!1)||(this.redo_list=[]),(t||this.undo_list).push(e.toDataURL())}},{key:"undo",value:function(e,t){this.restoreState(e,t,this.undo_list,this.redo_list)}},{key:"redo",value:function(e,t){this.restoreState(e,t,this.redo_list,this.undo_list)}},{key:"restoreState",value:function(e,t,n,o){if(n.length){this.saveState(e,o,!0);var r=n.pop(),i=new Image;i.setAttribute("src",r),i.onload=function(){t.clearRect(0,0,e.width,e.height),t.drawImage(i,0,0,e.width,e.height)}}}},{key:"keyCapture",value:function(e){(e=e||event).ctrlKey&&90===e.keyCode&&this.undo(a,s),e.ctrlKey&&89===e.keyCode&&this.redo(a,s)}}]),e}(),i=new r;exports.history=i;var a=e.theCanvas.canvas,s=e.theCanvas.ctx;i.undoBtn.addEventListener("click",i.undo.bind(i,a,s)),i.redoBtn.addEventListener("click",i.redo.bind(i,a,s)),e.theCanvas.canvas.addEventListener("mousedown",function(){return i.saveState(a)}),document.addEventListener("keyup",i.keyCapture.bind(i));
},{"./canvas":"JyuG"}],"fx60":[function(require,module,exports) {

},{}],"QdeU":[function(require,module,exports) {
"use strict";var e=require("./ui"),t=require("./inputs"),r=require("./controlHistory"),n=require("./canvas");require("../scss/main");var a=document.querySelector("#color-info"),o=!1;function c(e){var t=0,r=0;if(e.offsetParent){do{t+=e.offsetLeft,r+=e.offsetTop}while(e=e.offsetParent);return{x:t,y:r}}}function i(e,t){var r=c(e);return{x:t.pageX-r.x,y:t.pageY-r.y}}function s(e,t,r){if(e>255||t>255||r>255)throw"Invalid color component";return(e<<16|t<<8|r).toString(16)}a.addEventListener("click",function(){o=!o}),n.theCanvas.canvas.addEventListener("click",function(e){if(o){var t=i(n.theCanvas.canvas,e),r=n.theCanvas.ctx.getImageData(t.x,t.y,1,1).data;0==r[0]&&0==r[1]&&0==r[2]&&0==r[3]&&(coord+=" (Transparent color detected, cannot be converted to HEX)");var a="#"+("000000"+s(r[0],r[1],r[2])).slice(-6);document.querySelector("#colorPalette").value=a,n.theCanvas.ctx.strokeStyle=a,o=!1}},!1);
},{"./ui":"DrAD","./inputs":"Iryg","./controlHistory":"zACl","./canvas":"JyuG","../scss/main":"fx60"}]},{},["QdeU"], null)
//# sourceMappingURL=/app.4307a1e3.map