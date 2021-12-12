// 删除有序数组中的重复项
// 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

// 思路：获取不重复元素的数量n，注意：原地修改的要求只需要保证前n位元素为不重复元素，并不需要考虑超出长度后的元素，所以并不需要删除多余元素。
// 可以采用双指针的方案：快指针用来遍历数组，慢指针用来记录不重复元素位置
// 标签：数组 双指针
// 时间复杂度：因为只需要进行一次遍历，所以结果为：O(n)，n为数组长度
// 空间复杂度：因为只有需要存储慢指针的值，即常数空间，所以结果为：O(1)

var removeDuplicates = function (nums) {
  if (!Array.isArray(nums) || nums.length === 0) {
    return 0;
  }
  var validIndex = 0;
  for (let index = validIndex + 1; index < nums.length; index++) {
    if (nums[validIndex] !== nums[index]) {
      validIndex++;
      nums[validIndex] = nums[index];
    }
  }
  return validIndex + 1;
};

console.log(removeDuplicates([1, 1, 2]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
