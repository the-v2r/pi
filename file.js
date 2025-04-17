editor.setReadOnly(true);
readOnly = document.getElementById("readOnly");
readOnly.checked = true;
readOnly.disabled = true;

let currentFilePath = "";

const uploadBtn = document.getElementById("uploadBtn");
const fileName = document.getElementById("fileName");
const lastModified = document.getElementById("lastModified");
const saveBtn = document.getElementById("saveBtn");
const windowTtitle = document.querySelector("title");

uploadBtn.addEventListener("click", async () => {
    const result = await window.electronAPI.openFile();
    if (!result.canceled) {
        currentFilePath = result.filePath;
        editor.setValue(result.content);
    }
    saveBtn.disabled = false;
    readOnly.disabled = false;
    readOnly.checked = false;
    editor.setReadOnly(false);
    editor.focus();
    fileName.innerText = `${currentFilePath}`;
    windowTtitle.innerText = `Pi - ${currentFilePath}`;
    editor.on("change", () => {
        fileName.innerText = `${currentFilePath}*`;
        windowTtitle.innerText = `Pi - ${currentFilePath}*`;
    });
});

saveBtn.addEventListener("click", async (e) => {
    if (!currentFilePath) {
        alert("No file opened");
        return;
    }
    const content = editor.getValue();
    await window.electronAPI.saveFile({ filePath: currentFilePath, content });

    editor.setReadOnly(false);
    editor.focus();

    fileName.innerText = `${currentFilePath}`;
    windowTtitle.innerText = `Pi - ${currentFilePath}`;

    console.log("File saved!");
});

document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key == "s") {
        if (!currentFilePath) {
            alert("No file opened");
            return;
        }
        const content = editor.getValue();
        await window.electronAPI.saveFile({
            filePath: currentFilePath,
            content,
        });

        editor.setReadOnly(false);
        editor.focus();

        fileName.innerText = `${currentFilePath}`;
        windowTtitle.innerText = `Pi - ${currentFilePath}`;

        console.log("File saved!");
    }
});

document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key == "o") {
        e.preventDefault();
        const result = await window.electronAPI.openFile();
        if (!result.canceled) {
            currentFilePath = result.filePath;
            editor.setValue(result.content);
        }
        saveBtn.disabled = false;
        readOnly.disabled = false;
        readOnly.checked = false;
        editor.setReadOnly(false);
        editor.focus();
        fileName.innerText = `${currentFilePath}`;
        windowTtitle.innerText = `Pi - ${currentFilePath}`;
        editor.on("change", () => {
            fileName.innerText = `${currentFilePath}*`;
            windowTtitle.innerText = `Pi - ${currentFilePath}*`;
        });
    }
});
