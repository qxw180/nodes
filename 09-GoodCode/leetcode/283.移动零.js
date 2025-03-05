/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  if (nums.length < 2) return;

  let left = 0, right = 0;
  while (right < nums.length) {
    if (nums[right] == 0) {
      right++;
      continue;
    }

    if (left === right) {
      left++;
      right++;
    } else {
      nums[left] = nums[right];
      nums[right] = 0;
      left++;
      right++;
    }
  }
};
// @lc code=end
