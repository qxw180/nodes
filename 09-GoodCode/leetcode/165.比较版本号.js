/*
 * @lc app=leetcode.cn id=165 lang=javascript
 *
 * [165] 比较版本号
 */

// @lc code=start
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  const v1 = version1.split(".");
  const v2 = version2.split(".");

  while (v1.length && v2.length) {
    const p1 = parseInt(v1.shift(), 10);
    const p2 = parseInt(v2.shift(), 10);
    if (p1 > p2) {
      return 1;
    }
    if (p1 < p2) {
      return -1;
    }
  }

  while (v1.length) {
    const p1 = parseInt(v1.shift(), 0);
    if (p1 > 0) {
      return 1;
    }
  }

  while (v2.length) {
    const p2 = parseInt(v2.shift(), 0);
    if (p2 > 0) {
      return -1;
    }
  }

  return 0;
};
// @lc code=end
