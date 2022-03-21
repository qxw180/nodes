var ISet = function () {
  var items = {};

  this.has = function (value) {
    return items.hasOwnProperty(value);
  };

  this.add = function (value) {
    if (this.has(value)) {
      return false;
    }
    items[value] = value;
    return value;
  };

  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };

  this.values = function () {
    return Object.values(items);
  };

  this.clear = function () {
    items = {};
  };

  this.size = function () {
    // let size = 0
    // for( var i in set) {
    //     if(item.hasOwnProperty(i)) {
    //         size++
    //     }
    // }
    // return size
    return Object.keys(items).length;
  };

  // 并集
  this.union = function (otherSet) {
    var result = new ISet();

    var arr = this.values();
    for (var i = 0; i < arr; i++) {
      result.add(arr[i]);
    }

    arr = otherSet.values();
    for (var i = 0; i < arr; i++) {
      result.add(arr[i]);
    }

    return result;
  };

  // 交集
  this.intersection = function (otherSet) {
    var result = new ISet();
    var arr = this.values();
    for (var i = 0; i < arr; i++) {
      if (otherSet.has(arr[i])) {
        result.add(arr[i]);
      }
    }
    return result;
  };

  // 差集
  this.difference = function (otherSet) {
    var result = new ISet();
    var arr = this.values();
    for (var i = 0; i < arr; i++) {
      if (!otherSet.has(arr[i])) {
        result.add(arr[i]);
      }
    }
    return result;
  };
};
