/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let last = Math.abs(x);

  if (last < 10) {
    return x;
  }

  let result = 0;
  while (last !== 0) {
    result = result * 10 + (last % 10);
    last = Math.floor(last / 10);
  }
  if (result > Math.pow(2, 31) - 1 || result < -Math.pow(2, 31)) {
    return 0;
  }

  return x > 0 ? result : -result;
};
// @lc code=end
