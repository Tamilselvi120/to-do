const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const lists = document.getElementById("lists");
const newListBtn = document.getElementById("new-list-btn");
const currentListTitle = document.getElementById("current-list-title");

let currentList = "Personal"; // Default active list
let tasks = {
  "Personal": [],
  "Work": []
};

// ✅ Add new list
newListBtn.addEventListener("click", () => {
  const name = prompt("Enter new list name:");
  if (name && !tasks[name]) {
    tasks[name] = [];

    const li = document.createElement("li");
    li.textContent = name;
    li.classList.add("list");
    lists.appendChild(li);

    li.addEventListener("click", () => {
      document.querySelectorAll(".list").forEach(l => l.classList.remove("active"));
      li.classList.add("active");
      currentList = name;
      currentListTitle.textContent = name;
      renderTasks();
    });
  }
});

// ✅ Add Task (goes into current active list)
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value;
  if (taskText === "") return alert("Enter a task!");

  const taskObj = {
    text: taskText,
    date: taskDate.value,
    time: taskTime.value,
    completed: false
  };

  tasks[currentList].push(taskObj);
  renderTasks();

  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
});

// ✅ Render tasks of current list
function renderTasks() {
  taskList.innerHTML = "";

  tasks[currentList].forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text} 
      <small>(${task.date} ${task.time})</small></span>
      <div class="task-actions">
        <button class="complete">✔</button>
        <button class="edit">✎</button>
        <button class="delete">🗑</button>
      </div>
    `;

    // Mark Complete
    li.querySelector(".complete").addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
    });

    // Delete
    li.querySelector(".delete").addEventListener("click", () => {
      tasks[currentList].splice(index, 1);
      renderTasks();
    });

    // Edit
    li.querySelector(".edit").addEventListener("click", () => {
      const newTask = prompt("Edit your task:", task.text);
      if (newTask) {
        task.text = newTask;
        renderTasks();
      }
    });

    taskList.appendChild(li);
  });
}

// ✅ Sidebar click for default lists
document.querySelectorAll(".list").forEach(li => {
  li.addEventListener("click", () => {
    document.querySelectorAll(".list").forEach(l => l.classList.remove("active"));
    li.classList.add("active");
    currentList = li.textContent;
    currentListTitle.textContent = currentList;
    renderTasks();
  });
});

// First render
renderTasks();
