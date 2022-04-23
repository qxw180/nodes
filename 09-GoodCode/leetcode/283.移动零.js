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
  const length = nums.length;
  if (length <= 1) {
    return;
  }
  let p = 0;
  for (let index = 0; index < length; index++) {
    if (nums[index] !== 0) {
      const temp = nums[p];
      nums[p] = nums[index];
      nums[index] = temp;
      p++;
    }
  }
};
// @lc code=end
