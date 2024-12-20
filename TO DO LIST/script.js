const addPlus = document.getElementById('AddTask');
const taskInput = document.getElementById('input-box');
const taskList = document.getElementById('list-container');

loadTasks();

function addTask() {
    const task = taskInput.value.trim();

    if (task) {
        createTaskElement(task);
        taskInput.value = '';
        saveTask();
    } else {
        alert('Please enter a task');
    }
}

addPlus.addEventListener('click', addTask);

function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const editTask = document.createElement('button');
    editTask.textContent = '';  // Text for the edit button
    editTask.className = 'edit';
    editTask.addEventListener('click', function() {
        const newTask = prompt("Edit your task:", task);  // Prompt to edit the task
        if (newTask !== null && newTask.trim() !== '') {
            listItem.firstChild.textContent = newTask.trim();  // Update the task text (not the button text)
            saveTask();  // Save the updated tasks to localStorage
        } else {
            alert('Please input a valid task');  
        }
    });
    


    const deleteButton = document.createElement('button');
    deleteButton.textContent = '';
    deleteButton.className = 'deleteTask'; 
    deleteButton.addEventListener('click', function() {
        listItem.remove();
        saveTask(); 
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    listItem.appendChild(editTask);


}

function saveTask() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item) {
        tasks.push(item.textContent.trim().replace('Delete', '').trim());
    });
    localStorage.setItem('task', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('task')) || [];
    tasks.forEach(createTaskElement);
}

