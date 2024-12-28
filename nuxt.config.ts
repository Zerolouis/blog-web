// https://nuxt.com/docs/api/configuration/nuxt-config
import { transformAssetUrls } from "vite-plugin-vuetify";
import type { CommonMessage } from "~/ts/types/api.type";
import { $fetch } from "ofetch";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      link: [
        {
          rel: "preload",
          href: "/fonts/MiSans-Regular.woff2",
          type: "font/woff2",
          as: "font",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/临海隶书.ttf",
          type: "font/ttf",
          as: "font",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/Pacifico-Regular.ttf",
          type: "font/ttf",
          as: "font",
          crossorigin: "anonymous",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "page", mode: "out-in" },
  },
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify", "jsencrypt"],
  },
  modules: [
    "dayjs-nuxt",
    "vuetify-nuxt-module",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt/eslint",
    // "@nuxtjs/robots",
    // "@nuxtjs/sitemap",
    // "nuxt-og-image",
    // "nuxt-schema-org",
    // "nuxt-link-checker",
    "@nuxtjs/device",
    "@nuxtjs/seo",
    // "nuxt-site-config",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  },
  css: ["~/assets/scss/_variable.scss", "animate.css"],
  runtimeConfig: {
    api: "http://localhost:9002/v1",
  },
  i18n: {
    // if not using RTL, you can replace locales with codes only
    // locales: ['en', 'es'],
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "zhHans",
        name: "中文",
      },
    ],
    defaultLocale: "zhHans",
    strategy: "no_prefix", // or 'prefix_except_default'
    vueI18n: "./i18n.config.ts",
  },
  dayjs: {
    locales: ["zh", "en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "zh",
    defaultTimezone: "Asia/Shanghai",
  },
  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        prefersColorScheme: true,
        prefersColorSchemeOptions: {
          darkThemeName: "customDarkTheme",
          lightThemeName: "customLightTheme",
        },
        reloadOnFirstRequest: true,
        viewportSize: true,
      },
    },
    vuetifyOptions: "./vuetify.config.ts",
  },
  routeRules: {
    "/": { prerender: false },
    "/auth/**": { ssr: false },
    "/manager/**": { ssr: false, robots: false },
    "/tools/pc/**": { ssr: false },
  },
  site: {
    url: "https://blog.jujuh.top",
    name: "摸鱼Blog",
  },
  sitemap: {
    urls: async () => {
      const sitemap: string[] = [];
      await $fetch("http://localhost:9002/v1/article/map")
        .then((res: CommonMessage) => {
          res?.data.map((item: string) => {
            sitemap.push("/article/" + item);
          });
          // console.log("获取sitemap", sitemap);
          return sitemap;
        })
        .catch((e) => {
          console.error("未获取到sitemap");
        });
      return sitemap;
    },
  },
});
