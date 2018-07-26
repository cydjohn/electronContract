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


ipcMain.on('getMsg', (event, arg) => {
    db.insert(arg, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        var arr = BrowserWindow.getAllWindows();
        for (var i = 0; i < arr.length; i++) {
            const toWindow = arr[i];
            toWindow.webContents.send('add-new-contract', newDoc);
            tempData = newDoc
        }
    });
})