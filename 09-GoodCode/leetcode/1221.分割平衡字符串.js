/*
 * @lc app=leetcode.cn id=1221 lang=javascript
 *
 * [1221] 分割平衡字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  const size = s.length;
  if (size <= 1) {
    return 0;
  }
  let sum = 0;
  let stack = [];

  for (const item of s) {
    if (stack.length === 0) {
      stack.push(item);
      continue;
    }
    if (stack[stack.length - 1] !== item) {
      stack.pop();
      if (stack.length === 0) {
        sum++;
      }
    } else {
      stack.push(item);
    }
  }
  return sum;
};
// @lc code=end
