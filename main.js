const TaskInput = document.getElementById("taskInput");
const tasklist = document.getElementById("tasklist");
const marksInput = document.getElementById("marksInput"); // Get the marks input element
const classDropdown = document.querySelector(".class-dropdown"); // Get the class dropdown element
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", displayTasks);


function addTask() {
  const taskText = TaskInput.value.trim();
  const marks = marksInput.value.trim(); // Get the marks value
  if (taskText === "" || marks === "") return;

  const selectedClass = classDropdown.value;


  const task = { text: taskText, class: selectedClass, marks: marks }; // Include class from dropdown in the task object
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  TaskInput.value = "";
  marksInput.value = ""; // Clear the marks input after adding a task
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function editTask(index) {
    const newTask = prompt("Manage the students names or anything", tasks[index].text);
    if (newTask.length > 0) {
        newTask==tasks[index].text?alert("No changes made"):tasks[index].text=newTask;
    }
    const newMarks = parseInt(prompt("Edit Marks", tasks[index].marks)); // Convert newMarks to integer
  
    if (newTask !== null && newMarks !== null) {
      tasks[index].text = newTask;
      tasks[index].marks = newMarks; // Update marks in the task object
  
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
    const marks = task.marks; // Retrieve marks from task object

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
        <span> | Marks: ${marks}</span>  <button class="edit-button" onclick="editTask(${index})">Edit</button>
        <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    tasklist.appendChild(li);
  });
}
