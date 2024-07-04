import '../src/style/index.css';
import { createNewTask } from './js/dom.js';
import showDefaultTask from './defaultTask';

const content = document.querySelector('.content');
const newTaskButton = document.querySelector('.new-task-button');
const newProjectButton = document.querySelector('.new-project-button');
const defaultTaskTitleLink = document.querySelector('.default-task-list-title');

// Update content function
function updateContent(createFunction) {
    content.innerHTML = '';
    createFunction();
}

newTaskButton.addEventListener('click', () => updateContent(createNewTask));

showDefaultTask();