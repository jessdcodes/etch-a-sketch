function sketch(e){
    let colorPicker = document.querySelector("#color-picker");
    let currentColor = colorPicker.value;

    let mode = document.querySelector("input[name=mode-switch]:checked");
    let currentMode = mode.value;

    if(currentMode==="color-mode") {
        this.style.backgroundColor = getRandomColor();
    } else if (currentMode==="selection-mode") {
        this.style.backgroundColor = currentColor;  
    }

      
}

function loadBoard(size) {
    const board = document.querySelector(".board");
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size*size; i++){
        const squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        squareDiv.style.backgroundColor = "white";
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

loadBoard(16);

addBtnActions();
