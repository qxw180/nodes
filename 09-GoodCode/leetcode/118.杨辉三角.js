/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  function generateRow(target) {
    const newRow = [1];
    for (let i = 0; i < target.length - 1; i++) {
      newRow.push(target[i] + target[i + 1]);
    }
    newRow.push(1);
    return newRow;
  }

  const result = [[1]];
  for (let row = 1; row < numRows; row++) {
    result.push(generateRow(result[result.length - 1]));
  }
  return result;
};
// @lc code=end
