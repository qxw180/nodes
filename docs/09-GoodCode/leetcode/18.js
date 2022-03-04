// 四数之和

// 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

// 0 <= a, b, c, d < n
// a、b、c 和 d 互不相同
// nums[a] + nums[b] + nums[c] + nums[d] == target
// 你可以按 任意顺序 返回答案 。

// 标签：数组、排序、双指针

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  if (nums.length < 4) {
    return [];
  }
  nums.sort((a, b) => {
    return a - b;
  });
  const result = [];

  for (let index1 = 0; index1 < nums.length - 3; index1++) {
    const first = nums[index1];
    if (index1 > 0 && first === nums[index1 - 1]) {
      continue;
    }
    let total = first;
    for (let index2 = index1 + 1; index2 < nums.length - 2; index2++) {
      const second = nums[index2];
      if (index2 > index1 + 1 && second === nums[index2 - 1]) {
        continue;
      }
      total = first + second;
      for (let index3 = index2 + 1; index3 < nums.length - 1; index3++) {
        const third = nums[index3];
        if (index3 > index2 + 1 && third === nums[index3 - 1]) {
          continue;
        }
        total = first + second + third;
        for (let index4 = index3 + 1; index4 < nums.length; index4++) {
          const forth = nums[index4];
          if (index4 > index3 + 1 && forth === nums[index4 - 1]) {
            continue;
          }
          total = first + second + third + forth;
          if (total === target) {
            result.push([first, second, third, forth]);
          }
        }
      }
    }
  }
  return result;
};

// 输入：nums = [1,0,-1,0,-2,2], target = 0
// 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([1, 0, -1, 0, -2, 2], 0));

console.log(fourSum([2, 2, 2, 2, 2], 8));
console.log(fourSum([1, -2, -5, -4, -3, 3, 3, 5], -11));
