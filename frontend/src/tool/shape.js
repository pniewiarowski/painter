const HTMLToolShapeRectangle = document.getElementById("tool-shape-rectangle");
const HTMLToolShapeCircle = document.getElementById("tool-shape-circle");
const HTMLToolShapeLine = document.getElementById("tool-shape-line");
const HTMLCanvas = document.getElementById("canvas");

const TOOLS = {
    RECTANGLE: "rect",
    CIRCLE: "circle",
    LINE: "line",
};

let SELECTED_TOOL = "line";
let SELECTED_TOOL_MEMORY = "line";
let IS_DRAWING = false;
let START_X;
let START_Y;
let CURRENT_ELEMENT;
let SELECTED_ELEMENT;

HTMLToolShapeRectangle.addEventListener("click", () => {
    setTool(TOOLS.RECTANGLE);
});

HTMLToolShapeCircle.addEventListener("click", () => {
    setTool(TOOLS.CIRCLE);
});

HTMLToolShapeLine.addEventListener("click", () => {
    setTool(TOOLS.LINE);
});

function setTool(tool) {
    SELECTED_TOOL_MEMORY = tool;
    SELECTED_TOOL = tool;
}

HTMLCanvas.addEventListener("mousedown", function (event) {
    START_X = event.offsetX;
    START_Y = event.offsetY;
    IS_DRAWING = true;

    switch (SELECTED_TOOL) {
        case TOOLS.LINE:
            CURRENT_ELEMENT = document.createElementNS("http://www.w3.org/2000/svg", "line");
            CURRENT_ELEMENT.setAttribute("x1", START_X);
            CURRENT_ELEMENT.setAttribute("y1", START_Y);
            CURRENT_ELEMENT.setAttribute("x2", START_X);
            CURRENT_ELEMENT.setAttribute("y2", START_Y);
            CURRENT_ELEMENT.setAttribute("stroke", "black");
            break;
        case TOOLS.CIRCLE:
            CURRENT_ELEMENT = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            CURRENT_ELEMENT.setAttribute("cx", START_X);
            CURRENT_ELEMENT.setAttribute("cy", START_Y);
            CURRENT_ELEMENT.setAttribute("r", 0);
            CURRENT_ELEMENT.setAttribute("stroke", "black");
            CURRENT_ELEMENT.setAttribute("fill", "transparent");
            break;
        case TOOLS.RECTANGLE:
            CURRENT_ELEMENT = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            CURRENT_ELEMENT.setAttribute("x", START_X);
            CURRENT_ELEMENT.setAttribute("y", START_Y);
            CURRENT_ELEMENT.setAttribute("width", 0);
            CURRENT_ELEMENT.setAttribute("height", 0);
            CURRENT_ELEMENT.setAttribute("stroke", "black");
            CURRENT_ELEMENT.setAttribute("fill", "transparent");
            break;
    }

    HTMLCanvas.appendChild(CURRENT_ELEMENT);
});

HTMLCanvas.addEventListener("mousemove", (event) => {
    if (!IS_DRAWING) {
        return;
    }

    switch (SELECTED_TOOL) {
        case TOOLS.LINE:
            CURRENT_ELEMENT.setAttribute("x2", event.offsetX);
            CURRENT_ELEMENT.setAttribute("y2", event.offsetY);
            break;
        case TOOLS.RECTANGLE:
            CURRENT_ELEMENT.setAttribute("width", Math.abs(event.offsetX - START_X));
            CURRENT_ELEMENT.setAttribute("height", Math.abs(event.offsetY - START_Y));
            break;
        case TOOLS.CIRCLE:
            const radius = Math.sqrt(Math.pow(event.offsetX - START_X, 2) + Math.pow(event.offsetY - START_Y, 2));
            CURRENT_ELEMENT.setAttribute("r", radius);
            break;
    }
});

HTMLCanvas.addEventListener("mouseup", () => IS_DRAWING = false);

HTMLCanvas.addEventListener("mousedown", (event) => {
    if (event.target.tagName === TOOLS.LINE || event.target.tagName === TOOLS.RECTANGLE || event.target.tagName === TOOLS.CIRCLE) {
        setTool("");
        SELECTED_TOOL_MEMORY = SELECTED_TOOL;
        SELECTED_ELEMENT = event.target;
        START_X = event.offsetX;
        START_Y = event.offsetY;
    }
});

HTMLCanvas.addEventListener("mousemove", (event) => {
    if (!SELECTED_ELEMENT) {
        return;
    };

    const dx = event.offsetX - START_X;
    const dy = event.offsetY - START_Y;

    switch (SELECTED_ELEMENT.tagName) {
        case TOOLS.RECTANGLE:
            SELECTED_ELEMENT.setAttribute("x", +SELECTED_ELEMENT.getAttribute("x") + dx);
            SELECTED_ELEMENT.setAttribute("y", +SELECTED_ELEMENT.getAttribute("y") + dy);
            break;
        case TOOLS.CIRCLE:
            SELECTED_ELEMENT.setAttribute("cx", +SELECTED_ELEMENT.getAttribute("cx") + dx);
            SELECTED_ELEMENT.setAttribute("cy", +SELECTED_ELEMENT.getAttribute("cy") + dy);
            break;
        case TOOLS.LINE:
            SELECTED_ELEMENT.setAttribute("x1", +SELECTED_ELEMENT.getAttribute("x1") + dx);
            SELECTED_ELEMENT.setAttribute("y1", +SELECTED_ELEMENT.getAttribute("y1") + dy);
            SELECTED_ELEMENT.setAttribute("x2", +SELECTED_ELEMENT.getAttribute("x2") + dx);
            SELECTED_ELEMENT.setAttribute("y2", +SELECTED_ELEMENT.getAttribute("y2") + dy);
            break;
    }

    START_X = event.offsetX;
    START_Y = event.offsetY;
});

HTMLCanvas.addEventListener("mouseup", () => SELECTED_ELEMENT = null);
