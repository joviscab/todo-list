import '../src/style/index.css';


const content = document.querySelector('.content');
const newTaskButton = document.querySelector('.new-task-button');
const newProjectButton = document.querySelector('.new-project-button');


//updateContent function
function updateContent(createFunction) {
    content.innerHTML = '';
    createFunction();
}

newTaskButton.addEventListener('click', () => updateContent(createNewTask));


function createNewTask() {
    const newTaskTitleLabel = document.createElement('label');
    newTaskTitleLabel.innerText = 'New Task';
    newTaskTitleLabel.classList.add('new-task-title-label');

    const newTaskTitle = document.createElement('input');
    newTaskTitle.type = 'text';
    newTaskTitle.classList.add('new-task-input');

    content.appendChild(newTaskTitleLabel);
    content.appendChild(newTaskTitle);

    const newTaskDescriptionLabel = document.createElement('label');
    newTaskDescriptionLabel.innerText = 'Description';
    newTaskDescriptionLabel.classList.add('new-task-description-label');

    const newTaskDescriptionTitle = document.createElement('input');
    newTaskDescriptionTitle.type = 'text';
    newTaskDescriptionTitle.classList.add('new-task-description-input');

    content.appendChild(newTaskDescriptionLabel);
    content.appendChild(newTaskDescriptionTitle);

    const newTaskDateLabel = document.createElement('label');
    newTaskDateLabel.innerText = 'Date';
    newTaskDateLabel.classList.add('new-task-date-label');

    const newTaskDateTitle = document.createElement('input');
    newTaskDateTitle.type = 'date';
    newTaskDateTitle.classList.add('new-task-date-input');

    content.appendChild(newTaskDateLabel);
    content.appendChild(newTaskDateTitle);


}
