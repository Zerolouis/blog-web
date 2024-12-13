import { checkMessage } from "~/composables/useVerify";

export default defineEventHandler(async (event) => {
  let demo;
  const query = getQuery(event);
  await $fetch(useRuntimeConfig().api + "/article/map", {
    method: "GET",
    query,
  }).then(async (response) => {
    const sitemap: string[] = [];
    const { data: result } = await checkMessage(response);
    result?.data.map((item: string) => {
      sitemap.push("/article/" + item);
    });
    demo = sitemap;
  });
  return demo;
});
