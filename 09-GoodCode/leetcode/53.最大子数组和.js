/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = nums[0];

  let temp = max;

  for (let index = 1; index < nums.length; index++) {
    const num = nums[index];
    if (temp + num > 0) {
      temp += num;
    } else {
      max = Math.max(max, temp);
      if (num > 0) {
        temp = num;
      } else {
        temp = nums[index++];
      }
    }
  }

  return Math.max(max, temp);
};
// @lc code=end
