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
