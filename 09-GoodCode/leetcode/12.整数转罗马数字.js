/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const entries = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  const result = [];

  for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
    if (num <= 0) {
      break;
    }
    const [value, symbol] = entries[entryIndex];
    while (num >= value) {
      result.push(symbol);
      num -= value;
    }
  }

  return result.join("");
};
// @lc code=end

// 思路：贪心算法
// 基于给定规则，可以得到13个特殊字符或字符组合代表特定数字 entries
// 给定数字number，一定是从 entries 中尽量匹配最大的
// 所以我们可以遍历 entries，使用较大的优先匹配，并减小number，直到number为0

// 时间复杂度：O(1)，因为entries长度固定，因此循环次数有一个确定的上限
// 空间复杂度：O(1)

// 思路二：暴力解法
// 基于给定条件可以列出个十百千位上所有的数字匹配字符
// 然后将数字的各个位对应的字符去除求解。
