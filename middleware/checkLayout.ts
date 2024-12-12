import { setPageLayout } from "#app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isMobileOrTablet } = useDevice();
  console.log("isMobileOrTablet", isMobileOrTablet);
  if (isMobileOrTablet) {
    setPageLayout("mobile-home");
  } else {
    setPageLayout("desktop-home");
  }
});
