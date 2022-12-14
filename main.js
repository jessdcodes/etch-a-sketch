function sketch(e){
    let colorPicker = document.querySelector("#color-picker");
    let selectedColor = colorPicker.value;

    let mode = document.querySelector("input[name=mode-switch]:checked");
    let currentMode = mode.value;

    let currentColor = this.style.backgroundColor;

    if(eraseMode()){
        this.style.backgroundColor = "rgb(255,255,255)";
    } else {
        if(currentMode==="rainbow-mode") {
            this.style.backgroundColor = getRandomColor();
        } else if (currentMode==="color-mode") {
            this.style.backgroundColor = selectedColor;  
        } else if (currentMode==="black-mode"){
            let rgb = getRGBValues(currentColor);
            this.style.backgroundColor = reduceRGB(rgb);
        }
    }
}

function loadBoard(size) {
    const board = document.querySelector(".board");
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size*size; i++){
        const squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        squareDiv.style.backgroundColor = "rgb(255,255,255)";
        board.insertAdjacentElement("afterbegin", squareDiv);
    }

    const squareDivs = document.querySelectorAll(".square");
    squareDivs.forEach(div => {
        div.addEventListener("mouseover", sketch);
    });
}

function resetBoard(){
    const squareDivs = document.querySelectorAll(".square");
    squareDivs.forEach(div => {
        div.style.backgroundColor = "rgb(255,255,255)";
    });
}

function eraseMode(){
    const eraserBtn = document.querySelector("#eraser-btn");
    const eraserBtnHover = "rgb(255, 237, 100)";
    console.log(eraserBtn.style.backgroundColor+", "+eraserBtnHover);
    if(eraserBtn.style.backgroundColor === eraserBtnHover){
        return true;
    }

    return false;
}

function clickEraser(){
    const eraserBtn = document.querySelector("#eraser-btn");
    const eraserBtnDefault = "rgb(255, 255, 255)";
    const eraserBtnHover = "rgb(255, 237, 100)";

    console.log("inside click"+eraserBtn.style.backgroundColor+", "+eraserBtnHover);
    // to enable the button
    if(eraserBtn.style.backgroundColor != eraserBtnHover){
        eraserBtn.style.backgroundColor = eraserBtnHover;
    } 
    // to disable the button
    else {
        eraserBtn.style.backgroundColor = eraserBtnDefault;
    }
    
}

function addBtnActions(){
    const eraserBtn = document.querySelector("#eraser-btn");
    eraserBtn.addEventListener("click", clickEraser);

    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener("click", resetBoard);
}

function addModeToggleActions(){
    const rainbowMode = document.querySelector("input[id=rainbow-mode]");
    const blackMode = document.querySelector("input[id=black-mode]");
    const colorMode = document.querySelector("input[id=color-mode]");

    rainbowMode.addEventListener("click", disableColorPicker);
    blackMode.addEventListener("click", disableColorPicker);
    colorMode.addEventListener("click", enableColorPicker);
}

function disableColorPicker(){
    let colorPicker = document.querySelector("#color-picker");
    colorPicker.disabled = true;
    colorPicker.style.backgroundColor = "#e4e4e4";
}

function enableColorPicker(){
    let colorPicker = document.querySelector("#color-picker");
    colorPicker.disabled = false;
    colorPicker.style.backgroundColor = "white";

    colorPicker.addEventListener("mouseenter", () => {
        colorPicker.style.backgroundColor = "#ffED64";
    });
    colorPicker.addEventListener("mouseleave", () => {
        colorPicker.style.backgroundColor = "white";
    });
}

function getRandomColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const randomColor = "rgb("+red+","+green+","+blue+")";

    return randomColor;
}

function getRGBValues(str) {
    let rgbValues = str.substring(str.indexOf("(") +1, str.length -1).split(", ");
    return {
      "r": rgbValues[0],
      "g": rgbValues[1],
      "b": rgbValues[2]
    };
  }

function reduceRGB(rgb){
    let updatedRgb = {};

    for(const key in rgb){
        // Reduce 12 percent of rgb value for darker shade 
        let reducedColor = rgb[key] - (255 *0.12);
        if(reducedColor > 0) {
            rgb[key] = reducedColor;
        } else {
            // Max value for dark/black shade
            reducedColor = 0;
        }

        updatedRgb[key] = reducedColor;
    }

    const rgbStr = `rgb(${updatedRgb["r"]}, ${updatedRgb["g"]}, ${updatedRgb["b"]})`;
    return rgbStr;
}

function updateGridSizeHeader(sizeValue){
    const sizeHeader = document.querySelector("#size-display");
    sizeHeader.textContent = `${sizeValue} x ${sizeValue}`;

    loadBoard(sizeValue);
}

function addSizeRangeActions(){
    let sizeSlider = document.querySelector("#size-slider");
    sizeSlider.addEventListener("change", (e) => {
        updateGridSizeHeader(sizeSlider.value);
    });
}

loadBoard(16);

addBtnActions();
addModeToggleActions();
enableColorPicker();
addSizeRangeActions();