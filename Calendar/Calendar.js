// 【宣告】

const nowDate = new Date() // 今天
let nowYear = nowDate.getFullYear() // 當前年份
let nowMonth = nowDate.getMonth() // 當前月份-1
let nowWeekday = nowDate.getDay() // 當前星期幾
const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dayNum // 每個日期
let currentIndex // 每筆todoThing的index


// 【DOM】
let title = document.querySelector('.title') // 表頭Title
let dayList = document.querySelector('.day-list') // 日期格子

let addTodoTitle = document.querySelector('.add-modal-title') // modal的Title
let addDropdown = document.querySelector('.add-dropdown') // 新增modal的select
let addInputTime = document.querySelector('.add-input-time') // 新增modal的input time
let addInputText = document.querySelector('.add-input-text') // 新增modal的textArea
let editTodoTitle = document.querySelector('.edit-modal-title') // modal的Title
let editDropdown = document.querySelector('.edit-dropdown') // 編輯modal的select
let editInputTime = document.querySelector('.edit-input-time') // 編輯modal的input time
let editInputText = document.querySelector('.edit-input-text') // 編輯modal的textArea

let todoObj = {}
let todoArr = []


// 【window.onload】
window.onload = function () {
    initCalendar()
}


// 【function】

function initCalendar() {
    setTitle()
    setDays()
}

// 產日期
function setDays() {
    // 每次渲染日期都要先清空
    dayList.innerHTML = ''
    // 取得每月1日為星期幾
    let startWeekday = getStartDay()
    // 取得每月總天數
    let totalDays = getTotalDays()
    // 算出有幾周(tr)；Math.ceil無條件進位
    let weeks = Math.ceil((totalDays + startWeekday) / 7)
    // 日期
    let day = 1

    // 產週期
    // row = 產幾周
    for (let row = 0; row < weeks; row++) {
        let week = document.createElement('li') // li = 週
        week.setAttribute('class', 'day-list-item')
        // col = 產7天/週
        for (let col = 0; col < 7; col++) {
            let div = document.createElement('div') // div = 日
            div.setAttribute('class', 'day')
            dayNum = document.createElement('span') // span = 數字
            dayNum.setAttribute('class', 'day-number')

            // 上個月 = 第一週 && 日期小於當月第一日星期
            if (row == 0 && col < startWeekday) {
                // dayNum.innerText = 'X'
                // div.append(dayNum)
            }

            // 本月
            else if (day <= totalDays) {
                dayNum.innerText = day
                dayNum.id = `${nowYear}/${nowMonth + 1}/${day}`
                div.id = dayNum.id
                div.append(dayNum)
                div.setAttribute('data-bs-toggle', 'modal')
                div.setAttribute('data-bs-target', '#addTodoThing')
                div.onclick = setTodoTitle.bind(event, addTodoTitle, dayNum.id)

                let localStorageData = JSON.parse(localStorage.getItem(`${nowYear}/${nowMonth + 1}/${day}待辦事項`))

                if (localStorageData != null) {
                    let ul = document.createElement('ul')
                    ul.setAttribute('class', 'todo-list')
                    localStorageData.forEach((content, index) => {
                        let li = document.createElement('li')
                        li.setAttribute('class', 'todo-thing')
                        li.innerText = content.TYPE
                        li.setAttribute('data-bs-toggle', 'modal')
                        li.setAttribute('data-bs-target', '#editTodoThing')
                        li.onclick = function (event) {
                            setTodoTitle(editTodoTitle, div.id)
                            currentIndex = index
                            editDropdown.value = content.TYPE
                            editInputTime.value = content.TIME
                            editInputText.value = content.THING
                            event.stopPropagation()
                        }
                        ul.appendChild(li)
                    })
                    div.appendChild(ul)
                }
                day++
            }
            // else {
            //     // 下個月
            //     dayNum.innerText = 'O'
            //     div.append(dayNum)
            // }
            week.appendChild(div)
            getToday(dayNum)
        }
        dayList.appendChild(week)
    }

}

// 產表頭
function setTitle() {
    title.innerText = `${nowYear} / ${monthName[nowMonth]}`
}

// 取得每月1日為星期幾
function getStartDay() {
    let firstWeekday = new Date(nowYear, nowMonth, 1).getDay()
    return firstWeekday
}

// 取得每月總天數
function getTotalDays() {
    let daysOfMonth = new Date(nowYear, nowMonth + 1, 0).getDate()
    return daysOfMonth
}

// 取得當天日期並設定class
function getToday(dayNum) {
    let date = new Date()
    let today = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    if (dayNum.id == today) {
        dayNum.setAttribute('class', 'today')
    }
}

// 改變月份
function changeMonth(value) {
    nowMonth += value

    // 下個月/下一年
    if (nowMonth == 12) {
        nowMonth = 0
        nowYear += value
    }

    // 上個月/上一年
    if (nowMonth == -1) {
        nowMonth = 11
        nowYear += value
    }

    initCalendar()
}

// 設定Modal的Title
function setTodoTitle(todoTitle, date) {
    todoTitle.innerText = `${date}待辦事項`
}

// 預設Modal資料
function resetModalData() {
    addDropdown.value = 'work'
    addInputTime.value = '12:00'
    addInputText.value = ''
}

// 儲存Modal資料
function addTodoThing() {
    // 每件TodoThign都是一個Object
    todoObj = {
        TYPE: addDropdown.value,
        TIME: addInputTime.value,
        THING: addInputText.value
    }
    // 以TodoTing的Title作為localKey
    let localKey = addTodoTitle.innerText
    let value = JSON.parse(localStorage.getItem(localKey))
    if (value != null) {
        todoArr = value
    }
    todoArr.push(todoObj)
    // 複寫原本localKey
    localStorage.setItem(localKey, JSON.stringify(todoArr))
    resetModalData()
    alert(`${localKey.replace('待辦事項', '')}已新增事項`)
    initCalendar()
}

// 編輯Modal資料
function editTodoThing() {
    let localKey = editTodoTitle.innerText
    todoArr = JSON.parse(localStorage.getItem(localKey))
    todoArr[currentIndex] = {
        TYPE: editDropdown.value,
        TIME: editInputTime.value,
        THING: editInputText.value
    }
    localStorage.setItem(localKey, JSON.stringify(todoArr))
    alert(`${localKey.replace('待辦事項', '')}已修改事項`)
    initCalendar()
}

// 刪除Modal資料
function deletTodoThing() {
    let localKey = editTodoTitle.innerText
    todoArr = JSON.parse(localStorage.getItem(localKey))
    todoArr.splice(currentIndex, 1)
    localStorage.setItem(localKey, JSON.stringify(todoArr))
    alert(`${localKey.replace('待辦事項', '')}已刪除事項`)
    initCalendar()
}