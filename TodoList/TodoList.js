// 宣告
const localKey = 'TodoKey'
let todoArr = []
let todoObj = {} // 待辦事項
let isEditing = false // 控制每次只能編輯一個待辦事項，true為正在編輯中；false為非編輯中

// DOM
let addInput = document.querySelector('.add-input') // 輸入待辦事項的input
let addBtn = document.querySelector('.add-btn') // 新增的btn
let todoList = document.querySelector('.todo-list') // 放待辦事項的ul
const todoTemplate = document.querySelector('.todo-item-template')

// window.onload
window.onload = function () {
    init()
    addInput.addEventListener('input', function () {
        addBtn.disabled = addInput.value == ''
    })
}

// function
// 渲染畫面
function init() {
    addBtn.disabled = true
    todoList.innerHTML = "";
    let localValue = JSON.parse(localStorage.getItem(localKey))
    if (localValue == null || localValue.length == 0) {
        todoList.classList.add('d-none')
        return;
    } else {
        todoList.classList.remove("d-none")
        localValue.forEach((todoObj, index) => {
            todoList.append(createTodoItem(todoObj, index))
            clearInput()
        })
    }
}

// 清空addInput與鎖定addBtn
function clearInput() {
    addInput.value = ''
    addBtn.disabled = true
}

// 新增按鈕
function addTodoThing() {
    saveLocalStorage()
    clearInput()
    init()
    Swal.fire(`已新增待辦事項`);
}

// 將輸入的待辦事項存入localStorage
function saveLocalStorage() {
    todoList.classList.remove("d-none")
    todoObj = {
        state: false, // 判斷checkbox勾選狀態
        thing: addInput.value // 待辦事項內容
    }
    let localValue = JSON.parse(localStorage.getItem(localKey))
    if (localValue != null) {
        todoArr = localValue
    }
    todoArr.push(todoObj)
    localStorage.setItem(localKey, JSON.stringify(todoArr))
}

// 產生待辦事項清單
function createTodoItem(todoObj, index) {
    let cloneTodoItem = todoTemplate.content.cloneNode(true);
    let checkIcon = cloneTodoItem.querySelector('.check-icon')
    let editInput = cloneTodoItem.querySelector('.edit-input')
    let editBtn = cloneTodoItem.querySelector('.edit-btn')
    let saveBtn = cloneTodoItem.querySelector('.save-btn')
    let deleteBtn = cloneTodoItem.querySelector('.delete-btn')
    checkIcon.checked = todoObj.state
    editInput.value = todoObj.thing
    editInput.disabled = true
    let domObj = {
        checkIcon: checkIcon,
        editInput: editInput,
        editBtn: editBtn,
        saveBtn: saveBtn
    }
    checkIcon.onchange = function () {
        changeCheck(domObj, index)
    }
    editBtn.onclick = function () {
        editTodoThing(domObj)
    }
    saveBtn.onclick = function () {
        saveTodoThing(domObj, index)
    }
    deleteBtn.onclick = function () {
        deleteTodoThing(index)
    }

    return cloneTodoItem;
}

// 編輯按鈕
function editTodoThing(domObj) {
    if (isEditing) {
        return
    }
    isEditing = true
    domObj.editInput.disabled = false
    domObj.editBtn.classList.add('d-none')
    domObj.saveBtn.classList.remove('d-none')
}

// 保存按鈕
function saveTodoThing(domObj, index) {
    todoArr = JSON.parse(localStorage.getItem(localKey))
    if (domObj.editInput.value == '') {
        showEditAlert(index)
    }
    else {
        if (domObj.editInput.value != todoArr[index].thing) {
            todoArr[index] = {
                state: domObj.checkIcon.checked,
                thing: domObj.editInput.value
            }
            localStorage.setItem(localKey, JSON.stringify(todoArr))
            Swal.fire(`已編輯待辦事項`);
        }
        domObj.saveBtn.classList.add('d-none')
        domObj.editBtn.classList.remove('d-none')
        domObj.editInput.disabled = true
        isEditing = false
        init()
    }

}

// 刪除空白待辦清單
function showEditAlert(index) {
    Swal.fire({
        title: '要刪除空白待辦事項嗎？',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: '確定刪除',
        denyButtonText: '回復資料',
        confirmButtonColor: '#000',
        denyButtonColor: '#999',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteTodoThing(index)
            isEditing = false
        } else if (result.isDenied) {
            domObj.editInput.value = todoArr[index].thing
        }
    })
}

// 刪除按鈕
function deleteTodoThing(index) {
    todoArr = JSON.parse(localStorage.getItem(localKey))
    todoArr.splice(index, 1)
    localStorage.setItem(localKey, JSON.stringify(todoArr))
    Swal.fire(`已刪除待辦事項`);
    init()
}

// 改變checkBox
function changeCheck(domObj, index) {
    let todoArr = JSON.parse(localStorage.getItem(localKey))
    todoArr[index].state = domObj.checkIcon.checked
    localStorage.setItem(localKey, JSON.stringify(todoArr))
}