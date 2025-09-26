import { defineConfig } from "vitepress";

export default defineConfig({
    title: "FlowGate",
    description: "FlowGate Docs",
    lastUpdated: true,
    lang: "zh-CN",
    ignoreDeadLinks: true,
    head: [["link", { rel: "icon", href: "/FGate.png" }]],
    vite: {
        ssr: {
            noExternal: []
        }
    },
    themeConfig: {
        logo: "/logo.png",
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: "开始", link: "/guide/intro" }],

        sidebar: [
            {
                text: "指南",
                items: [
                    { text: "首页", link: "/guide/intro" },
                    { text: "快速开始", link: "/guide/quickstart" }
                ]
            },
            {
                text: "Nexus（服务端面板）",
                items: [{ text: "还在施工..." }]
            },
            {
                text: "Client（Bukkit 插件）",
                items: [{ text: "还在施工..." }]
            }
        ],
        footer: {
            message: `基于 GPL-3.0 license 许可发布`,
            copyright: `版权所有 © 2025-${new Date().getFullYear()} CrashVibe Team`
        },
        editLink: {
            pattern: "https://github.com/CrashVibe/FGateDoc/edit/master/docs/:path"
        },
        socialLinks: [{ icon: "github", link: "https://github.com/CrashVibe/FGateDoc" }],
        docFooter: {
            prev: "上一页",
            next: "下一页"
        },
        langMenuLabel: "多语言",
        returnToTopLabel: "回到顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式"
    },
    markdown: {
        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息"
        }
    }
});
