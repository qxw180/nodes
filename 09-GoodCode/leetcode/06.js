// 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows <= 1) {
    return s;
  }
  const groupSize = 2 * numRows - 2;
  const groupCount = Math.ceil(s.length / groupSize);

  let result = "";
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
      const index = groupSize * groupIndex + rowIndex;
      if (s[index]) {
        result += s[index];
      } else {
        break;
      }
      if (rowIndex > 0 && rowIndex < numRows - 1) {
        const index = groupSize * groupIndex + (groupSize - rowIndex);
        if (s[index]) {
          result += s[index];
        } else {
          break;
        }
      }
    }
  }
  return result;
};

console.log(convert("PAYPALISHIRING", 3) === "PAHNAPLSIIGYIR");
console.log(convert("PAYPALISHIRING", 4) === "PINALSIGYAHRPI");
console.log(convert("A", 1) === "A");
