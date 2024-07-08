// storage.js

export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Ensure to save `window.myTodoList` object whenever you modify the projects or tasks
export function saveToStorage() {
    saveToLocalStorage('myTodoList', window.myTodoList);
}
