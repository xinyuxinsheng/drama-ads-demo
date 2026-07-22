// ————— 演示配置：换真实视频后只需要改这里 —————
const DEMO_CONFIG = {
  brand: 'LEAPX', // 虚构品牌，规避真实品牌授权问题

  // 视频文件（替换真实素材时改文件名即可）
  videos: {
    original: 'assets/original.mp4',
    placed: 'assets/placed.mp4',
  },

  // 片头冠名标注的显示时间段（秒）
  badge: { start: 0, end: 3.5 },

  // 服装出现的时间点（秒）：弹幕 + 商品卡都挂在这个时间轴上
  garmentAt: 4,

  // 弹幕列表：t = 出现时间（秒）
  danmaku: [
    { t: 4.0, text: '这件风衣也太好看了吧！！', hot: true },
    { t: 4.7, text: '女主同款求链接！' },
    { t: 5.4, text: '链接就在下面 👇👇', hot: true },
    { t: 6.2, text: '已下单，冲' },
    { t: 7.2, text: 'LEAPX 这个牌子种草了' },
    { t: 8.2, text: '气场两米八' },
  ],

  // 各国商品数据：切换国家 = 换这里的一条记录
  products: {
    us: {
      name: 'LEAPX Urban Trench Coat',
      store: 'Amazon.com',
      price: '$89.00',
      url: 'https://www.amazon.com/s?k=women+trench+coat',
      toast: '已切换至美国站 · 链接自动转向 Amazon',
    },
    jp: {
      name: 'LEAPX アーバントレンチコート',
      store: '楽天市場',
      price: '¥12,800',
      url: 'https://search.rakuten.co.jp/search/mall/%E3%83%88%E3%83%AC%E3%83%B3%E3%83%81%E3%82%B3%E3%83%BC%E3%83%88/',
      toast: '已切换至日本站 · 链接自动转向 楽天市場',
    },
    cn: {
      name: 'LEAPX 都市风衣 · 女主同款',
      store: '天猫',
      price: '¥699',
      url: 'https://list.tmall.com/search_product.htm?q=%E9%A3%8E%E8%A1%A3',
      toast: '已切换至中国站 · 链接自动转向 天猫',
    },
  },
};
