const cmd = document.getElementById("command");
const prompt = document.getElementById("prompt");
let cmdFocus = false;

document.addEventListener("keydown", (e) => {
    if (!editor.isFocused()) {
        if (e.key == "i") {
            if (readOnlyReadyState == true) {
                e.preventDefault();
                editor.focus();
                editor.setReadOnly(false);
                mode.textContent = "[INSERT]";
            }
        }
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
        if (editor.isFocused()) {
            if (readOnlyReadyState == true) {
                editor.blur();
                editor.setReadOnly(true);
                mode.textContent = "[NORMAL]";
            }
        }
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key == ":") {
        if (!editor.isFocused() || readOnlyReadyState == false) {
            e.preventDefault();
            prompt.textContent = ":";
            cmdFocus = true;
            cmd.focus();
            cmd.value = "";
            mode.textContent = "[COMMAND]";
        }
    }
});

function toggleLineNumber() {
    if (showGutter.checked == true) {
        editor.renderer.setShowGutter(false);
        showGutter.checked = false;
    } else {
        editor.renderer.setShowGutter(true);
        showGutter.checked = true;
    }
}

function handleTerm(val) {
    let value = val.split(" ");
    switch (value[0]) {
        case "set":
            switch (value[1]) {
                case "number":
                    toggleLineNumber();
            }
        default:
            prompt.textContent = `Unknown command: `;
    }
}

cmd.addEventListener("keydown", (e) => {
    if (cmdFocus) {
        if (e.key == "Enter") {
            handleTerm(cmd.value);
            cmd.blur();
            if (readOnlyReadyState == false) {
                mode.textContent = "[STANDBY]";
            } else {
                mode.textContent = "[NORMAL]";
            }
        }
        if (e.key == "Escape") {
            cmd.blur();
            cmd.value = "";
            prompt.textContent = "";
            if (readOnlyReadyState == false) {
                mode.textContent = "[STANDBY]";
            } else {
                mode.textContent = "[NORMAL]";
            }
        }
    }
});
