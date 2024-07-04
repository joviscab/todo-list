// app.js
import { createNewTask } from './js/dom.js';
import TodoList from './todoList.js';
import * as DOM from './dom.js';

// Example initialization or setup logic in app.js
// Here you can set up event listeners or other application-wide logic
document.querySelector('#new-task-button').addEventListener('click', () => {
    createNewTask();
});

// Other initialization or setup code as needed


// Initialize TodoList
const todoList = new TodoList();

// Event listeners or initialization logic
DOM.setupEventListeners(todoList); // Setup DOM event listeners