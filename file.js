let currentFilePath = "";

const uploadBtn = document.getElementById("uploadBtn");
const fileName = document.getElementById("fileName");
const lastModified = document.getElementById("lastModified");
const saveBtn = document.getElementById("saveBtn");

uploadBtn.addEventListener("click", async () => {
	const result = await window.electronAPI.openFile();
	if (result) {
		currentFilePath = result.filePath;
		editor.setValue(result.content);
	}
	saveBtn.disabled = false;
	fileName.innerText = currentFilePath;
	console.log(result);
});

saveBtn.addEventListener("click", async e => {
	e.preventDefault();
	if (!currentFilePath) return alert("No file opened");
	const content = editor.getValue();
	await window.electronAPI.saveFile(currentFilePath, content);
	alert("File saved!");
});
