/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 */

// @lc code=start

var MyQueue = function () {
  this.inputStack = [];
  this.outputStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.inputStack.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (this.empty()) {
    return null;
  }
  this.checkStack();
  return this.outputStack.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (this.empty()) {
    return null;
  }
  this.checkStack();
  return this.outputStack[this.outputStack.length - 1];
};

MyQueue.prototype.checkStack = function () {
  if (this.outputStack.length === 0) {
    while (this.inputStack.length > 0) {
      this.outputStack.push(this.inputStack.pop());
    }
  }
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.inputStack.length === 0 && this.outputStack.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end
