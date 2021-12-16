// 请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 atoi 函数）。

// 函数 myAtoi(string s) 的算法如下：

// 读入字符串并丢弃无用的前导空格
// 检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。
// 读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余部分将被忽略。
// 将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。
// 如果整数数超过 32 位有符号整数范围 [−231,  231 − 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −231 的整数应该被固定为 −231 ，大于 231 − 1 的整数应该被固定为 231 − 1 。
// 返回整数作为最终结果。
// 注意：

// 本题中的空白字符只包括空格字符 ' ' 。
// 除前导空格或数字后的其余字符串外，请勿忽略 任何其他字符。
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  s = s.trim();
  if (!/^[+-]?\d+/.test(s)) {
    return 0;
  }

  let index = 0;
  let result = "";
  if (s[0] === "-") {
    index = 1;
    result = "-";
  } else if (s[0] === "+") {
    index = 1;
  }

  while (index <= s.length) {
    const char = s[index];
    if (/\d/.test(char)) {
      result += char;
    } else {
      break;
    }
    index++;
  }
  result = parseInt(result);
  if (result < Math.pow(-2, 31)) {
    return Math.pow(-2, 31);
  } else if (result > Math.pow(2, 31) - 1) {
    return Math.pow(2, 31) - 1;
  } else {
    return result;
  }
};

console.log(myAtoi("+1"), myAtoi("+1") === 1);
console.log(myAtoi("42"), myAtoi("42") === 42);
console.log(myAtoi("-42"), myAtoi("-42") === -42);
console.log(myAtoi("4193 with words"), myAtoi("4193 with words") === 4193);
console.log(myAtoi("words and 987"), myAtoi("words and 987") === 0);
console.log(myAtoi("-91283472332"), myAtoi("-91283472332") === -2147483648);
