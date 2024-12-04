export default defineEventHandler(async () => {
  let demo;
  await $fetch("http://127.0.0.1:4523/m1/3792059-3424148-default/article").then(
    (response) => {
      demo = response;
    },
  );
  return demo;
});
