const taskInput = document.querySelector(".task-input input");
const addButton = document.querySelector(".task-input .plus");
const filters = document.querySelectorAll(".filters span");
const delAll = document.querySelector(".del-all");
const taskBox = document.querySelector(".task-box");
const tasksCount = document.querySelector(".tasks-count span");
const tasksCompleted = document.querySelector(".tasks-completed span");

window.onload = function () {
  taskInput.focus();
};

filters.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    element.classList.add("active");
  });
});
