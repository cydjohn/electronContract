const path = require('path')
const { ipcMain, ipcRenderer, app } = require('electron')
const { BrowserWindow } = require('electron')


var Datastore = require('nedb')
var userData = app.getAppPath('userData');

var dbLocation = ''
if(process.platform === "win32") {
    dbLocation = 'D://db/contract.db';
}
else {
    dbLocation = userData+'/dist/contract.db';
}
db = new Datastore({ filename: dbLocation , autoload: true });