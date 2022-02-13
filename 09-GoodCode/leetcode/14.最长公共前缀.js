/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) {
    return "";
  }

  const firstStr = strs[0];
  if (strs.length === 1) {
    return firstStr;
  }

  const result = [];
  let charIndex = 0;

  while (charIndex < firstStr.length) {
    const targetChar = firstStr[charIndex];
    for (let strIndex = 1; strIndex < strs.length; strIndex++) {
      const str = strs[strIndex];
      if (str[charIndex] !== targetChar) {
        return result.join("");
      }
    }
    result.push(targetChar);
    charIndex++;
  }
  return result.join("");
};
// @lc code=end

// 时间复杂度：O(mn)，m为字符串平均长度，n为字符串数量
// 空间复杂度：O(1)
