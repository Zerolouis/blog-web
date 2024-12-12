import { messageSchema } from "~/ts/types/api.type";

const telReg = /^1[3456789]\d{9}$/;
const mailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const passReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
const userReg = /^[\u4E00-\u9FA5a-zA-Z0-9]{6,15}$/;
const urlReg =
  /\b(?:https?|http):\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}|\b(?:https?|http):\/\/(?:\d{1,3}\.){3}\d{1,3}|\b(?:https?|http):\/\/localhost(?::\d+)?(?:\/[^\s]*)?\b/;
const keywordsReg =
  /[\u4E00-\u9FA5a-zA-Z0-9_]{1,10}(,[\u4E00-\u9FA5a-zA-Z0-9_]{1,10})*$/;

/**
 * 验证手机号码
 * @param tel 电话号码
 */
function checkTel(tel: string): boolean {
  return telReg.test(tel);
}

/**
 * 验证邮箱
 * @param mail 邮箱地址
 */
function checkMail(mail: string): boolean {
  return mailReg.test(mail);
}

/**
 * 验证密码
 * @param pwd 密码
 */
function checkPassword(pwd: string): boolean {
  return passReg.test(pwd);
}

/**
 * 验证用户名
 * @param username 用户名
 */
function checkUsername(username: string): boolean {
  return userReg.test(username);
}

function checkEmpty(value: string) {
  if (value?.length > 0) {
    return true;
  } else return "不能为空";
}

function isAllNumbers(str: string): boolean {
  const numberRegex = /^\d+$/;
  return numberRegex.test(str);
}

/**
 * 响应消息格式验证
 * @param res 响应信息
 */
async function checkMessage(res: any) {
  const { success, data, error } = await messageSchema.safeParseAsync(res);
  if (data?.code && data?.msg) {
    if (data?.code === "200") {
      // console.log("响应格式校验", data.msg);
    }
  }
  if (!success) {
    console.log("校验数据错误", res);
  }
  return { success, data, error };
}

function checkKeywords(str: string) {
  const b = !str || keywordsReg.test(str);
  // console.log(b);
  return b;
}

/**
 * 验证http和https
 * @param url
 */
function checkHttpsAndHttp(url: string): boolean {
  return urlReg.test(url);
}

/**
 * 检查是否为空
 * @param value 数据
 * @param name 名称
 */
function checkEmptyName(value: string, name: string) {
  return !value ? name + "不能为空" : true;
}

export {
  checkMail,
  checkPassword,
  checkTel,
  checkUsername,
  checkMessage,
  checkEmpty,
  checkHttpsAndHttp,
  checkEmptyName,
  isAllNumbers,
  checkKeywords,
};
