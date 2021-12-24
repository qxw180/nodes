// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

const map = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};

var letterCombinations = function (digits) {
  let result = [];
  if (digits === "") {
    return result;
  }

  result = Array.from(map[digits[0]]);

  let temp = [];
  for (let digitIndex = 1; digitIndex < digits.length; digitIndex++) {
    const digit = digits[digitIndex];
    const chars = map[digit];
    for (let charIndex = 0; charIndex < chars.length; charIndex++) {
      const char = chars[charIndex];
      for (let resultIndex = 0; resultIndex < result.length; resultIndex++) {
        const element = result[resultIndex];
        temp.push(`${element}${char}`);
      }
    }
    result = temp;
    temp = [];
  }

  return result;
};

console.log(letterCombinations("23"));
