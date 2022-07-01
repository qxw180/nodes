function ListNode(element) {
  this.element = element;
  this.next = null;
}

function LinkedList(element) {
  let head = null;
  let length = 0;

  this.append = function (element) {
    const node = new ListNode(element);
    if (head === null) {
      head = node;
    } else {
      let current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };

  this.insert = function (position, element) {
    if (position > -1 && position < length) {
      const node = new Node(element);
      if (position === 0) {
        const tmp = head;
        head = node;
        node.next = tmp;
      } else {
        let i = 0,
          current = head,
          prev = null;
        while (i < position) {
          i++;
          prev = current;
          current = current.next;
        }
        prev.next = node;
        node.next = current;
      }
      length++;
    }
  };

  this.indexOf = function (element) {
    if (element) {
      let index = 0,
        current = head;
      while (current) {
        if (current.element === element) {
          return index;
        }
        current = current.next;
        index++;
      }
    }
    return -1;
  };

  this.removeAt = function (position) {
    let current = head,
      index = 0,
      prev = null;
    if (position > 0 && position < length) {
      if (position === 0) {
        head = head.next;
      }
      while (position > index) {
        prev = current;
        current = current.next;
        index++;
      }
      prev.next = current.next;
      length--;
    }
  };

  this.remove = function (element) {
    this.removeAt(this.indexOf(element));
  };

  this.size = function () {
    return this.length;
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.getHead = function () {
    return head;
  };
}
