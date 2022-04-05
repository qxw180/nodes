/*
 * @lc app=leetcode.cn id=892 lang=javascript
 *
 * [892] 三维形体的表面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
  let result = 0;
  function getArea(height, siblingHeight) {
    return Math.max(height - siblingHeight, 0);
  }
  grid.forEach((row, rowIndex) => {
    row.forEach((height, colIndex) => {
      if (height > 0) {
        const left = getArea(height, grid[rowIndex]?.[colIndex - 1] || 0);
        const right = getArea(height, grid[rowIndex]?.[colIndex + 1] || 0);
        const front = getArea(height, grid[rowIndex - 1]?.[colIndex] || 0);
        const back = getArea(height, grid[rowIndex + 1]?.[colIndex] || 0);
        const area = 2 + left + right + front + back;
        result += area;
      }
    });
  });
  return result;
};
// @lc code=end
