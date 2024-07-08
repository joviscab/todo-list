// dom.js
import { saveToLocalStorage, getFromLocalStorage } from './storage.js';
import TodoList from './todoList.js';
import Project from './project.js';
import Task from './task.js';
import trashIcon from '../img/trash.svg';


const content = document.querySelector('.content');
const newTaskButton = document.querySelector('.new-task-button');
const newProjectButton = document.querySelector('.new-project-button');
const projectsListSection = document.querySelector('.projects-list');
const tasksListSection = document.querySelector('.tasks-list');


// Update content function
export function updateContent(createFunction) {
    content.innerHTML = '';
    createFunction();
}


// Function to load data from localStorage on page load
export function loadFromStorage() {
    const savedTodoList = getFromLocalStorage('todoList');
    if (savedTodoList) {
        window.myTodoList = new TodoList(savedTodoList.name);
        savedTodoList.projects.forEach(projectData => {
            const project = new Project(projectData.name, projectData.description);
            project.id = projectData.id; // Assuming id needs to be assigned separately
            projectData.tasks.forEach(taskData => {
                const task = new Task(taskData.id, taskData.name, taskData.description, taskData.notes, taskData.date, taskData.priority);
                project.addTask(task);
            });
            window.myTodoList.addProject(project);
        });
    } else {
        // Initialize with default data if no saved data is found
        window.myTodoList = new TodoList('Default TodoList');
    }
}

// Function to save data to localStorage whenever changes occur
export function saveToStorage() {
    saveToLocalStorage('todoList', window.myTodoList);
}


// Update task list in the sidebar
export function updateTaskList(todoList) {
    tasksListSection.innerHTML = '';

    const tasksListTitles = document.createElement('ul');
    todoList.projects.forEach(project => {
        project.tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.classList.add('task-item');
            taskElement.innerHTML = task.name;

            const deleteIcon = document.createElement('img');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.setAttribute('src', trashIcon);
            deleteIcon.setAttribute('height', '15');
            deleteIcon.setAttribute('width', '15');

            // Add event listener to the delete icon
            deleteIcon.addEventListener('click', () => {
                project.removeTask(task.id);
                saveToStorage();
                updateTaskList(todoList);
            });

            taskElement.appendChild(deleteIcon);  
            tasksListTitles.appendChild(taskElement);
        });
    });

    tasksListSection.appendChild(tasksListTitles); 
}


// Update projects list in the sidebar
export function updateProjectList(todoList) {
    projectsListSection.innerHTML = '';

    const projectsListTitles = document.createElement('ul');
    todoList.projects.forEach(project => {
        const projectElement = document.createElement('li');
        projectElement.classList.add('project-item');
        projectElement.innerHTML = project.name;

        const deleteIcon = document.createElement('img');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.setAttribute('src', trashIcon);
        deleteIcon.setAttribute("height", "15");
        deleteIcon.setAttribute("width", "15");

        // Add event listener to the delete icon
        deleteIcon.addEventListener('click', () => {
            todoList.removeProject(project.id);
            saveToStorage();
            updateProjectList(todoList);
        });

        projectElement.appendChild(deleteIcon);  
        projectsListTitles.appendChild(projectElement);
    });

    projectsListSection.appendChild(projectsListTitles); 
}


// Initialize sidebar lists on page load
window.addEventListener('load', () => {
    loadFromStorage();
    updateProjectList(window.myTodoList);
    updateTaskList(window.myTodoList);
});

export function createNewProjectForm() {
    const projectNameLabel = document.createElement('label');
    projectNameLabel.innerText = 'Project Name';
    projectNameLabel.classList.add('project-name-label');

    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.classList.add('project-name-input');

    const projectDescriptionLabel = document.createElement('label');
    projectDescriptionLabel.innerText = 'Project Description';
    projectDescriptionLabel.classList.add('project-description-label');

    const projectDescriptionInput = document.createElement('input');
    projectDescriptionInput.type = 'text';
    projectDescriptionInput.classList.add('project-description-input');

    const submitNewProject = document.createElement('button');
    submitNewProject.innerText = 'Create New Project';
    submitNewProject.classList.add('submit-button');
    
    submitNewProject.addEventListener('click', () => {
        const projectName = projectNameInput.value;
        const projectDescription = projectDescriptionInput.value;
        const newProject = new Project(projectName, projectDescription);
        window.myTodoList.addProject(newProject);
        
        console.log('New project added:');
        window.myTodoList.showProjects();
        
        // Update DOM to reflect changes
        updateProjectList(window.myTodoList);

        // Clean up and show project details
        updateContent(() => showProjectCard(newProject));

        // Save to localStorage
        saveToStorage();
    });

    // Initial load from localStorage
    window.addEventListener('load', () => {
    loadFromStorage();
    updateProjectList(window.myTodoList);
});


    content.appendChild(projectNameLabel);
    content.appendChild(projectNameInput);
    content.appendChild(projectDescriptionLabel);
    content.appendChild(projectDescriptionInput);
    content.appendChild(submitNewProject);
}

export function createNewTaskForm() {
    // Create elements for new task form
    const newTaskTitleLabel = document.createElement('label');
    newTaskTitleLabel.innerText = 'Task Name';
    newTaskTitleLabel.classList.add('new-task-title-label');

    const newTaskTitle = document.createElement('input');
    newTaskTitle.type = 'text';
    newTaskTitle.classList.add('new-task-input');

    const newTaskDescriptionLabel = document.createElement('label');
    newTaskDescriptionLabel.innerText = 'Description';
    newTaskDescriptionLabel.classList.add('new-task-description-label');

    const newTaskDescription = document.createElement('textarea');
    newTaskDescription.classList.add('new-task-description-input');

    const newTaskNotesLabel = document.createElement('label');
    newTaskNotesLabel.innerText = 'Notes';
    newTaskNotesLabel.classList.add('new-task-notes-label');

    const newTaskNotes = document.createElement('textarea');
    newTaskNotes.classList.add('new-task-notes-input');

    const newTaskDateLabel = document.createElement('label');
    newTaskDateLabel.innerText = 'Date';
    newTaskDateLabel.classList.add('new-task-date-label');

    const newTaskDateInput = document.createElement('input');
    newTaskDateInput.type = 'date';
    newTaskDateInput.classList.add('new-task-date-input');

    const newTaskPriorityLabel = document.createElement('label');
    newTaskPriorityLabel.innerText = 'Priority';
    newTaskPriorityLabel.classList.add('new-task-priority-label');

    const newTaskPriorityDropdown = document.createElement('select');
    newTaskPriorityDropdown.classList.add('new-task-priority-dropdown');

    const priorities = ['Low', 'Medium', 'High'];

    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority.toLowerCase();
        option.textContent = priority;
        newTaskPriorityDropdown.appendChild(option);
    });

    const projectSelectLabel = document.createElement('label');
    projectSelectLabel.innerText = 'Select Project';
    projectSelectLabel.classList.add('select-project-label');

    const selectProjectDropdown = document.createElement('select');
    selectProjectDropdown.classList.add('select-project-dropdown');

    // Populate the project dropdown
    window.myTodoList.projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.name;
        option.textContent = project.name;
        selectProjectDropdown.appendChild(option);
    });

    const submitNewTask = document.createElement('button');
    submitNewTask.innerText = 'Create New Task';
    submitNewTask.classList.add('submit-button');

    submitNewTask.addEventListener('click', () => {
        const taskId = Date.now();
        const taskName = newTaskTitle.value;
        const taskDescription = newTaskDescription.value;
        const taskNotes = newTaskNotes.value;
        const taskDate = newTaskDateInput.value;
        const taskPriority = newTaskPriorityDropdown.value;
        const selectedProjectName = selectProjectDropdown.value;

        const newTask = new Task(taskId, taskName, taskDescription, taskNotes, taskDate, taskPriority);
        const project = window.myTodoList.getProject(selectedProjectName);

        if (project) {
            project.addTask(newTask);
            console.log(`New task added to project "${selectedProjectName}":`);
            project.showTasks();

            // Update DOM to reflect changes
            updateTaskList(window.myTodoList);

            // Clean up and show task details
            updateContent(() => showTaskCard(newTask));

            // Save to localStorage
            saveToStorage();

        } else {
            console.log(`Project "${selectedProjectName}" not found.`);
        }
    });

    content.appendChild(newTaskTitleLabel);
    content.appendChild(newTaskTitle);
    content.appendChild(newTaskDescriptionLabel);
    content.appendChild(newTaskDescription);
    content.appendChild(newTaskNotesLabel);
    content.appendChild(newTaskNotes);
    content.appendChild(newTaskDateLabel);
    content.appendChild(newTaskDateInput);
    content.appendChild(newTaskPriorityLabel);
    content.appendChild(newTaskPriorityDropdown);
    content.appendChild(projectSelectLabel);
    content.appendChild(selectProjectDropdown);
    content.appendChild(submitNewTask);
}

export function setupEventListeners(todoList) {
    newProjectButton.addEventListener('click', () => updateContent(createNewProjectForm));
    newTaskButton.addEventListener('click', () => updateContent(createNewTaskForm));
}

export function showTaskCard(task) {
    // Clear existing content
    content.innerHTML = '';

    // Create a container for the task details
    const taskCardContainer = document.createElement('div');
    taskCardContainer.classList.add('task-card');

    // Task name
    const taskNameElement = document.createElement('h2');
    taskNameElement.innerText = task.name;
    taskCardContainer.appendChild(taskNameElement);

    // Task description
    const taskDescriptionElement = document.createElement('p');
    taskDescriptionElement.innerText = task.description;
    taskCardContainer.appendChild(taskDescriptionElement);

    // Task notes (checkbox and label)
    const taskNotesElement = document.createElement('div');
    const taskNotesCheckbox = document.createElement('input');
    taskNotesCheckbox.type = 'checkbox';
    taskNotesCheckbox.checked = task.notes;
    taskNotesCheckbox.disabled = true;
    const taskNotesLabel = document.createElement('label');
    taskNotesLabel.innerText = 'Notes';
    taskNotesElement.appendChild(taskNotesCheckbox);
    taskNotesElement.appendChild(taskNotesLabel);
    taskCardContainer.appendChild(taskNotesElement);

    // Task date
    const taskDateElement = document.createElement('p');
    taskDateElement.innerText = task.date;
    taskCardContainer.appendChild(taskDateElement);

    // Task priority
    const taskPriorityElement = document.createElement('p');
    taskPriorityElement.innerText = task.priority;
    taskCardContainer.appendChild(taskPriorityElement);

    // Append task card container to content
    content.appendChild(taskCardContainer);
}

export function showProjectCard(project) {
    // Clear existing content
    content.innerHTML = '';

    // Create a container for the project details
    const projectCardContainer = document.createElement('div');
    projectCardContainer.classList.add('project-card');

    // Project name
    const projectNameElement = document.createElement('h2');
    projectNameElement.innerText = project.name;
    projectCardContainer.appendChild(projectNameElement);

    // Project description
    const projectDescriptionElement = document.createElement('p');
    projectDescriptionElement.innerText = project.description;
    projectCardContainer.appendChild(projectDescriptionElement);

    // Show tasks related to the project
    const projectTasksList = document.createElement('ul');
    project.tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.name;
        projectTasksList.appendChild(taskItem);
    });

    projectCardContainer.appendChild(projectTasksList);
    
    // Append project card container to content
    content.appendChild(projectCardContainer);
}