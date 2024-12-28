export interface DIYDeviceType {
  name: string;
  color: string;
  level: number;
  icon: string;
}

export interface DiYDeviceItem {
  category: DIYDeviceType;
  price: number;
  model: string;
  description: string;
}

export interface DiYList {
  // 配件列表
  devices: DiYDeviceItem[];
  // 总费用
  total: number | string;
  // 配置单名称
  name: string;
}
