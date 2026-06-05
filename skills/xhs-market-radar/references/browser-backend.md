---
title: 浏览器后端
last_verified: 2026-06-04
---

# 浏览器后端

本 skill 不内置浏览器后端，但支持可选真实浏览器后端。推荐把同仓库 `chrome-attach` 一起分发；用户可以选择是否安装它。没有真实浏览器后端时，只能做搜索预筛和外部补证，不能声称已完成小红书详情页证据抽取。

定位：本 skill 针对高风控、强登录态社媒页面的市场调研做了流程优化；安装真实浏览器后端时，可复用用户本地浏览器环境读取正文、评论、图片、截图和互动证据。

## 推荐后端

1. `chrome-attach`：默认后端。适合小红书、抖音、微博、知乎、飞书、Notion、内部后台等需要真实登录态和页面证据的场景。
2. Chrome DevTools MCP：如果用户已经配置 MCP，可以直接作为真实 Chrome 连接层。
3. `chrome-cdp-skill` 或其他 CDP CLI：适合作为外部替代后端。
4. `agent-browser`：适合作为标准化 CLI 后端，命令口径清晰。
5. `browser-use`：适合自动搜索和预筛，但最终证据仍需按本 skill 的模板复查。

使用 `chrome-attach` 时，必须遵循其底层边界：

- 读取 `../chrome-attach/SKILL.md`，先确认真实 Chrome、端口、profile 和安全边界。
- 通过用户已配置的 MCP 或 CDP 后端连接 `http://127.0.0.1:9222`。
- 需要能力覆盖 tabs/open/snapshot/eval/images/screenshot/network/cookies/storage/click/fill。
- 证据抽取和报告格式仍以本 skill 的 `xhs-extraction.md` 和 `report-template.md` 为准。
- 本仓库提供最小 `doctor` 和 `launch` 脚本用于降低上手成本；它们只检查和启动真实 Chrome，不改变本 skill 的证据规则。

## 打包建议

对外发布时，建议把 `chrome-attach` 作为同仓库可选 skill 一起分发：

```text
skills/
  xhs-market-radar/
  chrome-attach/
```

Agent 选择规则：

- 如果本地已安装 `chrome-attach`，优先用它连接真实 Chrome。
- 如果有 Chrome DevTools MCP，用 MCP 工具。
- 如果没有 `chrome-attach`，但有 browser-use、agent-browser 或其他 CDP/浏览器后端，则使用等价真实浏览器后端。
- 如果没有真实浏览器后端，只做候选清单、搜索预筛或外部补证。
- 不要因为浏览器后端不可用就编造小红书证据。

## 用户启动口径

对普通用户只暴露三步：

1. 打开专用 Chrome profile；Windows 可运行 `skills/chrome-attach/scripts/launch-chrome.ps1`。
2. 登录小红书。
3. 运行 `node skills/chrome-attach/scripts/doctor.mjs` 或让 Agent 确认浏览器后端已连接，再执行市场验证报告。

默认推荐安全模式：独立 profile，不直接使用日常 Chrome：

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="C:\chrome-ai-profile"
```

如果用户明确要求低学习成本或必须复用日常登录态，可使用快速模式连接日常浏览器；但必须提示风险，并尽量只操作 Agent 自己创建的 tab。

## 能力要求

后端至少需要：

| 能力 | 用途 |
|---|---|
| snapshot / DOM text | 读取标题、正文、作者、互动、评论 |
| click / type / scroll | 站内搜索、打开详情、翻图、展开评论 |
| eval | 枚举图片 URL、页面状态、可见文本 |
| network | 查图片、视频、媒体、接口线索 |
| screenshot | 保存页面上下文、关键帧、异常状态 |
| tabs/pages | 管理搜索页和详情页 |

## 风控访问策略

不要在本文件重复维护完整浏览器策略。执行时先读取 `skills/chrome-attach/SKILL.md`，再按本 skill 的小红书证据规则处理。

本 skill 只补充业务要求：

- 小红书主证据必须来自可复查页面、正文、评论、图片/截图或视频关键帧。
- 外部补证不能替代小红书参考数。
- 搜索结果只能作为 C 级证据，不能直接支撑核心结论。

## 安全边界

- 不要把调试端口暴露到公网。
- 不要默认读取用户日常 Chrome profile。
- 不要复制 cookie 数据库。
- 不要长期保存视频文件；如需 ASR/OCR，只做临时处理。
