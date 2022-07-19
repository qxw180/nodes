/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  const result = [];

  function travel(roots) {
    const values = [];
    const nodes = [];
    for (const root of roots) {
      values.push(root.val);
      if (root.left) {
        nodes.push(root.left);
      }
      if (root.right) {
        nodes.push(root.right);
      }
    }
    result.push(values);
    if (nodes.length) {
      travel(nodes);
    }
  }
  travel([root]);

  return result;
};
// @lc code=end
