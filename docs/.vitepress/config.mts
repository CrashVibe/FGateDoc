import { withMermaid } from "vitepress-plugin-mermaid";
// https://vitepress.dev/reference/site-config
export default withMermaid({
    ignoreDeadLinks: ["http://localhost:3000"],
    title: "FGate",
    description: "FlowGate Docs",
    head: [["link", { rel: "icon", href: "/FGate.png" }]],
    themeConfig: {
        logo: "/logo.png",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "家", link: "/" },
            { text: "首页", link: "/get-start" },
            { text: "安装", link: "/install" }
        ],

        sidebar: [
            {
                text: "目录",
                items: [{ text: "首页", link: "/get-start" }]
            },
            {
                text: "安装",
                items: [
                    { text: "Nexus", link: "/install/nexus" },
                    { text: "Client", link: "/install/client" }
                ]
            },
            {
                text: "配置文档",
                items: [{ text: "Nexus", link: "/config/nexus" }]
            },
            { text: "功能文档" }
        ],
        footer: {
            message: "Released under the GPL-3.0 License.",
            copyright: "2025-present CrashVibe"
        },
        socialLinks: [{ icon: "github", link: "https://github.com/CrashVibe/FGateDoc" }]
    }
});
