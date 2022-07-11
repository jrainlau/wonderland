
const { app, BrowserWindow, ipcMain } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

const logToWin = (...args) => {
  mainWindow.webContents.send('log_from_main', args)
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.allowDowngrade = true
autoUpdater.allowPrerelease = true
// autoUpdater.channel = 'xxx'

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false,
    },
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
    // autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on('ready', () => {
  createWindow();
  mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('check_update', async (event, version = '1.0.0') => {
  log.info('Querying version:', version)
  autoUpdater.setFeedURL(`http://localhost:8081/${version}`)

  const updateInfo = await autoUpdater.checkForUpdates();
  log.info('updateInfo: ', updateInfo)
})
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on('update-available', (info) => {
  mainWindow.webContents.send('update_available', info);
});
autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('update_downloaded', info);
});
