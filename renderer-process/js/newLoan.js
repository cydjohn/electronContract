const { ipcRenderer, remote } = require('electron');
var moment = require('moment')
const path = require('path')
const { BrowserWindow } = require('electron').remote


const btn = document.getElementById("add-new")

const alertLabel = document.getElementById('alertLabel')

const contractNumber = document.getElementById('contract-number')
const name = document.getElementById("name")
const idNumber = document.getElementById("id-number")
const bankAccount = document.getElementById("bank-account")
const bankName = document.getElementById("bank-name")
const openingBank = document.getElementById('opening-bank')
const amount = document.getElementById("amount")
const startTime = document.getElementById("start-time")
const endTime = document.getElementById("end-time")

const interest = document.getElementById('interest')
const interestRate = document.getElementById('interest-rate')
const tax = document.getElementById('tax')
const actualInterest = document.getElementById('actual-interest')
// const dailyInterest = document.getElementById('daily-interest')
// const firstPaymentDay = document.getElementById('first-payment-day')
// const secondPaymentDay = document.getElementById('second-payment-day')
// const thirdPaymentDay = document.getElementById('third-payment-day')
// const fourthPaymentDay = document.getElementById('fourth-payment-day')

const oneYearButton = document.getElementById('one-year-duration-button')

let canSubmit = false
alertLabel.hidden = true
var loan = {}
resetPage()


btn.addEventListener('click', () => {
    if(contractNumber.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "合同号不能为空"
    }
    else if (name.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "姓名不能为空"
    }
    else if (!isCardNo(idNumber.value)) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "身份证号不正确"
    }
    else if (bankAccount.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "银行卡号不能为空"
    }
    else if (bankName.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "银行名称不能为空"
    }
    else if (openingBank.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "开户行信息不能为空"
    }
    else if (amount.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "借款金额不能为空"
    }
    else if(!isValidAmount()) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "借款金额必须为正数"
    }
    else if (startTime.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "借款时间不能为空"
    }
    else if (endTime.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "还款时间不能为空"
    }
    else if (!isValidTime()) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "还款时间必须晚于借款时间"
    }
    else if (!isValidTaxRate()) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "请输入有效税率"
    }
    else if (tax.value.length == 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "请输入应交税费"
    }
    else if (tax.value <= 0) {
        alertLabel.hidden = false
        alertLabel.innerHTML = "应交税费必须为正数"
    }
    else {
        alertLabel.hidden = true
        loan.contractNumber = contractNumber.value
        loan.name = name.value
        loan.idNumber = idNumber.value
        loan.bankAccount = bankAccount.value
        loan.bankName = bankName.value
        loan.openingBank = openingBank.value
        loan.amount = amount.value
        loan.startTime = startTime.value
        loan.endTime = endTime.value

        loan.interest = interest.value
        loan.interestRate = interestRate.value
        loan.tax = tax.value
        loan.actualInterest = actualInterest.value

        // 打印预览
        const modalPath = path.join('file://', __dirname, '../../sections/windows/new-loan-preview.html')
        let win = new BrowserWindow({ width: 800, height: 1000 })
        win.on('close', () => { win = null })
        win.loadURL(modalPath)
        win.show()

        ipcRenderer.send('getMsg', loan)
        resetPage()
    }
})


oneYearButton.addEventListener('click', () => { 
    if(startTime.value != "") {
        endTime.value = moment(startTime.value).add(1, 'year').subtract(1,'day').format('YYYY-MM-DD');
    }
})

// 身份验证
function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
        return false;
    }
    return true;
}


idNumber.addEventListener('change', () => {
    canSubmit = isCardNo(idNumber.value)
})

// 银行卡验证
function isBankCard(str) {
    // var regex = /^(6222)\d{12}$/;
    // if (regex.test(str)) {
    //     return true;
    // }
    // else {
    //     alert("银行卡信息输入不合法");
    //     return false;
    // }
    return true;
}

bankAccount.addEventListener('change', () => {
    canSubmit = isBankCard(bankAccount.value)
})

// 借款金额验证
function isValidAmount(number) {
    if (number < 1) {
        return false
    }
    else {
        return true
    }
}

amount.addEventListener('input', () => {
    if (isValidAmount(amount.value)) {
        interest.value = amount.value * interestRate.value / 100
        canSubmit = true
        calculatePaymentDate()
    }
    else {
        canSubmit = false
    }

})

// 税率验证
function isValidTaxRate(number) {
    if (number <= 0) {
        alert("请输入有效税率")
        return false
    }
    else {
        return true
    }
}

interestRate.addEventListener('input', () => {
    if (isValidTaxRate(interestRate.value)) {
        interest.value = amount.value * interestRate.value / 100
        canSubmit = true
    }
    else {
        canSubmit = false
    }
})


// 日期验证
function isValidTime(startTime, endTime) {
    var d1 = Date.parse(startTime)
    var d2 = Date.parse(endTime)
    if (d1 > d2) {
        alert("还款时间不能早于借款时间")
        return false
    }
    else {
        return true

    }
}

startTime.addEventListener('input', () => {
    calculatePaymentDate()
})

endTime.addEventListener('change', () => {
    canSubmit = isValidTime(startTime.value, endTime.value)
    calculatePaymentDate()
})

// 计算
tax.addEventListener('input', () => {
    if (tax.value >= 0) {
        calculatePaymentDate()
    }
    else {
        alert('请输入有效税费')
    }
})


function calculatePaymentDate() {
    actualInterest.value = (interest.value - tax.value).toFixed(2)
    // var paymentDates = ['03-15', '06-15', '09-15', '12-15']
    // var year = startTime.value.slice(0, 4)
    // for (d in paymentDates) {
    //     if (moment(startTime.value).isBefore(moment(year + "-" + paymentDates[d], 'YYYY-MM-DD'))) {
    //         // dailyInterest.value = (actualInterest.value / 360).toFixed(2)
    //         var firstPay = (dailyInterest.value * (moment((year + "-" + paymentDates[d]), 'YYYY-MM-DD').diff(moment(startTime.value), 'days') - 2)).toFixed(2)
    //         // loan.firstDay = year + "-" + paymentDates[d]
    //         // if (++d == 4) {
    //         //     ++year
    //         //     d = 0

    //         // }
    //         // loan.secondDay = year + "-" + paymentDates[d]

    //         // if (++d == 4) {
    //         //     ++year
    //         //     d = 0

    //         // }
    //         // loan.thirdDay = year + "-" + paymentDates[d]

    //         // if (++d == 4) {
    //         //     ++year
    //         //     d = 0

    //         // }
    //         // loan.fourthDay = year + "-" + paymentDates[d]

    //         // firstPaymentDay.value = loan.firstDay + " " + firstPay + "￥"
    //         // var restInterest = ((actualInterest.value - dailyInterest.value * (moment(paymentDates[d], 'MM-DD').diff(moment(startTime.value), 'days') - 2)) / 3).toFixed(2)
    //         // loan.restPayment = ((actualInterest.value - firstPay) / 3).toFixed(2)
    //         // secondPaymentDay.value = loan.secondDay + " " + loan.restPayment + "￥"
    //         // thirdPaymentDay.value = loan.thirdDay + " " + loan.restPayment + "￥"
    //         // fourthPaymentDay.value = loan.fourthDay + " " + (actualInterest.value - firstPay - loan.restPayment *2).toFixed(2) + "￥"
    //         // loan.firstPayment = firstPay
            
    //         break
        // }
    // }
}



function resetPage() {
    document.getElementById("contract-number").value = ""
    document.getElementById("name").value = ""
    document.getElementById("id-number").value = ""
    document.getElementById("bank-account").value = ""
    document.getElementById("bank-name").value = ""
    document.getElementById("opening-bank").value = ""
    document.getElementById("amount").value = ""
    document.getElementById("start-time").value = ""
    document.getElementById("end-time").value = ""

    document.getElementById('interest').value = ""
    document.getElementById('interest-rate').value = "6.1"
    document.getElementById('tax').value = ""
    document.getElementById('actual-interest').value = ""
    // document.getElementById('daily-interest').value = ""
    // document.getElementById('first-payment-day').value = ""
    // document.getElementById('second-payment-day').value = ""
    // document.getElementById('third-payment-day').value = ""
    // document.getElementById('fourth-payment-day').value = ""
}