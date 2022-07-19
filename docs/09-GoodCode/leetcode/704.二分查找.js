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
  const size = nums.length;
  let start = 0;
  let end = size - 1;
  while (end >= start) {
    if (nums[start] === target) {
      return start;
    }
    if (nums[end] === target) {
      return end;
    }
    const mid = start + Math.floor((end - start) / 2);
    const midVal = nums[mid];
    if (target === midVal) {
      return mid;
    } else if (target > midVal) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
};
// @lc code=end
