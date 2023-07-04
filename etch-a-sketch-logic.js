function createDivsGrid(numberOfDivs) {
    const container = document.querySelector(".container");
    for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement("div");
        container.appendChild(div);
    }
}

function getAllDivs() {
    return Array.from(document.querySelectorAll(".container div"));
}

function changeDivColorTo(e, color) {
    const currDiv = e.target;
    currDiv.setAttribute("style", `background-color: ${color};`);
}

function clearAllDivs(e) {
    const allDivs = getAllDivs();
    allDivs.forEach(div => {
        div.style["background-color"] = "white";
    })
}

function getRandomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function run() {
    // mousedown?
    let mousedownValue = false;

    // rainbow mode?
    let rainbowMode = false;

    // color?
    let currentColor = "black";

    let currentGridSize = 16;

    // set up grid
    createDivsGrid(currentGridSize*currentGridSize);
    const arrDivs = getAllDivs();

    // color set up
    pickColorInput = document.getElementsByName("pick-color")[0];
    pickColorInput.addEventListener("input", e => {
        rainbowMode = false;
        currentColor = e.target.value;
    });

    // grid size set up
    selectGridSize = document.getElementsByName("grid-range")[0];
    selectGridSize.addEventListener("input", e => {
        spansGridSize = Array.from(document.querySelectorAll(".grid-size-display"));
        spansGridSize.forEach(spanGridSize => {
            spanGridSize.textContent = e.target.value;
        });
    });

    // toggle between mousedown and mouseup
    arrDivs.forEach(div => div.addEventListener("mousedown", e => {
        mousedownValue = true;
        if (rainbowMode) {
            const randColor = `rgb(${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)})`;
            changeDivColorTo(e, randColor);
        } else {
            changeDivColorTo(e, currentColor);
        }
    }));

    arrDivs.forEach(div => div.addEventListener("mouseup", e => {
        mousedownValue = false;
    }));

    // color
    arrDivs.forEach(div => div.addEventListener("mouseenter", e => {
        if (mousedownValue) {
            if (rainbowMode) {
                const randColor = `rgb(${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)},${getRandomNumBetween(0, 255)})`;
                changeDivColorTo(e, randColor);
            } else {
                changeDivColorTo(e, currentColor);
            }
        }
    }));

    // fix ondragstart behaviour
    arrDivs.forEach(div => div.addEventListener("dragstart", e => {
        e.preventDefault();
    }))

    // setup buttons
    const blackButton = document.querySelector("#black-button");
    blackButton.addEventListener("click", e => {
        currentColor = "black";
        rainbowMode = false;
    });

    const rainbowButton = document.querySelector("#rainbow-button");
    rainbowButton.addEventListener("click", e => {
        rainbowMode = true;
    });

    const eraserButton = document.querySelector("#eraser-button");
    eraserButton.addEventListener("click", e => {
        currentColor = "white";
        rainbowMode = false;
    });

    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", clearAllDivs);
}

run();

