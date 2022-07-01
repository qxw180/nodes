/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }
  let current = head;
  let next = current.next;
  while (next) {
    if (current.val !== next.val) {
      current.next = next;
      current = next;
      next = current.next;
    } else {
      next = next.next;
    }
  }
  current.next = null;
  return head;
};
// @lc code=end
