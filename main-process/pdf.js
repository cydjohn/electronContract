const fs = require('fs')
const os = require('os')
const path = require('path')
const { BrowserWindow, ipcMain, shell } = require('electron')

ipcMain.on('print-to-pdf', (event, arg) => {
  const pdfPath = path.join(os.tmpdir(), 'new-contract-pdf.pdf');
  const win = BrowserWindow.fromWebContents(event.sender);

  win.webContents.printToPDF({}, (error, data) => {
    if (error) return console.log(error.message);

    fs.writeFile(pdfPath, data, err => {
      if (err) return console.log(err.message);
      shell.openExternal('file://' + pdfPath);
      event.sender.send('wrote-pdf', pdfPath);
    })
  })
})
