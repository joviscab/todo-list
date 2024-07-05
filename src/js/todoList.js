// todoList.js
import Project from './project.js';

export default class TodoList {
    constructor(name) {
        this.name = name;
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(projectName) {
        this.projects = this.projects.filter(project => project.name !== projectName);
    }

    getProject(projectName) {
        return this.projects.find(project => project.name === projectName);
    }

    showProjects() {
        console.log(`Projects in "${this.name}":`);
        this.projects.forEach(project => {
            console.log(`Project Name: ${project.name}, Description: ${project.description}`);
            project.showTasks();
        });
    }
}
