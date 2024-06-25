document.addEventListener('DOMContentLoaded', (event) => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo-button');
    const todoList = document.getElementById('todo-list');

    // Load to-do items from localStorage
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todoText => addTodoItem(todoText));
    };

    // Save to-do items to localStorage
    const saveTodos = () => {
        const todos = Array.from(todoList.children).map(item => item.textContent);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Add a new to-do item to the list
    const addTodoItem = (todoText) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = todoText;

        listItem.addEventListener('click', () => {
            listItem.classList.add('completed');
            setTimeout(() => {
                todoList.removeChild(listItem);
                saveTodos();
            }, 1000);
        });

        todoList.appendChild(listItem);
    };

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            addTodoItem(todoText);
            saveTodos();
            todoInput.value = '';
        }
    });

    todoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    // Load existing to-do items when the page is loaded
    loadTodos();
});
