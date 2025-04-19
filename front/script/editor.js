ace.require("ace/range");
const theme = document.getElementById("themeSelector").value;
const editor = ace.edit("editor");
const output = document.getElementById("output");
editor.session.setMode("ace/mode/text");
editor.setTheme(`ace/theme/${theme}`);
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
});

editor.focus();
