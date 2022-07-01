/*
 * @lc app=leetcode.cn id=80 lang=javascript
 *
 * [80] 删除有序数组中的重复项 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const length = nums.length;
  if (length < 3) {
    return length;
  }
  let current = null;
  let currentCount = 0;
  let p1 = -1;
  let p2 = 0;
  while (p2 < length) {
    if (current != nums[p2]) {
      current = nums[p2];
      currentCount = 1;
      p1++;
      nums[p1] = nums[p2];
    } else {
      if (currentCount < 2) {
        currentCount++;
        p1++;
        nums[p1] = nums[p2];
      }
    }
    p2++;
  }
  return p1 + 1;
};
// @lc code=end
