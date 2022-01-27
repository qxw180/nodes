/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const trimStr = s.trimStart();
  let nums = [];

  let isNegativePrefix = trimStr[0] === "-";
  let isPositivePrefix = trimStr[0] === "+";

  const start = isPositivePrefix || isNegativePrefix ? 1 : 0;

  for (let index = start; index < trimStr.length; index++) {
    const charCode = trimStr.charCodeAt(index);
    if (charCode >= 48 && charCode <= 57) {
      nums.push(trimStr[index]);
    } else {
      break;
    }
  }

  if (nums.length === 0) {
    return 0;
  }
  let num = parseInt(nums.join(""));
  let result = isNegativePrefix ? -num : num;

  if (result < -Math.pow(2, 31)) {
    return -Math.pow(2, 31);
  }
  if (result > Math.pow(2, 31) - 1) {
    return Math.pow(2, 31) - 1;
  }

  return result;
};
// @lc code=end
