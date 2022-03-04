// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 请必须使用时间复杂度为 O(log n) 的算法。

// 标签：二分查找
// 时间复杂度：使用二分查找，每次循环都会缩短查询长度的一般，所以结果为O(log(n))
// 空间复杂度：使用固定数量的变量记录middle，所以结果为0(1)

var searchInsert = function (nums, target) {
  if ((!Array.isArray(nums) && nums <= 0) || typeof target !== "number") {
    return 0;
  }

  var left = 0;
  var right = nums.length - 1;

  if (nums[0] >= target) {
    return 0;
  } else if (nums[right] < target) {
    return right + 1;
  }

  while (left <= right) {
    var middle = Math.floor((right + left) / 2);
    var middleNum = nums[middle];
    if (middleNum === target) {
      return middle;
    } else if (target > middleNum) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return left;
};

console.log(searchInsert([1, 3, 5, 6], 5) === 2);
console.log(searchInsert([1, 3, 5, 6], 2) === 1);
console.log(searchInsert([1, 3, 5, 6], 7) === 4);
console.log(searchInsert([1, 3, 5, 6], 0) === 0);
console.log(searchInsert([1], 0) === 0);
console.log(searchInsert([1], 2) === 1);
console.log(searchInsert([1, 3, 5], 4) === 2);
console.log(searchInsert([1, 3, 5], 2) === 1);
console.log(searchInsert([1, 3], 2) === 1);
console.log(searchInsert([2, 3, 5, 6, 9], 7) === 4);
console.log(searchInsert([3, 5, 7, 9, 10], 8) === 3);
