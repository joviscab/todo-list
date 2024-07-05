import Project from './project.js';

export default class TodoList {
    constructor(name) {
        this.name = name;
        this.projects = []; // Array to hold projects
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
                project.tasks = projectData.tasks; // Assuming tasks are also saved in the projectData
                return project;
            });
        }
    }
}
