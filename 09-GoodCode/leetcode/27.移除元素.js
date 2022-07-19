/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  const size = nums.length;
  let validIndex = -1;

  for (let index = 0; index < size; index++) {
    const num = nums[index];
    if (num === val) {
      continue;
    }
    nums[++validIndex] = num;
  }

  return validIndex + 1;
};
// @lc code=end
