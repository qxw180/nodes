/*
 * @lc app=leetcode.cn id=697 lang=javascript
 *
 * [697] 数组的度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (map.has(num)) {
      const item = map.get(num);
      item.count++;
      item.end = i;
    } else {
      map.set(num, {
        count: 1,
        start: i,
        end: i,
      });
    }
  }
  let maxNum = 0;
  let minLen = 0;
  map.forEach(({ count, start, end }, num) => {
    if (count > maxNum) {
      maxNum = count;
      minLen = end - start + 1;
    } else if (count === maxNum) {
      if (minLen > end - start + 1) {
        minLen = end - start + 1;
      }
    }
  });
  return minLen;
};
// @lc code=end

// 思路：
// 1. 首先遍历数组，使用map记录每个数字的出现次数和起始位置
// 2. 遍历map，记录出现次数最大的数字和对应的最短路径
// 时间复杂度 O(n) 空间复杂度 O(n)
