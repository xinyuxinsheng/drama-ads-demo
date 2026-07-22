// ————— 演示配置：换素材/改卡点只需要改这里 —————
const DEMO_CONFIG = {
  // 投流变现页使用的视频（现代戏：商场镜头 → 天桥日落镜头）
  playerVideo: 'assets/va-placed.mp4',

  // 片头植入声明的显示时间段（秒）
  badge: { start: 0, end: 2.2 },

  // 商品时间轴：一个片段挂多个商品，按镜头切换
  // tag 是卡片顶部的小字说明；more 是卡片底部补充行
  timeline: [
    {
      at: 0.8,
      product: 'sony',
      tag: 'AI 已识别本帧商品 · 链接自动转向当地商城',
      more: '本镜头另植入：Fjällräven Kånken 双肩包 · 樱花粉',
    },
    {
      at: 2.7,
      product: 'yamaha',
      tag: 'AI 识别本帧同款 · 未植入的商品也能转链',
      more: '上一镜头：Sony WH-1000XM4 降噪耳机',
    },
  ],

  // 弹幕列表：t = 出现时间（秒）
  danmaku: [
    { t: 0.5, text: '这耳机也太好看了吧！！', hot: true },
    { t: 1.0, text: 'Sony 降噪天花板，实名认证' },
    { t: 1.5, text: '链接就在下面 👇👇', hot: true },
    { t: 2.1, text: '粉色背包也好戳我' },
    { t: 2.9, text: '吉他包也有链接？！', hot: true },
    { t: 3.4, text: '连乐器都能挂卡，服了' },
  ],

  // 商品库：每个商品含图片 + 三国数据（价格为演示示例）
  products: {
    sony: {
      img: 'assets/p-sony.jpg',
      countries: {
        us: {
          name: 'Sony WH-1000XM4 Wireless Headphones',
          store: 'Amazon.com',
          price: '$278.00',
          url: 'https://www.amazon.com/s?k=sony+wh-1000xm4',
        },
        jp: {
          name: 'ソニー WH-1000XM4 ワイヤレスヘッドホン',
          store: '楽天市場',
          price: '¥42,900',
          url: 'https://search.rakuten.co.jp/search/mall/WH-1000XM4/',
        },
        cn: {
          name: '索尼 WH-1000XM4 头戴式降噪耳机',
          store: '天猫',
          price: '¥1,899',
          url: 'https://list.tmall.com/search_product.htm?q=WH-1000XM4',
        },
      },
    },
    yamaha: {
      img: 'assets/p-yamaha.jpg',
      countries: {
        us: {
          name: 'YAMAHA Guitar Gig Bag',
          store: 'Amazon.com',
          price: '$49.99',
          url: 'https://www.amazon.com/s?k=yamaha+guitar+gig+bag',
        },
        jp: {
          name: 'ヤマハ ギターギグバッグ',
          store: '楽天市場',
          price: '¥6,980',
          url: 'https://search.rakuten.co.jp/search/mall/%E3%83%A4%E3%83%9E%E3%83%8F%20%E3%82%AE%E3%82%B0%E3%83%90%E3%83%83%E3%82%B0/',
        },
        cn: {
          name: '雅马哈吉他包 · 加厚双肩',
          store: '天猫',
          price: '¥349',
          url: 'https://list.tmall.com/search_product.htm?q=%E9%9B%85%E9%A9%AC%E5%93%88%E5%90%89%E4%BB%96%E5%8C%85',
        },
      },
    },
  },

  // 国家切换提示语
  toasts: {
    us: '已切换至美国站 · 链接自动转向 Amazon',
    jp: '已切换至日本站 · 链接自动转向 楽天市場',
    cn: '已切换至中国站 · 链接自动转向 天猫',
  },
};
