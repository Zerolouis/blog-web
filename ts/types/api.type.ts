import { z } from "zod";

// 接口格式校验
export const messageSchema = z.object({
  code: z.string(),
  msg: z.string(),
  data: z.any(),
});

export type CommonMessage = z.infer<typeof messageSchema>;
// 登录数据校验
export const LoginResultSchema = z.object({
  // accessToken
  accessToken: z.string(),
  // refreshToken
  refreshToken: z.string(),
  // accessToken 刷新
  accessTime: z.string(),
  // refreshToken刷新时间
  refreshTime: z.string(),
});

export type LoginResult = z.infer<typeof LoginResultSchema>;

// 标签校验
export const AllTagsSchema = z.map(z.string(), z.string());

export type AllTagsResult = z.infer<typeof AllTagsSchema>;

export type Category = {
  id: string;
  name: string;
  parentId: string;
  children?: Category[];
};

export const Category: z.ZodSchema<Category> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string(),
    children: z.array(Category).optional(),
  }),
);

export const CategoryListSchema = z.lazy(() =>
  z
    .object({
      id: z.string(),
      name: z.string(),
      parentId: z.string(),
      children: z.array(Category).optional(),
    })
    .array(),
);
export type CategoryList = z.infer<typeof CategoryListSchema>;

export const ArticleQuerySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  creator: z.object({
    uid: z.string(),
    username: z.string(),
    nickname: z.string(),
    level: z.string(),
    roleName: z.string(),
    avatar: z.string().optional(),
  }),
  //keywords: z.string().optional(),
  content: z.string(),
  copyright: z.string(),
  picture: z.string(),
  pictureCopyright: z.string().optional(),
  tags: z
    .array(
      z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .optional(),
    )
    .optional(),

  categories: z
    .array(
      z
        .object({
          id: z.string(),
          parentId: z.string(),
          name: z.string(),
          children: z.nullable(z.string()).optional(),
        })
        .optional(),
    )
    .optional(),
  share: z.array(
    z.object({
      method: z.string(),
      url: z.string(),
      description: z.string().optional(),
    }),
  ),
  createTime: z.string(),
  updateTime: z.string(),
});

export type ArticleQuery = z.infer<typeof ArticleQuerySchema>;

export const FileShareQuerySchema = z.array(
  z.object({
    method: z.string(),
    url: z.string(),
    description: z.string().optional(),
  }),
);

export type FileShareQuery = z.infer<typeof FileShareQuerySchema>;

export const TagQuerySchema = z.object({
  id: z.string(),
  name: z.string(),
  createTime: z.string(),
  updateTime: z.string(),
  isDeleted: z.string(),
});

export type TagQuery = z.infer<typeof TagQuerySchema>;

export const CategoryQuerySchema = z.object({
  id: z.string(),
  parentId: z.string(),
  description: z.nullable(z.string()).optional(),
  name: z.string(),
  createTime: z.string(),
  updateTime: z.string(),
  isDeleted: z.string(),
});

export type CategoryQuery = z.infer<typeof CategoryQuerySchema>;

export const CategoryQueryArraySchema = z.array(CategoryQuerySchema);

export type CategoryArray = z.infer<typeof CategoryQueryArraySchema>;

export const ArticleDataSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  createTime: z.string(),
  updateTime: z.string(),
});

export const ArticleDataArraySchema = z.array(ArticleDataSchema);

export type ArticleData = z.infer<typeof ArticleDataSchema>;
export type ArticleDataArray = z.infer<typeof ArticleDataArraySchema>;

export const UserSimpleInfoSchema = z.object({
  uid: z.string(),
  username: z.string(),
  nickname: z.string().optional(),
  level: z.string(),
  roleName: z.string(),
  avatar: z.string().optional(),
});

export type UserSimpleInfo = z.infer<typeof UserSimpleInfoSchema>;
