// 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
// 如果反转后整数超过 32 位的有符号整数的范围就返回 0。

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  var result = 0;
  while (x != 0) {
    result = result * 10 + (x % 10);
    x = parseInt(x / 10);
    if (result > Math.pow(2, 31) - 1 || result < Math.pow(-2, 31)) {
      return 0;
    }
  }
  return result;
};

console.log(reverse(123));
console.log(reverse(120));
console.log(reverse(-123));
console.log(reverse(0));
console.log(reverse(1534236469));
