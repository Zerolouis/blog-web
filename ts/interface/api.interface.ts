import type { ArticleDetailInfo } from "~/ts/interface/home.interface";
import type { CommonMessage } from "~/ts/types/api.type";

export interface SiteConfig {
  siteName: string;
}

export const errorMessage: CommonMessage = {
  code: "404",
  msg: "后端连接错误",
  data: undefined,
};

/**
 * 文件分享方式Item
 */
export interface FileShareItem {
  method: string;
  title: string;
}

/**
 * 文件分享列表 Item
 */
export interface FileShareListItem {
  method: FileShareItem;
  url: string;
  description: string;
}

export const shareCategory: Array<FileShareItem> = [
  {
    method: "baidu",
    title: "百度网盘",
  },
  {
    method: "url",
    title: "直链",
  },
  {
    method: "bt",
    title: "Bittorrent",
  },
  {
    method: "ali",
    title: "阿里网盘",
  },
  {
    method: "quark",
    title: "夸克网盘",
  },
  {
    method: "115",
    title: "115网盘",
  },

  {
    method: "lanzou",
    title: "蓝奏云",
  },
  {
    method: "onedrive",
    title: "Onedrive",
  },
  {
    method: "other",
    title: "其他",
  },
];

export type ArticleGet = ArticleDetailInfo;

/**
 * 文章存储请求格式
 */
export interface ArticleSaveQuery {
  title: string;
  description?: string;
  uid: string;
  content: string;
  copyright: number;
  picture?: string;
  pictureCopyright?: string;
  tags: string[];
  category: string[];
  share: FileShareListItem[];
  createTime: string;
}
