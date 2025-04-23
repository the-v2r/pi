ace.require("ace/range");
const theme = document.getElementById("themeSelector").value;
const editor = ace.edit("editor");
const output = document.getElementById("output");
editor.session.setMode("ace/mode/text");
editor.setTheme(`ace/theme/gruvbox_light_hard`);
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    fontFamily: "fixedsys",
    fontSize: "16px",
    showPrintMargin: false,
    cursorStyle: "wide",
});
editor.setOption("cursorStyle", "wide");
editor.focus();
editor.session.on("changeScrollTop", function (scrollTop) {
    const lineHeight = editor.renderer.lineHeight;
    const snapped = Math.round(scrollTop / lineHeight) * lineHeight;

    if (scrollTop !== snapped) {
        editor.session.setScrollTop(snapped);
    }
});
