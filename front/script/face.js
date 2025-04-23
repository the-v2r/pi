function changeTheme() {
    const theme = document.getElementById("themeSelector").value;
    editor.setTheme("ace/theme/" + theme);
}

const toggleWordWrap = document.getElementById("wordWrap");
toggleWordWrap.addEventListener("click", () => {
    editor.session.setUseWrapMode(toggleWordWrap.checked);
});

const toggleReadOnly = document.getElementById("readOnly");
toggleReadOnly.addEventListener("click", () => {
    editor.setReadOnly(toggleReadOnly.checked);
});

const lineNumber = document.getElementById("lineNumber");
lineNumber.textContent = `${editor.session.getLength()} line(s)`;
editor.addEventListener("change", () => {
    lineNumber.textContent = `${editor.session.getLength()} line(s)`;
});

const cursorPositionDiv = document.getElementById("cursorPosition");

function updateStatus() {
    const pos = editor.getCursorPosition();
    const sel = editor.session.getTextRange(editor.getSelectionRange());
    const lines = sel.split("\n").length;
    const chars = sel.length;

    let statusText = `Ln ${pos.row + 1}, Col ${pos.column + 1}`;

    if (chars > 0) {
        statusText += ` (${chars} selected`;
        if (lines > 1) {
            statusText += ` over ${lines} lines)`;
        } else {
            statusText += `)`;
        }
    }

    cursorPositionDiv.textContent = statusText;
}

editor.getSelection().on("changeCursor", updateStatus);
editor.getSelection().on("changeSelection", updateStatus);

updateStatus();

const startSearchBtn = document.getElementById("startSearchBtn");
startSearchBtn.addEventListener("click", () => {
    editor.execCommand("find");
});

const startReplaceBtn = document.getElementById("startReplaceBtn");
startReplaceBtn.addEventListener("click", () => {
    editor.execCommand("replace");
});

const showInvisible = document.getElementById("showInvisible");
showInvisible.addEventListener("click", () => {
    editor.setOption("showInvisibles", showInvisible.checked);
});

const showGutter = document.getElementById("showGutter");

showGutter.addEventListener("click", () => {
    editor.renderer.setShowGutter(showGutter.checked);
});
