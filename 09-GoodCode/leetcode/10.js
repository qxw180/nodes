// 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {};

console.log(inMatch("aa", "a") === false);
console.log(inMatch("aa", "a*") === true);
console.log(inMatch("aa", ".*") === true);
console.log(inMatch("aab", "c*a*b") === true);
console.log(inMatch("mississippi", "mis*is*p*.") === false);
