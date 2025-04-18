const pyType = pythonType.value;

const enterKeyEvent = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    which: 13,
});

let index = 0;

function type(text) {
    ["keydown", "keypress", "keyup"].forEach((eventType) => {
        const event = new KeyboardEvent(eventType, {
            key: char,
            char: char,
            keyCode: char.charCodeAt(0),
            which: char.charCodeAt(0),
            bubbles: true,
        });
        termCont.dispatchEvent(event);
    });
}

executeCodeBtn.addEventListener("click", () => {
    const executeCommand = `${pyType} ${currentFilePath}`;
    const text = executeCommand;
    function typeNextChar() {
        if (index < text.length) {
            const char = text[index];

            ["keydown", "keypress", "keyup"].forEach((eventType) => {
                const event = new KeyboardEvent(eventType, {
                    key: char,
                    char: char,
                    keyCode: char.charCodeAt(0),
                    which: char.charCodeAt(0),
                    bubbles: true,
                });
                termCont.dispatchEvent(event);
            });

            termCont.value += char;

            index++;
            setTimeout(typeNextChar, 1);
        }
    }
    toggleTermBtn.checked = true;
    termCont.removeAttribute("hidden");
    term.focus();
    typeNextChar();
    // term.write(`${executeCommand}\r`);
    // termCont.dispatchEvent(enterKeyEvent);
});
