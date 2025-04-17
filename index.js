const {ipcMain, dialog, app, BrowserWindow} = require("electron");
const fs = require("fs");
const path = require("path");

require("electron-reload")(__dirname, {
	electron: require(`${__dirname}/node_modules/electron`),
});

let mainWindow;

app.whenReady().then(() => {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.loadFile("index.html");
	mainWindow.webContents.openDevTools();
});

ipcMain.handle("dialog:openFile", async () => {
	const {canceled, filePaths} = await dialog.showOpenDialog({
		properties: ["openFile"],
	});
	if (canceled) return;
	const filePath = filePaths[0];
	const content = fs.readFileSync(filePath, "utf-8");
	return {content, filePath};
});

ipcMain.handle("file:save", async (event, {filePath, content}) => {
	fs.writeFileSync(filePath, content);
});
