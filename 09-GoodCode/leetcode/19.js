// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let current = head;
  // 要被删除的前一个节点
  let prev = null;
  let target = null;

  let index = 0;
  // 遍历链表，当head称为倒数定N个时，临时将head作为要删除元素，随后要删除验收随链表移动而移动，知道链表遍历结束。
  while (current) {
    if (index + 1 === n) {
      target = head;
    } else if (index + 1 > n) {
      prev = target;
      target = target.next;
    }
    current = current.next;
    index++;
  }
  if (target && prev) {
    prev.next = target.next;
    return head;
  } else if (target) {
    return target.next;
  }
  return null;
};

function linkListToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// const l5 = new ListNode(5);
// const l4 = new ListNode(4, l5);
// const l3 = new ListNode(3, l4);
// const l2 = new ListNode(2, l3);
// const l1 = new ListNode(1, l2);
// console.log(linkListToArray(removeNthFromEnd(l1, 2)));

// const l1 = new ListNode(1);
// console.log(linkListToArray(removeNthFromEnd(l1, 1)));

const l2 = new ListNode(2);
const l1 = new ListNode(1, l2);
console.log(linkListToArray(removeNthFromEnd(l1, 2)));
