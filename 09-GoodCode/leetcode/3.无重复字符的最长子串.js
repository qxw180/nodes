/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// 标签：哈希表 字符串 滑动窗口

// 通过循环，使用哈希表记录字符串位置，动态更新不重复字符串开始位置，
// 每次出现字符串重复时将更大的长度作为最终结果并更新开始位置，注意循环完成后要最最后一次对比

// 时间复杂度：O(n)
// 空间复杂度：O(m) m为字符空间，即输入字符串使用的字符数
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0;
  if (typeof s !== "string" || s.length === 0) {
    return maxLength;
  }
  const tmpMap = new Map();
  let start = 0;
  for (let index = 0; index < s.length; index++) {
    const char = s[index];
    if (tmpMap.has(char)) {
      maxLength = Math.max(maxLength, index - start);
      start = Math.max(start, tmpMap.get(char) + 1);
    }
    tmpMap.set(char, index);
  }
  return Math.max(maxLength, s.length - start);
};

console.log(lengthOfLongestSubstring("aab") === 2);
console.log(lengthOfLongestSubstring("bbbbb") === 1);
console.log(lengthOfLongestSubstring("pwwkew") === 3);
console.log(lengthOfLongestSubstring("abcabcbb") === 3);
console.log(lengthOfLongestSubstring("dvdf") === 3);
console.log(lengthOfLongestSubstring("abba") === 2);
console.log(lengthOfLongestSubstring("tmmzuxt") === 5);

// @lc code=end
