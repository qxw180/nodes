/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1]
  if (target < nums[0]) return [-1, -1]
  if (target > nums[nums.length - 1]) return [-1, -1]

  let start = 0;
  let end = nums.length - 1;

  let index = -1;

  while (start <= end) {
    let middle = start + Math.floor((end - start) / 2);
    if (target === nums[middle]) {
      index = middle;
      break;
    } else if (target > nums[middle]) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  if (index === -1) return [-1, -1]


  start = end = index;
  while (nums[start] === target || nums[end] === target) {
    if (nums[start] === target) start--;
    if (nums[end] === target) end++;
  }

  return [start + 1, end - 1];

};
// @lc code=end
