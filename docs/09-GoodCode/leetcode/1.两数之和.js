/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numberArray, target) {
  const numberMap = new Map();
  for (let index = 0; index < numberArray.length; index++) {
    const currentNumber = numberArray[index];
    const wantNumber = target - currentNumber;
    if (numberMap.has(wantNumber)) {
      return [index, numberMap.get(wantNumber)];
    }
    numberMap.set(currentNumber, index);
  }
};

console.log(twoSum([1, 2, 3, 4], 5));
console.log(twoSum([2, 7, 11, 15], 9));
// @lc code=end

// 思路，遍历过程中使用HASH表记录已遍历结果
// 标签：数组 HASH表
// 时间复杂度：因为只需要进行一次遍历，HASH表的存取时间复杂度均为O(1)，程序整体复杂度取决于数组长度，所以结果为：O(n)，n为数组长度
// 空间复杂度：因为只有存储遍历记录的HASH表，HASH表的最大长度为n-1，所以结果为：O(n)，n为数组长度
