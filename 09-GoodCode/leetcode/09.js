// 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }
  if (x < 10) {
    return true;
  }

  var other = 0;
  var size = 1;
  while (x / size >= 10) {
    other = other * 10 + (x % 10);
    x = Math.floor(x / 10);
    size *= 10;
  }

  console.log(x, other);
  if (x >= size) {
    return Math.floor(x / 10) === other;
  } else {
    return x === other;
  }
};

console.log(isPalindrome(101));
console.log(isPalindrome(1001));
console.log(isPalindrome(1221));
console.log(isPalindrome(12121));
