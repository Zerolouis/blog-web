// 首页卡片信息
export interface ArticleCardInfo {
  // 文章id
  id: string;
  // 标题
  title: string;
  // 文章描述
  description: string;
  // 头图
  image: string;
  // 发布者
  account: string;
  // 上传时间
  upload: string;
  // 评论数
  comment: number;
}

// 文章分类信息
export interface ArticleCategoryInfo {
  // 类型id
  id: string;
  // 类型名称
  title: string;
  // 是否启用
  disabled: boolean;
  // 链接
  href: string;
}

export interface UserInfo {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
}

// 文章详情
export interface ArticleDetailInfo {
  // id
  id: string;
  // 标题
  title: string;
  // 简介
  description: string | null;
  // 文章创建时间
  createTime: string;
  // 文章更新时间
  updateTime: string;
  // 文章内容
  content: string;
  // 上传者
  uploader: UserInfo;
  // 分类
  category: Array<ArticleCategoryInfo>;
}
