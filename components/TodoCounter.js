export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (isNowCompleted) => {
    this._completed += isNowCompleted ? 1 : -1;
    this._updateText();
  };

  incrementTotal = () => {
    this._total += 1;
    this._updateText();
  };

  decrementTotal = () => {
    this._total -= 1;
    this._updateText();
  };

  setCounts = (completed, total) => {
    this._completed = completed;
    this._total = total;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
