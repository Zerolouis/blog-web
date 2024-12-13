export interface NaviListItem {
  /**
   * 前置图标
   */
  preIcon?: string;
  /**
   * item名称
   */
  name: string;
  /**
   * 值
   */
  value?: string;
  /**
   * 子列表
   */
  children?: Array<NaviListItem>;

  [propName: string]: any;
}

export interface ManagerRouter {
  // 页面名称
  name: string;
  // 页面路径
  path: string;
  // 是否展开
  drawer: boolean;
}

/**
 * 标签
 */
export interface Tag {
  // 标签id
  id: string;
  // 标签名称
  name: string;
}
