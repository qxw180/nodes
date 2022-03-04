/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows <= 1) {
    return s;
  }

  const length = s.length;
  const groupSize = numRows * 2 - 2;
  const groupCount = Math.ceil(length / groupSize);

  let result = [];

  function append(index) {
    if (index < length) {
      result.push(s[index]);
    }
  }
  for (let row = 0; row < numRows; row++) {
    for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
      if (row === 0) {
        append(groupIndex * groupSize);
      } else if (row === numRows - 1) {
        append(groupIndex * groupSize + row);
      } else {
        append(groupIndex * groupSize + row);
        append(groupIndex * groupSize + (numRows - 1) + (numRows - row - 1));
      }
    }
  }
  return result.join("");
};
// @lc code=end
