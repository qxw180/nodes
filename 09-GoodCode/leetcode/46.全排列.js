/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const size = nums.length;
  const result = [];
  if (size === 0) {
    return result;
  }

  /**
   *
   * @param {array} nums 选项数组
   * @param {number} length 数组长度
   * @param {number} depth 迭代层数
   * @param {array} path 生成的组合
   * @param {array} used 占用标记
   * @param {array} result 最终结果
   */
  function dfs(nums, length, depth, path, used, result) {
    if (depth === length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < length; i++) {
      if (used[i]) {
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      dfs(nums, length, depth + 1, path, used, result);
      // 回溯
      path.pop();
      used[i] = false;
    }
  }

  const path = [];
  const used = [];
  dfs(nums, size, 0, path, used, result);
  return result;
};
// @lc code=end
