/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const button = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };
  if (digits === "") {
    return [];
  }
  if (digits.length === 1) {
    return button[digits];
  }

  function solve(digits, source) {
    if (digits.length === 0) {
      return source;
    }

    const newSource = [];
    for (const char of button[digits[0]]) {
      for (const item of source) {
        newSource.push(`${item}${char}`);
      }
    }

    return solve(digits.substring(1), newSource);
  }
  return solve(digits.substring(1), button[digits[0]]);
};
// @lc code=end
