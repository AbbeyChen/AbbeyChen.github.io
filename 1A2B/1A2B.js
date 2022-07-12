

let createAnsBtn, resetAnsBtn, showAnsBtn, checkNumBtn
let history
let inputNum



let answer = []
let guessNum = []



window.onload = function () {
    createAnsBtn = document.querySelector('#createAnsBtn')
    resetAnsBtn = document.querySelector('#resetAnsBtn')
    showAnsBtn = document.querySelector('#showAnsBtn')
    checkNumBtn = document.querySelector('#checkNumBtn')
    inputNum = document.querySelector('#inputNum')
    history = document.querySelector('.history')
    init()
}

function init() {
    createAnsBtn.disabled = false
    resetAnsBtn.disabled = true
    showAnsBtn.disabled = true
    checkNumBtn.disabled = true
    inputNum.disabled = true
}

function startGame() {
    createAnsBtn.disabled = true
    resetAnsBtn.disabled = false
    showAnsBtn.disabled = false
    checkNumBtn.disabled = false
    inputNum.disabled = false
}

function createAnswer() {
    while (answer.length < 4) {
        let num = Math.floor(Math.random() * 10)
        let isExist = answer.find(x => x == num) != undefined
        if (!isExist) {
            answer.push(num)
        }
    }
    startGame()
    history.innerHTML = ''
}

function resetAnswer() {
    showAnswer()
    answer = []
    createAnswer()
    inputNum.value = ''
}

function showAnswer() {
    alert(`正確答案為：${answer.join('')}`)
    init()
    answer = []
}

function checkAnswer() {
    let a = 0
    let b = 0

    if (inputNum.value == undefined) {
        return
    }
    guessNum = [...new Set(inputNum.value.split(''))];

    if (isNaN(inputNum.value) || inputNum.value % 1 != 0 || guessNum.length != 4) {
        alert(`請輸入四個不重複的數字！`)
        inputNum.value = ""
    }
    else {
        guessNum.forEach((num, index) => {
            let answerIndex = answer.findIndex(x => x == num)
            if (answerIndex == index) {
                a++
            }
            else if (answerIndex != index && answerIndex != -1) {
                b++
            }
        })
        createHistoryRow(a, b)
        setTimeout(() => { checkIsWin(a) }, 1000)
    }
    inputNum.value = ''

}

function createHistoryRow(a, b) {
    let li = document.createElement('li')
    let result = document.createElement('span')
    let number = document.createElement('span')
    result.innerText = `${a}A${b}B`
    number.innerText = guessNum.join('')

    if (a != 4) {
        result.classList.add('wrong', 'tag')
    }
    else {
        result.classList.add('correct', 'tag')
    }

    number.classList.add('number')
    li.append(result, number)
    history.append(li)
    scrollToBottom()
}

function checkIsWin(a) {
    if (a == 4) {
        alert(`太神啦！你猜對了！`)
        init()
    }
}

function scrollToBottom() {
    history.scrollTop = history.scrollHeight
}