/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// 时间复杂度为O(max(m, n))，m和n为l1和l2的长度，最多循环次数为链表最大长度
// 空间复杂度为O(max(m, n))，m和n为l1和l2的长度，最大长度为max(m, n) + 1

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

var l1 = new ListNode(1);
var l2 = new ListNode(0);
var l3 = new ListNode(0);
var l7 = new ListNode(0);
var l8 = new ListNode(0);
var l9 = new ListNode(0);
var l10 = new ListNode(0);
var l11 = new ListNode(0);
var l12 = new ListNode(0);
var l13 = new ListNode(0);
var l14 = new ListNode(1);

var l4 = new ListNode(5);
var l5 = new ListNode(6);
var l6 = new ListNode(4);

l1.next = l2;
l2.next = l3;
l3.next = l7;
l7.next = l8;
l8.next = l9;
l9.next = l10;
l10.next = l11;
l11.next = l12;

l4.next = l5;
l5.next = l6;

// console.log(formatLinkToNumber(l1));
// console.log(formatLinkToNumber(l5));
// console.log(linkReverse(l1));

console.log(addTwoNumbers(l1, l4));

// @lc code=end
