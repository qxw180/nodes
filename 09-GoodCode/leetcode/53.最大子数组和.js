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
  // let max = nums[0];
  // let prevMax = 0;
  // for (const current of nums) {
  //   prevMax = Math.max(current, current + prevMax);
  //   max = Math.max(max, prevMax);
  // }
  // return max;
};
// @lc code=end
