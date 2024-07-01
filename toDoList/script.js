                                                                                                                    // Event listener that executes once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
                                                                                                                    // Get the to-do input element
    const todoInput = document.getElementById('todo-input');  
    const addButton = document.getElementById('add-todo-button');                                                   // Get the add button element
    const todoList = document.getElementById('todo-list');                                                          // Get the to-do list element                                   

    
    const loadTodos = () => {                                                                                       // Function to load to-do items from localStorage
        const todos = JSON.parse(localStorage.getItem('todos')) || [];                                              // Get the stored to-do items or an empty array if none exist
        todos.forEach(todoText => addTodoItem(todoText));                                                           // Add each to-do item to the list
    };

    
    const saveTodos = () => {                                                                                       // Function to save to-do items to localStorage       
        const todos = Array.from(todoList.children).map(item => item.textContent);                                  // Convert the list items to an array of text content      
        localStorage.setItem('todos', JSON.stringify(todos));                                                       // Set the to-do items in localStorage                                  
    };

    
    const addTodoItem = (todoText) => {                                                                             // Function to add a new to-do item to the list                                                      
        const listItem = document.createElement('li');                                                              // Create a new list item element       
        listItem.className = 'list-group-item';                                                                     // Add a class for styling  
        listItem.textContent = todoText;                                                                            // Set the text content of the list item

       
        listItem.addEventListener('click', () => {                                                                  // Event listener that executes once the list item is clicked                                                      
            listItem.classList.add('completed');                                                                    // Add a class to indicate the item is completed       
            setTimeout(() => {                                                                                      // Remove the item from the list after a delay
                todoList.removeChild(listItem);               
                saveTodos();                                                                                        // Save the updated to-do list to localStorage
            }, 1000);
        });
    
        todoList.appendChild(listItem);                                                                             // Add the list item to the to-do list                                           
    };

    
    addButton.addEventListener('click', () => {                                                                     // Add an event listener to the add button to add a new to-do item     
        const todoText = todoInput.value.trim();                                                                    // Get the trimmed value from the input field                                                                   
        if (todoText !== "") {                                                                                      // If the trimmed value is not empty                                                     
            addTodoItem(todoText);                                                                                  // Add the to-do item to the list                                                    
            saveTodos();                                                                                            // Save the updated to-do list to localStorage           
            todoInput.value = '';                                                                                   // Clear the input field                                    
        }
    });

    
    todoInput.addEventListener('keydown', (event) => {                                                               // Add an event listener to the input field to check for 'Enter' key presses                              
        if (event.key === 'Enter') {                                                                                 // Check if the pressed key is 'Enter'         
            addButton.click();                                                                                       // Click the add button to add the to-do item                          
        }
    });

   
    loadTodos();                                                                                                     // Load existing to-do items when the page is loaded
});

