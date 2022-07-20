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

  function bfs(roots) {
    const values = [];
    const nodes = [];
    for (const root of roots) {
      values.push(root.val);
      root.left && nodes.push(root.left);
      root.right && nodes.push(root.right);
    }
    result.push(values);
    nodes.length && bfs(nodes);
  }
  bfs([root]);

  return result;
};
// @lc code=end
