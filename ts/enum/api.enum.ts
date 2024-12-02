export enum CopyrightEnum {
  Deny,
  CC,
  Allow,
  CC_BY,
  CC_BY_NC,
  CC_BY_ND,
  CC_BY_NC_ND,
  CC_BY_SA,
  CC_NC_SA,
}

export const CopyrightMap = new Map<number, string>([
  [CopyrightEnum.Deny, "禁止转载"],
  [CopyrightEnum.CC, "根据CC4.0协议转载"],
  [CopyrightEnum.Allow, "允许任意转载"],
  [CopyrightEnum.CC_BY, "BY 署名"],
  [CopyrightEnum.CC_BY_NC, "BY-NC 署名-非商业性使用"],
  [CopyrightEnum.CC_BY_ND, "BY-ND 署名-禁止演绎"],
  [CopyrightEnum.CC_BY_NC_ND, "BY-NC-ND 署名-非商业性使用-禁止演绎"],
  [CopyrightEnum.CC_BY_SA, "BY-SA 署名-相同方式共享"],
  [CopyrightEnum.CC_NC_SA, "NC-SA 署名-非商业性使用-相同方式共享"],
]);

export const CCMap = new Map<string, number>([
  ["AA", CopyrightEnum.CC_BY],
  ["AB", CopyrightEnum.CC_BY_NC],
  ["BA", CopyrightEnum.CC_BY_ND],
  ["BB", CopyrightEnum.CC_BY_NC_ND],
  ["CA", CopyrightEnum.CC_BY_SA],
  ["CB", CopyrightEnum.CC_NC_SA],
]);
