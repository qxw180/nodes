/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  // const result = [];
  // if (nums.length < 4) {
  //   return result;
  // }
  // nums.sort((a, b) => {
  //   return a - b;
  // });
  // const length = nums.length;
  // for (let i = 0; i < length - 3; i++) {
  //   const first = nums[i];
  //   // 跳过重复元素
  //   if (i > 0 && nums[i] === nums[i - 1]) {
  //     continue;
  //   }
  //   // 最小值大于target跳过
  //   if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
  //     break;
  //   }
  //   // 最大值小于target跳过
  //   if (
  //     nums[i] + nums[length - 3] + nums[length - 2] + nums[length - 1] <
  //     target
  //   ) {
  //     continue;
  //   }
  //   for (let j = i + 1; j < length - 2; j++) {
  //     const second = nums[j];
  //     if (j > i + 1 && second === nums[j - 1]) {
  //       continue;
  //     }
  //     if (first + second + nums[j + 1] + nums[j + 2] > target) {
  //       break;
  //     }
  //     if (first + second + nums[length - 2] + nums[length - 1] < target) {
  //       continue;
  //     }
  //     let left = j + 1;
  //     let right = length - 1;
  //     while (left < right) {
  //       const sum = nums[i] + nums[j] + nums[left] + nums[right];
  //       if (sum === target) {
  //         result.push([nums[i], nums[j], nums[left], nums[right]]);
  //         while (left < right && nums[left] === nums[left + 1]) {
  //           left++;
  //         }
  //         left++;
  //         while (left < right && nums[right] === nums[right - 1]) {
  //           right--;
  //         }
  //         right--;
  //       } else if (sum < target) {
  //         left++;
  //       } else {
  //         right--;
  //       }
  //     }
  //   }
  // }
  // return result;

  function nSum(n, nums, target) {
    // console.log(n, nums, target);
    const result = [];
    const size = nums.length;
    if (size < n) {
      return result;
    }

    if (n === 2) {
      if (nums[0] + nums[1] > target) {
        return result;
      }

      if (nums[size - 1] + nums[size - 2] < target) {
        return result;
      }

      let left = 0;
      let right = size - 1;

      while (left < right) {
        const sum = nums[left] + nums[right];

        if (sum < target) {
          left++;
        } else if (sum > target) {
          right--;
        } else {
          result.push([nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) {
            left++;
          }
          left++;
          while (left < right && nums[right] === nums[right - 1]) {
            right--;
          }
          right--;
        }
      }
    } else {
      for (let index = 0; index < size - n + 1; index++) {
        if (index > 0 && nums[index] === nums[index - 1]) {
          continue;
        }

        let minSum = 0;
        for (let i = 0; i < n; i++) {
          minSum += nums[i];
        }
        if (minSum > target) {
          break;
        }

        let maxSum = 0;
        for (let i = size - n; i < size; i++) {
          maxSum += nums[i];
        }
        if (maxSum < target) {
          continue;
        }

        const newTarget = target - nums[index];
        const newNums = nums.slice(index + 1);

        const sums = nSum(n - 1, newNums, newTarget);

        result.push(
          ...sums.map((item) => {
            return [nums[index], ...item];
          })
        );
      }
    }

    return result;
  }

  const n = 4;
  if (nums.length < n) {
    return [];
  }
  nums.sort((a, b) => {
    return a - b;
  });
  return nSum(n, nums, target);
};
// @lc code=end

console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
console.log(fourSum([-2, -1, -1, 1, 1, 2, 2], 0));
console.log(fourSum([6, 0, -8, -8, 6, -1, 6, 5, 3, 0, 3, 5], -2));
