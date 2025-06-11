
# FGate Nexus 部署与开发指南

## 🚀 快速开始

### 系统要求

- **环境**：
  - `Node.js` 18+
  - `Bun`（推荐）或 npm/yarn
- **运行环境**：
  - `Linux`🐧: x86_64/arm64 架构
  - `macOS`🍎: x86_64/arm64 架构（Intel 或 Apple Silicon with Rosetta）
  - `Windows`🚜: x86_64 架构

### 本地运行

1. **克隆项目**：

   ```bash
   git clone https://github.com/CrashVibe/FGATE-Nexus/
   cd FGATE-Nexus
   ```

2. **安装依赖**：

   ```bash
   bun install
   ```

3. **启动开发服务器**：

   ```bash
   bun --bun dev  # 推荐使用 Bun 运行时确保最佳兼容性
   # 或使用标准方式
   bun run dev
   ```

4. **访问应用**：
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

---

## 📦 构建与分发

### 构建命令

```bash
# 构建应用（当前平台）
bun run build

# 平台特定构建
bun run build:mac    # macOS
bun run build:linux  # Linux
bun run build:win    # Windows

# 全平台构建
bun run build:all
```

### 运行二进制文件

构建完成后，在 `dist/` 目录中执行：

```bash
# Windows
./FGate-Nexus-win.exe

# macOS
./FGate-Nexus-mac

# Linux
./FGate-Nexus-linux
```

---

## 🎯 核心功能

### 🎮 游戏服务器管理

- **实时监控**：服务器状态与性能追踪
- **玩家管理**：在线玩家信息查看与统计
- **动态配置**：可视化服务器参数调整
- **WebSocket 通信**：双向实时数据传输

### 🤖 OneBot 适配器

- **多平台支持**：兼容各类聊天平台的 OneBot 协议
- **动态管理**：适配器的添加/配置/启停
- **消息处理**：实时消息接收与响应
- **安全认证**：Access Token 访问控制

### 📊 数据管理

- **SQLite 数据库**：轻量级本地存储方案
- **Drizzle ORM**：类型安全的数据库操作
- **自动迁移**：无缝数据库结构更新

---

## 📁 项目结构

```text
FGATE-Nexus/
├── server/             # 服务端核心
│   ├── api/            # API 路由
│   ├── database/       # 数据库配置
│   │   └── schema      # 数据模型定义
│   ├── handlers/       # 业务逻辑处理
│   ├── plugins/        # 服务器插件
│   └── utils/          # 工具库
│       ├── adapters/   # 适配器管理
│       └── client/     # 客户端连接管理
├── components/         # UI组件库
│   ├── Card/           # 服务器/适配器卡片
│   └── Config/         # 配置组件
├── pages/              # 路由页面
│   ├── adapters/       # 适配器管理
│   └── servers/        # 服务器管理
├── composables/        # Vue 组合函数
├── assets/             # 静态资源
├── migrations/         # 数据库迁移文件
└── ...                 # 其他配置文件
```

---

## 🔧 开发指南

### 数据库操作

```bash
# 生成迁移文件
bun run db:generate

# 执行数据库迁移
bun run db:migrate
```

### 代码质量

```bash
# 代码规范检查
bun run lint

# 自动代码格式化
bun run format
```

### 开发提示
>
> **重要提示**：使用 `bun --bun dev` 命令可确保最佳兼容性，避免 Bun 特定功能的兼容问题
