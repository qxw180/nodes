// 给你一个字符串 s，找到 s 中最长的回文子串。

// 字符首次出现到最后一次出现，最长字符串
// var longestPalindrome = function (s) {
//   if (s.length === 1) {
//     return s;
//   }
//   var result = "";
//   var maxLength = 0;

//   var startIndex = 0;
//   var sourceLength = s.length;

//   var lastIndexMap = new Map();
//   var mapIndex = sourceLength - 1;

//   function getCharEndIndex(char) {
//     if (lastIndexMap.has(char)) {
//       return lastIndexMap.get(char);
//     } else {
//       while (mapIndex >= 0) {
//         var tempChar = s[mapIndex];
//         if (!lastIndexMap.has(tempChar)) {
//           lastIndexMap.set(tempChar, mapIndex);
//         }
//         if (char === tempChar) {
//           return mapIndex;
//         }
//         mapIndex--;
//       }
//     }
//     return -1;
//   }

//   while (sourceLength - startIndex > maxLength) {
//     var startChar = s[startIndex];
//     var endIndex = getCharEndIndex(startChar);
//     if (endIndex >= startIndex) {
//       var length = endIndex - startIndex + 1;
//       if (length > maxLength) {
//         result = s.slice(startIndex, endIndex + 1);
//         maxLength = length;
//       }
//     }
//     startIndex++;
//   }
//   return result;
// };

// 字符首次出现到下一次出现最长字符串
// var longestPalindrome = function (s) {
//   var sourceLength = s.length;

//   var startIndex = 0;
//   var startChar = s[startIndex];

//   var maxLength = 1;
//   var result = startChar;

//   var endIndex = startIndex + 1;

//   var tempString = result;

//   while (sourceLength - startIndex > maxLength) {
//     var endChar = s[endIndex];
//     tempString += endChar;
//     endIndex++;
//     if (startChar === endChar) {
//       if (tempString.length > maxLength) {
//         result = tempString;
//         maxLength = tempString.length;
//       }
//       startIndex++;
//       tempString = startChar = s[startIndex];
//       endIndex = startIndex + 1;
//     } else if (endIndex >= sourceLength - 1) {
//       startIndex++;
//       tempString = startChar = s[startIndex];
//       endIndex = startIndex + 1;
//     }
//   }
//   return result;
// };

// 字符首次出现到最会一次出现，且中间不含其它重复字符
// var longestPalindrome = function (s) {
//   var sourceLength = s.length;

//   var startIndex = 0;
//   var startChar = s[startIndex];

//   var result = s[startIndex];
//   var maxLength = result.length;

//   var endIndex = startIndex + 1;

//   var tempMap = new Map();
//   var tempResult = result;

//   while (maxLength < sourceLength - startIndex) {
//     var tempChar = s[endIndex];
//     if (startChar === tempChar) {
//       tempResult += tempChar;
//       if (tempMap.size === 0) {
//         if (endIndex === sourceLength - 1 && tempResult.length > maxLength) {
//           return tempResult;
//         }
//         endIndex++;
//       } else {
//         if (tempResult.length > maxLength) {
//           result = tempResult;
//           maxLength = tempResult.length;

//           startIndex = endIndex + 1;
//           startChar = s[startIndex];
//           endIndex = startIndex + 1;
//           tempMap.clear();
//           tempResult = startChar;
//         }
//       }
//     } else {
//       if (tempMap.size === 0 && tempResult.length > 1) {
//         if (tempResult.length > maxLength) {
//           result = tempResult;
//           maxLength = tempResult.length;

//           startIndex = endIndex;
//           startChar = s[startIndex];
//           endIndex = startIndex + 1;
//           tempMap.clear();
//           tempResult = startChar;
//         }
//       } else if (!tempMap.has(tempChar)) {
//         tempMap.set(tempChar, endIndex);
//         tempResult += tempChar;
//         endIndex++;
//       } else {
//         startIndex = tempMap.get(tempChar);
//         startChar = s[startIndex];
//         endIndex = startIndex + 1;
//         tempMap.clear();
//         tempResult = startChar;
//       }
//     }
//   }
//   return result;
// };

var longestPalindrome = function (s) {
  if (s.length === 1) {
    return s;
  }

  var result = s[0];
  var maxLength = 1;

  var start = 0;

  while (maxLength < s.length - start) {
    var e2eEqualArray = getE2EEqualString(s, start);
    if (e2eEqualArray.length > 0) {
      for (let index = 0; index < e2eEqualArray.length; index++) {
        const str = e2eEqualArray[index];
        if (str.length > maxLength && isPalindrome(str)) {
          result = str;
          maxLength = str.length;
          break;
        }
      }
    }
    start++;
  }
  return result;
};

function getE2EEqualString(source, start) {
  const result = [];
  start = start || 0;
  var end = source.length;
  while (end > start) {
    if (source[start] === source[end]) {
      result.push(source.slice(start, end + 1));
    }
    end--;
  }
  return result;
}

function isPalindrome(source) {
  if (source.length === 1) {
    return true;
  }
  var start = 0;
  var end = source.length - 1;
  while (end > start) {
    if (source[start] !== source[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

// console.log(getE2EEqualString("abacada"));
// console.log(isPalindrome("a") === true);
// console.log(isPalindrome("ab") === false);
// console.log(isPalindrome("aba") === true);
// console.log(isPalindrome("abba") === true);
// console.log(isPalindrome("abadba") === false);

console.log(longestPalindrome("babad") === "bab");
console.log(longestPalindrome("cbbd") === "bb");
console.log(longestPalindrome("a") === "a");
console.log(longestPalindrome("ac") === "a");
console.log(longestPalindrome("aacabdkacaa") === "aca");
console.log(longestPalindrome("ccc") === "ccc");
