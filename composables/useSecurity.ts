import { JSEncrypt } from "jsencrypt";
import { messageSchema } from "~/ts/types/api.type";

const rsaEncode = async (content: string) => {
  const encrypt = new JSEncrypt();
  await $fetch("/api/config/rsa").then(async (res) => {
    const { success, data, error } = await messageSchema.safeParseAsync(res);
    if (success && data?.data.publicKey) {
      encrypt.setPublicKey(data?.data.publicKey);
    } else {
      showError({
        name: "出错了",
        statusCode: 500,
        message: "后端连接失败",
      });
    }
  });
  return encrypt.encrypt(content) as string;
};

export { rsaEncode };
