const {contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
	openFile: () => ipcRenderer.invoke("dialog:openFile"),
	saveFile: (filePath, content) => ipcRenderer.invoke("file:save", {filePath, content}),
});
