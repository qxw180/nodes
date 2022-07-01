/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let length = nums.length;
  if (length === 1) {
    if (nums[0] === target) {
      return 0;
    } else {
      return -1;
    }
  }

  let left = 0;
  let right = length - 1;
  while (left < right) {
    const leftValue = nums[left];
    const rightValue = nums[right];
    if (target === leftValue) {
      return left;
    }
    if (target === rightValue) {
      return right;
    }
    const mid = Math.ceil(left + (right - left) / 2);
    const midValue = nums[mid];
    if (midValue === target) {
      return mid;
    }

    if (midValue > leftValue) {
      // 分割点在较大侧
      if (target < leftValue) {
        left = mid + 1;
      } else {
        if (target < midValue) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    } else {
      // 分割点在较小侧
      if (target > rightValue) {
        right = mid - 1;
      } else {
        if (target < midValue) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    }
  }

  return -1;
};
// @lc code=end
