/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let start = 0, end = s.length - 1;
  while (end - start >= 1) {
    const startLetter = s[start];
    const endLetter = s[end];
    const tmp = startLetter;
    s[start++] = endLetter;
    s[end--] = tmp;
  }
  return s;
};
// @lc code=end

// 思路：使用 双指针-反向 方法解决
// 时间复杂度 O(n) 工执行 n/2 次交换
// 空间复杂度 O(1)