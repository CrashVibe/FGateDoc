# 安装文档

## 一、安装 FGATE **Nexus**（服务端/枢纽）

### 1) 获取发布包

前往 **Releases** 下载与你平台匹配的文件 <VersionDisplay repo="nexus" show-date />。

- Linux:<VersionFilename repo="nexus" template="FGateNexus-{version}-linux-x64.tar.gz" /> / <VersionFilename repo="nexus" template="FGateNexus-{version}-linux-arm64.tar.gz" />
- macOS:<VersionFilename repo="nexus" template="FGateNexus-{version}-mac-x64.tar.gz" /> / <VersionFilename repo="nexus" template="FGateNexus-{version}-mac-arm64.tar.gz" />
- Windows:<VersionFilename repo="nexus" template="FGateNexus-{version}-win.zip" />

### 2) 解压与首次运行

**Linux（以 x64 为例）：**

```bash
# 1) 解压
mkdir -p FGateNexus
tar -xzf FGateNexus-v*.*.*-linux-x64.tar.gz -C /FGateNexus
cd FGateNexus

# 2) 赋权并运行
chmod +x ./FGateNexus-linux-x64
./FGateNexus-linux-x64
```

**macOS：**

```bash
# 1) 解压
mkdir -p FGateNexus
tar -xzf  FGateNexus-v*.*.*-mac-x64.tar.gz -C /FGateNexus
cd FGateNexus

# 2) 赋权并运行
chmod +x ./FGateNexus-mac-x64
./FGateNexus-mac-x64
```

**Windows：**

1. 解压 `FGateNexus-v*.*.*-win.zip` 到任意目录。
2. 进入目录后双击 `FGateNexus-win-x64.exe` 启动。

**首次启动后**：

- 项目结构

```console
/FGateNexus
  |-- FGateNexus-xx-xx             # 可执行文件（Linux）
  |-- migrations                   # 数据库迁移脚本
  |-- config/                      # 配置文件目录
  |-- sqlite.db                    # 数据库文件
```

:::info
一般情况下更新只需覆盖 `可执行文件` 和 `migrations/` 即可，其它文件跟随数据保留。<br>
由于技术问题，不建议降级使用旧版本。这会导致数据库不兼容，总之我没试过，也不建议你尝试（
:::

- 按照对应平台打开方式打开可执行文件。
- 控制台会打印监听地址与端口（用于打开 Web 控制台）。

```log
Listening on http://127.0.0.1:3000/...
[I] server server listening at http://127.0.0.1:5140
```

`Listening on http://xxx` 是 **Web 控制台** 和 **与插件连接** 的地址<br>
`[I] server server listening at http://xxx` 是关于适配器的连接地址。

- 使用浏览器访问日志中提示的 **Web 控制台** 进入管理界面。

### 3) 为 Client 准备凭据（令牌）

进入 Nexus 的 Web 控制台，按界面指引“创建服务器”，设置名称与生产令牌（用于插件连接）。

## 二、安装 FGATE **Client** （插件/模组）

### 1) 获取插件包

到 **Releases** 下载 <VersionDisplay repo="client" show-date /> 的构建产物（Jar）。

### 2) 安装到服务器

这不能让我教你吧？你不能是个婴儿吧？

### 3) 配置插件并连接 Nexus

就配置，填入你的 连接地址 和 认证令牌，其它请根据注释自行调整。两边配置完成后，重启服务器，插件会尝试连接 Nexus 并正常工作。

## 三、升级与回滚

- **Nexus**：
   1. 停止当前运行的 Nexus 实例。
   2. 备份 `config/` 目录与 `sqlite.db` 文件。
   3. 解压新/旧版本包，覆盖旧文件（保留 `config/` 和 `sqlite.db`）。
   4. 启动新/旧实例，检查日志确认无误。

- **Client**：将新/旧版本 Jar 替换原 Jar，重启服务器即可。
