const { app, BrowserWindow } = require('electron')
require('@electron/remote/main').initialize()

const isDev = require('electron-is-dev')

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
        icon: __dirname + '/logo.ico'
    })
    win.loadURL(isDev ? "http://localhost:3000": `file://${__dirname}/../build/index.html`)
}


app.on('ready', createWindow)


app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})