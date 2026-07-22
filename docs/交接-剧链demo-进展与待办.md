# 交接：剧链 DramaLink 投资人 Demo（2026-07-23 更新）

## 背景

用户（产品负责人）做 AI 短剧广告植入方向创业，需要给投资人看的可交互 demo。调研背景见 `~/Claude/reports/2026-07-22-AI短剧广告植入公司调研.html`。

商业定位（用户拍板）："AI 时代的广告平台"，AI 短剧是 AI 生成内容中变现潜力最大的第一站；类比 CJ/Awin 分佣 + Skimlinks 自动转链，**对投资人不提 MCN 类比**（估值不利）。

## 目标与现状（已上线真实素材版）

- 代码 `~/Claude/drama-ads-demo/`（GitHub `xinyuxinsheng/drama-ads-demo`），线上 https://xinyuxinsheng.github.io/drama-ads-demo/
- 三阶段按行业术语命名：**剧本开发·智能植入规划 / AI 成片·无痕植入生成 / 上线投流·全球转链变现**
- 剧本开发：五步流程条 + 剧本《她的耳机里没有歌》两场戏标 5 个植入位（数码/背具/服装/道具/场景）；商品卡三种形态——已匹配（Sony 耳机、Kånken 背包）、剧方候选二选一（adidas T恤 vs Samba，可点选）、**多品牌竞价**（扇面广告位：大众点评必吃榜 ¥52,000 中标 vs 高德扫街榜 ¥45,000 未中标）
- AI 成片：三组横屏"原片 vs 植入后"对比，滚动进视口自动同步循环播放（IntersectionObserver）
- 投流变现：横屏播放器（va-placed），片头植入声明、弹幕（config 卡点）、Sony 商品卡 + 美/日/中转链（Amazon $278 / 楽天 ¥42,900 / 天猫 ¥1,899，示例价）
- 用户提供的真实素材：三对原片/植入后视频（横屏）+ 6 张商品图，均已入 assets/（对应关系见 README）
- 页脚已声明：所有品牌仅为演示示意，非真实合作

## 已验证（2026-07-23 本地）

候选切换/整案确认/步骤推进 ✓、三组对比自动播放 ✓、弹幕按卡点出现 ✓、商品卡 0.8s 弹出 ✓、三国切换 ✓、手机端竖排布局 ✓、无横向溢出 ✓、控制台无报错 ✓。

## 待办 / 已知事项

1. **va 视频是两镜头剪辑**：商场镜头（Sony+Kånken 植入）后接天桥日落镜头（女主背吉他包、白色耳机）。若桥上镜头后续也做植入（吉他包→YAMAHA），可在 js/config.js 加第二张商品卡卡点。
2. 用户如需再换视频/改卡点：覆盖 assets/ 同名文件 + 改 js/config.js（playerVideo/badge/productAt/danmaku/products）。
3. 平台名"剧链 DramaLink"仍为占位名。
4. 上次 push 需用户亲自执行（权限分类器拦 gh repo create）；本次 git push 若再被拦，让用户跑：`cd ~/Claude/drama-ads-demo && git push`。

## 技术备注

- 纯静态 HTML/CSS/JS。视频总量约 22MB（GitHub Pages 单文件 100MB 内，安全）。
- 本地预览：launch.json `drama-ads-demo`（端口 8460）。浏览器面板截图有已知怪癖：视口尺寸需与截图面一致，视频层未播放时截图呈黑。
