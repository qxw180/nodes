/**
 * 优先队列
 */
var PriorityQueue = function () {
  const items = [];

  const Item = function (element, priority) {
    this.element = element;
    this.priority = priority;
  };

  this.enqueue = function (element, priority) {
    const newItem = new Item(element, priority);

    let added = false;
    for (let index = 0; index < items.length; index++) {
      if (newItem.priority > items[index].priority) {
        items.splice(index, 0, newItem);
        added = true;
        break;
      }
    }
    if (!added) {
      items.push(newItem);
    }
  };

  this.dequeue = function () {
    return items.shift();
  };
};
