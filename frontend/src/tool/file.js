const HTMLSaveButton = document.getElementById("tool-file-save");
const HTMLLoadButton = document.getElementById("tool-file-load");
const HTMLLoadInput = document.getElementById("tool-file-load-input");

HTMLSaveButton.addEventListener("click", () => {
    const content = document.getElementById("canvas").outerHTML;
    const blob = new Blob([content], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "canvas.svg";
    link.click();
});

HTMLLoadButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";

    input.click();
    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", (event) => {
            document.getElementById("canvas").outerHTML = event.target.result;
        });

        reader.readAsText(file);
    });
});
