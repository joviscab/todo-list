import '../src/style/index.css';
import createNewTask from '../src/newTask'

const content = document.querySelector('.content');
const newTaskButton = document.querySelector('.new-task-button');
const newProjectButton = document.querySelector('.new-project-button');

// Update content function
function updateContent(createFunction) {
    content.innerHTML = '';
    createFunction();
}

newTaskButton.addEventListener('click', () => updateContent(createNewTask));
