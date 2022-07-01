/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const result = [];
  if (!root) {
    return result;
  }
  function traversal(root, result) {
    if (root.left) {
      traversal(root.left, result);
    }
    result.push(root.val);
    if (root.right) {
      traversal(root.right, result);
    }
  }
  traversal(root, result);
  return result;
};
// @lc code=end
