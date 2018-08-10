const { ipcRenderer } = require('electron');
const deleteRecorde = document.getElementById('delete-record')
const contractNumber = document.getElementById('contract-number')
deleteRecorde.addEventListener('click', (event) => {
    ipcRenderer.send('request-delete-contract',contractNumber.value)
})

ipcRenderer.on('delete-info', (event, numRemoved) => {
    console.log(numRemoved)
    if (numRemoved == 1) {
        alert("删除成功！合同号：" + contractNumber.value)
    }
    else {
        alert("合同不存在！")
    }
})
