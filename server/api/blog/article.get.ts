export default defineEventHandler(async (event) => {
  let demo;
  const query = getQuery(event);
  await $fetch(useRuntimeConfig().api + "/article", {
    method: "GET",
    query,
  }).then((response) => {
    demo = response;
  });
  return demo;
});
