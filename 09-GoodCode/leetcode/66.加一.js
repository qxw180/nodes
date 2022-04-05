/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let isAdded = false;
  for (let index = digits.length - 1; index >= 0; index--) {
    const num = digits[index];
    if (num === 9) {
      digits[index] = 0;
      isAdded = false;
    } else {
      digits[index] += 1;
      isAdded = true;
      break;
    }
  }
  if (isAdded) {
    return digits;
  } else {
    return [1, ...digits];
  }
};
// @lc code=end
console.log(plusOne([9]));
