export default defineEventHandler(async (event) => {
  let data: any = null;
  const body = await readBody(event);
  await $fetch(useRuntimeConfig().api + "/article", {
    headers: event.headers,
    body,
    method: "POST",
  })
    .then((r) => {
      data = r;
    })
    .catch(() => {
      throw Error("后端连接失败");
    });
  return data;
});
