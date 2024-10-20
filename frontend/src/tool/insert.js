const HTMLInsertShape = document.getElementById("tool-insert-shape");
const HTMLInsertForm = document.getElementById("tool-insert-shape-popup");
const HTMLInsertCancel = document.getElementById("tool-insert-shape-cancel");
const HTMLInsertInsert = document.getElementById("tool-insert-shape-insert");

HTMLInsertShape.addEventListener("click", () => {
    HTMLInsertForm.classList.remove("hidden");
});

HTMLInsertCancel.addEventListener("click", () => {
    HTMLInsertForm.classList.add("hidden");
});

HTMLInsertInsert.addEventListener("click", () => {
    HTMLInsertForm.classList.add("hidden");
});
