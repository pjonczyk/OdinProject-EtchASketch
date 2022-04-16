let gridSize = 25;
const black = '#000000';
const white = '#FFFFFF';
let currentPaintingColor = black;
let currentFillColor = white;
let mouseDown = false;
let rainBowColors = false;
let gridlines = false;

function drawGrid(gridContainer) {
    for (i = 0; i < gridSize; i++) {
        for (j = 0; j < gridSize; j++) {
            let newDiv = document.createElement('div');
            newDiv.addEventListener('mousedown', handleClick);
            newDiv.addEventListener('mouseover', handleClick);
            newDiv.classList.toggle('gridItem');
            if (gridlines) {
                newDiv.classList.toggle('gridItemBorderColor');
            }
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

document.body.onmousedown = function () {
    mouseDown = true;
}
document.body.onmouseup = function () {
    mouseDown = false;
}

function handleClick(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    }
    if (rainBowColors) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        currentPaintingColor = "#" + randomColor;
    }
    e.target.style.backgroundColor = currentPaintingColor;
}

function onSliderInput(e) {
    console.log(this.value);
    gridSize = this.value;
    let gridContainer = document.querySelector('.gridContainer');
    clearChildren(gridContainer);
    drawGrid(gridContainer);
    gridContainer.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
    let sizeValueDiv = document.querySelector('#sizeValue');
    sizeValueDiv.textContent = gridSize + " x " + gridSize;
}

function onChangeColorPicker(e) {
    currentPaintingColor = e.target.value;
}

function toggleGridlines(e) {
    gridlines = !gridlines;
    let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(gridItem => {
        gridItem.classList.toggle('gridItemBorderColor');
    });
    e.target.classList.toggle('buttonActive');
}

function toggleRainbowMode(e) {
    e.target.classList.toggle('buttonActive');
    rainBowColors = !rainBowColors;
    currentPaintingColor = black;
}

function sizeValueUpdate(e) {
    gridSize = e.target.value;
    let sizeValueDiv = document.querySelector('#sizeValue');
    sizeValueDiv.textContent = gridSize + " x " + gridSize;
}

function initialSetup() {
    let gridContainer = document.querySelector('.gridContainer');
    drawGrid(gridContainer);
    gridContainer.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";

    let slider = document.getElementById("myRange");
    slider.addEventListener('mouseup', onSliderInput);
    slider.addEventListener('input', sizeValueUpdate);
    let clearButton = document.getElementById("resetButton");
    clearButton.addEventListener('click', clearGrid);
    let colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("change", onChangeColorPicker);
    let gridlinesButton = document.getElementById("gridlinesButton");
    gridlinesButton.addEventListener('click', toggleGridlines);
    let rainbowButton = document.getElementById('rainbowButton');
    rainbowButton.addEventListener('click', toggleRainbowMode);
}

initialSetup();