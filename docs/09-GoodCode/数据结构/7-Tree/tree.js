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
    let current = root;
    let parent = root;
    let isLeftChild = false;
    while (current !== null && current.value !== value) {
      parent = current;
      if (current.value > value) {
        parent = current.left;
        isLeftChild = true;
      } else {
        parent = current.right;
        isLeftChild = false;
      }
    }
    if (current === null) {
      return;
    }
    // Case1：无子节点
    if (current.left === null && current.right === null) {
      if (current === root) {
        root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // Case2：只有一个子节点
    else if (current.left === null) {
      if (current === root) {
        root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
        
      }
    } else if (current.right === null) {
      if (current === root) {
        root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    }
    // Case3：有两个子节点，使用右子树的最小节点替换
    else {
      // 找到右子树最小子节点
      let minNode = null;
      let minNodeParent = null;
      let minCurrent = current.right;
      while (minCurrent !== null) {
        minNodeParent = minNode;
        minNode = minCurrent;
        minCurrent = minNode.left;
      }
      // 如果最小子节点不为要删除节点的右子节点
      if (minNode !== current.right) {
        // 将最小子节点的右子节点设为父节点的左子节点，替换最小子节点自身
        minNodeParent.left = minNode.right;
        // 将要删除节点的右子节点作为找到的最小子节点的右子节点
        minNode.right = current.right;
      }

      // 替换要删除的子节点
      if (current === root) {
        root = minNode;
      } else if (isLeftChild) {
        parent.left = minNode;
      } else {
        parent.right = minNode;
      }
    }
    return true;
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
