/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  const size = nums.length;
  // if (target <= nums[0]) {
  //   return 0;
  // }
  // if (target > nums[size - 1]) {
  //   return size;
  // }

  // if (target === nums[size - 1]) {
  //   return size - 1;
  // }

  let left = 0;
  let right = size - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midVal = nums[mid];
    if (midVal === target) {
      return mid;
    } else if (midVal > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
};
// @lc code=end
