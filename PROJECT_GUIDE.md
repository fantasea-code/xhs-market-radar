# Project Guide

This repo is an Agent Skill project, not a SaaS backend. It packages the market-research workflow, browser setup guidance, report templates, sample reports, and evidence assets in one place.

## What is implemented

- A reusable Agent Skill for Xiaohongshu / RED market validation.
- A structured evidence workflow for posts, image carousels, comments, video evidence, and external market signals.
- Markdown report templates with evidence levels, source cards, source counts, and embedded image evidence.
- A bundled Chrome Attach guide for using a real local Chrome profile through CDP.
- Minimal Chrome Attach helper scripts:
  - `skills/chrome-attach/scripts/launch-chrome.ps1`
  - `skills/chrome-attach/scripts/doctor.mjs`
- Sample market reports:
  - `examples/voice-capture-market-report.zh.md`
  - `examples/voice-capture-market-report.en.md`
- Evidence assets used by the sample reports under `evidence/`.
- A live demo page: https://xhs-radar-demo.vercel.app

## Where to look first

1. `README.md` for product framing, quickstart, tech stack, and repo structure.
2. `skills/xhs-market-radar/SKILL.md` for the Agent workflow and evidence rules.
3. `skills/xhs-market-radar/references/report-template.md` for output structure.
4. `skills/xhs-market-radar/references/xhs-extraction.md` for extraction protocol.
5. `skills/chrome-attach/SKILL.md` for real-browser backend setup.
6. `examples/voice-capture-market-report.zh.md` for the full evidence-backed sample.

## Product authenticity

The project is based on a real market-research workflow around a low-cost AI voice capture device. The sample report includes:

- competitor / alternative matrix
- Xiaohongshu source counts
- evidence grades
- comment-derived pain points
- external pricing and adoption signals
- embedded source images
- a product recommendation that changes the first version

## Known limits

- This repo does not include a hosted scraping service.
- The browser backend requires the user to provide a local Chrome profile and login state.
- Video ASR is optional. It requires a user-approved local Whisper-compatible model or user-configured ASR backend.
- The Skill is intended for manual-scale research and evidence-backed reports, not bulk data collection.

## Minimal local validation

Start Chrome:

```powershell
.\skills\chrome-attach\scripts\launch-chrome.ps1
```

Check the CDP endpoint:

```powershell
node .\skills\chrome-attach\scripts\doctor.mjs
```

Expected result:

```text
Chrome Attach doctor: OK
```
