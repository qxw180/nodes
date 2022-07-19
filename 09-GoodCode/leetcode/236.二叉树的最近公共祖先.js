/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let result = null;
  function dfs(node, p, q) {
    if (node === null) {
      return false;
    }
    const leftHas = dfs(node.left, p, q);
    const rightHas = dfs(node.right, p, q);
    if (
      (leftHas && rightHas) ||
      ((node.val === p.val || node.val === q.val) && (leftHas || rightHas))
    ) {
      result = node;
    }
    return leftHas || rightHas || node.val === p.val || node.val === q.val;
  }
  dfs(root, p, q);
  return result;
};
// @lc code=end

// Top Down DFS
