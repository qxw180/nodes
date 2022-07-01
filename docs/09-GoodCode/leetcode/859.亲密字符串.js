/*
 * @lc app=leetcode.cn id=859 lang=javascript
 *
 * [859] 亲密字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  if (s.length != goal.length) {
    return false;
  }
  if (s === goal) {
    const set = new Set();
    for (const char of s) {
      if (set.has(char)) {
        return true;
      }
      set.add(char);
    }
    return false;
  }

  const q1 = [];
  const q2 = [];
  for (let index = 0; index < s.length; index++) {
    const s1 = s[index];
    const s2 = goal[index];
    if (s1 !== s2) {
      q1.push(s1);
      q2.push(s2);
    }
  }
  return (
    q1.length === 2 && q2.length === 2 && q1[0] === q2[1] && q1[1] === q2[0]
  );
};
// @lc code=end
