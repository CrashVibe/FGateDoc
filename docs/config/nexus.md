# FGateNexus 配置文件

配置文件位于 `config/appsettings.json`

## 配置文件

```json
{
    "koishi": {
        "host": "127.0.0.1",
        "port": 5140
    },
    "nitro": {
        "host": "127.0.0.1",
        "port": 3000
    }
}
```

## 说明

| 字段        | 说明                                  |
| ----------- | ------------------------------------- |
| koishi.host | Koishi 服务监听地址                   |
| koishi.port | Koishi 服务监听端口                   |
| nitro.host  | Nitro 服务监听地址(Client 连接的地址) |
| nitro.port  | Nitro 服务监听端口(Client 连接的端口) |
