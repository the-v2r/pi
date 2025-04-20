const cmd = document.getElementById("command");
const prompt = document.getElementById("prompt");
let cmdFocus = false;

document.addEventListener("keydown", (e) => {
    if (!editor.isFocused()) {
        if (e.ctrlKey && e.key == "i") {
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

function toggleWhiteSpace() {
    if (showInvisible.checked == true) {
        editor.setOption("showInvisibles", false);
        showInvisible.checked = false;
    } else {
        editor.setOption("showInvisibles", true);
        showInvisible.checked = true;
    }
}

function togglewordwrap() {
    if (toggleWordWrap.checked == true) {
        editor.session.setUseWrapMode(false);
        toggleWordWrap.checked = false;
    } else {
        editor.session.setUseWrapMode(true);
        toggleWordWrap.checked = true;
    }
}

function writeCmd(text) {
    prompt.textContent = text;
    cmd.value = "";
}

function handleTerm(val) {
    let value = val.split(" ");
    switch (value[0]) {
        case "tog":
            switch (value[1]) {
                case "l":
                    toggleLineNumber();
                    writeCmd(`LineNumber: ${showGutter.checked}`);
                    break;
                case "ws":
                    toggleWhiteSpace();
                    writeCmd(`WhiteSpace: ${showGutter.checked}`);
                    break;
                case "ww":
                    togglewordwrap();
                    writeCmd(`WordWrap: ${showGutter.checked}`);
                    break;
                default:
                    writeCmd(`Unknown property for '${value[0]}': ${value[1]}`);
                    break;
            }
            break;
        case "cl":
            switch (value[1]) {
                case "showall":
                    editor.setValue("[COLOR LIST]");
                    for (let i = 0; i <= themeList.length - 1; i++) {
                        editor.session.insert(1, themeList[i]);
                    }
                    editor.focus();
                    break;
                case "set":
                    if (themeList.includes(value[2])) {
                        editor.setTheme(`ace/theme/${value[2]}`);
                        editor.focus();
                        themeSelector
                            .querySelectorAll("option")
                            .forEach((a) => {
                                a.removeAttribute("selected");
                            });
                        const activeTheme = themeSelector.querySelector(
                            `option[value=${value[2]}]`
                        );
                        activeTheme.setAttribute("selected", "");
                        if (readOnlyReadyState == true) {
                            editor.setReadOnly(false);
                        }
                        writeCmd(`Color '${value[2]}' set for editor`);
                    } else {
                        writeCmd(`Unknown theme: ${value[2]}`);
                        editor.focus();
                        if (readOnlyReadyState == true) {
                            editor.setReadOnly(false);
                        }
                    }
                    break;
            }
            break;
        case "term":
            openTerm();
            break;
        case "exec":
            runPy();
            break;
        case "stdin":
            if (value[1][0] == "'" || value[1][0] == '"') {
                value.shift();
                let rawstd = value.join(" ");
                let ostd = rawstd.slice(1, rawstd.length - 1);
                document.getElementById("stdin").value = ostd;
                writeCmd("`Value ${rawstd} set for stdin`");
            } else {
                switch (value[1]) {
                    case "clear":
                        document.getElementById("stdin").value = "";
                        writeCmd("Stdin cleared!");
                    default:
                        break;
                }
            }
            break;
        case "w":
            handleSaveBtn();
            break;
        case "q":
            if (isSaved == false) {
                writeCmd("Save the file before quitting!");
            } else {
                window.close();
            }
            break;
        case "wq":
            handleSaveBtn();
            window.close();
            break;
        case "q!":
            window.close();
            break;
        default:
            writeCmd(`Unknown command: ${value[0]}`);
            break;
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
            writeCmd("");
            if (readOnlyReadyState == false) {
                mode.textContent = "[STANDBY]";
                editor.focus();
            } else {
                mode.textContent = "[NORMAL]";
            }
        }
    }
});
