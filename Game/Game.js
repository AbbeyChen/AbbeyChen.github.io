//宣告

let gameState = 'Start'
let timeouts = []

//DOM
let box = document.querySelector('.box')
let boxHeight = parseInt(window.getComputedStyle(box).height, 10)
let boxWidth = parseInt(window.getComputedStyle(box).width, 10)
let bird = document.querySelector('.bird')
let birdTop = parseInt(window.getComputedStyle(bird).top, 10)


//window.onload
window.onload = function () {
    document.onkeydown = function (event) {
        if (event.keyCode == 13 && gameState == 'Start') {
            startGame()
        }
        if (event.keyCode == 38 && gameState == 'Play') {
            birdFly()
        }
    }
}



//function

function startGame() {
    gameState = 'Play'
    birdDropInterval = setInterval(() => { birdDrop() }, 5);
    createPipeInterval = setInterval(() => { createPipe() }, 1000)
}


function stopGame() {
    gameState = 'start'
    clearInterval(birdDropInterval)
    clearInterval(createPipeInterval)
    for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
}

function birdDrop() {
    birdTop = parseInt(window.getComputedStyle(bird).top, 10)
    bird.style.top = `${birdTop + 1}px`
    checkIsLose(birdTop + 1, 450, undefined)
}

function birdFly() {
    birdTop = parseInt(window.getComputedStyle(bird).top, 10)
    bird.style.top = `${birdTop - 70}px`
    if (parseInt(bird.style.top, 10) < 0) {
        stopGame()
        bird.style.top = 0
        setTimeout(() => {
            alert(`你輸了！`)
        }, 300);
    }
}


function randomPipeHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function createPipe() {
    let pipe = document.createElement('div')
    let pipeHeight = randomPipeHeight(150, 300)
    let className = pipeHeight % 2 == 0 ? 'pipe-bottom' : 'pipe-top'
    pipe.classList.add(className)
    pipe.style.height = `${pipeHeight}px`
    box.append(pipe)
    pipeMove(pipe)
}

function pipeMove(pipe) {
    for (let i = -50; i <= boxWidth; i++) {
        let move = setTimeout(() => {
            pipe.style.right = `${i}px`
            if (i == boxWidth) {
                box.removeChild(pipe)
            }
            checkIsLose(undefined, undefined, pipe)

        }, 5 * i)
        timeouts.push(move)
    }
}


function checkIsLose(currentPosi, maxPosi, pipe) {
    if (currentPosi > maxPosi) {
        stopGame()
        setTimeout(() => {
            alert(`你輸了！`)
        }, 300);
    }
    if (pipe == undefined) {
        return
    }
    let birdProps = bird.getBoundingClientRect()
    let pipeProps = pipe.getBoundingClientRect()
    if (
        birdProps.left < pipeProps.left + pipeProps.width &&
        birdProps.left + birdProps.width > pipeProps.left &&
        birdProps.top < pipeProps.top + pipeProps.height &&
        birdProps.top + birdProps.height > pipeProps.top) {
        stopGame()
        setTimeout(() => {
            alert(`你輸了！`)
        }, 1);
    }
}