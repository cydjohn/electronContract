const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')


ipcRenderer.send('request-temp-data')
const confirmSign = document.getElementById('confirm-sign')
ipcRenderer.on('get-temp-data', (event, arg) => {

    loadData(arg)
})


// 新建页面需要传值
function loadData(loan) {
    const contractNumber = document.getElementById("contract-number")
    const name = document.getElementById("name")
    const idNumber = document.getElementById("id-number")
    const bankAccount = document.getElementById("bank-account")
    const bankName = document.getElementById("bank-name")
    const openingBank = document.getElementById("opening-bank")
    const amount = document.getElementById("amount")
    const startTime = document.getElementById("start-time")
    const endTime = document.getElementById("end-time")

    const interest = document.getElementById('interest')
    const interestRate = document.getElementById('interest-rate')
    const tax = document.getElementById('tax')
    const actualInterest = document.getElementById('actual-interest')
    const dailyInterest = document.getElementById('daily-interest')
    const firstPaymentDay = document.getElementById('first-payment-day')
    const secondPaymentDay = document.getElementById('second-payment-day')
    const thirdPaymentDay = document.getElementById('third-payment-day')
    const fourthPaymentDay = document.getElementById('fourth-payment-day')

    contractNumber.innerHTML = "合同号：" + loan.contractNumber
    name.innerHTML = "名字：" + loan.name
    idNumber.innerHTML = "身份证号：" + loan.idNumber
    bankAccount.innerHTML = "银行卡号：" + loan.bankAccount
    bankName.innerHTML = "银行名称：" + loan.bankName
    openingBank.innerHTML = "开户行：" + loan.openingBank
    amount.innerHTML = "借款金额：" + loan.amount
    startTime.innerHTML = "借款时间：" + loan.startTime
    endTime.innerHTML = "还款时间：" + loan.endTime

    interest.innerHTML = "应得利息：" + loan.interest
    interestRate.innerHTML = "借款利率（%）：" + loan.interestRate
    tax.innerHTML = "应交税费：" + loan.tax
    actualInterest.innerHTML = "实际利息：" + loan.actualInterest
    dailyInterest.value = (loan.actualInterest / 360).toFixed(2)

    firstPaymentDay.value = loan.firstDay + " " + loan.firstPayment + "￥"
    var restInterest = loan.restPayment
    secondPaymentDay.value = loan.secondDay + " " + restInterest + "￥"
    thirdPaymentDay.value = loan.thirdDay + " " + restInterest + "￥"
    fourthPaymentDay.value = loan.fourthDay + " " + (loan.actualInterest - 2 * restInterest - loan.firstPayment).toFixed(2) + "￥"


    // 一开始先隐藏 确认签字
    confirmSign.hidden = true
}


const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    console.log('asdfafasdfadsf')
    confirmSign.hidden = false
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    confirmSign.hidden = true
    printPDFBtn.hidden = false
})


