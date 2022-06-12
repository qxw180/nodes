/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let indexA = a.length - 1;
  let indexB = b.length - 1;
  let result = [];
  let carry = 0;
  while (indexA >= 0 || indexB >= 0) {
    const valueA = indexA >= 0 ? Number(a[indexA]) : 0;
    const valueB = indexB >= 0 ? Number(b[indexB]) : 0;
    const sum = valueA + valueB + carry;
    if (sum === 3) {
      carry = 1;
      result.unshift(1);
    } else if (sum === 2) {
      carry = 1;
      result.unshift(0);
    } else {
      carry = 0;
      result.unshift(sum);
    }
    indexA--;
    indexB--;
  }
  if (carry === 1) {
    result.unshift(1);
  }
  return result.join("");
};
// @lc code=end
