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
    currDiv.setAttribute("style", `background-color:${color}`);
}

function clearAllDivs(e) {
    const allDivs = getAllDivs();
    allDivs.forEach(div => {
        div.style["background-color"] = "white";
    })
}

function run() {
    // mousedown?
    let mousedownValue = false;

    // color?
    let currentColor = "black";

    // set up grid
    createDivsGrid(256);
    const arrDivs = getAllDivs();

    // toggle between mousedown and mouseup
    arrDivs.forEach(div => div.addEventListener("mousedown", e => {
        mousedownValue = true;
        changeDivColorTo(e, currentColor);
    }));
    arrDivs.forEach(div => div.addEventListener("mouseup", e => {
        mousedownValue = false;
    }));

    // color
    arrDivs.forEach(div => div.addEventListener("mouseenter", e => {
        if (mousedownValue) {
            changeDivColorTo(e, currentColor);
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
    });

    const eraserButton = document.querySelector("#eraser-button");
    eraserButton.addEventListener("click", e => {
        currentColor = "white";
    });

    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", clearAllDivs);
}

run();

