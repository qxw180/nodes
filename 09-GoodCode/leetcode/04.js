// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
// 算法的时间复杂度应该为 O(log (m+n)) 。

// 思路1：单次循环剔除数组中的最大和最小值，直至清空一个数组或剩余总长度小于等于2，计算剩余元素的中位数
// 思路2：合并数组并排序，然后计算中位数

var findMedianSortedArrays = function (nums1, nums2) {
  var start1 = 0;
  var end1 = nums1.length - 1;
  var start2 = 0;
  var end2 = nums2.length - 1;
  var tempNums1Length = nums1.length;
  var tempNums2Length = nums2.length;
  while (
    tempNums1Length > 0 &&
    tempNums2Length > 0 &&
    tempNums1Length + tempNums2Length > 2
  ) {
    var v1head = nums1[start1];
    var v1end = nums1[end1];
    var v2head = nums2[start2];
    var v2end = nums2[end2];
    if (v1head < v2head) {
      start1++;
      tempNums1Length--;
    } else {
      start2++;
      tempNums2Length--;
    }
    if (v1end > v2end) {
      tempNums1Length--;
      end1--;
    } else {
      tempNums2Length--;
      end2--;
    }
  }

  function getMiddleNumber(start, end, arr) {
    const total = start + end;
    if (total % 2 === 0) {
      return arr[(start + end) / 2];
    } else {
      var middleIndex = total / 2;
      return (arr[middleIndex - 0.5] + arr[middleIndex + 0.5]) / 2;
    }
  }

  if (tempNums1Length === 0) {
    return getMiddleNumber(start2, end2, nums2);
  } else if (tempNums2Length === 0) {
    return getMiddleNumber(start1, end1, nums1);
  } else {
    return (nums1[start1] + nums2[start2]) / 2;
  }
};
// console.log(findMedianSortedArrays([1, 4, 8], [2, 3, 9]) === 3.5);
// console.log(findMedianSortedArrays([2, 3], []) === 2.5);
// console.log(findMedianSortedArrays([1, 3], [2]) === 2);
// console.log(findMedianSortedArrays([1, 3], [2, 4]) === 2.5);
// console.log(findMedianSortedArrays([0, 0], [0, 0]) === 0);
// console.log(findMedianSortedArrays([], [1]) === 1);
// console.log(findMedianSortedArrays([2], []) === 2);
// console.log(findMedianSortedArrays([], [2, 3]) === 2.5);
// console.log(findMedianSortedArrays([1, 7, 10, 20], [2, 5, 7, 9, 30]) === 7);
console.log(findMedianSortedArrays([1, 2, 2], [1, 2, 3]) === 2);
