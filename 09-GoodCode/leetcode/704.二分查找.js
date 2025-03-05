/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums.length === 0) return -1;

  let middle = Math.floor(nums.length / 2);
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    if (nums[middle] === target) {
      return middle
    } else if (nums[middle] > target) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = start + Math.floor((end - start) / 2)
  }

  return -1;
};
// @lc code=end
