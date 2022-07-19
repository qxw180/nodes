/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
var maxDepth = function (root) {
  // 递归 DFS Bottom Up DFS 时间复杂度O(N)
  // if (!root) {
  //   return 0;
  // }
  // return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;

  // 迭代 BFS  时间复杂度O(N)
  if (!root) {
    return 0;
  }
  let nodes = [root];
  let depth = 0;
  while (nodes.length) {
    depth++;
    const newNodes = [];
    for (const node of nodes) {
      if (node.left) {
        newNodes.push(node.left);
      }
      if (node.right) {
        newNodes.push(node.right);
      }
    }
    nodes = newNodes;
  }
  return depth;
};
// @lc code=end
