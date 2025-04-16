const files = {};
const tabsDiv = document.getElementById("tabs");
let currentFileName = null;

function getModeFromFilename(name) {
    if (name.endsWith(".py")) return "ace/mode/python";
    if (name.endsWith(".js")) return "ace/mode/javascript";
    if (name.endsWith(".html")) return "ace/mode/html";
    if (name.endsWith(".css")) return "ace/mode/css";
    return "ace/mode/text";
}

function createTab(name, session) {
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.id = "tab-" + name;
    tab.innerText = name;

    const closeButton = document.createElement("span");
    closeButton.className = "close-tab";
    closeButton.innerText = "x";
    closeButton.onclick = (event) => {
        closeTab(name, event);
    };
    tab.appendChild(closeButton);

    tab.onclick = () => switchTab(name);
    tabsDiv.appendChild(tab);
}

function closeTab(name, event) {
    event.stopPropagation();

    const tab = document.getElementById("tab-" + name);
    tabsDiv.removeChild(tab);

    delete files[name];

    if (Object.keys(files).length === 0) {
        document.getElementById("editor").classList.add("hidden");
    }
}

function switchTab(name) {
    Array.from(tabsDiv.children).forEach((tab) =>
        tab.classList.remove("active")
    );
    editor.setSession(files[name]);
    document.getElementById("tab-" + name).classList.add("active");
    currentFileName = name;
}

document
    .getElementById("file-input")
    .addEventListener("change", async (event) => {
        const fileList = event.target.files;
        for (const file of fileList) {
            const text = await file.text();
            const session = ace.createEditSession(
                text,
                getModeFromFilename(file.name)
            );
            files[file.name] = session;
            createTab(file.name, session);
            switchTab(file.name);
        }

        document.getElementById("editor").classList.remove("hidden");

        event.target.value = "";
    });

document.getElementById("save-button").addEventListener("click", () => {
    if (currentFileName) {
        const content = editor.getValue();
        const fileContent = files[currentFileName];
        fileContent.content = content;

        // Trigger download
        downloadFile(currentFileName, content);
    } else {
        alert("No file is open to save.");
    }
});

// Add event listener for Ctrl+S shortcut to trigger save
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // Prevent the default save behavior of the browser
        if (currentFileName) {
            const content = editor.getValue();
            const fileContent = files[currentFileName];
            fileContent.content = content;

            // Trigger download
            downloadFile(currentFileName, content);
        } else {
            alert("No file is open to save.");
        }
    }
});

// Function to trigger file download
function downloadFile(fileName, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
