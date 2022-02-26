// Selecting the required elements
function getById(id) {
    return document.getElementById(id)
}

const addBtn = getById('add_new_btn');
const taskInput = getById('task_input');
const taskList = getById('task_list');



// Add a click event to the add btn
addBtn.addEventListener('click', function (e) {
    var taskName = taskInput.value;
    if (!taskName) {
        alert('Please insert your task in input');
        return;
    }
    taskInput.value = '';
    addNewItem(taskName);
})




// Add new task item
function addNewItem(text) {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
    <li>${text}</li>
    <button class="edit">
    <i class="fas fa-pen-square"></i>
    </button>
    <button class="complete">
    <i class="fas fa-check-circle"></i>
    </button>
    <button class="delete">
    <i class="fas fa-times-circle"></i>
    </button>
    `
    taskList.appendChild(item);
    const tasks = getFromLocalStorage();

    // Separate items with the same task name
    let unique = text;
    for (let task of tasks) {
        if (task.trim() === text) {
            unique += ' ';
        }
    }
    tasks.push(unique);
    setToLocalStorage(tasks);
}


// Task list event
taskList.addEventListener('click', function (e) {
    if (e.target.className == 'delete') {
        deleteItem(e);
    }
    else if (e.target.className == 'complete') {
        completeItem(e);
    }
    else if (e.target.className == 'edit') {
        editItem(e);
    }
})


// Delete task event
function deleteItem(e) {
    e.target.parentElement.remove();
    const deleteTask = e.target.parentElement.firstElementChild.innerText;
    deleteFromLocalStorage(deleteTask);
}


// Delete the tasks from local storage
function deleteFromLocalStorage(deleteTask) {
    const tasks = getFromLocalStorage();
    console.log(tasks);
    const index = tasks.indexOf(deleteTask);
    tasks.splice(index, 1);
    setToLocalStorage(tasks);
}


// Complete task event
function completeItem(e) {
    const newList = e.target.parentElement.firstElementChild;
    newList.classList.toggle('complete_item');
}


// Set the tasks from local storage
function setToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}



// Edit task event
function editItem(e) {
    const newList = e.target.parentElement.firstElementChild;
    const prevText = newList.innerText;
    newList.innerHTML = '';

    // Creating an input filed
    const input = document.createElement('input');
    input.type = 'text';
    input.value = prevText;

    input.addEventListener('keypress', function (event) {
        if (event.key == 'Enter') {
            const modifiedName = event.target.value;
            newList.innerHTML = '';
            newList.innerText = modifiedName;
            e.target.style.display = 'inline';
        }
    })

    newList.appendChild(input);
    e.target.style.display = 'none';
}


// Get tasks on load
document.body.onload = function (e) {
    const tasks = getFromLocalStorage();
    displayTask(tasks);

}


// Get the tasks from local storage
function getFromLocalStorage() {
    let tasks;
    const data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
    }
    else {
        tasks = [];
    }
    return tasks;
}



// Rendering the tasks on UI
function displayTask(tasks) {
    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
        <li>${task}</li>
    <button class="edit">
    <i class="fas fa-pen-square"></i>
    </button>
    <button class="complete">
    <i class="fas fa-check-circle"></i>
    </button>
    <button class="delete">
    <i class="fas fa-times-circle"></i>
    </button>
    `
        taskList.appendChild(item);
    })
}