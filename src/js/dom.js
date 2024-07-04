// dom.js
const content = document.querySelector('.content');

export function createNewTask() {
    // Create elements for new task form
    const newTaskTitleLabel = document.createElement('label');
    newTaskTitleLabel.innerText = 'Task Name';
    newTaskTitleLabel.classList.add('new-task-title-label');

    const newTaskTitle = document.createElement('input');
    newTaskTitle.type = 'text';
    newTaskTitle.classList.add('new-task-input');

    content.appendChild(newTaskTitleLabel);
    content.appendChild(newTaskTitle);

    const newTaskDescriptionLabel = document.createElement('label');
    newTaskDescriptionLabel.innerText = 'Description';
    newTaskDescriptionLabel.classList.add('new-task-description-label');

    const newTaskDescription = document.createElement('textarea');
    newTaskDescription.classList.add('new-task-description-input');

    content.appendChild(newTaskDescriptionLabel);
    content.appendChild(newTaskDescription);

    const newTaskNotesLabel = document.createElement('label');
    newTaskNotesLabel.innerText = 'Notes';
    newTaskNotesLabel.classList.add('new-task-notes-label');

    const newTaskNotes = document.createElement('textarea');
    newTaskNotes.classList.add('new-task-notes-input');

    content.appendChild(newTaskNotesLabel);
    content.appendChild(newTaskNotes);

    const newTaskDateLabel = document.createElement('label');
    newTaskDateLabel.innerText = 'Date';
    newTaskDateLabel.classList.add('new-task-date-label');

    const newTaskDateTitle = document.createElement('input');
    newTaskDateTitle.type = 'date';
    newTaskDateTitle.classList.add('new-task-date-input');

    content.appendChild(newTaskDateLabel);
    content.appendChild(newTaskDateTitle);

    // Create and append the priority dropdown
    const newTaskPriorityLabel = document.createElement('label');
    newTaskPriorityLabel.innerText = 'Priority';
    newTaskPriorityLabel.classList.add('new-task-priority-label');
    content.appendChild(newTaskPriorityLabel);

    const newTaskPriorityDropdown = document.createElement('select');
    newTaskPriorityDropdown.classList.add('new-task-priority-dropdown');

    const priorities = ['Low', 'Medium', 'High'];

    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority.toLowerCase();
        option.textContent = priority;
        newTaskPriorityDropdown.appendChild(option);
    });

    content.appendChild(newTaskPriorityDropdown);

    const submitNewTask = document.createElement('button');
    submitNewTask.innerText = 'Create New Task';
    submitNewTask.classList.add('submit-button');
    content.appendChild(submitNewTask);
}






export function setupEventListeners(todoList) {
    // Event listeners for adding tasks, deleting tasks, etc.
    // Example:
    document.querySelector('#add-task-button').addEventListener('click', () => {
        // Get task details from input fields
        const taskName = document.querySelector('#task-name').value;
        const taskDescription = document.querySelector('#task-description').value;

        // Create task object
        const task = { name: taskName, description: taskDescription };

        // Add task to todoList
        todoList.addTask(task);

        // Clear input fields
        document.querySelector('#task-name').value = '';
        document.querySelector('#task-description').value = '';

        // Update DOM to reflect changes (optional)
        updateTaskList(todoList);
    });

    // Other event listeners
}

function updateTaskList(todoList) {
    // Update the DOM to reflect the current state of todoList
    // Example: Render tasks in the task list section
    const todoListSection = document.querySelector('#todo-list');
    todoListSection.innerHTML = '';

    todoList.tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = task.name;
        // Append taskElement to todoListSection
        todoListSection.appendChild(taskElement);
    });
}