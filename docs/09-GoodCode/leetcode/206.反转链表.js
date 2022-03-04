/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
// 递归法 时间复杂度O(n) 空间复杂度O(n)
// var reverseList = function (head) {
//   if (!head || !head.next) {
//     return head;
//   }

//   const node = reverseList(head.next);
//   head.next.next = head;
//   head.next = null;
//   return node;
// };

// 循环法 时间复杂度O(n) 空间复杂度O(1)
var reverseList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
};

// @lc code=end
