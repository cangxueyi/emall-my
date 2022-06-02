import {get,post,put,del} from "@/utils/request.js"
import {USER_REGIST_URL,USER_LOGIN_URL,USER_MSG_URL,CUSTOMER_USERADDRESS,ADDRESS_CHINA} from "./ResourceURL.js"
// 用户注册
export const doregist = (params) => post(USER_REGIST_URL, params)
// 用户登录
export const dologin = (params) => post(USER_LOGIN_URL, params)
// 获取用户信息
export const getuser = () => get(USER_MSG_URL)
// 获取地址列表
export const getaddresslist = () => get(CUSTOMER_USERADDRESS)
//获取行政区
export const getxingzhengqu = (pid) => get(ADDRESS_CHINA,pid)
// 添加地址
export const adddizhi=(params)=>post(CUSTOMER_USERADDRESS,params)
// 更新地址
export const updateAdd=(params)=>put(CUSTOMER_USERADDRESS,params)
// 删除地址
export const delAdd=(aid)=>del(CUSTOMER_USERADDRESS+"/"+aid)