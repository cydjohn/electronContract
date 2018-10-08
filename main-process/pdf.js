const fs = require('fs')
const os = require('os')
const path = require('path')
const {BrowserWindow, ipcMain, shell} = require('electron')

ipcMain.on('print-to-pdf', (event,arg) => {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // Use default printing options
  win.webContents.printToPDF( {
    landscape: true,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: true,
    pageSize: 'A4',
  }, (error, data) => {
    if (error) throw error
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      shell.openExternal(`file://${pdfPath}`)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})
