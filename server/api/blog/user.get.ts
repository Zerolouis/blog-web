import { checkMessage } from "~/composables/useVerify";

export default defineEventHandler(async (event) => {
  let demo;
  const query = getQuery(event);
  await $fetch(useRuntimeConfig().api + "/user", {
    method: "GET",
    query,
  }).then(async (response) => {
    const { data } = await checkMessage(response);
    demo = data;
  });
  return demo;
});
