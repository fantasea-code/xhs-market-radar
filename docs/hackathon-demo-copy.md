# XHS Market Radar Demo Copy

Use this file as the copy reference for the hackathon demo page in `F:\CODE\xhs-radar-demo`.

Audience:

- Overseas hackathon judges and builders.
- People who have an early product idea and want to check whether the market demand exists.

Writing rules:

- Keep the copy in English.
- Keep it concrete. Mention browser context, source evidence, image text, comments, and external validation.
- Do not use: redefine, unlock, transformative, comprehensive ecosystem.
- Avoid language that sounds like defeating platform protection.
- Do not name headless automation tools in the public-facing copy.

Visual direction:

- Keep the retro terminal / ASCII style.
- Use labels like `[REAL_BROWSER_CONTEXT]`, `[IMAGE_TEXT_EVIDENCE]`, `[COMMENT_SIGNAL]`, `[EXTERNAL_CHECK]`.
- Keep real evidence images readable. Do not convert evidence images into ASCII.

## Slide 1: XHS Market Radar

Headline:

XHS Market Radar

Subheadline:

Turn messy Xiaohongshu posts into market evidence you can inspect.

Body:

Most product ideas sound fine in a chat window. The harder question is whether people are already searching for the problem, paying for a workaround, or complaining about the products they have.

XHS Market Radar is an Agent Skill for the stage before you build. Give it an idea. It searches Xiaohongshu, reads posts, images, comments, and outside signals, then writes a market validation report with the sources attached.

Terminal line:

`INPUT IDEA -> COLLECT SIGNALS -> CHECK SOURCES -> DECIDE WHAT TO BUILD`

## Slide 2: The Problem

Headline:

Good ideas still fail when the market is fake.

Body:

Before building, a founder or maker needs answers that take real browsing time:

- Are real users talking about this problem?
- What products or hacks are they using now?
- What do they complain about?
- Are they asking for links, prices, tutorials, or invites?
- Is there a narrow first version worth testing?

LLMs can answer with confidence in seconds. Product work needs receipts.

Terminal line:

`CONFIDENCE != EVIDENCE`

## Slide 3: What The Skill Does

Headline:

From product idea to evidence-backed market report.

Body:

XHS Market Radar searches Xiaohongshu for direct competitors, adjacent products, DIY workarounds, complaint posts, tutorials, and buying signals.

The report includes competitor tables, Xiaohongshu source counts, evidence levels, image evidence, comment summaries, external pricing or download signals when visible, and a recommendation on what to test next.

The useful part is traceability. If the report says users complain about price, workflow, privacy, or compatibility, the reader can see where that claim came from.

Terminal line:

`SOURCE_COUNT + EVIDENCE_LEVEL + USER_COMMENT = DECISION INPUT`

## Slide 4: Demo Case

Headline:

Try the live case.

Body:

The demo starts with one idea:

"An affordable, no-camera AI voice device for quick notes, daily memory, and personal context."

Click the scan button. The interface will simulate the research flow, then jump into the sample report.

The report lands on a narrower answer: low-friction voice capture is worth testing, but the first pitch should avoid raw 24-hour audio.

Terminal lines:

`RUN DEMO SCAN`

`CASE: LOW-COST AI VOICE CAPTURE`

## Slide 5: Built For Messy, Authenticated Social Pages

Headline:

Built for messy, authenticated social pages.

Body:

Xiaohongshu behaves more like an app than a clean website. Useful evidence can sit in search results, dynamic note pages, image carousels, long text screenshots, comment threads, video frames, product pages, and app stores.

Direct links can fail. Some notes open more reliably through search. Images may load only after scrolling or swiping. Comments often need page interaction.

The recommended backend is Chrome Attach from the same repo. It lets the Agent work inside a real Chrome profile with the user's login state and rendered page context.

Users can also bring Browser Use, Web Access, or another CDP-based browser backend.

The Skill gives the Agent a research procedure:

- Search first when a direct link is stale.
- Open notes through normal navigation.
- Confirm that the detail page actually loaded.
- Extract images from image posts and analyze them as evidence.
- Read text or important information inside those images.
- Decide which images matter enough to include in the final report.
- Read comments as market signals.
- Keep weak sources weak.

Terminal line:

`REAL_BROWSER_CONTEXT -> NORMAL_BROWSING_PATH -> TRACEABLE_EVIDENCE`

## Slide 6: The Evidence Pipeline

Headline:

A three-layer evidence pipeline.

Body:

Layer 1: Xiaohongshu evidence

The Agent opens real notes, reads captions, collects interaction data, extracts image posts, captures video frames, and pulls in comments.

Layer 2: Media and source evidence

Image posts are primary evidence. Xiaohongshu users often put the real review, pricing, setup steps, product comparison, and complaints inside images.

The Skill extracts those images, reads the text or important information inside them, decides whether each image is useful, and embeds the important ones into the report.

For video, the Skill separates caption, comments, key frames, and optional ASR. One frame does not stand in for the whole video.

Layer 3: Market validation

Every conclusion must point back to a source: a note, a comment, an image, a screenshot, an external product page, or an app store signal.

Weak evidence stays weak. The report says so.

Terminal line:

`NOTE -> IMAGE_TEXT -> COMMENT -> EXTERNAL_CHECK -> REPORT`

## Slide 7: Evidence Levels

Headline:

The report does not treat every source as equal.

Body:

The Skill uses simple evidence levels.

`A` means the note detail page was opened and the report has real evidence: caption, comments, images, screenshots, or video frames.

`B` means the note was opened, but some media evidence is incomplete.

`C` means the source is still weak: search result, title, interaction count, or an external page without full Xiaohongshu context.

This matters. A viral title is a lead. A comment section full of people asking for links is stronger evidence.

Terminal line:

`A = OPENED + READ + EVIDENCE ATTACHED`

## Slide 8: Market Signals Beyond Xiaohongshu

Headline:

Xiaohongshu is the starting point. The report can check outside signals too.

Body:

When external data is visible and verifiable, the Skill can use it as supporting evidence:

- Official pricing pages
- Product websites
- GitHub repos
- App Store ratings and reviews
- Android store install counts when visible
- Public download numbers
- Media reports
- Ecommerce pages

The rule is simple: if the report uses a number, it needs a source.

A comment tells you what users feel. A pricing page tells you what the market charges. An app store rating tells you whether people keep using the product after the first download.

Terminal line:

`NO SOURCE -> NO NUMBER`

## Slide 9: Product Decision Output

Headline:

The output should change what you build next.

Body:

The report is designed to answer product questions:

- Is the demand real?
- Which user group feels it most?
- What are people using today?
- Where do current products fail?
- What price feels acceptable?
- What should the first version avoid?
- What should we test next?

For the voice capture case, the evidence points to a narrow first test: low-friction capture, no camera, physical button, low subscription pressure, and summaries that land in tools users already use.

Terminal line:

`MARKET_RESEARCH -> PRODUCT_DECISION`

## Chinese Reference Translation

### Slide 1

XHS Market Radar

把混乱的小红书内容变成可以检查的市场证据。

大多数产品想法在聊天窗口里听起来都不错。更难的问题是：用户是不是已经在搜索这个问题、为某种替代方案付费，或者正在吐槽现有产品。

XHS Market Radar 是一个用于动手开发前阶段的 Agent Skill。你给它一个想法，它会搜索小红书，读取帖子、图片、评论和外部信号，然后写出一份带来源的市场验证报告。

`输入想法 -> 收集信号 -> 检查来源 -> 决定做什么`

### Slide 2

当市场需求是假的，好想法也会失败。

在开工之前，创始人或 maker 需要一些必须花时间浏览才能回答的问题：

- 真实用户有没有讨论这个问题？
- 他们现在在用什么产品或土办法？
- 他们在抱怨什么？
- 他们有没有要链接、问价格、找教程、求内测？
- 有没有一个值得先测试的窄版本？

LLM 可以很快给出自信的答案。产品判断需要证据。

`自信 != 证据`

### Slide 3

从产品想法到有证据支撑的市场报告。

XHS Market Radar 会在小红书上搜索直接竞品、相邻产品、DIY 替代方案、吐槽帖、教程和购买信号。

报告会包含竞品表格、小红书参考数、证据等级、图片证据、评论总结、可见的外部价格或下载信号，以及下一步应该测试什么。

真正有用的是可追溯性。如果报告说用户在抱怨价格、工作流、隐私或兼容性，读者可以看到这个判断来自哪里。

`来源数量 + 证据等级 + 用户评论 = 决策输入`

### Slide 4

试一下这个现场案例。

Demo 从一个想法开始：

“一个低价、无摄像头的 AI 语音设备，用来快速记事、记录生活和保留个人上下文。”

点击扫描按钮。界面会模拟调研流程，然后跳转到样例报告。

报告最后给出的判断更窄：低摩擦语音捕捉值得测试，但第一版不应该主打原始 24 小时录音。

`运行 Demo 扫描`

`案例：低价 AI 语音捕捉`

### Slide 5

为混乱、需要登录的社媒页面设计。

小红书更像一个 App，不像干净的网站。有效证据可能散在搜索结果、动态笔记页、图片轮播、长文截图、评论区、视频画面、产品页和应用商店里。

直接链接可能失效。有些笔记通过搜索打开更稳定。图片可能要滚动或切换后才加载。评论通常也需要页面交互。

推荐后端是同仓库里的 Chrome Attach。它让 Agent 在用户真实 Chrome profile 里工作，复用用户登录态和已经渲染出来的页面上下文。

用户也可以选择 Browser Use、Web Access，或者其他基于 CDP 的浏览器后端。

这个 Skill 会给 Agent 一套调研流程：

- 直接链接失效时先走搜索。
- 通过正常页面导航打开笔记。
- 确认详情页真的加载成功。
- 提取图文帖图片，并把图片也作为证据分析。
- 读取图片中的文字或重要信息。
- 判断哪些图片值得放进最终报告。
- 把评论当作市场信号读取。
- 证据弱的地方就标弱。

`真实浏览器上下文 -> 正常浏览路径 -> 可追溯证据`

### Slide 6

三层证据流程。

第一层：小红书证据

Agent 会打开真实笔记，读取正文，收集互动数据，提取图文帖图片，截取视频关键帧，并读取评论。

第二层：媒体和来源证据

图文帖图片是核心证据。小红书用户经常把真正的评测、价格、设置步骤、产品对比和吐槽写在图片里。

Skill 会提取这些图片，读取里面的文字或重要信息，判断每张图片是否有用，并把重要图片嵌入报告。

对于视频，Skill 会区分正文、评论、关键帧和可选 ASR。单个画面不能代表整个视频。

第三层：市场验证

每个结论都必须指向来源：笔记、评论、图片、截图、外部产品页，或者应用商店信号。

证据弱就直接标弱。报告会写清楚。

`笔记 -> 图片文字 -> 评论 -> 外部检查 -> 报告`

### Slide 7

报告不会把所有来源当成同等证据。

Skill 使用简单的证据等级。

`A` 表示已经打开笔记详情页，并且报告里有真实证据：正文、评论、图片、截图或视频帧。

`B` 表示已经打开笔记，但部分媒体证据不完整。

`C` 表示来源仍然偏弱：只有搜索结果、标题、互动数，或者缺少完整小红书上下文的外部页面。

这很重要。爆款标题只是线索。评论区一堆人要链接，证据强度就更高。

`A = 已打开 + 已读取 + 已附证据`

### Slide 8

小红书是起点。报告也可以检查外部信号。

当外部数据可见且可以验证时，Skill 会把它当作辅助证据：

- 官方价格页
- 产品官网
- GitHub 仓库
- App Store 评分和评论
- 可见的安卓应用商店安装量
- 公开下载量
- 媒体报道
- 电商页面

规则很简单：报告里只要用了数字，就需要来源。

评论告诉你用户怎么想。价格页告诉你市场怎么收费。应用商店评分告诉你用户下载后是否还在用。

`没有来源 -> 不写数字`

### Slide 9

输出结果应该改变你下一步做什么。

报告是为了回答产品问题：

- 需求是真的吗？
- 哪类用户感受最强？
- 用户现在在用什么？
- 现有产品失败在哪里？
- 什么价格更容易接受？
- 第一版应该避开什么？
- 下一步应该测试什么？

在语音捕捉这个案例里，证据指向一个更窄的首测方向：低摩擦捕捉、无摄像头、实体按键、降低订阅压力，并且把总结送到用户已经在用的工具里。

`市场调研 -> 产品决策`
