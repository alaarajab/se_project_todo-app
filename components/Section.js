export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  // render all items on the page
  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  // add a single item to the container
  addItem(element) {
    this._container.prepend(element);
  }
}
