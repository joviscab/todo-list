// dom.js
import { saveToStorage, saveToLocalStorage, getFromLocalStorage } from './storage.js';
import TodoList from './todoList.js';
import Project from './project.js';
import Task, { nextTaskId } from './task.js';
import trashIcon from '../img/trash.svg';
import circleCheckIcon from '../img/circle.svg';
import circleCheckedIcon from '../img/check-circle.svg';
import { format, addDays } from 'date-fns';

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
    const savedTodoList = getFromLocalStorage('myTodoList');
    
    if (savedTodoList && savedTodoList.projects) {
        window.myTodoList = new TodoList(savedTodoList.name);
        (savedTodoList.projects || []).forEach(projectData => {
            const project = new Project(projectData.name, projectData.description);
            project.id = projectData.id; // Assuming id needs to be assigned separately
            
            (projectData.tasks || []).forEach(taskData => {
                const task = new Task(taskData.name, taskData.description, taskData.notes, taskData.date, taskData.priority, taskData.completed);
                task.id = taskData.id; // Assuming id needs to be assigned separately
                project.addTask(task);
            });
            
            window.myTodoList.addProject(project);
        });
    } else {
        // Initialize with default data if no saved data is found
        window.myTodoList = new TodoList('Default TodoList');
        window.myTodoList.initializeDefaults();

        // Display the default project on the screen
        const defaultProject = window.myTodoList.projects[0];
        showProjectCard(defaultProject);
    }

    console.log('Initialized todo list:', myTodoList);
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

    // Delete icon
    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.setAttribute('src', trashIcon);
    deleteIcon.setAttribute('height', '15');
    deleteIcon.setAttribute('width', '15');

    // Add event listener to the delete icon
    deleteIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    project.removeTask(task.id);
    saveToStorage();
    updateTaskList(todoList);
});

    // Check icon
    const checkIcon = document.createElement('img');
    checkIcon.classList.add('check-icon');
    checkIcon.setAttribute('src', task.completed ? circleCheckedIcon : circleCheckIcon);
    checkIcon.setAttribute('height', '15');
    checkIcon.setAttribute('width', '15');

    // Apply strikethrough if the task is completed
    if (task.completed) {
        taskElement.classList.add('strikethrough');
    } else {
        taskElement.classList.remove('strikethrough');
    } 
            
    // Add event listener to the check icon 
    checkIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        task.completed = !task.completed;
        checkIcon.setAttribute('src', task.completed ? circleCheckedIcon : circleCheckIcon);
        taskElement.classList.toggle('strikethrough', task.completed);
        saveToStorage();
        showTaskCard(task, project, todoList);
    });

    // Add event listener to the task link
    taskElement.addEventListener('click', () => {
        showTaskCard(task, project, todoList);
    });

    taskElement.appendChild(checkIcon); 
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
        deleteIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            todoList.removeProject(project.id);
            saveToStorage();
            updateProjectList(todoList);
            updateTaskList(todoList);
        });

        // Add event listener to the task link
            projectElement.addEventListener('click', () => {
            showProjectCard(project);
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

        // Save to localStorage
        saveToStorage();
        
        // Update DOM to reflect changes
        updateProjectList(window.myTodoList);

        // Clean up and show project details
        updateContent(() => showProjectCard(newProject));


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
        option.value = priority;
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
        const taskName = newTaskTitle.value;
        const taskDescription = newTaskDescription.value;
        const taskNotes = newTaskNotes.value;
        const taskDate = newTaskDateInput.value;
        const taskPriority = newTaskPriorityDropdown.value;
        const selectedProjectName = selectProjectDropdown.value;

        const newTask = new Task(taskName, taskDescription, taskNotes, taskDate, taskPriority);
        const project = window.myTodoList.getProject(selectedProjectName);

        if (project) {
            project.addTask(newTask);
            console.log(`New task added to project "${selectedProjectName}":`);
            project.showTasks();

            // Update DOM to reflect changes
            updateTaskList(window.myTodoList);

            // Clean up and show task details
            updateContent(() => showTaskCard(newTask, project));

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

export function showTaskCard(task, project, todoList) {
    // Clear content
    content.innerHTML = '';

    // Create a container for the task details
    const taskCardContainer = document.createElement('div');
    taskCardContainer.classList.add('task-card');

    // Append task card container to content
    content.appendChild(taskCardContainer);

    // Function to refresh the task card
    function refreshTaskCard() {
        // Clear existing content in the container
        taskCardContainer.innerHTML = '';

        // Task title label
        const taskTitleLabel = document.createElement('h4');
        taskTitleLabel.innerText = 'Task:';
        taskTitleLabel.classList.add('show-task-title-label');
        taskCardContainer.appendChild(taskTitleLabel);

        // Task name
        const taskNameElement = document.createElement('h2');
        taskNameElement.classList.add('show-task-name');
        taskNameElement.innerText = task.name;
        if (task.completed) {
            taskNameElement.classList.add('strikethrough');
        }
        taskCardContainer.appendChild(taskNameElement);

        // Task description label
        const taskDescriptionLabel = document.createElement('h4');
        taskDescriptionLabel.innerText = 'Description:';
        taskDescriptionLabel.classList.add('show-task-description-label');
        taskCardContainer.appendChild(taskDescriptionLabel);

        // Task description
        const taskDescriptionElement = document.createElement('p');
        taskDescriptionElement.classList.add('show-task-description');
        taskDescriptionElement.innerText = task.description;
        if (task.completed) {
            taskDescriptionElement.classList.add('strikethrough');
        }
        taskCardContainer.appendChild(taskDescriptionElement);

        // Task notes label
        const taskShowNotesLabel = document.createElement('h4');
        taskShowNotesLabel.innerText = 'Notes:';
        taskShowNotesLabel.classList.add('show-task-notes-label');
        taskCardContainer.appendChild(taskShowNotesLabel);

        // Task notes 
        const taskNotesElement = document.createElement('li');
        taskNotesElement.classList.add('show-task-notes');
        taskNotesElement.innerText = task.notes;
        if (task.completed) {
            taskNotesElement.classList.add('strikethrough');
        }
        taskCardContainer.appendChild(taskNotesElement);

        // Task date label
        const taskDateLabel = document.createElement('h4');
        taskDateLabel.innerText = 'Date:';
        taskDateLabel.classList.add('show-task-date-label');
        taskCardContainer.appendChild(taskDateLabel);

        // Task date
        const taskDateElement = document.createElement('p');
        taskDateElement.classList.add('show-task-date');
        taskDateElement.innerText = task.date;
        if (task.completed) {
            taskDateElement.classList.add('strikethrough');
        }
        taskCardContainer.appendChild(taskDateElement);

        // Task priority label
        const taskPriorityLabel = document.createElement('h4');
        taskPriorityLabel.innerText = 'Priority:';
        taskPriorityLabel.classList.add('show-task-priority-label');
        taskCardContainer.appendChild(taskPriorityLabel);

        // Task priority dropdown
        const dropdownTitle = document.createElement('h4');
        dropdownTitle.innerText = 'Change task priority';
        dropdownTitle.classList.add('show-card-dropdown-title');
        taskCardContainer.appendChild(dropdownTitle);
        const taskPriorityDropdown = document.createElement('select');
        taskPriorityDropdown.classList.add('show-task-priority-dropdown');
        const priorities = ['Low', 'Medium', 'High'];
        priorities.forEach(priority => {
            const option = document.createElement('option');
            option.value = priority;
            option.textContent = priority;
            if (priority === task.priority) {
                option.selected = true;
            }
            taskPriorityDropdown.appendChild(option);
        });
        taskCardContainer.appendChild(taskPriorityDropdown);

        // Placeholder for the task priority value
        const taskPriorityElement = document.createElement('p');
        taskPriorityElement.classList.add('show-task-priority');
        taskPriorityElement.innerText = task.priority;
        if (task.completed) {
            taskPriorityElement.classList.add('strikethrough');
        }
        taskCardContainer.appendChild(taskPriorityElement);

        // Task status label
        const taskStatusLabel = document.createElement('h4');
        taskStatusLabel.innerText = 'Completed:';
        taskStatusLabel.classList.add('show-task-status-label');
        taskCardContainer.appendChild(taskStatusLabel);

        // Task status
        const taskStatusElement = document.createElement('p');
        taskStatusElement.classList.add('show-task-status');
        taskStatusElement.innerText = `${task.getCompletedStatus()}`;
        taskCardContainer.appendChild(taskStatusElement);

        // Check icon
        const textCheckIcon = document.createElement('h4');
        textCheckIcon.innerText = 'Mark task as complete';
        textCheckIcon.classList.add('show-task-check-title');
        const checkIcon = document.createElement('img');
        checkIcon.classList.add('check-icon-show-task');
        checkIcon.setAttribute('src', task.completed ? circleCheckedIcon : circleCheckIcon);
        checkIcon.setAttribute('height', '15');
        checkIcon.setAttribute('width', '15');

        // Add event listener to the check icon to toggle task status
        checkIcon.addEventListener('click', () => {
            task.completed = !task.completed;
            checkIcon.setAttribute('src', task.completed ? circleCheckedIcon : circleCheckIcon);
            refreshTaskCard(); // Refresh task card after status change
            saveToStorage();
            updateTaskList(todoList);
        });
        taskCardContainer.appendChild(checkIcon);
        taskCardContainer.appendChild(textCheckIcon);

        // Add event listener to the priority dropdown to change priority
        taskPriorityDropdown.addEventListener('change', () => {
            task.priority = taskPriorityDropdown.value;
            refreshTaskCard(); // Refresh task card after priority change
            saveToStorage();
            updateTaskList(todoList);
        });

        // Task project label
        const tasksProjectLabel = document.createElement('h4');
        tasksProjectLabel.innerText = 'Project:';
        tasksProjectLabel.classList.add('show-task-project-label');
        taskCardContainer.appendChild(tasksProjectLabel);

        // Project name
        const taskProjectElement = document.createElement('p');
        taskProjectElement.classList.add('project-name-show');
        taskProjectElement.innerText = `${project ? project.name : 'No project'}`;
        taskCardContainer.appendChild(taskProjectElement);
    }

    // Initial render
    refreshTaskCard();
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

    // Project tasks label
    const projectTasksLabel = document.createElement('h4');
    projectTasksLabel.innerText = 'Tasks:';
    projectTasksLabel.classList.add('show-project-tasks-label');
    projectCardContainer.appendChild(projectTasksLabel);

    // Show tasks related to the project
    const projectTasksList = document.createElement('ul');
    project.tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name} - ${task.date}`;
        if (task.completed) {
            taskItem.classList.add('strikethrough');
        }
        projectTasksList.appendChild(taskItem);
    });

    projectCardContainer.appendChild(projectTasksList);
    
    // Append project card container to content
    content.appendChild(projectCardContainer);
}