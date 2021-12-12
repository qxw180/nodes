// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// var addTwoNumbers = function (l1, l2) {
//   var result = new ListNode(0);
//   function generatorList(l1, l2, carry, result) {
//     if (l1 || l2 || carry > 0) {
//       var v1 = 0,
//         v2 = 0,
//         next1 = null,
//         next2 = null;

//       if (l1) {
//         v1 = l1.val;
//         next1 = l1.next;
//       }

//       if (l2) {
//         v2 = l2.val;
//         next2 = l2.next;
//       }

//       var sum = v1 + v2 + carry;
//       var carry = sum >= 10 ? 1 : 0;

//       var node = new ListNode(sum % 10);
//       result.next = node;

//       generatorList(next1, next2, carry, node);
//     }
//   }
//   generatorList(l1, l2, 0, result);
//   return result.next;
// };

var addTwoNumbers = function (l1, l2) {
  var carry = 0;
  var result = new ListNode(0);
  var current = result;
  function addNode(val) {
    carry = Math.floor(val / 10);
    var node = new ListNode(val % 10);
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
  return result.next;
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
