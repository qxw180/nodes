// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 思路：利用栈记录为匹配标签，匹配后出栈，如果闭合标签不匹配栈顶、或者栈最后未被清空则返回false

/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const stack = [];
  for (let index = 0; index < s.length; index++) {
    const element = s[index];
    const match = map[element];
    if (match) {
      stack.push(element);
    } else {
      if (element !== map[stack[stack.length - 1]]) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  return stack.length === 0;
};

console.log(isValid("()") === true);
console.log(isValid("()[]{}") === true);
console.log(isValid("(]") === false);
console.log(isValid("([)]") === false);
console.log(isValid("{[]}") === true);
