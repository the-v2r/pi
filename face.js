let percent = 0;
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const simulateLoading = setInterval(() => {
    percent += Math.floor(Math.random() * 5 + 1);
    if (percent >= 100) {
        percent = 100;
        clearInterval(simulateLoading);

        // Fade out loader
        document.getElementById("loader").style.transition = "opacity 0.5s";
        document.getElementById("loader").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
            document.getElementById("main").style.display = "block";
        }, 500);
    }

    progressBar.style.width = percent + "%";
    progressText.textContent = `Loading... ${percent}%`;
}, 100);

function changeTheme() {
    const theme = document.getElementById("themeSelector").value;
    editor.setTheme("ace/theme/" + theme);
}
