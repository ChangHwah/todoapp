// Initial References
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks")
let deleteTasks, editTasks, tasks;
let updateNote = '';
let count;

// Function on window load
window.onload = () => {
    updateNote = "";
    count = Object.keys(localStorage).length;
    displayTasks();
};

// Function to diplsay the tasks
const displayTasks = () => {
    if(Object.keys(localStorage).length > 0) {
        tasksDiv.style.display = "inline-block";
    }else {
        tasksDiv.style.display = "none";
    }
// Clear the tasks
    tasksDiv.innerHTML = "";

    // Fetch all the keys in local storagge
    let tasks = Object.keys(localStorage);
    tasks = tasks.sort();

    for(let key of tasks) {
        let classValue = "";
        // Get all values
        let value = localStorage.getItem(key);
        let taskInnerDiv = document.createElement("div");
        taskInnerDiv.classList.add("task");
        taskInnerDiv.setAttribute("id", key);
        taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
        // localstorage would store boolean as string so we parse it to boolean back 
        let editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        if(!JSON.parse(value)){
            editButton.style.visibility = "visible";
        } else {
            editButton.style.visibility = "hidden";
            taskInnerDiv.classList.add("completed");
        }
        taskInnerDiv.appendChild(editButton);
        taskInnerDiv.innerHTML += `<i class="fa-solid fa-trash"></i>`;
        tasksDiv.appendChild(taskInnerDiv);
    }


};

