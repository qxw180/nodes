/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return [];
  }
  let validIndex = 0;
  for (let index = 1; index < nums.length; index++) {
    if (nums[validIndex] < nums[index]) {
      validIndex++;
      nums[validIndex] = nums[index];
    }
  }
  return validIndex + 1;
};
// @lc code=end

// 要求保持相对顺序一致，使用 双指针-同向 方法解决
// 时间复杂度 O(2)
// 空间复杂度 O(1)
