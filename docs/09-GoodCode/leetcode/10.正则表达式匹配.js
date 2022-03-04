/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const matchArray = [];
  let temp = "";
  let index = 0;
  let length = p.length;
  while (index < length) {
    const item = p[index];
    if (item === ".") {
      if (temp !== "") {
        matchArray.push(temp);
        temp = "";
      }
      matchArray.push(".");
    } else if (item === "*") {
      matchArray.push(`${temp}*`);
      temp = "";
    } else {
      if (temp !== "") {
        matchArray.push(temp);
      }
      temp = item;
    }
    index++;
  }
  if (temp !== "") {
    matchArray.push(temp);
  }
  console.log(matchArray);
  return true;
};

function match(s, p) {
  if (p.length === 1) {
    const item = p[0];
    if (item === ".") {
      return s.length === 1;
    } else if (item.length === 2) {
      if (s.length === 0) {
        return true;
      } else {
        for (let index = 0; index < s.length; index++) {
          if (item !== s[index]) {
            return false;
          }
        }
        return true;
      }
    } else {
      return s === item;
    }
  } else {
    return match(s, p);
  }
}

console.log(isMatch("aa", "a*a.bb*a..") === false);
// console.log(isMatch("aa", "a") === false);
// console.log(isMatch("aa", "a*") === true);
// console.log(isMatch("ab", ".*") === true);
// @lc code=end
