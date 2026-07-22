# 交接：剧链 DramaLink 投资人 Demo（2026-07-22）

## 背景

用户（产品负责人）计划做 AI 短剧广告植入方向的创业，需要一个给投资人看的可交互 demo。调研背景见 `~/Claude/reports/2026-07-22-AI短剧广告植入公司调研.html`（核心结论：赛道空窗期、Mirriad 破产警示纯技术公司不可行、CPS 分佣回应植入 ROI 衰减质疑）。

商业定位（用户拍板）：**AI 时代的广告平台**——AI 短剧是 AI 生成内容中变现潜力最大的第一站。类比：CJ/Awin 的联盟分佣 + Skimlinks 的自动转链。对投资人少提 MCN 类比（估值不利）。

## 目标与现状

四屏单页 demo：封面 → 脚本期植入工作台 → 生成期前后对比滑杆 → 变现期手机播放器（片头冠名 + 弹幕引导 + 商品卡 + 美/日/中自动转链）。

- 代码：`~/Claude/drama-ads-demo/`（独立 git 仓库，GitHub `xinyuxinsheng/drama-ads-demo`）
- 线上：https://xinyuxinsheng.github.io/drama-ads-demo/（GitHub Pages）
- 品牌用虚构的 LEAPX（规避冒用 Nike 的合规问题，用户已同意）
- 平台名"剧链 DramaLink"为占位名，用户未最终定名

## 已验证（2026-07-22 本地）

创作者确认按钮状态切换 ✓、对比滑杆拖动 ✓、弹幕按时间轴出现 ✓、商品卡 4 秒弹出 ✓、三国切换（Amazon $89 / 楽天 ¥12,800 / 天猫 ¥699）✓、手机端断点 ✓。

## 待办

1. **等用户的真实视频**（原片 + 植入后各一段，正在生成中）。到位后：覆盖 `assets/original.mp4`、`assets/placed.mp4`，按视频内容调 `js/config.js` 的 `badge`/`garmentAt`/`danmaku` 时间点，重新验证后 push。
2. 当前 assets 里是 ffmpeg+Pillow 生成的占位视频（画面标明"占位"）。
3. 用户如需改平台名/品牌名：`index.html` 全局替换 + `js/config.js` 的 brand 字段。

## 技术备注

- 纯静态 HTML/CSS/JS，无构建。本机 ffmpeg 无 drawtext 滤镜，占位视频文字是 Pillow 画帧再合成的（脚本在会话 scratchpad，一次性）。
- 本地预览：launch.json 里已有 `drama-ads-demo` 配置（端口 8460）。
