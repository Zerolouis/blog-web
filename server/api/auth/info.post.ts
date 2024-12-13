import { checkMessage } from "~/composables/useVerify";

export default defineEventHandler(async (event) => {
  let data: any = null;
  const body = await readBody(event);
  await $fetch(useRuntimeConfig().api + "/user/info", {
    headers: event.headers,
    method: "POST",
    body,
  })
    .then(async (r) => {
      data = r;
    })
    .catch(() => {
      throw Error("后端连接失败");
    });
  return data;
});
