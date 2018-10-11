const path = require('path')
const { ipcMain, app } = require('electron')
const { BrowserWindow } = require('electron')


var Datastore = require('nedb')
var userData = app.getAppPath('userData');

var dbLocation = ''
if (process.platform === "win32") {
    dbLocation = 'D://db/persons.db';
}
else {
    dbLocation = userData + '/dist/persons.db';
}

db = new Datastore({ filename: dbLocation, autoload: true });


var tableData = []
var tempData = {}
var printDate = ""

ipcMain.on('getMsg', (event, arg) => {
    console.log("afasdfhadfhakhsdfk");
    db.insert(arg, function (err, newDoc) {   // Callback is optional
        var arr = BrowserWindow.getAllWindows();
        for (var i = 0; i < arr.length; i++) {
            const toWindow = arr[i];
            toWindow.webContents.send('add-new-loan', newDoc);
            tempData = newDoc
        }
    });
})

ipcMain.on('pass-print-value', (event, arg) => {
    tableData = arg[0]
    printDate = arg[1]
})

ipcMain.on('request-all-data', (event, arg) => {
    // Find all documents in the collection
    db.find({}, function (err, docs) {
        event.sender.send('get-all-data', docs)
    });
})

ipcMain.on('get-print-value', (event, arg) => {
    event.sender.send('print-data', [tableData, printDate])
})

ipcMain.on('request-temp-data', (event, arg) => {
    event.sender.send('get-temp-data', tempData)
})

ipcMain.on('request-delete-contract', (event, cid) => {
    db.remove({ contractNumber: cid }, {}, function (err, numRemoved) {
        // numRemoved = 1
        event.sender.send('delete-info', numRemoved)
        if (numRemoved == 1) {
            var arr = BrowserWindow.getAllWindows();
            for (var i = 0; i < arr.length; i++) {
                const toWindow = arr[i];
                toWindow.webContents.send('delete-contract-number', cid);
            }
        }
    });
})

