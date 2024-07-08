// app.js
import '../style/index.css';
import { setupEventListeners, updateProjectList, updateTaskList } from './dom.js';
import TodoList from './todoList.js';

// Create an instance of the TodoList class
const myTodoList = new TodoList('My Todo List');
myTodoList.loadFromLocalStorage();

// Call the update functions to render the lists initially
updateProjectList(myTodoList);
updateTaskList(myTodoList);

// Set up event listeners for the DOM
setupEventListeners(myTodoList);

