/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
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
var rightSideView = function (root) {
  if (!root) {
    return [];
  }
  // BFS
  // const result = [];
  // let queue = [root];
  // while (queue.length) {
  //   result.push(queue[queue.length - 1].val);
  //   const subQueue = [];
  //   for (const node of queue) {
  //     if (node.left) {
  //       subQueue.push(node.left);
  //     }
  //     if (node.right) {
  //       subQueue.push(node.right);
  //     }
  //   }
  //   queue = subQueue;
  // }
  // return result;

  // DFS 后序遍历，优先被访问的节点进行占位，之后访问的节点无法插入
  const result = [];
  function dfs(node, depth) {
    if (node === null) {
      return;
    }
    if (result[depth] === undefined) {
      result[depth] = node.val;
    }
    depth++;
    node.right && dfs(node.right, depth);
    node.left && dfs(node.left, depth);
  }
  dfs(root, 0);
  return result;
};
// @lc code=end
