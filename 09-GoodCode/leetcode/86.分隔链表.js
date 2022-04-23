/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  if (!head) {
    return null;
  }

  let p1 = null;
  let p2 = head;
  let prev = null;
  while (p2) {
    if (p2.val < x) {
      if (p2 === head) {
        p1 = head;
      } else if (p1 === null) {
        // 删除
        prev.next = p2.next;
        // 插入
        p2.next = head;
        // 重置head
        head = p2;
        p1 = head;
      } else {
        // 删除
        prev.next = p2.next;
        // 插入
        const next = p1.next;
        p1.next = p2;
        p1.next.next = next;
        // 移动
        p1 = p1.next;
      }
    }
    prev = p2;
    p2 = p2.next;
  }
  return head;
};
// @lc code=end

// 思路一：快慢指针，快指针用于遍历，慢指针用于标记小于x的节点位置，符合条件后进行链表节点移动
// 思路二：使用两个链表分别存储小于x和小于等x的元素，遍历完成后拼接链表
