export default defineAppConfig({
  pages: [
    'pages/index/index', // 首页
    'pages/input/index', // 成绩输入页面
    'pages/leaderboard/index' // 排行榜页面
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
