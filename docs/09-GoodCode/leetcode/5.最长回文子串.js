/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start

// 动态规划
// 时间复杂度：O(n^2) 空间复杂度：O(n^2)
// var longestPalindrome = function (s) {
//   if (s.length < 2) {
//     return s;
//   }

//   let index1 = 0;
//   let maxLength = 0;

//   const dp = new Map();
//   function isPalindrome(source, start, end) {
//     const key = `${start}-${end}`;
//     if (start === end) {
//       return true;
//     } else if (end - start < 3) {
//       return source[start] === source[end];
//     } else if (source[start] !== source[end]) {
//       return false;
//     } else if (dp.has(key)) {
//       return dp.get(key);
//     }
//     const result = isPalindrome(source, start + 1, end - 1);
//     dp.set(key, result);
//     return result;
//   }

//   for (let start = index1; start < s.length - 1; start++) {
//     for (let end = s.length; end > start; end--) {
//       if (end - start > maxLength) {
//         if (isPalindrome(s, start, end)) {
//           index1 = start;
//           maxLength = end - start;
//         }
//       }
//     }
//   }

//   return s.substring(index1, index1 + maxLength + 1);
// };

// 中心扩散法
// 时间复杂度：O(n^2)) 空间复杂度：O(1)
var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }
  let start = 0;
  let maxLength = 0;
  const size = s.length;

  function getMaxLength(left, right) {
    right = right || left;
    let length = 0;
    while (left >= 0 && right < size) {
      if (s[left] !== s[right]) {
        break;
      }
      length = right - left + 1;
      left--;
      right++;
    }
    return length;
  }

  let current = 0;
  while (current < size) {
    let oddLength = getMaxLength(current, current);
    let evenLength = getMaxLength(current, current + 1);
    const max = Math.max(oddLength, evenLength);
    if (max > maxLength) {
      maxLength = max;
      if (oddLength > evenLength) {
        start = current - (max - 1) / 2;
      } else {
        start = current - (max - 2) / 2;
      }
    }
    current++;
  }

  return s.substring(start, start + maxLength);
};
// @lc code=end

console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbbd"));
console.log(longestPalindrome("a"));
console.log(longestPalindrome("ac"));
console.log(longestPalindrome("aacabdkacaa"));
console.log(longestPalindrome("ccc"));

console.log(
  longestPalindrome(
    "civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth"
  )
);
