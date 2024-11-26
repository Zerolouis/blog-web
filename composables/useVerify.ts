import {messageSchema} from "~/ts/types/api.type";

const telReg = /^1[3456789]\d{9}$/
const mailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
const passReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
const userReg = /^[\u4E00-\u9FA5a-zA-Z0-9]{6,15}$/

/**
 * 验证手机号码
 * @param tel 电话号码
 */
function checkTel(tel: string): boolean {
  return telReg.test(tel)
}

/**
 * 验证邮箱
 * @param mail 邮箱地址
 */
function checkMail(mail: string): boolean {
  return mailReg.test(mail)
}

/**
 * 验证密码
 * @param pwd 密码
 */
function checkPassword(pwd: string): boolean {
  return passReg.test(pwd)
}

/**
 * 验证用户名
 * @param username 用户名
 */
function checkUsername(username: string): boolean {
  return userReg.test(username)
}



async function checkMessage(res: any) {
  const {$pinia} = useNuxtApp()
  const toast = useToastStore($pinia)
  const {success, data, error} = await messageSchema.safeParseAsync(res)
  if (data?.code && data?.msg){
    if (data?.code === '200'){
      console.log(data.msg)
    }else{
      toast.error(data.msg)
    }
  }
  return {success, data, error}
}

export {
  checkMail,
  checkPassword,
  checkTel,
  checkUsername,
  checkMessage
}
