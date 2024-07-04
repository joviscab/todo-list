const content = document.querySelector('.content');
const taskList = document.querySelector('.tasks-list');

function showDefaultTask() {

    const taskListContainer = document.createElement('div');
    taskListContainer.classList.add('task-list-container');

    const defaultTaskListTitle = document.createElement('h3');
    defaultTaskListTitle.innerText = 'Walk the doggo';
    defaultTaskListTitle.classList.add('default-task-list-title');
    taskListContainer.appendChild(defaultTaskListTitle);

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const defaultTaskTitleLabel = document.createElement('label');
    defaultTaskTitleLabel.innerText = 'Task:';
    defaultTaskTitleLabel.classList.add('default-task-title-label');
    taskContainer.appendChild(defaultTaskTitleLabel);

    const defaultTaskTitle = document.createElement('h1');
    defaultTaskTitle.innerText = 'Walk the doggo';
    defaultTaskTitle.classList.add('default-task-title');
    taskContainer.appendChild(defaultTaskTitle);

    const defaultTaskDescriptionLabel = document.createElement('label');
    defaultTaskDescriptionLabel.innerText = 'Description:';
    defaultTaskDescriptionLabel.classList.add('default-task-description-label');
    taskContainer.appendChild(defaultTaskDescriptionLabel);

    const defaultTaskDescription = document.createElement('p');
    defaultTaskDescription.innerText = 'Walk with the doggo before watching the movie tonight';
    defaultTaskDescription.classList.add('default-task-description');
    taskContainer.appendChild(defaultTaskDescription);

    const defaultTaskNotesTitle = document.createElement('label');
    defaultTaskNotesTitle.innerText = 'Notes:';
    defaultTaskNotesTitle.classList.add('default-task-notes-title');
    taskContainer.appendChild(defaultTaskNotesTitle);

    const defaultTaskNotes = document.createElement('input');
    defaultTaskNotes.type = 'checkbox';
    defaultTaskNotes.classList.add('defaultTaskNotes');

    // Create a label for the checkbox
    const defaultTaskNotesLabel = document.createElement('label');
    defaultTaskNotesLabel.innerText = 'Do not forget to get a plastic bag to collect the poop!';
    defaultTaskNotesLabel.classList.add('default-task-notes-label');
    
    // Associate the label with the checkbox
    const checkboxId = 'default-task-notes-checkbox';
    defaultTaskNotes.id = checkboxId;
    defaultTaskNotesLabel.htmlFor = checkboxId;

    taskContainer.appendChild(defaultTaskNotes);
    taskContainer.appendChild(defaultTaskNotesLabel);

    const defaultTaskDateLabel = document.createElement('label');
    defaultTaskDateLabel.innerText = 'Date:';
    defaultTaskDateLabel.classList.add('default-task-date-label');
    taskContainer.appendChild(defaultTaskDateLabel);

    const defaultTaskDate = document.createElement('p');
    defaultTaskDate.innerText = 'Today';
    defaultTaskDate.classList.add('default-task-date');
    taskContainer.appendChild(defaultTaskDate);

    const defaultTaskPriorityLabel = document.createElement('label');
    defaultTaskPriorityLabel.innerText = 'Priority:';
    defaultTaskPriorityLabel.classList.add('default-task-priority-label');
    taskContainer.appendChild(defaultTaskPriorityLabel);

    const defaultTaskPriority = document.createElement('p');
    defaultTaskPriority.innerText = 'High';
    defaultTaskPriority.classList.add('default-task-priority');
    taskContainer.appendChild(defaultTaskPriority);


    content.appendChild(taskContainer);
    taskList.appendChild(taskListContainer);
}

export default showDefaultTask;
