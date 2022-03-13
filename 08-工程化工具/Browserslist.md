# [BrowsersList](https://github.com/browserslist/browserslist)

在不同的前端工具中分享运行环境版本配置

`.browserslistr`

```text
defaults
not IE 11
maintained node versions
```

## Query List

- `defaults`：`> 0.5%, last 2 versions, Firefox ESR, not dead`
- 根据使用情况
  - `> 5%`：按使全球用率，可以使用`>`、`>=`、`<`、`<=`
  - `> 5% in US`：按地区使用率
- 按版本
  - `last 2 versions`
  - `last 2 Chrome versions`
- `dead`：官方 24 个月未更新
- NodeJS 版本
  - `node 10`：范围`node 10.x.x`
  - `node 10.4`：范围`node 10.4.x`
  - `current node`
  - `maintained node versions`：当前维护的所有版本
- 浏览器版本
  - `iOS 7`：明确指定
  - 版本指定
    - `Firefox > 20`：
    - `ie 6-8`
    - `Firefox ESR`
  - ``

## Query Composition
