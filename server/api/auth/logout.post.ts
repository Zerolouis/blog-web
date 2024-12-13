import { checkMessage } from "~/composables/useVerify";

export default defineEventHandler(async (event) => {
  let data: any = null;
  await $fetch(useRuntimeConfig().api + "/user/logout", {
    headers: event.headers,
    method: "POST",
  })
    .then(async (r) => {
      data = r;
    })
    .catch(() => {
      throw Error("后端连接失败");
    });
  return data;
});
