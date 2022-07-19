/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // 方案一：链表转数组，判断是否为回文数组 时间复杂度O(2N)
  const values = [];
  while (head) {
    values.push(head.val);
    head = head.next;
  }
  for (let i = 0, j = values.length - 1; i < j; i++, j--) {
    if (values[i] !== values[j]) {
      return false;
    }
  }
  return true;

  // 方案二：快慢指针
};
// @lc code=end
