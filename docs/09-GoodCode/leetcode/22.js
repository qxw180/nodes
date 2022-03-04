// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  function generate(input) {
    const result = [];
    for (let index = 0; index < input.length; index++) {
      const element = input[index];
      result.push(`(${element})`);
      result.push(`()${element}`);
      if (!/^(\(\))+$/.test(element)) {
        result.push(`${element}()`);
      }
    }
    return result;
  }

  let result = ["()"];

  for (let index = 1; index < n; index++) {
    result = generate(result);
  }
  return result;
};

// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]

// console.log(generateParenthesis(1));
console.log(generateParenthesis(4));
