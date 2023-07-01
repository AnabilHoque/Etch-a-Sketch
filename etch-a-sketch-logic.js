// Create 16*16 divs
const container = document.querySelector(".container");
const arrDivs = [];
for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    arrDivs.push(div);
}

//arrDivs.forEach((div) => div.addEventListener(""))

