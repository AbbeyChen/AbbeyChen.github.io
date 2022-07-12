let btn = document.querySelectorAll('.number')
let rangeNum = document.querySelector('#rangeNum')
let minNum, maxNum


window.onload = function () {
    init()
    btn.forEach((button) => {
        button.addEventListener('click', enterNum)
    })
}


let answer = undefined
let answerBtn = document.querySelector('#answer')
let guessNum = document.querySelector('#guessNum')



function setDisabled(isDisabled) {
    btn.forEach((button) => {
        button.disabled = isDisabled
    })
}


function init() {
    minNum = 0
    maxNum = 100
    rangeNum.innerText = `${minNum}~${maxNum}`
    setDisabled(true)
}


function randomNum() {
    answer = Math.floor(Math.random() * 101);
    console.log(answer)
    setDisabled(false)
    answerBtn.disabled = true
}

function enterNum(event) {
    let value = event.target.innerText
    guessNum.innerText += isNaN(value) ? "" : value;
}

function checkAns() {
    let guessNumber = parseInt(guessNum.innerText)
    if (guessNumber <= minNum || guessNumber >= maxNum) {
        alert('你猜的答案不在範圍內！')
        guessNum.innerText = ""
        return
    }
    if (guessNumber > answer) {
        maxNum = guessNumber
        numberStr = `${minNum}~${maxNum}`
        rangeNum.innerText = numberStr
    }
    else if (guessNumber < answer) {
        minNum = guessNumber
        numberStr = `${minNum}~${maxNum}`
        rangeNum.innerText = numberStr
    }
    else {
        alert('太神啦！你猜對了！')
        init()
        answer = undefined
    }
    clearAns()
}

function clearAns() {
    guessNum.innerText = ""
}