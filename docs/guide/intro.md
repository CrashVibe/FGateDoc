# FlowGate 门基流动

> 跨平台游戏聊天桥接解决方案

![项目展示](/FGate-Show.png)

## 一句话简介

FlowGate 是一个用于 **Minecraft 服务器 ↔ 外部聊天平台** 的桥接方案：

- **FGATE Nexus** 充当跨平台的可视化网关与管理后台，负责适配外部聊天（如 OneBot/QQ）、账号绑定、消息与事件的中枢同步。 ([GitHub][1])
- **FGATE Client** 是运行在 **Bukkit** 系列服务端上的插件，用于与 Nexus 建立连接，转发游戏内聊天与事件，实现双向桥接。 ([GitHub][2])

## 体系结构与角色分工

- **Nexus（网关/控制台）**
  - 技术栈：Nuxt 4 + TypeScript + Naïve UI + Koishi；跨平台可用（Windows/Linux/macOS）。以深色主题为主。
  - 功能中枢：多服务器与多聊天适配器的统一管理；提供用户认证（密码、2FA）、账号绑定/解绑、消息与事件同步、远程命令执行等能力。
  - 适配层：当前仅支持 OneBot/QQ，后续可扩展更多适配器。

- **Client（插件/模组）**
  - 位置：部署在目标 Minecraft 服务器上。
  - 职责：与 Nexus 建立简化连接，将服务端聊天/事件上送 Nexus，并接收外部平台的消息回灌到游戏内。

## 工作原理

1. 在服务器上安装 **FGATE Client** 插件并指向你的 **Nexus** 实例（网关）。
2. **Nexus** 通过聊天适配器（如 OneBot/QQ）与外部平台连接；它维护账号绑定、鉴权与多源路由。
3. 游戏内消息/事件 → Client → Nexus → 外部聊天平台；反向亦然。

## 关键功能清单

- **多服务器/多聊天适配器管理**：集中化配置与路由。
- **用户认证与安全**：支持密码与 2FA 登录（Nexus 侧）。
- **账号绑定/解绑**：打通玩家账号与外部平台身份。
- **服务器事件通知 & 远程命令**：从 Nexus 统一触发与下发。
- **消息同步**：游戏内外双向桥接。

## 隐私与安全

- **不上传或收集用户数据**，数据在本地服务器处理；若未来接入第三方服务/API，会提前告知并提供配置项。

[1]: https://github.com/CrashVibe/FGateNexus "GitHub - CrashVibe/FGateNexus: 跨平台的 Minecraft 服务器聊天桥接工具"
[2]: https://github.com/CrashVibe/FGateClient "GitHub - CrashVibe/FGateClient"
