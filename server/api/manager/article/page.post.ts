import { checkMessage } from "~/composables/useVerify";

export default defineEventHandler(async (event) => {
  let data: any = null;
  const body = await readBody(event);
  await $fetch(useRuntimeConfig().api + "/article/manager/page", {
    headers: event.headers,
    body,
    method: "POST",
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
