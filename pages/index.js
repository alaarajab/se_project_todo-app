import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Generates the todo element from a template using the Todo class
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};
// New function added to handle creating and appending todo items to the DOM
// This function reduces code duplication
const renderTodo = (item) => {
  const todoElement = generateTodo(item); // Create todo element
  todosList.append(todoElement); // Append todo element to the list
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});
// Handling form submission: generates and renders a new todo when form is submitted
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  const values = { name, date, id };
  /*const todo = generateTodo(values);
  todosList.append(todo);*/
  renderTodo(values);
  closeModal(addTodoPopup);
  newTodovalidator.resetValidation(); // clear the form and disable the button
});

initialTodos.forEach(renderTodo);
/*const todo = generateTodo(item);
  todosList.append(todo);*/

// Create FormValidator instance and enable validation
const newTodovalidator = new FormValidator(validationConfig, addTodoForm);
newTodovalidator.enableValidation();
