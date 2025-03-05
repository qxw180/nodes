/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  // 进位值
  let carry = 0;
  const head = new ListNode(0);
  let current = head;
  function addNode(val) {
    carry = Math.floor(val / 10);
    const node = new ListNode(val % 10);
    current.next = node;
    current = node;
  }
  while (l1 && l2) {
    addNode(l1.val + l2.val + carry);
    l1 = l1.next;
    l2 = l2.next;
  }
  while (l1) {
    addNode(l1.val + carry);
    l1 = l1.next;
  }
  while (l2) {
    addNode(l2.val + carry);
    l2 = l2.next;
  }
  if (carry > 0) {
    addNode(carry);
  }
  return head.next;
};
// @lc code=end

// 思路：
// 1. 数组逆序存储，则直接从链表头部开始相加，不需要考虑位数不同情况
// 2. 相加之前形成的新链表直接返回（题目要求逆序返回，所以无需额外处理）
// 时间复杂度为O(max(m, n))，m和n为l1和l2的长度，最多循环次数为链表最大长度
// 空间复杂度为O(max(m, n))，m和n为l1和l2的长度，最大长度为max(m, n) + 1
