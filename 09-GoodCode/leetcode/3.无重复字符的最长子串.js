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
  const set = new Set();
  let left = 0, maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    // 如果当前字符已经在集合中，移动左指针
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    // 将当前字符加入集合
    set.add(s[right]);
    // 更新最大长度
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

// @lc code=end

// 通过循环，使用哈希表记录字符串位置，动态更新不重复字符串开始位置，
// 每次出现字符串重复时将更大的长度作为最终结果并更新开始位置，注意循环完成后要最最后一次对比

// 时间复杂度：O(n)
// 空间复杂度：O(m) m为字符空间，即输入字符串使用的字符数
