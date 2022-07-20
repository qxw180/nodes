/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const result = [];

  function dfs(node, path, target) {
    if (node === null) {
      return;
    }
    const val = node.val;
    const newPath = [...path, val];
    if (node.left === null && node.right === null && val === target) {
      result.push(newPath);
      return;
    }
    dfs(node.left, newPath, target - val);
    dfs(node.right, newPath, target - val);
  }
  dfs(root, [], targetSum);
  return result;
};
// @lc code=end

// DFS Top Down DFS
