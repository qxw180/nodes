// 移除元素;
// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
// 元素的顺序可以改变。不需要考虑数组中超出新长度后面的元素。

// 思路类似26题

var removeElement = function (nums, val) {
  if (typeof val !== "number") {
    return nums.length;
  }
  if (!Array.isArray(nums) || nums.length <= 0) {
    return 0;
  }
  var validIndex = -1;
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    if (element !== val) {
      validIndex++;
      nums[validIndex] = element;
    }
  }
  return validIndex + 1;
};

// console.log(removeElement([3, 2, 2, 3], 3));
// console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
console.log(removeElement([4, 4, 0, 1, 0, 2], 0));
