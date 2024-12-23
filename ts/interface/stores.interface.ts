import type { UserInfo } from "~/ts/interface/home.interface";
import type { DeviceType, DIYItem } from "~/ts/interface/tools.interface";

export interface ToastState {
  /** 通知内容 */
  msg: string;
  /** 通知颜色 */
  color: string;
  /** 显示 */
  visible?: boolean;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 超时时间 */
  timeout?: number;
  /** 防抖计时器 */
  debounceTimer?: NodeJS.Timeout | null;
}

export interface SiteConfigState {
  currentTheme: string;
  darkMode: boolean;
}

export interface UserState {
  // 用户信息
  userInfo?: UserInfo;
  // 是否登录
  isLogin: boolean;
}

interface SourceState {
  /**
   * 配件列表
   */
  devicesList: Array<DIYItem>;
  /**
   * 源
   */
  sourcesList: Array<DIYItem>;
  /**
   * 配件种类
   */
  devicesTypeName: Array<DeviceType>;
  /**
   * 总价格
   */
  totalPrice: number;
  /**
   * 配置单名称
   */
  listName: string;
}
