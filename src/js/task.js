// task.js

let nextTaskId = 1;

export default class Task {
    constructor(name, description, notes, date, priority, completed = false) {
        this.id = nextTaskId++;
        this.name = name;
        this.description = description;
        this.notes = notes;
        this.date = date;
        this.priority = priority;
        this.completed = completed;
    }

    getCompletedStatus() {
        return this.completed ? 'yes' : 'no';
    }
}

export { nextTaskId }; 