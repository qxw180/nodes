/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const pair = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const size = s.length;
  if (size % 2 !== 0) {
    return false;
  }
  const stack = [];
  for (const char of s) {
    const match = pair[char];
    if (match) {
      stack.push(char);
    } else {
      const head = stack.pop();
      if (pair[head] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
// @lc code=end
