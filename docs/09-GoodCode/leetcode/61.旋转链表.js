/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (k === 0 || !head || !head.next) {
    return head;
  }

  let temp = head;
  while (temp.next) {
    temp.next.prev = temp;
    temp = temp.next;
  }

  temp.next = head;
  head.prev = temp;

  while (k > 0) {
    head = head.prev;
    k--;
  }
  head.prev.next = null;

  return head;
};
// @lc code=end
