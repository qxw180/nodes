/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// 字符串截取耗时较高，计算时只记录最长子串的起始坐标，最后返回时截取

// @lc code=start

// 动态规划：从一个较小规模的问题求解，逐渐得到较大问题的结果的过程，并且在这个过程中记录每一步的结果
// 是否为回文字符转可以的状态转移方程为：dp[start][end] = s[start] === s[end] && (end - start < 3 || dp[start + 1][end - 1])
// 时间复杂度：O(n^2) n为字符串长度
// 空间复杂度：O(n^2)

// var longestPalindrome = function (s) {
//   const length = s.length;
//   if (length < 2) {
//     return s;
//   }

//   let begin = 0;
//   let maxLength = 1;

//   // 初始化
//   const dp = [];
//   for (let i = 0; i < length; i++) {
//     dp[i] = [];
//     dp[i][i] = true;
//   }

//   // 逐列求解，从最小长度递增扩大问题规模
//   for (let end = 1; end < length; end++) {
//     for (let start = end - 1; start >= 0; start--) {
//       let isPalindrome = false;
//       if (s[start] === s[end]) {
//         if (end - start < 3) {
//           isPalindrome = true;
//         } else {
//           isPalindrome = dp[start + 1][end - 1];
//         }
//       }
//       dp[start][end] = isPalindrome;
//       const curLength = end - start + 1;
//       if (isPalindrome && curLength > maxLength) {
//         maxLength = curLength;
//         begin = start;
//       }
//     }
//   }

//   return s.substring(begin, begin + maxLength);
// };

// 中心扩散法
// 从0开始遍历，以下标n和n+1作为中心向两边扩散求得最大回文长度
// 时间复杂度：O(n^2)，需要遍历的中心个数为 2 * (n - 1)，每个中心回文验证为 n / 2
// 空间复杂度：O(1)

var longestPalindrome = function (s) {
  const length = s.length;
  if (length < 2) {
    return s;
  }

  let begin = 0;
  let maxLength = 1;

  function getMaxLength(left, right) {
    while (left >= 0 && right < length) {
      if (s[left] === s[right]) {
        left--;
        right++;
      } else {
        break;
      }
    }
    return right - left - 1;
  }

  for (let index = 0; index < length - 1; index++) {
    let oddLength = getMaxLength(index, index);
    let evenLength = getMaxLength(index, index + 1);
    const max = Math.max(oddLength, evenLength);
    if (max > maxLength) {
      maxLength = max;
      if (oddLength > evenLength) {
        begin = index - (max - 1) / 2;
      } else {
        begin = index - (max - 2) / 2;
      }
    }
  }

  return s.substring(begin, begin + maxLength);
};
// @lc code=end

// console.log(longestPalindrome("babad"));
// console.log(longestPalindrome("cbbd"));
// console.log(longestPalindrome("a"));
// console.log(longestPalindrome("ac"));
// console.log(longestPalindrome("aacabdkacaa"));
// console.log(longestPalindrome("ccc"));

// console.log(
//   longestPalindrome(
//     "civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth"
//   )
// );
