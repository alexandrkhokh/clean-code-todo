//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTasksList = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTasksList = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createTaskListItem = function (taskText) {
  const listItem = document.createElement("li");

  //input (checkbox)
  const checkbox = document.createElement("input"); //checkbx
  //label
  const label = document.createElement("label"); //label
  //input (text)
  const editInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteIcon = document.createElement("img"); //delete button image

  label.innerText = taskText;
  label.className = "task";

  //Each elements, needs appending
  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  //and appending.
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createTaskListItem(taskInput.value);

  //Append listItem to incompleteTasksList
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, moveToCompleted);

  taskInput.value = "";
};

//Edit an existing task.

const toggleEditMode = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  //Remove the parent list item from the ul.
  list.removeChild(listItem);
};

//Mark task completed
const moveToCompleted = function () {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, moveToIncomplete);
};

const moveToIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, moveToCompleted);
};

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (listItem, onCheckboxChange) {
  //select ListItems children
  const checkbox = listItem.querySelector("input[type=checkbox]");
  const editButton = listItem.querySelector("button.edit");
  const deleteButton = listItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = toggleEditMode;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind moveToCompleted to onCheckboxChange.
  checkbox.onchange = onCheckboxChange;
};

//cycle over incompleteTasksList ul list items
//for each list item
for (let i = 0; i < incompleteTasksList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTasksList.children[i], moveToCompleted);
}

//cycle over completedTasksList ul list items
for (let i = 0; i < completedTasksList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksList.children[i], moveToIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
