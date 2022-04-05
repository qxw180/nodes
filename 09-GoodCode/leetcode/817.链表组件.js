/*
 * @lc app=leetcode.cn id=817 lang=javascript
 *
 * [817] 链表组件
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
 * @param {number[]} nums
 * @return {number}
 */
var numComponents = function (head, nums) {
  let count = 0;
  let set = new Set(nums);
  let mark = false;
  while (head) {
    if (set.has(head.val)) {
      if (!mark) {
        count++;
        mark = true;
      }
    } else {
      mark = false;
    }
    head = head.next;
  }
  return count;
};
// @lc code=end
