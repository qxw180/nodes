/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  if (x < 10) {
    return true;
  }
  if (x % 10 === 0) {
    return false;
  }

  let x1 = Math.floor(x / 10);
  let x2 = x % 10;
  let digits = 10;

  while (x1 / digits >= 10) {
    x2 = x2 * 10 + (x1 % 10);
    x1 = Math.floor(x1 / 10);
    digits *= 10;
  }
  return x1 === x2 || Math.floor(x1 / 10) === x2;
};
// @lc code=end

// 从输入数字末尾分割生成，被对比数字x1和对比数字x2，并记录进位digits
// 当被对比数字除以进位小于等于10时，x1和x2长度相差0位或1位，可以进行对比
// 时间复杂度：O(log(n)) n为输入数字长度
// 空间复杂度：O(1) 使用常数个变量存储
