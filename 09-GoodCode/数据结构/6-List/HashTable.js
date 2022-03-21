const HashTable = function () {
  const items = [];

  /**
   * loselose 散列值计算
   * @param {String} key key
   * 极易发生散列冲突
   */
  const loseloseHashCode = function (key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt();
    }
    return hash % 37;
  };

  /**
   * 更好的散列算法
   * @param {String} key key
   */
  const djb2HashCode = function (key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key[i].charCodeAt();
    }
    return hash % 1013;
  };

  this.put = function (key, value) {
    const position = loseloseHashCode(key);
    items[position] = value;
  };

  this.remove = function (key) {
    items[loseloseHashCode(key)] = undefined;
  };

  this.get = function (key) {
    return items[loseloseHashCode(key)];
  };
};

const HashTable_LinkedList = function () {
  const items = [];

  /**
   * loselose 散列值计算
   * @param {String} key key
   */
  const loseloseHashCode = function (key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt();
    }
    return hash % 37;
  };

  const Node = function (key, value) {
    this.key = key;
    this.value = value;
  };

  this.put = function (key, value) {
    const position = loseloseHashCode(key);
    let list = items[key];
    if (!list) {
      list = new LinkedList();
      items[position] = list;
    }
    list.append(new Node(key, value));
  };

  this.get = function (key) {
    const position = loseloseHashCode(key);
    const list = items[position];
    if (list) {
      let current = list.getHead();
      while (current) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  };

  this.remove = function (key) {
    const position = loseloseHashCode(key);
    const list = items[position];
    if (list) {
      let current = list.getHead();
      while (current) {
        if (current.element.key === key) {
          list.remove(current.element);
          // 链表元素复位，降低内存消耗
          if (list.isEmpty()) {
            list = undefined;
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  };
};

var HashTable_Line = function () {
  const items = [];

  /**
   * loselose 散列值计算
   * @param {String} key key
   */
  const loseloseHashCode = function (key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt();
    }
    return hash % 37;
  };

  const Node = function (key, value) {
    this.key = key;
    this.value = value;
  };

  this.put = function (key, value) {
    const position = loseloseHashCode(key);
    while (true) {
      if (items[position] === undefined) {
        items[position] = new Node(key, value);
        break;
      }
      position++;
    }
  };

  this.get = function (key) {
    const position = loseloseHashCode(key);
    while (true) {
      const item = items[position];
      if (item === undefined) {
        return undefined;
      } else if (items[position].key === key) {
        return items[position].value;
      } else {
        position++;
      }
    }
  };

  this.remove = function (key) {
    const position = loseloseHashCode(key);
    while (true) {
      const item = items[position];
      if (item === undefined) {
        return false;
      } else if (items[position].key === key) {
        items[position] = undefined;
        return true;
      } else {
        position++;
      }
    }
  };
};
