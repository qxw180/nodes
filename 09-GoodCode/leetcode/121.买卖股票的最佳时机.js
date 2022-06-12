/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const length = prices.length;
  if (length === 1) {
    return 0;
  }

  let minPrice = prices[0];
  let result = 0;
  for (let i = 1; i < length; i++) {
    const price = prices[i];
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > result) {
      result = price - minPrice;
    }
  }

  return result;
};
// @lc code=end
