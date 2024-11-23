import {z} from "zod";

export const messageSchema = z.object({
  code: z.string(),
  msg: z.string(),
  data: z.any()
})

export type CommonMessage = z.infer<typeof messageSchema>
