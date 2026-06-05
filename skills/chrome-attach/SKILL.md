---
name: chrome-attach
description: "让 AI 通过 MCP 连接用户真实 Chrome，而不是启动无头浏览器。适用于需要复用登录态、真实浏览器指纹、DevTools Network/DOM/截图能力的场景，例如小红书、抖音、微博、B站、知乎、飞书、Notion、内部后台等。推荐使用独立 Chrome profile + remote debugging port，降低风控和安全风险。"
metadata:
  version: 1.1.0
---

# Chrome Attach

让 AI 连接一个真实 Chrome 实例，通过 Chrome DevTools Protocol 操作页面、读取 DOM、观察 Network、截图和提取资源。

## 职责边界

本 skill 是浏览器底座，不负责业务判断。

- 负责：启动/连接真实 Chrome、登录态复用、DOM 读取、Network 观察、页面操作、图片/媒体 URL 枚举、截图。
- 不负责：小红书竞品判断、证据等级、图集完整性、评论痛点、竞品文档写作。这些交给 `xhs-competitor-research`。

## 推荐模式：独立 Chrome Profile

不要默认把日常 Chrome 长期开启调试端口。推荐开一个专门给 AI 用的 Chrome profile。

Windows 推荐命令：

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="C:\chrome-ai-profile"
```

也可以换端口：

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9223 `
  --user-data-dir="C:\chrome-ai-profile"
```

为什么要独立 profile：

- Chrome 136+ 可能禁止在默认 profile 上开启 `--remote-debugging-port`，参数看似存在但端口不开。
- 独立 profile 可以单独保存小红书/飞书/Notion 等登录态。
- 不和日常 Chrome 抢窗口、抢焦点。
- 降低 cookie、密码、日常浏览数据暴露风险。

## Profile 和 Cookie

### 1. AI 能不能自己打开这个 Chrome？

可以，但需要用户允许执行启动命令。

启动后，MCP 通过：

```text
http://127.0.0.1:9222
```

连接这个 Chrome。AI 可以新开标签、访问网页、点击、截图、读 DOM、看 Network。

如果当前 Codex/工具环境没有权限启动 GUI 程序，就需要用户手动点快捷方式打开。打开一次后，AI 只要能连上端口即可。

### 2. 独立 profile 怎么保存 cookie？

`--user-data-dir="C:\chrome-ai-profile"` 指定了一个独立浏览器数据目录。这个目录会保存：

- cookie
- localStorage / IndexedDB
- 登录 session
- 扩展配置
- 浏览器设置

第一次打开这个 profile 时，它是空的。用户需要在这个窗口里正常登录小红书、飞书、Notion 等。登录成功后，cookie 会长期保存在 `C:\chrome-ai-profile`，下次用同一个命令打开会自动复用。

### 3. 能不能直接复用现有日常 Chrome 的 cookie？

不建议，也通常不可靠。

原因：

- Chrome cookie 受系统账号、浏览器 profile、加密密钥保护，直接复制经常不可用。
- 复制整个默认 profile 容易破坏数据或造成 Chrome profile lock 冲突。
- 直接连接日常 profile 暴露面更大，AI 可访问更多私人登录态。

可选方案：

- 推荐：独立 profile 中重新登录目标站点一次。
- 临时：在确认安全风险后，连接日常 Chrome profile，但不要长期保持调试端口。
- 不推荐：手工复制 cookie 数据库。

## MCP 配置

Claude Code / Codex 类 MCP 配置示例：

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest",
        "--browser-url=http://127.0.0.1:9222"
      ],
      "env": {}
    }
  }
}
```

如果用 9223 端口，把 URL 改成：

```text
http://127.0.0.1:9223
```

## 验证连接

Chrome 启动后，验证端口：

```powershell
Invoke-RestMethod http://127.0.0.1:9222/json/version
```

成功时会返回浏览器版本、WebSocket 地址等信息。

如果失败：

- 确认 Chrome 是用带参数的命令启动的。
- 确认 `--user-data-dir` 不是默认目录。
- 确认端口和 MCP 配置一致。
- 确认没有被安全软件拦截。

## 使用流程

1. `list_pages`：确认 MCP 看到当前 Chrome 标签页。
2. `new_page` 或 `navigate_page`：打开目标页面。
3. `take_snapshot`：读取可访问文本结构。
4. `evaluate_script`：抽 DOM、图片 URL、页面状态。
5. `list_network_requests`：观察接口、图片、视频、媒体请求。
6. `take_screenshot`：只在需要页面上下文或视频画面时使用。
7. 对高价值图片资源，可下载原图到项目证据目录后用视觉工具读取。

## 访问稳定性

对小红书、抖音、微博等风控站点：

- 优先从站内搜索页进入详情页。
- 少量、慢速、交互式操作。
- 不连续硬跳大量详情页 URL。
- 不在预筛前批量下载媒体。
- 出现验证/扫码提示时停止批量操作，让用户手动确认登录态。

这只能降低风控概率，不能保证绕过平台限制。

## 媒体资源提取

通用顺序：

1. 先读取 DOM 和页面状态，判断内容是否高价值。
2. 通过滚动、翻页、轮播 next 触发懒加载。
3. 枚举 `document.images`、`currentSrc/src`、视频标签和 Network 请求。
4. 只下载高价值证据需要的资源。
5. 下载图片时带 `Referer` 和浏览器 User-Agent。

图片可以作为研究证据长期保存在项目目录。视频默认不长期保存；如需 ASR/OCR，只做临时处理。

## 小红书专项

小红书竞品调研优先调用 `xhs-competitor-research`。本 skill 只提供底层能力。

小红书常见技术点：

- 搜索结果进入比直接硬跳详情 URL 更稳定。
- 详情 URL 常需要 `xsec_token`。
- 图文轮播常懒加载，需要翻图后才能枚举完整图片。
- 原图通常来自 `rednotecdn.com` 或 `sns-webpic-qc`。
- 头像、推荐流封面、UI 装饰图不要当作笔记图集。
- 视频可能出现 `blob:` 或短时 `mp4`/`m3u8` 请求；没有实际 ASR/OCR 不要声称提取全文。

## 安全注意

`--remote-debugging-port` 暴露 CDP，本机能访问该端口的进程可以控制 Chrome，包括读取页面内容、执行 JS、访问已登录站点。

安全建议：

- 只绑定本机 `127.0.0.1`。
- 不要映射到公网。
- 优先使用独立 profile。
- 不用时关闭该 Chrome 实例。
- 共享电脑慎用。

## 不适用场景

- 大规模批量抓取。
- 无人值守服务器部署。
- 需要稳定平台签名逆向的 API 采集。
- 需要规避平台明确禁止的访问限制。

这些场景应使用专门的合规 API、授权数据源或更合适的采集架构。
