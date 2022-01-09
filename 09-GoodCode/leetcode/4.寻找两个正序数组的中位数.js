/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start

// 标签 二分查找、分治

// 思路1：合并数组并排序，然后计算中位数，时间复杂度取决于数组排序复杂度
// 思路2：单次循环剔除数组中的最大和最小值，直至清空一个数组或剩余总长度小于等于2，计算剩余元素的中位数，时间复杂度为O(m+n)

// var findMedianSortedArrays = function (nums1, nums2) {
//   var start1 = 0;
//   var end1 = nums1.length - 1;
//   var start2 = 0;
//   var end2 = nums2.length - 1;
//   var tempNums1Length = nums1.length;
//   var tempNums2Length = nums2.length;
//   while (
//     tempNums1Length > 0 &&
//     tempNums2Length > 0 &&
//     tempNums1Length + tempNums2Length > 2
//   ) {
//     var v1head = nums1[start1];
//     var v1end = nums1[end1];
//     var v2head = nums2[start2];
//     var v2end = nums2[end2];
//     if (v1head < v2head) {
//       start1++;
//       tempNums1Length--;
//     } else {
//       start2++;
//       tempNums2Length--;
//     }
//     if (v1end > v2end) {
//       tempNums1Length--;
//       end1--;
//     } else {
//       tempNums2Length--;
//       end2--;
//     }
//   }

//   function getMiddleNumber(start, end, arr) {
//     const total = start + end;
//     if (total % 2 === 0) {
//       return arr[(start + end) / 2];
//     } else {
//       var middleIndex = total / 2;
//       return (arr[middleIndex - 0.5] + arr[middleIndex + 0.5]) / 2;
//     }
//   }

//   if (tempNums1Length === 0) {
//     return getMiddleNumber(start2, end2, nums2);
//   } else if (tempNums2Length === 0) {
//     return getMiddleNumber(start1, end1, nums1);
//   } else {
//     return (nums1[start1] + nums2[start2]) / 2;
//   }
// };

// 思路3：通过输入长度可以计算出中位数位置
// 如果长度和为奇数，则结果为(m + n) / 2位置对应的数值
// 如果长度和为偶数，则结果为(m + n) / 2上下取整位置对应数值的平均数
// 这时我们只需要计算得出左侧数组就可以获得结果
// 长度为奇数，左侧数组长度为(m + n + 1) / 2，结果为左侧数组最后一个值
// 长度为偶数，左侧数组长度为(m + n) / 2 + 1，结果为左侧数组最后两个值的平均数
// 可以使用双指针循环两个数组，获取逐个获取较小的值添加到左侧数组，继续，直到指定位置

var findMedianSortedArrays = function (nums1, nums2) {
  const length1 = nums1.length;
  const length2 = nums2.length;
  const totalSize = length1 + length2;
  const isOdd = totalSize % 2 !== 0;
  const leftSize = isOdd ? (totalSize + 1) / 2 : totalSize / 2 + 1;

  const left = [];

  let index1 = 0;
  let index2 = 0;

  while (left.length < leftSize) {
    const val1 = nums1[index1];
    const val2 = nums2[index2];
    if (typeof val1 !== "number") {
      left.push(val2);
      index2++;
    } else if (typeof val2 !== "number") {
      left.push(val1);
      index1++;
    } else {
      if (val1 <= val2) {
        left.push(val1);
        index1++;
      } else {
        left.push(val2);
        index2++;
      }
    }
  }

  if (isOdd) {
    return left[leftSize - 1];
  } else {
    return (left[leftSize - 1] + left[leftSize - 2]) / 2;
  }
};

console.log(findMedianSortedArrays([1, 4, 8], [2, 3, 9]) === 3.5);
console.log(findMedianSortedArrays([2, 3], []) === 2.5);
console.log(findMedianSortedArrays([1, 3], [2]) === 2);
console.log(findMedianSortedArrays([1, 3], [2, 4]) === 2.5);
console.log(findMedianSortedArrays([0, 0], [0, 0]) === 0);
console.log(findMedianSortedArrays([], [1]) === 1);
console.log(findMedianSortedArrays([2], []) === 2);
console.log(findMedianSortedArrays([], [2, 3]) === 2.5);
console.log(findMedianSortedArrays([1, 7, 10, 20], [2, 5, 7, 9, 30]) === 7);
console.log(findMedianSortedArrays([1, 2, 2], [1, 2, 3]) === 2);

// @lc code=end
