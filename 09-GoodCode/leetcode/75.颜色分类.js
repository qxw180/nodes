/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  const length = nums.length;
  if (length < 2) {
    return;
  }

  let p0 = 0;
  let p2 = length - 1;
  let index = 0;

  while (index <= p2) {
    const num = nums[index];
    if (num === 0) {
      nums[index] = nums[p0];
      nums[p0] = 0;
      p0++;
      index++;
    } else if (num === 2) {
      nums[index] = nums[p2];
      nums[p2] = 2;
      p2--;
    } else {
      index++;
    }
  }
};
// @lc code=end

console.log("==========================");
sortColors([2, 0, 2, 1, 1, 0]);
sortColors([0, 1, 2]);
sortColors([0, 2, 1]);
sortColors([1, 0, 2]);
sortColors([1, 2, 0]);
sortColors([2, 0, 1]);
sortColors([2, 1, 0]);
sortColors([2, 1, 2]);
