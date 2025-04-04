import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
// Select DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

// Generates the todo element from a template using the Todo class in Todo file
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};
//rewite that in Popup file
/*open() {
  add("popup_visible");
  document.addEventListener("keyup", this._handleEscapeClose);
}

// Closes the popup
close() {
remove("popup_visible");
  document.removeEventListener("keyup", this._handleEscapeClose);
}*/

// Create a Section instance to manage todos
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
// Render initial todos on page load
section.renderItems();
// Create an instance of PopupWithForm for adding todos

const addToPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues;

    // Create a date object and adjust for timezone
    const adjustedDate = new Date(date + "T00:00");
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
    );

    // Generate a new todo
    const todoElement = generateTodo({
      name,
      date: adjustedDate,
      id: uuidv4(),
    });

    // Add todo to the list
    section.addItem(todoElement);

    // Close popup and reset form validation
    addToPopup.close();
    newTodoValidator.resetValidation();
  },
});

/*const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");*/

// Open popup when add button is clicked
addTodoButton.addEventListener("click", () => {
  addToPopup.open();
});

// Set up popup event listeners
addToPopup.setEventListeners();

// Create and enable form validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
