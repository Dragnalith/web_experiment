function isStringArray(obj: any): obj is string[] {
    return Array.isArray(obj) && obj.every(item => typeof item === 'string');
  }
  

const form = document.querySelector('form');
const input = document.querySelector<HTMLInputElement>('[name=todo]');
const todoList = document.getElementById('todos') as HTMLUListElement;
const clear_button = document.getElementById('clear-button') as HTMLButtonElement;

if (!form || !input || !todoList || !clear_button) {
    throw new Error('Required HTML elements not found');
}

const todoData: string[] = [];

function addTodo(todoText: string): void {
    todoData.push(todoText);
    const li = document.createElement('li');
    li.innerHTML = todoText;
    todoList.appendChild(li);
    localStorage.setItem('todos', JSON.stringify(todoData));
}

form.onsubmit = (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = ""
}

clear_button.addEventListener('click', () => {
    localStorage.removeItem('todos');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
});

const existingTodos = JSON.parse(localStorage.getItem('todos') || "[]");
if (!isStringArray(existingTodos)) {
    throw new Error('the content of local storage does not have the correct schema');
}

existingTodos.forEach(todo => {
    addTodo(todo);
});