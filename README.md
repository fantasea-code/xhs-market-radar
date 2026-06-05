# XHS Market Radar

XHS Market Radar is an Agent Skill for turning messy Xiaohongshu / RED research into a source-backed market validation report.

It is built for people who have an early product idea and need to know whether the demand is real: what users are already trying, what they complain about, where competitors sell, and which first version is worth testing.

The repo also includes `chrome-attach`, an optional real-browser backend guide. It helps an Agent work inside a local Chrome profile with the user's login state, rendered DOM, network records, screenshots, and media resources.

## Why this exists

Early product research on social platforms is slow and easy to fake.

A normal LLM answer can say "there is demand" without showing where that claim came from. A normal web scraper often fails on authenticated, dynamic, app-like pages. A human researcher can read the evidence, but it takes hours.

XHS Market Radar sits between those options:

- It searches Xiaohongshu for competitors, adjacent products, DIY workarounds, tutorials, complaints, and buying signals.
- It reads posts, comments, image carousels, screenshots inside posts, video frames, and optional local ASR evidence.
- It checks outside signals such as pricing pages, app stores, public download numbers, ecommerce pages, GitHub repos, and product websites when available.
- It writes a Markdown report with evidence levels, source counts, source cards, and embedded images.

The goal is not bulk data collection. The goal is decision-quality evidence for a product team or solo builder.

## Technical difficulty

Xiaohongshu is not a clean static website. Useful evidence can be scattered across search result pages, dynamic note detail pages, image carousels, long text screenshots, video overlays, comment threads, and external product pages.

This creates several practical problems:

- Direct note URLs may fail while the same note can still be found through in-site search.
- Captions may be short because the real review is written inside images.
- Comments often contain stronger market signals than the post itself: "where can I buy it", "too expensive", "does it work on Android", "send me the tutorial".
- Image resources may load only after scrolling or swiping.
- Video evidence needs separate handling. A single frame is not the same as full transcript evidence.
- Pricing, installs, ratings, and downloads need source links or screenshots. Numbers without sources are treated as weak evidence.

The Skill encodes a research workflow for these cases. It asks the Agent to keep weak sources weak, avoid invented numbers, and attach the evidence used for each conclusion.

## Business value

This Skill is useful before building an MVP, buying inventory, running ads, or pitching a product direction.

It helps answer concrete questions:

- Is the demand visible in real user behavior?
- Which user group feels the pain most?
- What are people using today?
- What current products fail to solve?
- What price or subscription model users resist?
- What should the first version avoid?
- What market wedge is worth testing first?

For the included sample case, the input idea is:

> An affordable, no-camera AI voice device for quick notes, daily memory, and personal context.

The report does not stop at "AI wearables are trending." It compares Looki-like devices, AI recorder hardware, watch-based voice capture, phone shortcuts, and adjacent AI note tools. It then recommends a narrower test: low-friction voice capture with a physical trigger and useful summaries, instead of pitching raw 24-hour audio as the main product.

## Repo structure

```text
.
├─ skills/
│  ├─ xhs-market-radar/
│  │  ├─ SKILL.md
│  │  ├─ agents/
│  │  └─ references/
│  │     ├─ browser-backend.md
│  │     ├─ market-signals.md
│  │     ├─ report-template.md
│  │     ├─ video-evidence.md
│  │     └─ xhs-extraction.md
│  └─ chrome-attach/
│     └─ SKILL.md
├─ examples/
│  ├─ voice-capture-market-report.en.md
│  └─ voice-capture-market-report.zh.md
└─ docs/
   └─ hackathon-demo-copy.md
```

## How to use

### Option A: Use the Skill only

Copy `skills/xhs-market-radar` into your Agent skill directory.

Then ask your Agent:

```text
Use xhs-market-radar to research whether this product idea has real demand:
<your product idea>
Return a Markdown report with source evidence.
```

You can use your own browser automation backend, such as Browser Use, Web Access, or another CDP-based tool. The backend must be able to open pages, read rendered content, interact with search/detail pages, inspect media, and capture evidence.

### Option B: Use it with Chrome Attach

Copy both folders:

```text
skills/xhs-market-radar
skills/chrome-attach
```

Chrome Attach is recommended when the research target needs a real local Chrome profile, login state, rendered page context, image/media extraction, and DevTools-style page inspection.

On Windows, start a dedicated Chrome profile:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="C:\chrome-ai-profile"
```

Then configure your Agent's MCP/browser backend to connect to:

```text
http://127.0.0.1:9222
```

Use a dedicated profile instead of your daily browser profile when possible. It reduces accidental exposure of unrelated cookies, tabs, and personal browsing data.

## Evidence levels

The report uses simple evidence levels:

- `A`: the note detail page was opened and the report includes real evidence such as caption, comments, images, screenshots, or video frames.
- `B`: the note was opened, but some media evidence is incomplete.
- `C`: the source is weak, such as search results, titles, interaction counts, or external pages without full Xiaohongshu context.

`C` does not mean the competitor is unimportant. It means the current evidence is not strong enough yet.

## What the final report should contain

A good report should include:

- conclusion first
- competitor / alternative matrix
- Xiaohongshu source count for each competitor
- evidence level for each competitor
- core selling point
- real user pain
- pricing or transaction path
- external validation links or screenshots when used
- detailed source cards
- important image evidence embedded in Markdown
- comment feedback
- clear recommendation on what to test next

See:

- `examples/voice-capture-market-report.en.md`
- `examples/voice-capture-market-report.zh.md`

## Safety and scope

This project is designed for manual-scale market research with a user's own browser session.

Do not use it for mass collection, credential harvesting, platform abuse, or access that violates a site's rules. When a platform asks for verification or login confirmation, the user should handle it directly in the browser.

## Chinese / 中文说明

XHS Market Radar 是一个用于小红书 / RED 市场调研的 Agent Skill。它的目标不是做大规模采集，而是帮助有产品想法的人判断需求是否真实。

你给它一个产品 idea，它会围绕这个 idea 搜索小红书上的竞品、相邻产品、土办法、教程、吐槽、评论区购买信号，并补充官网、应用商店、电商、GitHub、公开下载量等外部线索。最后输出一份带证据链的 Markdown 市场验证报告。

这个仓库同时包含 `chrome-attach`。它是可选的浏览器底座，用来让 Agent 连接用户本地真实 Chrome，而不是只依赖干净的无头环境。对于需要登录态、动态渲染、图文轮播、评论区、媒体资源的小红书调研，这个方式更接近真实人工浏览。

### 技术难点

小红书的有效信息经常不在正文里：

- 很多长评测、价格、参数、吐槽写在图片里。
- 评论区比正文更能反映真实需求，比如求链接、嫌贵、问兼容性、求教程。
- 直接链接可能失效，但站内搜索仍能找到对应笔记。
- 图片需要滚动或翻页后才完整加载。
- 视频不能只靠一张截图判断，必要时需要关键帧或可选本地 ASR。
- 销量、下载量、评分、价格必须有来源，不能凭空写数字。

所以这个 Skill 不只是“搜一下总结一下”，而是把调研流程拆成：小红书证据、媒体证据、外部市场信号、报告输出规则。它要求每个重要结论都能回到具体来源。

### 商业价值

它适合在做 MVP、打样、投广告、上架应用、买库存之前使用。

它能帮助回答：

- 需求是否真实存在？
- 哪类用户最痛？
- 用户现在在用什么替代方案？
- 现有产品哪里不好用？
- 用户对价格和订阅有什么抵触？
- 第一版应该避开什么？
- 哪个小切口最值得先测？

样例报告研究的是一个低价、无摄像头、随时语音捕捉的 AI 设备。报告没有停留在“AI 穿戴很火”，而是对比 Looki 类产品、AI 录音硬件、手表语音记录、手机快捷指令和相邻 AI 笔记工具，最后建议先测试“低摩擦语音捕捉 + 实体触发 + 可用总结”，不要把“24 小时原始录音”作为第一卖点。

### 使用方式

只用 Skill：

```text
把 skills/xhs-market-radar 复制到你的 Agent skill 目录。
```

搭配 Chrome Attach：

```text
同时复制 skills/xhs-market-radar 和 skills/chrome-attach。
```

Windows 启动独立 Chrome profile：

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --remote-debugging-port=9222 `
  --user-data-dir="C:\chrome-ai-profile"
```

然后让你的 Agent/browser backend 连接：

```text
http://127.0.0.1:9222
```

建议使用独立 profile，不要默认连接日常 Chrome。这样可以减少无关 cookie、标签页和个人数据暴露。

### 证据等级

- `A`：已经打开笔记详情页，并且报告里有正文、评论、图片、截图或视频帧等真实证据。
- `B`：已经打开详情页，但部分媒体证据不完整。
- `C`：只有搜索结果、标题、互动数，或缺少完整小红书上下文的外部页面。

`C` 不代表竞品不重要，只代表当前证据还不够强。

## License

MIT
