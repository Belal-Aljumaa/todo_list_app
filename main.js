const taskInput = document.querySelector(".task-input input");
const addButton = document.querySelector(".task-input .plus");
const filters = document.querySelectorAll(".filters span");
const delAll = document.querySelector(".del-all");
const taskBox = document.querySelector(".task-box");
const tasksCount = document.querySelector(".tasks-count span");
const tasksCompleted = document.querySelector(".tasks-completed span");

let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

window.onload = function () {
  taskInput.focus();
};

filters.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    element.classList.add("active");
    showTodo(element.id);
  });
});

// Add the Task
const showTodo = (filter) => {
  let divTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        divTag += `
                  <div class="content">
                    <div class="task">
                      <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                        <p class="${completed}">${todo.name}</p>
                      </label>
                    </div>
                    <div class="settings">
                      <span onclick='editTask(${id}, "${todo.name}")'>
                        Edit
                      </span>
                      <span onclick='deleteTask(${id}, "${filter}")'>
                        <i class="fa-solid fa-trash trash-ican"></i>
                      </span>
                    </div>
                  </div>`;
      }
    });
  }
  taskBox.innerHTML = divTag || `<span style="font-size: 20px;">You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length
    ? delAll.classList.remove("active")
    : delAll.classList.add("active");
  calculateTasks();
};
showTodo("all");
let name1 = ""
// Check of the Task Status
const updateStatus = (selectedTask) => {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  calculateTasks();
};

// Edit the Task
const editTask = (taskId, textName) => {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add("active");
  calculateTasks();
};

// Delete the Task
const deleteTask = (deleteId, filter) => {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your task has been deleted",
    showConfirmButton: false,
    timer: 2000,
  });
  showTodo(filter);
  calculateTasks();
};

// Delete all Tasks
delAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
  calculateTasks();
});

// Add a Task When you press Enter button
taskInput.addEventListener("keyup", (event) => {
  let userTask = taskInput.value.trim();
  if (event.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your task has been added",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Your task has been adited",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    taskInput.value = "";
    taskInput.focus();
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  }
  calculateTasks();
});

// Add a Task When you press add button
addButton.addEventListener("click", () => {
  let userTask = taskInput.value.trim();
  if (!isEditTask && userTask) {
    todos = !todos ? [] : todos;
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your task has been added",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    isEditTask = false;
    todos[editId].name = userTask;
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "Your task has been adited",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  taskInput.value = "";
  taskInput.focus();
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(document.querySelector("span.active").id);
  calculateTasks();
});

// Function To Calculate Tasks
function calculateTasks() {
  // Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(".task-box .content").length;
  // Calculate Completed Tasks
  tasksCompleted.innerHTML =
    document.querySelectorAll(".task-box .checked").length;
}
