/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 != 0) return false;

  const tagConfig = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  let tagStack = [];

  for (let index = 0; index < s.length; index++) {
    const tag = s[index];
    if (tagConfig[tag]) {
      tagStack.push(tag);
      continue;
    }

    let top = tagStack.pop()
    if (tagConfig[top] != tag) return false;

  }

  return tagStack.length === 0;

};
// @lc code=end