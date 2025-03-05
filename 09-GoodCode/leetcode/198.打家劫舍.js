/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  const dp = [nums[0], Math.max(nums[0], nums[1])]
  let max = Math.max(dp[0], dp[1]);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(max, nums[i] + dp[i - 2]);
    max = Math.max(max, dp[i]);
  }

  return max;
};
// @lc code=end

