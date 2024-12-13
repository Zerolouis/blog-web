import type { ArticleCardInfo } from "~/ts/interface/home.interface";
import { checkMessage } from "~/composables/useVerify";

export default defineEventHandler(async (event) => {
  let res: any = null;
  const query = getQuery(event);
  await $fetch(useRuntimeConfig().api + "/article/page", {
    method: "GET",
    query,
  })
    .then(async (r) => {
      const { data } = await checkMessage(r);
      res = data;
    })
    .catch(() => {
      throw Error("后端连接失败");
    });
  return res;
});
