const uploadBtn = document.getElementById("uploadBtn");
const fileName = document.getElementById("fileName");
const lastModified = document.getElementById("lastModified");
const saveBtn = document.getElementById("saveBtn");

let fileHande;

uploadBtn.addEventListener("click", async () => {
	try {
		[fileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: ".py file",
					accept: {"text/x-python": [".py"]},
				},
			],
		});
		const file = await fileHandle.getFile();
		const contents = await file.text();
		saveBtn.disabled = false;

		editor.setValue(contents);
		fileName.innerText = await file.name;
		lastModified.innerText = `Last modification: ${await file.lastModifiedDate}`;
	} catch (err) {
		console.error("Error opening file: ", err);
	}
});

saveBtn.addEventListener("click", async () => {
	console.log(fileHandle);
	if (!fileHandle) {
		return alert("No file open!");
	}
	try {
		const writable = await fileHandle.createWritable();
		await writable.write(editor.getValue());
		await writable.close();
		alert("File saved");
	} catch (err) {
		console.error("Error saving file: ", err);
	}
});
