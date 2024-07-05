// task.js
export default class Task {
    constructor(id, name, description, notes, date, priority, completed = false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.notes = notes;
        this.date = date;
        this.priority = priority;
        this.completed = completed;
    }
}
