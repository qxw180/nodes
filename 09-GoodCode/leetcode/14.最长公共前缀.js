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
  const size = strs.length;

  if (size === 0) {
    return "";
  }

  const firstStr = strs[0];
  if (size === 1) {
    return firstStr;
  }

  const result = [];
  let charIndex = 0;

  while (charIndex < firstStr.length) {
    const targetChar = firstStr[charIndex];
    for (let strIndex = 1; strIndex < size; strIndex++) {
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

// 思路：以第一个字符串为基础，逐个字符遍历对比其他字符串
// 时间复杂度：O(mn)，m为字符串平均长度，n为字符串数量
// 空间复杂度：O(n)
