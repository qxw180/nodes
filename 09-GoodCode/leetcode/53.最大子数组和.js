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
  // 贪心算法：循环数组，如果当前指针所指元素之前和小于0，则丢弃当前元素之前的数列
  // let max = nums[0];
  // let previousSum = max;
  // for (let i = 1; i < nums.length; i++) {
  //   const current = nums[i];
  //   let sum = current;
  //   if (previousSum <= 0) {
  //     previousSum = current;
  //   } else {
  //     previousSum = sum += previousSum;
  //   }
  //   max = Math.max(max, sum);
  // }
  // return max;
  // 动态规划算法
  if (nums.length == 1) return nums[0]
  const dp = [nums[0], Math.max(nums[1], nums[0] + nums[1])]
  let max = Math.max(dp[0], dp[1])

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1])
    max = Math.max(dp[i], max)
  }

  return max;
};
// @lc code=end
