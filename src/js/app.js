// app.js
import '../style/index.css';
import { loadFromStorage, setupEventListeners, showProjectCard, updateProjectList, updateTaskList } from './dom.js';
import TodoList from './todoList.js';

let myTodoList;

// Function to wait for myTodoList initialization
function initializeApp() {
    if (!window.myTodoList) {
        setTimeout(initializeApp, 100); // Retry after 100ms if myTodoList is not ready
        return;
    }
    
    // myTodoList is ready
    myTodoList = window.myTodoList;

    // Call the update functions to render the lists initially
    updateProjectList(myTodoList);
    updateTaskList(myTodoList);
    
    // Set up event listeners for the DOM
    setupEventListeners(myTodoList);
    
    const defaultProject = myTodoList.projects[0];
    showProjectCard(defaultProject);
}

// Call initializeApp when window loads
window.addEventListener('load', () => {
    loadFromStorage();
    initializeApp();
});
