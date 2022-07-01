function Queue() {
  var items = [];

  this.enqueue = function (element) {
    items.push(element);
  };
  this.dequeue = function () {
    return items.shift();
  };
  this.front = function () {
    return items[0];
  };
  this.getItems = function () {
    return items;
  };
  this.isEmpty = function () {
    return items.length == 0;
  };
  this.size = function () {
    return items.length;
  };
}

/**
 * 击鼓传花：第三个接到花的被淘汰，求最后胜者
 */

var q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.enqueue("c");
q.enqueue("d");
q.enqueue("e");
q.enqueue("f");
q.enqueue("g");
q.enqueue("h");

var step = 0;
while (q.size() > 1) {
  step++;
  var i = q.dequeue();
  if (step === 3) {
    step = 0;
    console.log(i, "out");
    continue;
  }
  q.enqueue(i);
}
console.log(q.front());
