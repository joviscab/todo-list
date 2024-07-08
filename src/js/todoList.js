import Project from './project.js';
import Task from './task.js';

export default class TodoList {
    constructor(name) {
        this.name = name;
        this.projects = []; 
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
    }

    getProject(projectName) {
        return this.projects.find(project => project.name === projectName);
    }

    showProjects() {
        console.log(`Projects in TodoList "${this.name}":`);
        this.projects.forEach(project => {
            console.log(`ID: ${project.id}, Name: ${project.name}, Description: ${project.description}`);
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    loadFromLocalStorage() {
        const projectsJSON = localStorage.getItem('projects');
        if (projectsJSON) {
            const projectsArray = JSON.parse(projectsJSON);
            this.projects = projectsArray.map(projectData => {
                const project = new Project(projectData.id, projectData.name, projectData.description);
                project.tasks = projectData.tasks.map(taskData => new Task(taskData.id, taskData.name, taskData.description, taskData.notes, taskData.date, taskData.priority, taskData.completed));
                return project;
            });
        } else {
            this.initializeDefaults();
        }
    }

    initializeDefaults() {
        // Default project
        const defaultProject = new Project('Project Doggo', 'This is a default project description, just to serve as an example. The mention of a dog is always mandatory. Dogs are the best.');
        this.projects.push(defaultProject);

        // Default task to Default project
        const defaultTask = new Task('Buy dog food', 'This is a default task just to serve as an example.', 'Remember to buy dog food after work', '2024-07-08', 'high', 'completed = false');
        defaultProject.addTask(defaultTask);

        this.saveToLocalStorage();
    }  

}
