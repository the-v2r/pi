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
const pythonType = document.getElementById("pythonType");
const executeCodeBtn = document.getElementById("executeCodeBtn");
const mode = document.getElementById("mode");

let readOnlyReadyState = false;
let isSaved;

async function handleOpenBtn() {
    const result = await window.electronAPI.openFile((accept = ".py"));
    if (!result.canceled) {
        currentFilePath = result.filePath;
        editor.setValue(result.content);
    }
    editor.session.setMode("ace/mode/python");
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
        isSaved = false;
    });
    pythonType.disabled = false;
    executeCodeBtn.disabled = false;
    readOnlyReadyState = true;
    mode.textContent = "[INSERT]";
}

async function handleSaveBtn() {
    if (!currentFilePath) {
        alert("No file opened");
        return;
    }
    const content = editor.getValue();
    await window.electronAPI.saveFile({ filePath: currentFilePath, content });

    if (editor.isFocused()) {
        editor.setReadOnly(false);
        editor.focus();
        mode.textContent = "[INSERT]";
    } else {
        editor.setReadOnly(true);
        editor.blur();
        mode.textContent = "[NORMAL]";
    }

    fileName.innerText = `${currentFilePath}`;
    windowTtitle.innerText = `Pi - ${currentFilePath}`;

    const now = new Date();
    writeCmd(
        `Updated '${currentFilePath}': ${
            lineNumber.textContent
        } written [${now.toLocaleString("en-GB")}]`
    );
    isSaved = true;
}

uploadBtn.addEventListener("click", async () => {
    handleOpenBtn();
});

saveBtn.addEventListener("click", async (e) => {
    handleSaveBtn();
});

document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        handleSaveBtn();
    }
});

document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key == "o") {
        e.preventDefault();
        handleOpenBtn();
    }
});
