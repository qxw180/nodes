// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let current1 = list1;
  let current2 = list2;

  let result = null;
  let current;

  function linkMove(node) {
    const newNode = new ListNode(node.val);
    if (!result) {
      result = newNode;
      current = result;
    } else {
      current = current.next = newNode;
    }
    return node.next;
  }

  while (current1 && current2) {
    if (current1.val < current2.val) {
      current1 = linkMove(current1);
    } else {
      current2 = linkMove(current2);
    }
  }

  while (current1) {
    current1 = linkMove(current1);
  }

  while (current2) {
    current2 = linkMove(current2);
  }

  return result;
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

const l13 = new ListNode(4);
const l12 = new ListNode(2, l13);
const l11 = new ListNode(1, l12);

const l23 = new ListNode(4);
const l22 = new ListNode(3, l23);
const l21 = new ListNode(1, l22);

console.log(linkListToArray(l11));
console.log(linkListToArray(l21));

console.log(linkListToArray(mergeTwoLists(l11, l21)));
