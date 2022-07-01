/*
 * @lc app=leetcode.cn id=57 lang=javascript
 *
 * [57] 插入区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  if (intervals.length === 0) {
    return [newInterval];
  }

  const result = [newInterval];
  for (let index = 0; index < intervals.length; index++) {
    const interval = intervals[index];
    const latest = result[result.length - 1];
    if (interval[1] < latest[0]) {
      result.splice(result.length - 1, 0, interval);
    } else if (interval[0] > latest[1]) {
      result.push(interval);
    } else {
      result[result.length - 1] = [
        Math.min(interval[0], latest[0]),
        Math.max(interval[1], latest[1]),
      ];
    }
  }
  return result;
};
// @lc code=end
