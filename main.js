function sketch(e){
    let colorPicker = document.querySelector("#color-picker");
    let selectedColor = colorPicker.value;

    let mode = document.querySelector("input[name=mode-switch]:checked");
    let currentMode = mode.value;

    let currentColor = this.style.backgroundColor;
    if(currentMode==="color-mode") {
            this.style.backgroundColor = getRandomColor();
    } else if (currentMode==="selection-mode") {
        this.style.backgroundColor = selectedColor;  
    } else {
        let rgb = getRGBValues(currentColor);
        console.log (rgb);
        this.style.backgroundColor = reduceRGB(rgb);
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
        div.addEventListener('mouseover', sketch);
    });
}

function promptGridSizeInput(){
    const gridSize = prompt("Enter grid size (2-100): ");

    if(gridSize < 2 || gridSize > 100){
      promptGridSizeInput();
    } else {
      loadBoard(gridSize);
    }
}

function resetBoard(){
    const squareDivs = document.querySelectorAll(".square");
    squareDivs.forEach(div => {
        div.style.backgroundColor = "white";
    });
}

function addBtnActions(){
    const gridBtn = document.querySelector("#grid-size-btn");
    gridBtn.addEventListener('click', promptGridSizeInput);

    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener('click', resetBoard);
}

function getRandomColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const randomColor = "rgb("+red+","+green+","+blue+")";

    return randomColor;
}

function getRGBValues(str) {
    let rgbValues = str.substring(str.indexOf('(') +1, str.length -1).split(', ');
    return {
      'r': rgbValues[0],
      'g': rgbValues[1],
      'b': rgbValues[2]
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

    const rgbStr = `rgb(${updatedRgb['r']}, ${updatedRgb['g']}, ${updatedRgb['b']})`;
    return rgbStr;
}

loadBoard(16);

addBtnActions();
