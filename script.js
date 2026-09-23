// Состояние
let state = [

]

// Поиск
let searchQuery = ''

// Фильтр
let filter = "all"

// Ключ localStorage
const STORAGE_KEY = 'todo-list'


// LocalStorage
function loadState(key, fallback) {
    // state = JSON.parse( localStorage.getItem('todo-list'))
    
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : fallback
    } catch(e) {
        console.warn('Ошибка чтения из localStorage:', e)
        return fallback
    }


}

function saveState(key) {
    const str = JSON.stringify(state)
    localStorage.setItem(key, str)
}


// Настройки формы добавления
function addTask() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const clean = input.value.trim()
        if (!clean) return
        

        const newTask = {
            id: Date.now(),
            text: clean,
            completed: false,
        }
        
        input.value = ""
       state.unshift(newTask)
       saveState(STORAGE_KEY)
       renderList()
    })
}


// Настройка поиска
function setupSearch() {
    const input = document.getElementById('search-input');

    input.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase()
        renderList()
    })
}

function setupFilters() {
    const buttons = document.querySelectorAll('.app__filter');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            filter = btn.dataset.filter

            buttons.forEach(b => b.classList.remove("is-active"))
            btn.classList.add('is-active')
            renderList()
        })
    })
}

// Возвращает задачи после фильтра и поиска
function getFilteredTasks() {
    let tasks = state
    if (searchQuery !== '') {
       tasks = tasks.filter(t => t.text.toLowerCase().includes(searchQuery))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => !t.completed)
    }

    if (filter === "completed") {
        tasks = tasks.filter(t =>  t.completed)
    }
    return tasks
}

// Рендеринг задач
function renderList() {
    const tasks = getFilteredTasks();
    const empty = document.getElementById('empty-state')
    const list = document.getElementById('todo-list')
    const counter = document.getElementById('counter-value')
    list.innerHTML = ""

    if (tasks.length === 0) {
        empty.style.display = 'flex'
    }  else {
        empty.style.display = 'none'
    }


     tasks.forEach(task => {
        const li = document.createElement('li')
        const span = document.createElement('span')
        const input = document.createElement('input')
        const button = document.createElement('button')
        button.textContent = '✕'
        button.classList.add('btn-delete')
        input.type = "checkbox"
        input.checked = task.completed
        input.classList.add('todo-checkbox')
        li.classList.add('todo-li')
        span.textContent = task.text
        span.classList.add('todo-span')
        li.dataset.id = task.id

        // if (task.completed) {
        //     li.classList.add('completed')
        // } 

        // можно так |
        li.classList.toggle('completed', task.completed)


        // li.appendChild(input)
        // li.appendChild(span)
        // li.appendChild(button)

        // Можно так |
        li.append(input, span, button)
        list.appendChild(li)

        input.addEventListener("click", () => {
           task.completed = !task.completed;
           saveState(STORAGE_KEY)
           renderList()
        })

        if (task.completed) {
            span.style.textDecoration = "line-through"
        }

        button.addEventListener('click', () => {
            state = state.filter(t => t.id !== task.id)
            saveState(STORAGE_KEY)
            renderList()
        })
    })
        const activeCount = state.filter(t => !t.completed).length
        counter.textContent = activeCount

        


}
// Удалить ВСЕ выполненные
  document.getElementById('clear-done').addEventListener('click', () => {
           state = state.filter(t => !t.completed)
            saveState(STORAGE_KEY)
            renderList()
        })


state = loadState(STORAGE_KEY, [])
setupFilters()
setupSearch()
addTask()
renderList()


