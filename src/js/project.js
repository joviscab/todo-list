// project.js
import Task from './task.js';

export default class Project {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    markTaskCompleted(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = true;
        }
    }

    showTasks() {
        console.log(`Tasks for project "${this.name}":`);
        this.tasks.forEach(task => {
            console.log(`ID: ${task.id}, Name: ${task.name}, Description: ${task.description}, Notes: ${task.notes}, Date: ${task.date}, Priority: ${task.priority}, Completed: ${task.completed}`);
        });
    }
}
