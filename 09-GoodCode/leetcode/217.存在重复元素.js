/*
 * @lc app=leetcode.cn id=217 lang=javascript
 *
 * [217] 存在重复元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  if (nums.length < 2) return false;

  const letterSet = new Set();
  for (const num of nums) {
    if (letterSet.has(num)) return true;
    letterSet.add(num);
  }

  return false;
};
// @lc code=end

