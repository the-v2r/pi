const {
    ipcMain,
    dialog,
    app,
    BrowserWindow,
    globalShortcut,
} = require("electron");
const fs = require("fs");
const path = require("path");

require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
    ignored: /.*\.txt|.*\.py/,
});

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "./front/preload.js"),
        },
    });

    mainWindow.loadFile("./front/index.html");
    mainWindow.webContents.openDevTools();
});

require("child_process").fork(path.join(__dirname, "./front/server.js"));

ipcMain.handle("dialog:openFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
    });
    if (canceled) return;
    const filePath = filePaths[0];
    const content = fs.readFileSync(filePath, "utf-8");
    return { content, filePath };
});

ipcMain.handle("file:save", async (_event, { filePath, content }) => {
    fs.writeFileSync(filePath, content, "utf-8");
    return { success: true };
});
