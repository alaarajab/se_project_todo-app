export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings; // Store settings in the class instance
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  // Private method to show input error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  // Private method to hide input error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  // Private method to check input validity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Private method to check if any input is invalid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Private method to toggle button state based on input validity
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Private method to add event listeners to inputs
  _setEventListeners() {
    this._toggleButtonState(); // Initial button state
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Public method to enable validation
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault()); // Prevent form submission
    this._setEventListeners();
  }

  // Public method to reset form and disable submit button
  resetValidation() {
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
    this._toggleButtonState(); // Disable submit button initially
  }
}
