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
  if (nums.length < 2) return nums.length;
  let slow = 1;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] != nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
};
// @lc code=end

// 要求保持相对顺序一致，使用 双指针-同向 方法解决
// 时间复杂度 O(2)
// 空间复杂度 O(1)
