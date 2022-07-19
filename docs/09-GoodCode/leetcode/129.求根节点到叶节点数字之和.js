/*
 * @lc app=leetcode.cn id=129 lang=javascript
 *
 * [129] 求根节点到叶节点数字之和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  let sum = 0;

  function travel(node, num) {
    const newNum = num * 10 + node.val;
    if (node.left === null && node.right === null) {
      sum += newNum;
      return;
    }
    if (node.left) {
      travel(node.left, newNum);
    }
    if (node.right) {
      travel(node.right, newNum);
    }
  }
  travel(root, 0);

  return sum;
};
// @lc code=end

// 思路：DFS Top Down DFS
// 1. 定义变量sum表示最终的和
// 2. 定义递归函数，参数为 node节点，num 当前节点数字
//  2.1 计算当前节点的新num，传入的num加上node的val
//  2.2 如果当节点无子节点，将新的num加和到最终sum
//  2.3 继续递归子节点
