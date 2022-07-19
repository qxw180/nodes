/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];
  function dfs(ret, curStr, left, right) {
    if (!left && !right) {
      ret.push(curStr);
      return;
    }

    if (right < left) {
      dfs(ret, `${curStr})`, left - 1, right);
    }

    if (right > 0) {
      dfs(ret, `${curStr}(`, left, right - 1);
    }
  }

  dfs(result, "", n, n);

  return result;
};
// @lc code=end
