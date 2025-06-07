import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FGate",
  description: "FGate API Docs",
  head: [
    ['link', { rel: 'icon', href: '/FGate.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '家', link: '/' },
      { text: '开始', link: '/get-start' },
    ],

    sidebar: [
      {
        text: '目录',
        items: [
          { text: '开始', link: '/get-start' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JohnRichard4096/FGateDoc' }
    ],
    
  }
})
