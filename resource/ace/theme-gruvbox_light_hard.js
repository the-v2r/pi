define(
    "ace/theme/gruvbox_light_hard-css",
    ["require", "exports", "module"],
    function (e, t, n) {
        n.exports =
            '.ace-gruvbox-light-hard .ace_gutter {  background: #ffffff;  color: #A52A2A}.ace-gruvbox-light-hard .ace_print-margin {  width: 1px;  background: #e8e8e8}.ace-gruvbox-light-hard {  background-color: #ffffff;  color: #000000}.ace-gruvbox-light-hard .ace_cursor {  color: #000000}.ace-gruvbox-light-hard .ace_marker-layer .ace_selection {  background: #ff00ff}.ace-gruvbox-light-hard.ace_multiselect .ace_selection.ace_start {  box-shadow: 0 0 3px 0px #f9f5d7;  border-radius: 2px}.ace-gruvbox-light-hard .ace_marker-layer .ace_step {  background: rgb(198, 219, 174)}.ace-gruvbox-light-hard .ace_marker-layer .ace_bracket {  margin: -1px 0 0 -1px;  border: 1px solid rgba(60, 56, 54, 0.15)}.ace-gruvbox-light-hard .ace_marker-layer .ace_active-line {  background: #ffffff}.ace-gruvbox-light-hard .ace_gutter-active-line {  background-color: #ffffff}.ace-gruvbox-light-hard .ace_marker-layer .ace_selected-word {  border: 1px solid #ebdbb2}.ace-gruvbox-light-hard .ace_fold {  background-color: #79740e;  border-color: rgba(60, 56, 54, 0.50)}.ace-gruvbox-light-hard .ace_keyword {  color: #A52A2A}.ace-gruvbox-light-hard .ace_keyword.ace_operator {  color: #427b58}.ace-gruvbox-light-hard .ace_keyword.ace_other.ace_unit {  color: #b16286}.ace-gruvbox-light-hard .ace_constant {  color: #8f3f71}.ace-gruvbox-light-hard .ace_constant.ace_numeric {  color: #ff00ff}.ace-gruvbox-light-hard .ace_constant.ace_character.ace_escape {  color: #9d0006}.ace-gruvbox-light-hard .ace_constant.ace_other {  color: #8f3f71}.ace-gruvbox-light-hard .ace_support.ace_function {  color: #008B8B}.ace-gruvbox-light-hard .ace_support.ace_constant {  color: #8f3f71}.ace-gruvbox-light-hard .ace_support.ace_constant.ace_property-value {  color: #1d2021}.ace-gruvbox-light-hard .ace_support.ace_class {  color: #b57614}.ace-gruvbox-light-hard .ace_support.ace_type {  color: #b57614}.ace-gruvbox-light-hard .ace_storage {  color: #9d0006}.ace-gruvbox-light-hard .ace_invalid {  color: #1d2021;  background-color: #9d0006}.ace-gruvbox-light-hard .ace_string {  color: #ff00ff}.ace-gruvbox-light-hard .ace_string.ace_regexp {  color: #79740e}.ace-gruvbox-light-hard .ace_comment {  color: #0000ff}.ace-gruvbox-light-hard .ace_variable {  color: #076678}.ace-gruvbox-light-hard .ace_variable.ace_language {  color: #8f3f71}.ace-gruvbox-light-hard .ace_variable.ace_parameter {  color: #1d2021}.ace-gruvbox-light-hard .ace_meta.ace_tag {  color: #1d2021}.ace-gruvbox-light-hard .ace_entity.ace_other.ace_attribute-name {  color: #b57614}.ace-gruvbox-light-hard .ace_entity.ace_name.ace_function {  color: #008B8B}.ace-gruvbox-light-hard .ace_entity.ace_name.ace_tag {  color: #076678}.ace-gruvbox-light-hard .ace_markup.ace_heading {  color: #79740e}.ace-gruvbox-light-hard .ace_markup.ace_list {  color: #076678}.ace-gruvbox-light-hard .ace_indent-guide {    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}.ace-gruvbox-light-hard .ace_indent-guide-active {  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;} ';
    }
),
    define(
        "ace/theme/gruvbox_light_hard",
        [
            "require",
            "exports",
            "module",
            "ace/theme/gruvbox_light_hard-css",
            "ace/lib/dom",
        ],
        function (e, t, n) {
            (t.isDark = !1),
                (t.cssClass = "ace-gruvbox-light-hard"),
                (t.cssText = e("./gruvbox_light_hard-css"));
            var r = e("../lib/dom");
            r.importCssString(t.cssText, t.cssClass);
        }
    );
(function () {
    window.require(["ace/theme/gruvbox_light_hard"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
