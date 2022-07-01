/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
var zigzagLevelOrder = function (root) {
  if (!root) {
    return [];
  }
  const result = [];
  function traversal(roots, reverse) {
    if (roots.length > 0) {
      const values = [];
      const nodes = [];
      roots.forEach((root) => {
        if (reverse) {
          values.unshift(root.val);
        } else {
          values.push(root.val);
        }
        root.left && nodes.push(root.left);
        root.right && nodes.push(root.right);
      });
      result.push(values);
      traversal(nodes, !reverse);
    }
  }
  traversal([root], false);
  return result;
};
// @lc code=end
