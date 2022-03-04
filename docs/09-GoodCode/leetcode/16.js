// 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

// 返回这三个数的和。

// 假定每组输入只存在恰好一个解。

// 思路类似15题，指针移动条件，判断当前三数字之和是否大于target，如果大于则右指针左移，反之亦然

var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => {
    return a - b;
  });
  let result = nums[0] + nums[1] + nums[2];
  let gap = getGap(result, target);

  for (let firstIndex = 0; firstIndex < nums.length - 2; firstIndex++) {
    const firstNumber = nums[firstIndex];

    let secondIndex = firstIndex + 1;
    let thirdIndex = nums.length - 1;

    while (thirdIndex > secondIndex) {
      const secondNumber = nums[secondIndex];
      const thirdNumber = nums[thirdIndex];
      const newSum = firstNumber + secondNumber + thirdNumber;
      const newGap = getGap(newSum, target);
      if (newGap < gap) {
        result = newSum;
        gap = newGap;
      }
      if (newSum > target) {
        thirdIndex--;
      } else {
        secondIndex++;
      }
    }
  }
  return result;
};

function getGap(a, b) {
  if (a < 0 && b < 0) {
    return Math.abs(a > b ? b - a : a - b);
  }
  return Math.abs(a - b);
}

console.log(threeSumClosest([-1, 2, 1, -4], 1) === 2);
console.log(threeSumClosest([0, 0, 0], 1) === 0);
