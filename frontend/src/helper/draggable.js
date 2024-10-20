document.querySelectorAll(".draggable").forEach(element => {
    let IS_DRAGGING = false;
    let offsetX, offsetY;

    element.addEventListener("mousedown", (e) => {
        IS_DRAGGING = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        document.addEventListener("mousemove", handeMove);
    });

    const handeMove = (e) => {
        if (IS_DRAGGING) {
            element.style.left = `${e.pageX - offsetX}px`;
            element.style.top = `${e.pageY - offsetY}px`;
        }
    }

    document.addEventListener("mouseup", () => {
        IS_DRAGGING = false;
        document.removeEventListener("mousemove", handeMove);
    });

    document.addEventListener("mouseleave", () => {
        IS_DRAGGING = false;
        document.removeEventListener("mousemove", handeMove);
    });
});