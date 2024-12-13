import { checkMessage } from "~/composables/useVerify";

export default defineEventHandler(async (event) => {
  let data: any = null;
  await $fetch(useRuntimeConfig().api + "/category/tree", {
    method: "GET",
  })
    .then(async (r) => {
      const { data: res } = await checkMessage(r);
      data = res;
    })
    .catch(() => {
      throw Error("后端连接失败");
    });
  return data;
});
