[首页](../readme.md)

> 定义局部配置
```ts
export interface Config {
  Host?: string;
  Port?: number;
}
```
> [引用配置](../src/conf/index.ts)
```ts
import http = require("lib/net/http/server")

export interface Config {
  HTTP: http.Config;
}
```

> 配置文件定义配置
```toml
[HTTP]
Host="localhost"
Port=80
```
