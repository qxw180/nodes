/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  if (s.length <= 1) {
    return true;
  }
  let start = 0;
  let end = s.length - 1;
  function isValidChar(char) {
    return /[A-Za-z0-9]/.test(char);
  }
  while (end > start) {
    while (end > start && !isValidChar(s[start])) {
      start++;
    }
    while (end > start && !isValidChar(s[end])) {
      end--;
    }
    if (s[start].toLowerCase() !== s[end].toLowerCase()) {
      return false;
    }
    start++;
    end--;
  }
  return true;
};
// @lc code=end
