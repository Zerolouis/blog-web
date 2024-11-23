import {JSEncrypt} from "jsencrypt";
import {messageSchema} from "~/ts/types/api.type";


const rsaEncode = async (content: string) => {
  const encrypt = new JSEncrypt()
  const {data: res} = await useFetch('/api/config/rsa')
  const {success,data,error} = await messageSchema.safeParseAsync(res.value)
  if (success && data?.data.publicKey){
    encrypt.setPublicKey(data?.data.publicKey)
  }else{
    showError({
      name: '出错了',
      statusCode: 500,
      message: '后端连接失败'
    })
  }
  return encrypt.encrypt(content)
}

export {rsaEncode}
