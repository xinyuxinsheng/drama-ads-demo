// ————— 演示配置：换素材/改卡点只需要改这里 —————
const DEMO_CONFIG = {
  // 投流变现页使用的视频（现代戏 · 植入后）
  playerVideo: 'assets/va-placed.mp4',

  // 片头植入声明的显示时间段（秒）
  badge: { start: 0, end: 2.5 },

  // 商品卡弹出时间点（秒）：耳机从第 1 帧就在画面里
  productAt: 0.8,

  // 弹幕列表：t = 出现时间（秒）。视频约 4 秒，卡点要密
  danmaku: [
    { t: 0.5, text: '这耳机也太好看了吧！！', hot: true },
    { t: 1.0, text: 'Sony 降噪天花板，实名认证' },
    { t: 1.5, text: '链接就在下面 👇👇', hot: true },
    { t: 2.1, text: '粉色背包也好戳我' },
    { t: 2.7, text: '已下单，冲' },
    { t: 3.3, text: '女主同款求全套' },
  ],

  // 各国商品数据（Sony WH-1000XM4，价格为演示示例）
  products: {
    us: {
      name: 'Sony WH-1000XM4 Wireless Headphones',
      store: 'Amazon.com',
      price: '$278.00',
      url: 'https://www.amazon.com/s?k=sony+wh-1000xm4',
      toast: '已切换至美国站 · 链接自动转向 Amazon',
    },
    jp: {
      name: 'ソニー WH-1000XM4 ワイヤレスヘッドホン',
      store: '楽天市場',
      price: '¥42,900',
      url: 'https://search.rakuten.co.jp/search/mall/WH-1000XM4/',
      toast: '已切换至日本站 · 链接自动转向 楽天市場',
    },
    cn: {
      name: '索尼 WH-1000XM4 头戴式降噪耳机',
      store: '天猫',
      price: '¥1,899',
      url: 'https://list.tmall.com/search_product.htm?q=WH-1000XM4',
      toast: '已切换至中国站 · 链接自动转向 天猫',
    },
  },
};
