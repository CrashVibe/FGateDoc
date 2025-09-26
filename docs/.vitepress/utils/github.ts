interface GitHubRelease {
    tag_name: string;
    published_at: string;
    html_url: string;
    body: string;
}

interface VersionInfo {
    version: string;
    publishedAt: string;
    url: string;
    releaseNotes: string;
}

// 版本信息缓存
const versionCache = new Map<string, { data: VersionInfo; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 分钟缓存

/**
 * 获取 GitHub 仓库的最新版本信息
 * @param owner 仓库所有者
 * @param repo 仓库名称
 * @returns Promise<VersionInfo>
 */
export async function getLatestVersion(owner: string, repo: string): Promise<VersionInfo> {
    const cacheKey = `${owner}/${repo}`;
    const cached = versionCache.get(cacheKey);

    // 检查缓存是否有效
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                "User-Agent": "FGateDoc-VitePress"
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
        }

        const release: GitHubRelease = await response.json();

        const versionInfo: VersionInfo = {
            version: release.tag_name,
            publishedAt: new Date(release.published_at).toLocaleDateString("zh-CN"),
            url: release.html_url,
            releaseNotes: release.body || ""
        };

        // 更新缓存
        versionCache.set(cacheKey, {
            data: versionInfo,
            timestamp: Date.now()
        });

        return versionInfo;
    } catch (error) {
        console.error(`Failed to fetch version for ${owner}/${repo}:`, error);

        // 返回缓存的数据（如果存在），或者默认值
        if (cached) {
            return cached.data;
        }

        // 返回默认版本信息
        return {
            version: "v0.0.1",
            publishedAt: "2025-09-26",
            url: `https://github.com/${owner}/${repo}/releases`,
            releaseNotes: ""
        };
    }
}

/**
 * 获取 FGateNexus 的版本信息
 */
export function getFGateNexusVersion(): Promise<VersionInfo> {
    return getLatestVersion("CrashVibe", "FGateNexus");
}

/**
 * 获取 FGateClient 的版本信息
 */
export function getFGateClientVersion(): Promise<VersionInfo> {
    return getLatestVersion("CrashVibe", "FGateClient");
}
