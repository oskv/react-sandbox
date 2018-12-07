const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');

let mainWindow;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({width: 1024, height: 768});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  ipcMain.on('web-save-started', (event, data) => {
    saveEmailFile(event, data);
  });
}

function saveEmailFile (event, emailHtml) {
  dialog.showSaveDialog({ filters: [
      { name: 'index', extensions: ['html'] }
    ]}, function (fileName) {
      if (fileName === undefined) return;

      event.sender.send('back-save-started', fileName);

      fs.writeFile(fileName, generateEmailHtml(emailHtml), function (err) {
        if(err) {
          event.sender.send('back-save-error', err);
          console.log('Save file error: ', err);
        } else{
          event.sender.send('back-success-saved', fileName);
        }
      });
    });
}

function generateEmailHtml(emailHtml) {
  return `<!doctype html>
    <html lang="en">
    <head>
      <title>React App</title>
    </head>
    <body>
      ${emailHtml}
    </body>
    </html>`
}