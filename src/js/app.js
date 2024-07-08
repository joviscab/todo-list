// app.js
import '../style/index.css';
import { setupEventListeners } from './dom.js';
import TodoList from './todoList.js';

// Create an instance of the TodoList class
const myTodoList = new TodoList('My Todo List');

// Set up event listeners for the DOM
setupEventListeners(myTodoList);