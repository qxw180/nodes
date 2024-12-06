# FetchAPI

相对于 XMLHttpRequest 拥有更加优雅的 API 设计，Promise 编程模型；

```js
fetch("https://www.demo.com/api", {
  method: "POST",
  mode: "cors", // 请求模式，默认是 'cors'
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "jack", age: 26 }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```
