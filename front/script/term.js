const term = new Terminal({
    cursorBlink: true,
    fontFamily: "monospace",
    fontSize: 12,
    theme: {},
    cursorStyle: "block",
});

term.open(document.getElementById("terminal"));

const socket = io("http://localhost:3001");

term.onData((data) => socket.emit("input", data));
socket.on("output", (data) => term.write(data));

window.addEventListener("resize", () => {
    socket.emit("resize", {
        cols: term.cols,
        rows: term.rows,
    });
});

socket.emit("resize", {
    cols: term.cols,
    rows: term.rows,
});

const termBtn = document.getElementById("toggleTermBtn");
const termCont = document.getElementById("terminal_container");

function openTerm() {
    termCont.removeAttribute("hidden");
    term.focus();
    termBtn.checked = true;
}

function closeTerm() {
    termCont.setAttribute("hidden", "");
    termBtn.checked = false;
    if (readOnlyReadyState == true) {
        console.log(123);
        editor.setReadOnly(false);
    } else {
        editor.focus();
        return;
    }
}

function handleTerm() {
    if (termBtn.checked == true) {
        openTerm();
    } else {
        closeTerm();
    }
}

termBtn.addEventListener("click", () => {
    handleTerm();
});

term.attachCustomKeyEventHandler((e) => {
    if (e.ctrlKey && e.key == "t") {
        closeTerm();
    }
});
