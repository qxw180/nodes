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
  let start = 0;
  let end = s.length - 1;
  while (start < end) {
    const temp = s[start];
    s[start] = s[end];
    s[end] = temp;
    start++;
    end--;
  }
  return s;
};
// @lc code=end

// 思路：使用 双指针-反向 方法解决
// 时间复杂度 O(n) 工执行 n/2 次交换
// 空间复杂度 O(1)
