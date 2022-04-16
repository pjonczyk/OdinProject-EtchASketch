let gridSize = 25;
const black = '#000000';
const white = '#FFFFFF';
let currentPaintingColor = black;
let currentFillColor = white;

function drawGrid(gridContainer) {
    for (i = 0; i < gridSize; i++) {
        for (j = 0; j < gridSize; j++) {
            let newDiv = document.createElement('div');
            newDiv.addEventListener('mousedown', handleClick);
            newDiv.classList.toggle('gridItem');
            newDiv.classList.toggle('gridItemBorderColor');
            gridContainer.appendChild(newDiv);
        }
    }
}

function clearChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function clearGrid() {
    let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = white;
    });
}

function handleClick(e) {
    e.target.style.backgroundColor = currentPaintingColor;
}

function onSliderInput(e) {
    console.log(this.value);
    gridSize = this.value;
    let gridContainer = document.querySelector('.gridContainer');
    clearChildren(gridContainer);
    drawGrid(gridContainer);
    gridContainer.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
}

function onChangeColorPicker(e) {
    currentPaintingColor = e.target.value;
}

function toggleGridlines(e) {
    let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(gridItem => {
        gridItem.classList.toggle('gridItemBorderColor');
    });
    e.target.classList.toggle('gridlinesButtonActive');
}

function initialSetup() {
    let gridContainer = document.querySelector('.gridContainer');
    drawGrid(gridContainer);

    let slider = document.getElementById("myRange");
    slider.addEventListener('mouseup', onSliderInput);
    let clearButton = document.getElementById("resetButton");
    clearButton.addEventListener('click', clearGrid);
    let colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("change", onChangeColorPicker);
    let gridlinesButton = document.getElementById("gridlinesButton");
    gridlinesButton.addEventListener('click', toggleGridlines);

}

initialSetup();