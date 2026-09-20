// Состояние
const state = [
    {
        id: 1789803718527,
        text: "Купить молоко",
        completed: false,         
    }
]

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
       renderList()
    })
}

function renderList() {


    const list = document.getElementById('todo-list')
    list.innerHTML = ""

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
    })
}

addTask()
renderList()
