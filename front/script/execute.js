const { exec } = require("child_process");
const pyType = document.getElementById("pythonType").value;

function runPythonScript() {
    exec(`${pyType} ${currentFilePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

document.getElementById("executeCodeBtn").addEventListener("click", () => {
    runPythonScript();
});
