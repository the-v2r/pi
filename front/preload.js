const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
    openFile: () => ipcRenderer.invoke("dialog:openFile"),
    saveFile: (data) => ipcRenderer.invoke("file:save", data),
});
contextBridge.exposeInMainWorld("electron", {
    runPython: (input) => ipcRenderer.invoke("run-python", input),
});
