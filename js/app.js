(function () {

    // Selecting the required id elements
    const taskInput = document.getElementById("task_input");
    const addNewBtn = document.getElementById("add_new_btn");
    const taskList = document.getElementById("task_list");



    // Add a click event to the add btn
    addNewBtn.addEventListener('click', function (e) {
        let taskName = taskInput.value.trim();
        if (!taskName) {
            alert("Please insert a task");
            return;
        }
        taskInput.value = '';
        addNewTask(taskName);
        // console.log(taskName);
    })


    // Task input click event 
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === "Enter") {
            let taskName = taskInput.value.trim();
            if (!taskName) {
                alert("Please insert a task");
                return;
            }
            taskInput.value = '';
            addNewTask(taskName);
            // console.log(taskName);
        }
    })


    // Add new task item
    function addNewTask(text) {
        let div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
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
        taskList.appendChild(div);
    }


    // Get data from local storage
    function getFromLocalStorage(task)

})()


