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

// Function to display the tasks
const displayTasks = () => {
    if(Object.keys(localStorage).length > 0) {
        tasksDiv.style.display = "block";
    }else {
        tasksDiv.style.display = "none";
    }
// Clear the tasks
    tasksDiv.innerHTML = "";

    // Fetch all the keys in local storagge
    let tasks = Object.keys(localStorage);
    sortedTasks = tasks.sort();
    console.log(sortedTasks)

    for(let key of sortedTasks) {
        // let classValue = "";
        // Get all values
        // console.log(localStorage.getItem(key))
        let value = localStorage.getItem(key);
        // console.log(value)
        let taskInnerDiv = document.createElement("div");
        taskInnerDiv.classList.add("task");
        taskInnerDiv.setAttribute("id", key);
        taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
        // localstorage would store boolean as string so we parse it to boolean back 
        let editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        // console.log(taskInnerDiv)

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

    // Tasks completed
    tasks = document.querySelectorAll(".task");
    tasks.forEach((element, index) => {
        element.onclick = () => {
            //local storage update
            if (element.classList.contains("completed")) {
                updateStorage(element.id.split("_")[0], element.innerText, false);
            } else {
                updateStorage(element.id.split("_")[0], element.innerText, true);
            }
        }
    })
};

// Disable edit button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName
    ("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

// Remove Task from local storage
const removeTask = (taskValue) => {
    localStorage.removeItem(taskValue);
    displayTasks();
};

// Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
    localStorage.setItem(`${index}_${taskValue}`,completed);
    displayTasks();
};

// Function to add new task
document.querySelector("#push").addEventListener
("click",  () => {
    //Enable edit button
    disableButtons(false);
    if(newTaskInput.value.length == 0){
        alert("please enter a task")
    } else {
        // Store locally and display from local storage
        if (updateNote == ""){
            //new task
            updateStorage(count, newTaskInput.value, false);
        } else {
            //update task
            let existingCount = updateNote.split("_")[0];
            removeTask(updateNote);
            updateStorage(existingCount, newTaskInput.value, false);
            updateNote="";
        }
        count += 1;
        newTaskInput.value = "";
    }   
});