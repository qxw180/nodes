/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// 要求 时间复杂度为O(1)
// 数据结构设计
// 缓存数据存储：需要O(1)复杂度的get和put，HashMap可以满足
// 缓存容量控制：在缓存get和put操作时需要判断是否已满，如果已满需要先清理缓存，需要有以下能力
// 1. O(1)复杂的的删除，可以使用双向链表
// 2. 0(1)复杂的的查找，链表无法满足，可以结合HashMap，value的值未连接节点的地址，节点的value为缓存的值
// 双向链表使用规则，是有Queue方式，FIFO

/**
 * 双向链表
 * @param {number}} key 缓存key
 * @param {any} value 缓存value
 * @param {DoubleLinkedNode} next
 * @param {DoubleLinkedNode} prev
 */

// @lc code=start
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.store = new Map();
  this.linkHead = null; // 链表头
  this.linkTail = null; // 链表尾
  this.DoubleLinkedNode = function (key, value, next, prev) {
    this.key = key;
    this.value = value;
    this.next = next || null;
    this.prev = prev || null;
  };
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.store.has(key)) {
    const node = this.store.get(key);
    this.removeNode(node);
    this.appendNode(node);
    return node.value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = null;
  if (this.store.has(key)) {
    node = this.store.get(key);
    node.value = value;
    this.removeNode(node);
  } else {
    if (this.store.size === this.capacity) {
      this.removeNode(this.linkHead);
    }
    node = new this.DoubleLinkedNode(key, value);
  }
  this.appendNode(node);
};

/**
 * 更新链表顺序
 * @param {DoubleLinkedNode} node
 */
LRUCache.prototype.removeNode = function (node) {
  if (!node) {
    return;
  }
  if (node === this.linkHead && node === this.linkTail) {
    this.linkHead = this.linkTail = null;
  } else if (node === this.linkHead) {
    this.linkHead = this.linkHead.next;
    this.linkHead.prev = null;
  } else if (node === this.linkTail) {
    this.linkTail = this.linkTail.prev;
    this.linkTail.next = null;
  } else {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }
  node.next = node.prev = null;
  this.store.delete(node.key);
};

/**
 * 容量清理：清理store, 链头出栈
 */
LRUCache.prototype.appendNode = function (node) {
  if (this.linkHead === null) {
    this.linkHead = this.linkTail = node;
  } else {
    this.linkTail.next = node;
    node.prev = this.linkTail;
    this.linkTail = node;
  }
  this.store.set(node.key, node);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
