const TaskInput = document.getElementById("taskInput");
const tasklist = document.getElementById("tasklist");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});

function addTask() {
    const taskText = TaskInput.value.trim();
    if (taskText === "") return;
    
    const Classnamee = document.getElementsByClassName("class") // Get the current value of class select element
    const Classname = Classnamee.value

    
    const task = { text: taskText, class: Classname }; // Include the class name in the task object
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    TaskInput.value = "";
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    const newTask = prompt("Manage the students marks", tasks[index].text);

    if (newTask !== null) {
        tasks[index].text = newTask;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
}

function displayTasks() {
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const taskText = task.text;
        const Classname = task.class; // Retrieve class name from task object

        const chunks = [];

        // Split task text into chunks of 50 characters each
        for (let i = 0; i < taskText.length; i += 50) {
            chunks.push(taskText.substring(i, i + 50));
        }

        // Join chunks with <br> tags
        const taskHTML = chunks.join("<br>");

        li.innerHTML = `
        <div class="itemBox ${Classname}"> 
            <span>${taskText}</span>
            <hr>
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
        </div>
        `;

        tasklist.appendChild(li);
    });
}

// Initial display of tasks
displayTasks();
