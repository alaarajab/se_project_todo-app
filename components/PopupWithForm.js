import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  // Collects form input values
  _getInputValues() {
    const inputElements = this._form.querySelectorAll(".popup__input");
    const inputValues = {};
    inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // Overrides setEventListeners() to include form submission handling
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Closes popup and resets form
  close() {
    super.close();
    this._form.reset();
  }
}
