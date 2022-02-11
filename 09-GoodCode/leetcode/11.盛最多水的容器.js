/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  const size = height.length;

  let start = 0;
  let end = size - 1;
  let max = 0;

  while (end > start) {
    const h1 = height[start];
    const h2 = height[end];
    const area = (end - start) * Math.min(h1, h2);
    max = Math.max(area, max);
    if (h1 > h2) {
      end--;
    } else {
      start++;
    }
  }
  return max;
};
// @lc code=end

// 思路：双指针、贪心算法
// 步骤一. 设置两个指针，分别指向首尾位置、计算面积、将计算的结果和之前最大值比较，如果较大则替换
// 步骤二：判断首尾元素的大小，移动较小的元素位置(只有改变高度较小的元素才可能获得更大的面积)，然后按步骤一逻辑计算
// 步骤三：重复步骤二，直到首尾重叠结束

// 时间复杂度：O(n)，只需要进行一次迭代
// 空间复杂度：O(1)
