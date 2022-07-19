/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }
  const newSum = targetSum - root.val;
  const l1 = root.left ? hasPathSum(root.left, newSum) : false;
  const l2 = root.right ? hasPathSum(root.right, newSum) : false;
  return l1 || l2;
};
// @lc code=end

// 思路 DFS Top Down DFS
