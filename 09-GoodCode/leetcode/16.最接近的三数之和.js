/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => {
    return a - b;
  });

  let result = nums[0] + nums[1] + nums[2];
  let distance = Math.abs(result - target);

  for (let index1 = 0; index1 < nums.length - 2; index1++) {
    const first = nums[index1];

    // 性能优化 - 跳过重复元素
    if (index1 > 0 && first === nums[index1 - 1]) {
      continue;
    }

    let index2 = index1 + 1;
    let index3 = nums.length - 1;
    while (index2 < index3) {
      const second = nums[index2];
      const third = nums[index3];
      const sum = first + second + third;
      const tempDistance = Math.abs(sum - target);
      if (tempDistance < distance) {
        result = sum;
        distance = tempDistance;
      }

      if (sum > target) {
        index3--;
      } else {
        index2++;
      }
    }
  }
  return result;
};
// @lc code=end
