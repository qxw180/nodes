/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (needle === "") {
    return 0;
  }

  for (let index = 0; index < haystack.length; index++) {
    const element = haystack[index];
    if (element === needle[0]) {
      for (let index2 = 0; index2 < needle.length; index2++) {
        if (haystack[index + index2] !== needle[index2]) {
          break;
        }
        if (index2 === needle.length - 1) {
          return index;
        }
      }
    }
  }

  return -1;
};
// @lc code=end
