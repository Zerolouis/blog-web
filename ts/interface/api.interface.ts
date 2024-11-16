export interface SiteConfig {
    siteName: string
}

export interface ArticleInfo {
    id: string,
    title: string,
    description: string | null
    content: string
}
