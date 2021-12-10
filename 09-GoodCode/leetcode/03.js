// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var maxLength = 0;
  if (typeof s !== "string" || s.length === 0) {
    return maxLength;
  }
  var index = 0;
  var size = s.length;
  var tmpMap = new Map();
  var tmpLength = 0;
  while (index < size) {
    var char = s[index];
    if (!tmpMap.has(char)) {
      tmpLength++;
      tmpMap.set(char, index);
      index++;
    } else {
      if (tmpLength > maxLength) {
        maxLength = tmpLength;
        tmpLength = 0;
        if (size - (index + 1) <= maxLength) {
          return maxLength;
        } else {
          index = tmpMap.get(char) + 1;
          tmpMap.clear();
        }
      }
    }
  }
  return maxLength;
};

// console.log(lengthOfLongestSubstring("abcabcbb"));
// console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
