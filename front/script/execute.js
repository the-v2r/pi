const pyType = document.getElementById("pythonType").value;
const out = document.getElementById("stdout");

async function runPy() {
    const inp = document.getElementById("stdin").value;
    const inpP = currentFilePath.split("/");
    let ninpP = inpP.pop();
    let inpF = inpP.join("/") + `/[${ninpP}]pi_cache_stdin.txt`;
    out.value = "";
    try {
        const output = await window.electron.runPython({
            pyData: pyType,
            pyP: currentFilePath,
            pyIn: inp,
            pyInF: inpF,
        });
        out.value = output;
    } catch (error) {
        console.error("Error running Python script:", error);
    }
}

document
    .getElementById("executeCodeBtn")
    .addEventListener("click", async () => {
        runPy();
    });
