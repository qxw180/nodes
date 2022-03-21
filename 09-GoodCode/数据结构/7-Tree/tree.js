function Tree() {
  const Node = function (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  };

  let root = null;

  this.getRoot = function () {
    return root;
  };

  function insertNode(root, newNode) {
    if (newNode.value > root.value) {
      if (root.right === null) {
        root.right = newNode;
      } else {
        insertNode(root.right, newNode);
      }
    } else {
      if (root.left === null) {
        root.left = newNode;
      } else {
        insertNode(root.left, newNode);
      }
    }
  }

  this.insert = function (value) {
    const node = new Node(value);
    if (root === null) {
      root = node;
    } else {
      insertNode(root, node);
    }
  };

  function traverseNode(root, callback) {
    if (root) {
      traverseNode(root.left, callback);
      traverseNode(root.right, callback);
      callback(root.value);
    }
  }

  this.traverse = function (callback) {
    traverseNode(root, callback);
  };

  function search(root, value) {
    if (!root) {
      return null;
    }
    if (root.value === value) {
      return root;
    }
    if (value > root.value) {
      return search(root.right, value);
    } else {
      return search(root.left, value);
    }
  }

  this.search = function (value) {
    return search(root, value);
  };

  function removeNode(node, value) {
    TODO:
    // if (node === null) {
    //   return null;
    // }
    // if (value > node.value) {
    //   node = removeNode(node.right, value);
    //   return node;
    // } else if (value < node.value) {
    //   node = removeNode(node.left, value);
    //   return node;
    // } else {
    //   if (node.left === null && node.right === null) {
    //     node = null;
    //     return null;
    //   }
    //   if (node.left === null) {
    //     return node.right;
    //   }
    //   if (node.right === null) {
    //     return node.left;
    //   }
    // }
  }
  this.remove = function (value) {
    root = removeNode(root, value);
  };
}

var tree = new Tree();
tree.insert(8);
tree.insert(2);
tree.insert(4);
tree.insert(83);
tree.insert(18);

// console.log(tree.getRoot());

tree.traverse((value) => {
  console.log(value);
});

// console.log(tree.search(3));
// console.log(tree.search(2));
// console.log(tree.search(18));
