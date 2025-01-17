export default defineEventHandler(async (event) => {
  let data: any = null;
  await $fetch(useRuntimeConfig().api + "/tag", {
    method: "GET",
  })
    .then((r) => {
      data = r;
    })
    .catch(() => {
      throw Error("后端连接失败");
    });
  return data;
});
