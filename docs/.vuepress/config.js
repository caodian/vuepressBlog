module.exports = {
  title: 'Comt-UI',
  description: '基于Vue 2.x 实现的移动端组件库',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['link', { rel: 'manifest', href: '/images/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/logo.png' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}]
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块是否显示行号
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/active-header-links',
    '@vuepress/pwa'
  ],
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '指南', link: '/accumulate/' },
      {text: '示例', link: '/example/'},
      {text: '诗和远方', link: '/others/'},
      {text: '眼前的苟且', link: '/learn/'},
      {text: '仓库', link: 'https://gitee.com/zhangzhiwei1991/vuepressBlog'}
    ],
    sidebar:{
      '/accumulate/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '',
          ]
        },
        {
          title: '组件',
          collapsable: false,
          children: [
            // 'algorithm/',
            // 'algorithm/Header',
            'algorithm/Button'
          ]
        },
        {
          title: '诗和远方',
          collapsable: false,
          children: [
            'others/',
            'others/page1',
            'others/page2'
          ]
        },
        {
          title: '眼前的苟且',
          collapsable: false,
          children: [
            'learn/',
            'learn/learn'
          ]
        }
      ]
    },
    // sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2,
    lastUpdated: 'Last Updated', // string | boolean
  }
};
