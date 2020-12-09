import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json 
 */
let resquest = "/api/request/"

//登录
export function login(param) {
  return http.post(`/api/login`, param)
}
//登录验证码
export function verifyCode(param) {
  return http.post(`/api/verifyCode`, param)
}
//风险等级
export function findByNewestOne() {
  return http.get(`/api/risk/findByNewestOne`, )
}


// delete 请求
export function deleteList(params) {
  return http.delete(`${resquest}/deleteList.json`, params)
}
// get请求
export function getList(params) {
  return http.get(`${resquest}/getList.json`, params)
}
