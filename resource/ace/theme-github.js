define(
    "ace/theme/github-css",
    ["require", "exports", "module"],
    function (e, n, a) {
        a.exports =
            '/* CSS style content from github\'s default pygments highlighter template.   Cursor and selection styles from textmate.css. */.ace-github .ace_gutter {  background: #ffffff;  color: #A52A2A;}.ace-github  {  background: #fff;  color: #000;}.ace-github .ace_keyword {  ;}.ace-github .ace_string {  color: #D14;}.ace-github .ace_variable.ace_class {  color: teal;}.ace-github .ace_constant.ace_numeric {  color: #099;}.ace-github .ace_constant.ace_buildin {  color: #0086B3;}.ace-github .ace_support.ace_function {  color: #008B8B;}.ace-github .ace_comment {  color: #0000FF}.ace-github .ace_variable.ace_language  {  color: #0086B3;}.ace-github .ace_paren {  ;}.ace-github .ace_boolean { color: #0086B3;}.ace-github .ace_string.ace_regexp {  color: #FF00FF;  font-weight: normal;}.ace-github .ace_variable.ace_instance {  color: teal;}.ace-github .ace_constant.ace_language {  ;}.ace-github .ace_cursor {  color: black;}.ace-github.ace_focus .ace_marker-layer .ace_active-line {  background: rgb(255, 255, 255);}.ace-github .ace_marker-layer .ace_active-line {  background: rgb(255, 255, 255);}.ace-github .ace_marker-layer .ace_selection {  background-color: rgba(0, 0, 0, 0.2);}.ace-github.ace_multiselect .ace_selection.ace_start {  box-shadow: 0 0 3px 0px white;}/* bold keywords cause cursor issues for some fonts *//* this disables bold style for editor and keeps for static highlighter */.ace-github.ace_nobold .ace_line > span {    font-weight: normal !important;}.ace-github .ace_marker-layer .ace_step {  background: rgb(252, 255, 0);}.ace-github .ace_marker-layer .ace_stack {  background: rgb(164, 229, 101);}.ace-github .ace_marker-layer .ace_bracket {  margin: -1px 0 0 -1px;  border: 1px solid rgb(192, 192, 192);}.ace-github .ace_gutter-active-line {    background-color : #ffffff;}.ace-github .ace_marker-layer .ace_selected-word {  background: rgb(250, 250, 255);  border: 1px solid rgb(200, 200, 250);}.ace-github .ace_invisible {  color: #BFBFBF}.ace-github .ace_print-margin {  width: 1px;  background: #e8e8e8;}.ace-github .ace_indent-guide {  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}.ace-github .ace_indent-guide-active {  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;}';
    }
),
    define(
        "ace/theme/github",
        ["require", "exports", "module", "ace/theme/github-css", "ace/lib/dom"],
        function (e, n, a) {
            (n.isDark = !1),
                (n.cssClass = "ace-github"),
                (n.cssText = e("./github-css")),
                e("../lib/dom").importCssString(n.cssText, n.cssClass, !1);
        }
    ),
    window.require(["ace/theme/github"], function (e) {
        "object" == typeof module &&
            "object" == typeof exports &&
            module &&
            (module.exports = e);
    });
