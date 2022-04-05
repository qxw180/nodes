/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  // const wordArr = s.split(" ");
  // for (let index = wordArr.length - 1; index < wordArr.length; index--) {
  //   const current = wordArr[index];
  //   if (current !== "") {
  //     return current.length;
  //   }
  // }
  // 方法二
  // let length = 0;
  // let start = false;
  // for (let index = s.length - 1; index >= 0; index--) {
  //   const char = s[index];
  //   if (char === " " && start === true) {
  //     return length;
  //   } else if (char !== " ") {
  //     start = true;
  //     length++;
  //   }
  // }
  // return length;
  let startIndex = s.length - 1;
  while (s[startIndex] === " ") {
    startIndex--;
  }
  let length = 0;
  while (s[startIndex] !== " " && startIndex >= 0) {
    length++;
    startIndex--;
  }
  return length;
};
// @lc code=end
