import {z} from "zod";

export const messageSchema = z.object({
  code: z.string(),
  msg: z.string(),
  data: z.any()
})

export type CommonMessage = z.infer<typeof messageSchema>

export const LoginResultSchema = z.object({
  // accessToken
  accessToken: z.string(),
  // refreshToken
  refreshToken: z.string(),
  // accessToken 刷新
  accessTime: z.string(),
  // refreshToken刷新时间
  refreshTime: z.string(),
})

export type LoginResult = z.infer<typeof LoginResultSchema>
