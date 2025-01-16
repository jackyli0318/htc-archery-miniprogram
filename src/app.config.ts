export default defineAppConfig({
  pages: [
    'pages/index/index', // 首页
    'pages/input/index', // 成绩输入页面
    'pages/leaderboard/index', // 排行榜页面
    'pages/mine/index', // 我的页面
  ],
  tabBar: {
    color: '#666666', // 默认文字颜色
    selectedColor: '#2575fc', // 选中文字颜色
    backgroundColor: '#ffffff', // 背景颜色
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png', // 图标路径
        selectedIconPath: 'assets/icons/home_active.png', // 选中图标路径
      },
      {
        pagePath: 'pages/input/index',
        text: '输入成绩',
        iconPath: 'assets/icons/input.png',
        selectedIconPath: 'assets/icons/input_active.png',
      },
      {
        pagePath: 'pages/leaderboard/index',
        text: '排行榜',
        iconPath: 'assets/icons/rank.png',
        selectedIconPath: 'assets/icons/rank_active.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/icons/mine.png',
        selectedIconPath: 'assets/icons/mine_active.png',
      },
    ],
  },
  window: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'Archery Club',
  },
});
