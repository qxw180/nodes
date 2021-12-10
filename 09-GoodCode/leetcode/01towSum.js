// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。

/**
 * @param {number[]} numberArray
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numberArray, target) {
  var numberMap = new Map();
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
