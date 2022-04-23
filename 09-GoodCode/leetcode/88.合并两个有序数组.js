/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  if (n === 0) {
    return nums1;
  }

  const sorted = [];

  let index1 = 0;
  let index2 = 0;
  while (index1 < m && index2 < n) {
    if (nums1[index1] < nums2[index2]) {
      sorted.push(nums1[index1++]);
    } else {
      sorted.push(nums2[index2++]);
    }
  }
  while (index1 < m) {
    sorted.push(nums1[index1++]);
  }
  while (index2 < n) {
    sorted.push(nums2[index2++]);
  }

  for (let index = 0; index < sorted.length; index++) {
    nums1[index] = sorted[index];
  }
};
// @lc code=end
