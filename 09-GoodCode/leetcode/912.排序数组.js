/*
 * @lc app=leetcode.cn id=912 lang=javascript
 *
 * [912] 排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  if (nums.length <= 1) return nums;

  const pivot = nums[0];
  const left = [];
  const right = [];

  for (let index = 1; index < nums.length; index++) {
    if (nums[index] < pivot) {
      left.push(nums[index])
    } else {
      right.push(nums[index])
    }
  }

  return [...sortArray(left), pivot, ...sortArray(right)]
};
// @lc code=end