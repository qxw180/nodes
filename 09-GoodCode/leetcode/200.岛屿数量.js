/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;

  const height = grid.length;
  const width = grid[0].length;

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      if (grid[row][column] === "1") {
        deepMark(row, column);
        count++;
      }
    }
  }

  function deepMark(row, column) {
    grid[row][column] = "0";
    // UP
    if (row - 1 >= 0 && grid[row - 1][column] === "1") {
      deepMark(row - 1, column);
    }
    // DOWN
    if (row + 1 < height && grid[row + 1][column] === "1") {
      deepMark(row + 1, column);
    }
    // LEft
    if (column - 1 >= 0 && grid[row][column - 1] === "1") {
      deepMark(row, column - 1);
    }
    // RIGHT
    if (column + 1 < width && grid[row][column + 1] === "1") {
      deepMark(row, column + 1);
    }
  }
  return count;
};
// @lc code=end
