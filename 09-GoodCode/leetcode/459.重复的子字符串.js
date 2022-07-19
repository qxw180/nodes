/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  const size = s.length;
  if (size === 1) {
    return false;
  }

  for (let subSize = 1; subSize * 2 <= size; subSize++) {
    if (size % subSize === 0) {
      let match = true;
      for (let index = subSize; index < size; index++) {
        // 对比当前字符和上一个子串对应字符
        if (s[index] != s[index - subSize]) {
          match = false;
          break;
        }
      }
      if (match) {
        return true;
      }
    }
  }

  return false;
};
// @lc code=end
