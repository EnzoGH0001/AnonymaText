const path = require('path');
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  const userId = uuidv4();
  const data = JSON.stringify({ userId });

  fs.writeFile('temp.json', data, (err) => {
    if (err) {
      console.error('Error writing to file', err);
      throw err;
    }
    console.log("Data written to 'temp.json'");

    fs.readFile(path.join(__dirname, 'temp.json'), 'utf8', (err, fileData) => {
      if (err) {
        console.error('Error reading file', err);
        throw err;
      }
      const jsonData = JSON.parse(fileData);
      console.log(`User ID : ${jsonData.userId}`);
    });
  });

  mainWindow.loadFile('views/index.html');
}

app.whenReady().then(() => {
  createWindow();
  console.log('Application started');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('Application closed');
    mainWindow = null;
    fs.unlink(path.join(__dirname, 'temp.json'), (err) => {
      if (err) {
        console.error('Error deleting file', err);
        throw err;
      }
      console.log("'temp.json' deleted");
    });
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
