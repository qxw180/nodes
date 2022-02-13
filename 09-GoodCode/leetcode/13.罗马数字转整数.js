/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let index = 0; index < s.length; index++) {
    const cur = map[s[index]];
    const next = map[s[index + 1]];
    if (next && next > cur) {
      result -= cur;
    } else {
      result += cur;
    }
  }
  return result;
};
// @lc code=end
