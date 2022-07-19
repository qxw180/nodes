/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  function dfs(node, min, max) {
    if (node === null) {
      return true;
    }
    const val = node.val;
    if (val <= min || val >= max) {
      return false;
    }

    return dfs(node.left, min, val) && dfs(node.right, val, max);
  }
  return dfs(root, -Infinity, +Infinity);
};
// @lc code=end

// DFS Bottom Up DFS 利用子问题向上求解
// 关键：非直接子节点必须满足添加，解决：递归的过程中传递节点值范围
