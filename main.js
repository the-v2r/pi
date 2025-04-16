ace.require("ace/range");

const editor = ace.edit("editor");
const output = document.getElementById("output");
editor.session.setMode("ace/mode/python");
editor.setTheme("ace/theme/github");
editor.session.setUseWorker(true);
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
});

let pyodideReadyPromise = loadPyodide();

window.console_output = function (text) {
    const out = document.getElementById("output");
};

async function runCode() {
    output.textContent = "";
    const pyodide = await pyodideReadyPromise;
    // prettier-ignore
    pyodide.runPython(`
import sys
from js import console_output
      
class OutputCatcher:
    def write(self, s):
        console_output(s)
    def flush(self):
        pass
      
sys.stdout = sys.stderr = OutputCatcher()`);
    // prettier-ignore
    const code = editor.getValue();
    try {
        await pyodide.runPythonAsync(code);
    } catch (err) {
        output.textContent = "Error:\n" + err;
    }
    window.console_output = function (text) {
        const out = output;
        out.textContent += text;
    };
}
