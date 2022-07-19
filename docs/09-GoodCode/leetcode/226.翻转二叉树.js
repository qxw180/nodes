/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) {
    return null;
  }

  if (root.left === null && root.right === null) {
    return root;
  }

  const left = root.left;
  const right = root.right;

  root.left = invertTree(right);
  root.right = invertTree(left);

  return root;
};
// @lc code=end

// DFS Bottom Up DFS
