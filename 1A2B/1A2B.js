

let createAns, resetAns, showAns, guessNum
let history
let enterNum



let answer = []
let submitNum = []



window.onload = function () {
    createAns = document.querySelector('#createAns')
    resetAns = document.querySelector('#resetAns')
    showAns = document.querySelector('#showAns')
    guessNum = document.querySelector('#guessNum')
    enterNum = document.querySelector('#enterNum')
    history = document.querySelector('.history')
    init()
}

function init() {
    createAns.disabled = false
    resetAns.disabled = true
    showAns.disabled = true
    guessNum.disabled = true
    enterNum.disabled = true
}

function startGame() {
    createAns.disabled = true
    resetAns.disabled = false
    showAns.disabled = false
    guessNum.disabled = false
    enterNum.disabled = false
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
    enterNum.value = ''
}

function showAnswer() {
    alert(`正確答案為：${answer.join('')}`)
    init()
    answer = []
}

function checkAnswer() {
    let a = 0
    let b = 0

    if (enterNum.value == undefined) {
        return
    }
    submitNum = [...new Set(enterNum.value.split(''))];

    if (isNaN(enterNum.value) || submitNum.length != 4) {
        alert(`請輸入四個不重複的數字！`)
        enterNum.value = ""
    }
    else {
        submitNum.forEach((num, index) => {
            let answerIndex = answer.findIndex(x => x == num)
            if (answerIndex == index) {
                a++
            }
            else if (answerIndex != index && answerIndex != -1) {
                b++
            }
        })
        createHistoryRow(a, b)
        checkIsWin(a)
    }
    enterNum.value = ''

}

function createHistoryRow(a, b) {
    let li = document.createElement('li')
    let result = document.createElement('span')
    let number = document.createElement('span')
    result.innerText = `${a}A${b}B`
    number.innerText = submitNum.join('')

    if (a != 4) {
        result.classList.add('wrong', 'tag')
    }
    else {
        result.classList.add('correct', 'tag')
    }

    number.classList.add('number')
    li.append(result, number)
    history.append(li)

}

function checkIsWin(a) {
    if (a == 4) {
        alert(`太神啦！你猜對了！`)
        init()
    }
}