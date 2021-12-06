# 考核数据结构使用

## 数组的交集和差集

```JS
function getIntersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter((item) => {
    return set2.has(item);
  })
}

function getDifference(arr1, arr2) {
  const set1 = new Set(arr2);
  const set2 = new Set(arr2);
  return [...arr1, ...arr2].filter((item) => {
    return !set1.has(item) || !set2.has(item);
  })
}
```

## TODO:Set 合并、交集、差集

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set

## TODO:集合和链表的区别

## TODO:时间复杂度&空间复杂度
