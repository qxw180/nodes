/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x < 2) {
    return x;
  }
  let left = 0;
  let right = x;
  let answer = -1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const square = mid * mid;
    if (square === x) {
      return mid;
    } else if (square < x) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return answer;
};
// @lc code=end
