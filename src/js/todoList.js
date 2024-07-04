// todoList.js
export default class TodoList {
    constructor() {
        this.tasks = [];
    }

    // Methods to add, delete, update tasks
    addTask(task) {
        this.tasks.push(task);
    }

    // Other methods for managing tasks
}