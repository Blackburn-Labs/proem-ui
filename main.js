const path = require('path');
const url = require('url');
const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

/**
 * Dereference the window object, usually you would store windows
 * in an array if your app supports multi windows, this is the time
 * when you should delete the corresponding element.
 */
function appEventClosed() {
    mainWindow = null;
}

/**
 * Creates the main client window.
 */
function createWindow() {
  // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800,
        height: 600,
        icon: 'icons/favicon.ico',
        titleBarStyle: 'hidden',
        center: true,
        minWidth: 500,
        minHeight: 400,
        darkTheme: true,
        webPreferences: { devTools: false },
    });

  // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

  // Open the DevTools.
    mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
    mainWindow.on('closed', appEventClosed);
}

/**
 * On OS X it is common for applications and their menu bar
 * to stay active until the user quits explicitly with Cmd + Q
 */
function appEventWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}

/**
 * On OS X it's common to re-create a window in the app when the
 * dock icon is clicked and there are no other windows open.
 */
function appEventActivate() {
    if (mainWindow === null) {
        createWindow();
    }
}

/**
 * Bind basic window events.
 */
app.on('ready', createWindow);
app.on('window-all-closed', appEventWindowAllClosed);
app.on('activate', appEventActivate);
