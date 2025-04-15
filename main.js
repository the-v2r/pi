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

const errorPanel = document.getElementById("errorPanel");
editor.session.on("changeAnnotation", function () {
    const annotations = editor.session.getAnnotations() || [];
    if (annotations.length > 0) {
        let messages = annotations
            .map((a) => `Line ${a.row + 1}: ${a.text}`)
            .join("\n");
        errorPanel.style.display = "block";
        errorPanel.textContent = messages;
    } else {
        errorPanel.style.display = "none";
        errorPanel.textContent = "";
    }
});

function toggleSyntaxCheck() {
    const useWorker = document.getElementById("syntaxCheck").checked;
    editor.session.setUseWorker(useWorker);
}

document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            editor.setValue(e.target.result, -1);
        };
        reader.readAsText(file);
    }
});

let pyodideReadyPromise = loadPyodide();

window.console_output = function (text) {
    const out = document.getElementById("output");
};

async function runCode() {
    output.textContent = "";
    const pyodide = await pyodideReadyPromise;
    pyodide.runPython(`
      import sys
      from js import console_output
      
      class OutputCatcher:
      def write(self, s):
      console_output(s)
      def flush(self):
      pass
      
      sys.stdout = sys.stderr = OutputCatcher()
      `);
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
