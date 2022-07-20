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
    const curLast = result[result.length - 1];
    const interval = intervals[index];
    if (interval[0] <= curLast[1]) {
      // 关键：新区间可能是被包含的
      curLast[1] = Math.max(curLast[1], interval[1]);
    } else {
      result.push(interval);
    }
  }

  return result;
};
// @lc code=end
