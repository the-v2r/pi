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

// button
const termBtn = document.getElementById("toggleTermBtn");
const termCont = document.getElementById("terminal_container");
termBtn.addEventListener("click", () => {
    if (termBtn.checked == true) {
        termCont.removeAttribute("hidden");
    } else {
        termCont.setAttribute("hidden", "");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == "t") {
        termBtn.checked = true;
        termCont.removeAttribute("hidden");
        term.focus();
    }
});

term.attachCustomKeyEventHandler((e) => {
    if (e.key == "Escape") {
        termBtn.checked = false;
        termCont.setAttribute("hidden", "");
        editor.focus();
        return false;
    }
    return true;
});
