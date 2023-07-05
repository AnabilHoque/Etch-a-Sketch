let currentColor = "black";
let rainbowMode = false;
let mousedownValue = false;

function createGrid(numberOfDivsOneAxis) {
    const container = document.querySelector(".container");
    const maxWidthpx = window.getComputedStyle(container).maxWidth;
    const maxWidth = Number(maxWidthpx.split("p")[0]);
    for (let i = 0; i < numberOfDivsOneAxis*numberOfDivsOneAxis; i++) {
        const div = document.createElement("div");
        container.appendChild(div);
        div.style.height = `${maxWidth/numberOfDivsOneAxis}px`;
        div.style.width = `${maxWidth/numberOfDivsOneAxis}px`;
    }
}

function getDivsInContainer() {
    return Array.from(document.querySelectorAll(".container div"));   
}

function updateTextGridSize(currentGridSize) {
    const spansGridSize = Array.from(document.querySelectorAll(".grid-size-display"));
    spansGridSize.forEach(spanGridSize => {
        spanGridSize.textContent = currentGridSize;
    });

}

function changeDivColorTo(e, color) {
    const currDiv = e.target;
    currDiv.style.backgroundColor = color;
}

function removeEventListenersFromDivs() {
    let currentDivs = getDivsInContainer();
    let totLength = currentDivs.length;
    for (let i = 0; i < totLength; i++) {
        currentDivs[i].replaceWith(currentDivs[i].cloneNode(true));
    }
}

function removeAllDivs() {
    const container = document.querySelector(".container");
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function getRandomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setupDivsMouseDown(currentDivs) {
    currentDivs.forEach(div => div.addEventListener("mousedown", e => {
        mousedownValue = true;
        if (rainbowMode) {
            const randColor = `rgb(${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)})`;
            changeDivColorTo(e, randColor);
        } else {
            changeDivColorTo(e, currentColor);
        }
    }));
}

function setupDivsMouseUp(currentDivs) {
    currentDivs.forEach(div => div.addEventListener("mouseup", e => {
        mousedownValue = false;
    }));
}

function setupdDivsMouseEnter(currentDivs) {
    currentDivs.forEach(div => div.addEventListener("mouseenter", e => {
        if (mousedownValue) {
            if (rainbowMode) {
                const randColor = `rgb(${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)})`;
                changeDivColorTo(e, randColor);
            } else {
                changeDivColorTo(e, currentColor);
            }
        }
    }));
}

function fixDivsDragStart(currentDivs) {
    // fix ondragstart behaviour
    currentDivs.forEach(div => div.addEventListener("dragstart", e => {
        e.preventDefault();
    }))
}

function initialiseDivsEventListeners() {
    const currentDivs = getDivsInContainer();
    setupDivsMouseDown(currentDivs);
    setupDivsMouseUp(currentDivs);
    setupdDivsMouseEnter(currentDivs);
    fixDivsDragStart(currentDivs);
}

function clearAllDivs() {
    const allDivs = getDivsInContainer();
    allDivs.forEach(div => {
        div.style["background-color"] = "white";
    })
}

function run() {
    // variables keeping track of state
    let currentGridSize = 16;

    // Initial 16 by 16 Grid
    createGrid(currentGridSize);

    // initialise divs event listeners
    initialiseDivsEventListeners();

    // set up Grid Size slider + functionality
    let selectGridSize = document.getElementsByName("grid-range")[0];
    selectGridSize.addEventListener("input", e => {
        currentGridSize = e.target.value;
        updateTextGridSize(currentGridSize);
        removeEventListenersFromDivs();
        removeAllDivs();
        createGrid(currentGridSize);
        initialiseDivsEventListeners();
    });

    // color button picker
    const pickColorInput = document.getElementsByName("pick-color")[0];
    pickColorInput.addEventListener("input", e => {
        rainbowMode = false;
        currentColor = e.target.value;
    });

    // black color button
    const blackButton = document.querySelector("#black-button");
    blackButton.addEventListener("click", e => {
        currentColor = "black";
        rainbowMode = false;
    });

    // rainbow mode button
    const rainbowButton = document.querySelector("#rainbow-button");
    rainbowButton.addEventListener("click", e => {
        rainbowMode = true;
    });

    // eraser button
    const eraserButton = document.querySelector("#eraser-button");
    eraserButton.addEventListener("click", e => {
        currentColor = "white";
        rainbowMode = false;
    });

    // clear the grid
    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", clearAllDivs);
}

run();