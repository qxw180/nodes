/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length === 0) {
    return [];
  }

  intervals.sort((a, b) => {
    return a[0] - b[0];
  });

  const result = [intervals[0]];

  for (let index = 1; index < intervals.length; index++) {
    const target = result[result.length - 1];
    const interval = intervals[index];
    if (interval[0] <= target[1]) {
      result[result.length - 1] = [target[0], Math.max(target[1], interval[1])];
    } else {
      result.push(interval);
    }
  }

  return result;
};
// @lc code=end
