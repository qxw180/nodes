// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

var longestCommonPrefix = function (strArray) {
  if (!Array.isArray(strArray)) {
    return "";
  }
  var result = "";
  var index = 0;
  while (true) {
    let temp = strArray[0][index];
    if (!temp) {
      return result;
    }
    for (let arrIndex = 1; arrIndex < strArray.length; arrIndex++) {
      console.log(strArray[arrIndex][index]);
      if (strArray[arrIndex][index] !== temp) {
        return result;
      }
    }
    index++;
    result += temp;
  }
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]) === "fl");
console.log(longestCommonPrefix(["dog", "racecar", "car"]) === "");
