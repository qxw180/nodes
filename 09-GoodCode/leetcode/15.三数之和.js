/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];
  if (nums.length < 3) {
    return result;
  }
  nums.sort((a, b) => {
    return a - b;
  });

  for (let firstIndex = 0; firstIndex < nums.length - 2; firstIndex++) {
    const firstElement = nums[firstIndex];
    if (firstElement === nums[firstIndex - 1]) {
      continue;
    }
    let secondIndex = firstIndex + 1;
    let thirdIndex = nums.length - 1;
    const wantSum = 0 - firstElement;

    while (thirdIndex > secondIndex) {
      const secondElement = nums[secondIndex];
      const thirdElement = nums[thirdIndex];
      if (
        secondIndex - firstIndex > 1 &&
        secondElement === nums[secondIndex - 1]
      ) {
        secondIndex++;
      } else {
        if (secondElement + thirdElement === wantSum) {
          result.push([firstElement, secondElement, thirdElement]);
          secondIndex++;
        } else if (secondElement + thirdElement > wantSum) {
          thirdIndex--;
        } else {
          secondIndex++;
        }
      }
    }
  }

  return result;
};
// @lc code=end
