/*
 * @lc app=leetcode.cn id=724 lang=javascript
 *
 * [724] 寻找数组的中心下标
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const sum = nums.reduce((pre, cur) => {
    return pre + cur;
  }, 0);
  const size = nums.length;
  let halfSum = 0;
  for (let index = 0; index < size; index++) {
    const num = nums[index];
    if (halfSum * 2 + num === sum) {
      return index;
    }
    halfSum += num;
  }

  return -1;
};
// @lc code=end
// 思路：
// 1. 首先求和
// 2。 迭代数组对比是否满足条件
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// console.log(pivotIndex([-1, -1, -1, -1, -1, 0]));
