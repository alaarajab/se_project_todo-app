class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._completed = data.completed || false;
    this._name = data.name;
    this._id = data.id;
    this._date = data.date;
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._templateElement = document.querySelector(this._selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      const wasCompleted = this._data.completed;
      this._data.completed = !wasCompleted;
      if (this._handleCheck) {
        // true if now completed
        this._handleCheck(!wasCompleted);
      }
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      if (this._handleDelete) {
        // use current checkbox state
        this._handleDelete(this._todoCheckboxEl.checked);
      }
      this._todoElement.remove();
      console.log(`Deleted: ${this._data.name}`);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  _generateDeleteButton() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    if (this._todoDeleteBtn) {
      this._todoDeleteBtn.dataset.deleted = this._data.deleted;
      this._todoDeleteBtn.id = `tododelete-${this._id}`;
    }
  }

  _viewDateEl() {
    if (this._todoDate) {
      const dueDate = new Date(this._date);
      if (!isNaN(dueDate)) {
        this._todoDate.textContent = `Due: ${dueDate.toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}`;
      } else {
        this._todoDate.textContent = "No due date";
      }
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");

    this._todoNameEl.textContent = this._name;

    this._generateCheckboxEl();
    this._generateDeleteButton();
    this._setEventListeners();
    this._viewDateEl();

    return this._todoElement;
  }
}

export default Todo;
