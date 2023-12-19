const listElement   = document.getElementById('list')
const buttonElement = document.getElementById('create')
const inputElement  = document.getElementById('title')

let todos = [
  {
    title: 'test1',
    completed: false
  },
  {
    title: 'test2',
    completed: false
  }
];

listElement.addEventListener('click', (event) => {
  if (event.target.dataset.index) {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type === 'toggle') {
      todos.at(index).completed = !todos.at(index).completed
    } else if (type === 'remove') {
      todos.splice(index, 1);
    }
    render();
  }
})

const addNewTodo = (todo) => {
  todos.push(todo)
}

buttonElement.addEventListener("click", () => {
  if (inputElement.value.length !== 0) {
    const todo = {
      title: inputElement.value,
      completed: false
    }
    addNewTodo(todo)
    render();
    inputElement.value = '';
  }
})

const getTodoTemplate = (todo, index) => {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span 
        class="${todo.completed ? 'text-decoration-line-through' : ''}"
      >${todo.title}</span>
      <span>
        <span 
          class="btn btn-small btn-${todo.completed ? 'warning' : 'success'}"
          data-index="${index}"
          data-type="toggle"
        >&check;</span>
        <span 
          class="btn btn-small btn-danger"
          data-index="${index}"
          data-type="remove"
        >&times;</span>
      </span>
    </li>
  `
}

const render = () => {
  listElement.innerHTML = ''
  if (todos.length === 0) {
    listElement.innerHTML = `
      <div class="d-flex align-items-center justify-content-center m-2">
        <h1 class="p-2">Пусто</h1>
        <img src="public/sad-smile.svg" alt="Sad smile" width="64px" height="64px">
      </div>
    `
  }
  for (let i = 0; i < todos.length; i++) {
    listElement.insertAdjacentHTML('beforeend', getTodoTemplate(todos.at(i), i))
  }
}

render();
