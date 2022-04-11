/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let current = head;
  while (n > 1) {
    current = current.next;
    n--;
  }

  let prev = new ListNode(0, head);

  while (current && current.next) {
    current = current.next;
    prev = prev.next;
  }

  if (prev.next === head) {
    return head.next;
  } else {
    prev.next = prev.next.next;
  }

  return head;
};
// @lc code=end

// 思路：使用快慢指针
// 首先移动n次快指针
// 然后将慢指针指向链表头
// 然后同时移动快慢指针，直到链表尾部
// 删除慢指针的下一个元素
// 时间复杂度：O(n)
// 空间复杂度：O(1)
