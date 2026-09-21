// Состояние
let state = [

]


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

function saveState() {
    const str = JSON.stringify(state)
    localStorage.setItem('todo-list', str)
}


function addTask() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list')
    
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
       saveState()
       renderList()
    })
}

function renderList() {
    const empty = document.getElementById('empty-state')
    const list = document.getElementById('todo-list')
    const counter = document.getElementById('counter-value')
    list.innerHTML = ""

    if (state.length === 0) {
        empty.style.display = 'flex'
    }  else {
        empty.style.display = 'none'
    }


     state.forEach(task => {
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


        const activeCount = state.filter(t => !t.completed).length
        counter.textContent = activeCount
    })
}


state = loadState('todo-list', [])
addTask()
renderList()
