// Sidebar functionality
const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");

// Function to toggle the lock state of the sidebar
const toggleLock = () => {
    sidebar.classList.toggle("locked");
    if (!sidebar.classList.contains("locked")) {
        sidebar.classList.add("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    } else {
        sidebar.classList.remove("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
};

// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
    if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
    }
};

// Function to show the sidebar when the mouse enters
const showSidebar = () => {
    if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
    }
};

// Function to show and hide the sidebar
const toggleSidebar = () => {
    sidebar.classList.toggle("close");
};

// Close sidebar if window width is less than 800px
if (window.innerWidth < 800) {
    sidebar.classList.add("close");
    sidebar.classList.remove("locked");
    sidebar.classList.remove("hoverable");
}

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

// Task management functionality
const TaskInput = document.getElementById("taskInput");
const tasklist = document.getElementById("tasklist");
const marksInput = document.getElementById("marksInput");
const classDropdown = document.querySelector(".class-dropdown");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on page load
document.addEventListener("DOMContentLoaded", displayTasks);

// Function to add a new task
function addTask() {
    const taskText = TaskInput.value.trim();
    const marks = marksInput.value.trim();
    if (taskText === "" || marks === "") return;

    const selectedClass = classDropdown.value;

    const task = { text: taskText, class: selectedClass, marks: marks };
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    TaskInput.value = "";
    marksInput.value = "";
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Function to edit a task
function editTask(index) {
    const newTask = prompt("Manage the student's names or anything", tasks[index].text);
    if (newTask !== null && newTask.length > 0 && newTask !== tasks[index].text) {
        tasks[index].text = newTask;
    }

    const newMarks = prompt("Edit Marks", tasks[index].marks);
    if (newMarks !== null && !isNaN(newMarks) && newMarks !== tasks[index].marks) {
        tasks[index].marks = newMarks;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Function to display tasks
function displayTasks() {
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const taskText = task.text;
        const className = task.class;
        const marks = task.marks;

        const chunks = [];
        for (let i = 0; i < taskText.length; i += 50) {
            chunks.push(taskText.substring(i, i + 50));
        }
        const taskHTML = chunks.join("<br>");

        li.innerHTML = `
            <div class="itemBox ${className}">
                <span>${taskHTML}</span>
                <span> | Marks: ${marks}</span>
                <button class="edit-button" onclick="editTask(${index})">Edit</button>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        tasklist.appendChild(li);
    });
}
