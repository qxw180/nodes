/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }

  const map = new Map();
  let start = 0;
  let maxLength = 0;
  for (let index = 0; index < s.length; index++) {
    const char = s[index];
    if (map.has(char)) {
      maxLength = Math.max(maxLength, index - start);
      // 关键 窗口只能向前滑动
      start = Math.max(start, map.get(char) + 1);
    }
    map.set(char, index);
  }
  return Math.max(maxLength, s.length - start);
};

// @lc code=end

// 通过循环，使用哈希表记录字符串位置，动态更新不重复字符串开始位置，
// 每次出现字符串重复时将更大的长度作为最终结果并更新开始位置，注意循环完成后要最最后一次对比

// 时间复杂度：O(n)
// 空间复杂度：O(m) m为字符空间，即输入字符串使用的字符数
