// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

// 关键点：结果不重复
// 思路一：暴力解法，利用三重循环获取所有三元组，判断是否符合条件，时间复杂度为O(n^3)，空间复杂度为O(1)，只需要存储最后的输出结果
// 思路二：
// 1. 如果给定数组长度小于三，结果为空数组
// 2. 对数组进行排序，按照顺序进行查找就可以避免获得重复的结果
// 3. 然后递归确定第一个元素，问题就被简化为求两数之和，当剩余元素长度小于3时可以终止查询
// 4. 使用双指针指向剩余数组首尾元素，指针根据对应元素之和是否大于期望和向数组中间移动
// 5. 判断前两个元素变化时是否和上次使用的元素一致，如果一致就跳过
// 时间复杂度为O(n^2))，其中排序的复杂度为O(nLog(n))，外层循环复杂度为O(n)，双指针搜索也需要O(n)，所以整体为O(n^2)
// 空间复杂度为O(1)

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];
  if (nums.length < 3) {
    return result;
  }
  nums.sort((a, b) => {
    return a - b;
  });

  for (let firstIndex = 0; firstIndex < nums.length - 2; firstIndex++) {
    const firstElement = nums[firstIndex];
    if (firstElement === nums[firstIndex - 1]) {
      continue;
    }
    let secondIndex = firstIndex + 1;
    let thirdIndex = nums.length - 1;
    const wantSum = 0 - firstElement;

    while (thirdIndex > secondIndex) {
      const secondElement = nums[secondIndex];
      const thirdElement = nums[thirdIndex];
      if (
        secondIndex - firstIndex > 1 &&
        secondElement === nums[secondIndex - 1]
      ) {
        secondIndex++;
      } else {
        if (secondElement + thirdElement === wantSum) {
          result.push([firstElement, secondElement, thirdElement]);
          secondIndex++;
        } else if (secondElement + thirdElement > wantSum) {
          thirdIndex--;
        } else {
          secondIndex++;
        }
      }
    }
  }
  return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
[
  [-1, -1, 2],
  [-1, 0, 1],
];
console.log(threeSum([0, 0, 0, 0]));
[[0, 0, 0]];
console.log(threeSum([-1, 0, 0, 1, 1]));
[[-1, 0, 1]];
console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));
[
  [-4, 0, 4],
  [-4, 1, 3],
  [-3, -1, 4],
  [-3, 0, 3],
  [-3, 1, 2],
  [-2, -1, 3],
  [-2, 0, 2],
  [-1, -1, 2],
  [-1, 0, 1],
];
