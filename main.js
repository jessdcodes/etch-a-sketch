function sketch(e){
    console.log(e);
    this.style.backgroundColor ="rgb(213, 180, 221)";
}

function loadBoard() {
    const board = document.querySelector(".board");
    board.style.gridTemplateColumns = "repeat(16, 1fr)";
    board.style.gridTemplateRows = "repeat(16, 1fr)";

    for(let i = 0; i < 16*16; i++){
        const squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        board.insertAdjacentElement("afterbegin", squareDiv);
    }

    const squareDivs = document.querySelectorAll(".square");
    squareDivs.forEach(div => {
        div.addEventListener('mouseover', sketch);
    });
}

loadBoard();