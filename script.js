let gridSize = 25;

function drawGrid(gridContainer) {
    for (i = 0; i < gridSize; i++) {
        for (j = 0; j < gridSize; j++) {
            let newDiv = document.createElement("div");
            newDiv.addEventListener('click', handleClick);
            newDiv.classList.add('gridItem');
            gridContainer.appendChild(newDiv);
        }
    }
}

function clearChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function handleClick(e) {
    e.target.style.backgroundColor = 'black';
}

function onSliderInput(e) {
    console.log(this.value);
    gridSize = this.value;
    let gridContainer = document.querySelector('.gridContainer');
    clearChildren(gridContainer);
    drawGrid(gridContainer);
    gridContainer.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
}

function initialSetup() {
    let gridContainer = document.querySelector('.gridContainer');
    drawGrid(gridContainer);

    let slider = document.getElementById("myRange");
    slider.addEventListener('mouseup', onSliderInput);
}

initialSetup();