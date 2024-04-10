import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import fs from "fs";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");
const indexPath = path.join(process.env.DIST, "index.html");
let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

let projectSelector: BrowserWindow;

function createWindow() {
  projectSelector = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  projectSelector.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    projectSelector.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    projectSelector.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("testing", (event, args) => {
  win = new BrowserWindow({
    frame: true,
    width: 1050,
    height: 775,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  projectSelector.close();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL + "/#/project");
  } else {
    const projectRoute = `file://${indexPath}#/project`;
    win.loadURL(projectRoute);
  }
});

ipcMain.on("readDirFiles", (event, dirPath) => {
  fs.readdir(dirPath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.error("Failed to read directory", err);
      event.sender.send("readDirFilesResponse", {
        error: true,
        message: err.message,
      });
      return;
    }
    const filesAndDirs = dirents.map((dirent) => ({
      name: dirent.name,
      type: dirent.isDirectory() ? "directory" : "file",
      path: path.join(dirPath, dirent.name),
    }));
    event.sender.send("readDirFilesResponse", {
      error: false,
      data: filesAndDirs,
      dir: dirPath,
    });
  });
});

app.whenReady().then(createWindow);
