---
outline: deep
---

# 开始

## 概述

本页面旨在介绍FGate API接口，为最新版本的FGate进行介绍。

## 节点通讯

### 通用部分

我们的设计分为几个部分：

1. **响应**（服务端->客户端或客户端->服务端）

    ```json
    {
        "jsonrpc": "2.0",
        "id":101, 
        "result":{
            "status":"string",
            "message":"string",
            "code":0,
            }
    }
    ```

    说明

    | 字段名(.表示节点) | 类型 | 说明 |
    | ------ | ---- | ---- |
    | jsonrpc | string | 固定值，表示jsonrpc版本号，我们不支持1.0，仅支持2.0 |
    | id | int | 响应id |
    | result | object | 结果（一定实现了`status`字段与`message`字段） |
    | result.status | string | 状态（分为`success`、`error`） |
    | result.message | string | 信息 |
    | result.code | int | 错误码（如果状态为`error`，则一定有code字段） |

2. **请求**（客户端->服务器）

    ```json
    {   
        "jsonrpc": "2.0",
        "id":101, 
        "method":"string", 
        "params":{}
    }
    ```

    说明

    | 字段 | 类型 | 说明 |
    |:----|:----|:----|
    | jsonrpc | string | 版本号，如上文 |
    | id | int | 请求ID，结果返回时的标识 |
    | method | string | 请求方法 |
    | params | object | 请求参数 |

3. **服务器通知性消息**（无id）
服务端可随时向插件发送无 id 的通知消息，其他字段参考前文描述。例如，当后端更新了白名单或有其他事件时，发送通知：

```json
{
    "jsonrpc": "2.0",
    "method":"whitelist.updated", 
    "params":{
        "playerName":"Steve",
        "action":"added"
        }
}
```

此处`whitelist.updated`表示事件类型，`params`中说明发生了什么变化。客户端收到后可以更新本
地状态或 UI。[按照 JSON-RPC 规范](https://www.jsonrpc.org/specification)，无`id`的消息无需客户端回复 。

---

### 节点连接

对于MCServer侧的插件（即FGate Client），管理面板（即FGate Nexus），我们采取从Client to Server的**正向WebSocket**进行通讯。

当您连接到服务器时，您需要在请求头加入Authorization字段，值为Bearer {您从Server创建的Token（节点Token与Nexus的API Token不同）}。

```json
{"Authorization":"Bearer <your token>"}
```

当您成功与Server建立连接时，您会收到一个**欢迎消息**（ServerHelloPacket）。

```json
{
    "id":101, 
    "result":{
        "status":"success",
        "message":"验证成功，欢迎[SessionID]",
        "protocol_version":1 
    }  
}
```

字段说明

|字段(.表示节点)|类型|描述|
|:---|:---|:---|
|id|int|响应ID,用于区分请求|
|result|object|结果对象|
|result.status|string|结果状态|
|result.message|string|结果信息|
|result.protocol_version|int|协议版本|
