/*
 * @lc app=leetcode.cn id=1556 lang=javascript
 *
 * [1556] 千位分隔数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  if (n < 1000) {
    return `${n}`;
  }
  const arr = [];
  while (n > 0) {
    arr.unshift(n % 1000);
    n = Math.floor(n / 1000);
  }
  return arr.reduce((pre, cur, index) => {
    if (index === 0) {
      pre += cur;
    } else {
      pre += `.${cur.toString().padStart(3, 0)}`;
    }
    return pre;
  }, "");
};
// @lc code=end
