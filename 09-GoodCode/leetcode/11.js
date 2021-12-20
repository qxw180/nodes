// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 说明：你不能倾斜容器。

// 标签：双指针、贪心算法
// 思路：
//   面积由宽度和最小高度两个变量决定，使用双指针分别指向首尾，即从最大宽度开始。
//   两个指针指向数组较小的一方进行移动以获得更大的高度，判读更大的高度是否会产生更大的面积。
// 时间复杂度：只需要执行一次数组扫描，结果为O(n)
// 空间复杂度：只需要使用恒定空间，结果为O(1)

var maxArea = function (height) {
  var start = 0,
    end = height.length - 1;
  var result = 0;
  while (start < end) {
    const startHeight = height[start];
    const endHeight = height[end];
    let area = Math.min(startHeight, endHeight) * (end - start);
    result = Math.max(result, area);
    if (startHeight > endHeight) {
      end--;
    } else {
      start++;
    }
  }
  return result;
};

console.log(maxArea([1, 1]) === 1);
console.log(maxArea([1, 2, 1]) === 2);
console.log(maxArea([4, 3, 2, 1, 4]) === 16);
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) === 49);
console.log(maxArea([2, 3, 4, 5, 18, 17, 6]) === 17);
