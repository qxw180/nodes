/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  const fb = [0, 1, 1];
  if (n < 3) {
    return fb[n];
  }
  for (let i = 3; i <= n; i++) {
    fb[i] = fb[i - 1] + fb[i - 2];
  }
  return fb[n];
};
// @lc code=end

// console.log(fib(1));
// console.log(fib(2));
// console.log(fib(3));
console.log(fib(4));
