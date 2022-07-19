/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const size = temperatures.length;

  const answer = new Array(size).fill(0);

  const stack = [];

  for (let index = 0; index < size; index++) {
    while (
      stack.length > 0 &&
      temperatures[index] > temperatures[stack[stack.length - 1]]
    ) {
      const topIndex = stack.pop();
      answer[topIndex] = index - topIndex;
    }
    stack.push(index);
  }

  return answer;
};
// @lc code=end

// 思路：
// 创建一个数组，填充默认值0
// 维护一个最小栈，栈中存储温度下标
// 遍历数组
// 如果栈为空或则当前温度小于等于栈顶稳定，则直接入栈
// 如果栈不为空，且温度大于栈顶温度，则取出栈顶，栈顶值为下标，使用当前下标减去栈顶下标即为栈顶下标到下一个高温的时长
