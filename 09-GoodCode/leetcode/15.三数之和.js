/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];

  // 边界处理
  if (nums.length < 3) {
    return result;
  }

  // 排序
  nums.sort((a, b) => {
    return a - b;
  });

  for (let firstIndex = 0; firstIndex < nums.length - 2; firstIndex++) {
    const firstNumber = nums[firstIndex];
    // 去重
    if (firstIndex > 0 && nums[firstIndex - 1] === firstNumber) {
      continue;
    }
    let start = firstIndex + 1;
    let end = nums.length - 1;
    const wantSum = 0 - firstNumber;

    while (end > start) {
      const secondNumber = nums[start];
      const thirdNumber = nums[end];

      if (secondNumber + thirdNumber === wantSum) {
        result.push([firstNumber, secondNumber, thirdNumber]);
        while (end > start && secondNumber === nums[start + 1]) {
          start++;
        }
        start++;

        while (end > start && thirdNumber === nums[end - 1]) {
          end--;
        }
      } else if (secondNumber + thirdNumber > wantSum) {
        end--;
      } else {
        start++;
      }
    }
  }

  return result;
};
// @lc code=end

// 关键点是不能有重复答案
// 解决思路，首先对输入进行排序，按照从小到大依次找出结果，并跳过已求解数字，保证无重复
// 求解步骤，对数组排序后首先遍历确定第一个元素，将剩余的问题转换为twoSum问题，然后利用双指针对剩余元素求和找到匹配元素
// 时间复杂度：排序O(n*log(n)) + 求解O(n^2)，外层需要n*内层双指针n
// 空间复杂度：O(1)
